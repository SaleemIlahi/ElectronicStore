
const { userModel } = require('../models/user_model.js')
const createError = require('http-errors')
const { signAccessToken } = require('../helpers/jwt_token.js')
const { sendMails } = require('../services/email-service.js')

class userController {
    static register = async (req, res, next) => {
        try {
            const { email } = req.body

            // checking email already registered or not
            const isRegistered = await userModel.findOne({ email })

            // throw error on email registered
            if (isRegistered) throw next(createError.Conflict('Email Already Registered'))

            // saving user data
            const user = new userModel(req.body)
            const data = await user.save()

            const mails = await sendMails(data, req.headers.host)

            if (!mails) throw next(createError.Unauthorized())

            res.status(201).json({
                message: `Email sent your ${data.email}. Verify you Email`
            })
        } catch (error) {
            next(error)
        }
    }

    static login = async (req, res, next) => {
        try {
            const { email, password } = req.body

            if (!email || !password) throw next(createError.BadRequest('Fill all fields properly'))

            const isMatch = await userModel.findOne({ email }).select('+password')
            if (!isMatch) throw next(createError.Unauthorized('Invalid Email or Password'))

            if (!isMatch.comparePassword(password)) throw next(createError.Unauthorized('Invalid Email or Password'))

            if (!isMatch.isVerified) throw next(createError.Unauthorized('Email is not verified'))

            const accessToken = signAccessToken(isMatch)

            res.cookie('jwt', accessToken, {
                expires: new Date(Date.now() + 60 * 60 * 1000),
                httpOnly: true
            })

            res.status(201).json({
                message: 'Login Successfully'
            })
        } catch (error) {
            next(error)
        }
    }

    static resenMail = async (req, res, next) => {
        try {

            const { email } = req.body
            const user = await userModel.findOne({ email })

            if(!user) throw next(createError.NotFound('Your are not Registered'))

            await sendMails(user, req.headers.host)

            res.json({
                message: 'email sent'
            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = userController