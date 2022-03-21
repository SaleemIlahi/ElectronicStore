
const { userModel } = require('../models/user_model.js')
const createError = require('http-errors')
const { signAccessToken } = require('../helpers/jwt_token.js')
const { sendMails } = require('../services/email-service.js')
const schema = require('../validator/userValidator.js')
const bcrypt = require('bcrypt')

class userController {
    static register = async (req, res, next) => {
        try {
            const { email } = req.body

            await schema.validateAsync(req.body)

            // checking email already registered or not
            const isRegistered = await userModel.findOne({ email })

            // throw error on email registered
            if (isRegistered) throw next(createError.Conflict('Email is Already Registered'))

            // saving user data
            const user = new userModel(req.body)
            const data = await user.save()

            const mails = await sendMails(data, req.headers.host)

            if (!mails) throw next(createError.Unauthorized())

            res.status(201).json({
                success: true,
                message: `Email sent your ${data.email}. Verify you Email`
            })
        } catch (error) {
            next(error)
        }
    }

    static login = async (req, res, next) => {
        try {
            const { email, password } = req.body

            if (!email) throw next(createError.BadRequest('Email field is not allowed to be empty'))
            
            const isMatch = await userModel.findOne({ email }).select('+password')
            if (!isMatch) throw next(createError.Unauthorized('Email or Password is Invalid'))
            
            if (!password) throw next(createError.BadRequest('Password field is not allowed to be empty'))
            const comparePassword = await bcrypt.compare(password,isMatch.password)
            if (!comparePassword) throw next(createError.Unauthorized('Email or Password is Invalid'))
            
            if (!isMatch.isVerified) throw next(createError.Unauthorized('Email is not verified'))

            const accessToken = signAccessToken(isMatch)

            res.cookie('jwt', accessToken, {
                expires: new Date(Date.now() + 60 * 60 * 1000),
                httpOnly: true
            })

            res.status(201).json({
                message: 'Login Successfully',
                success: true,
            })
        } catch (error) {
            next(error)
        }
    }

    static logout = async (req, res, next) => {
        try {
            
            res.clearCookie('jwt')

            res.status(201).json({
                message: 'Logout Successfully',
                success: false
            })
        } catch (error) {
            next(error)
        }
    }

    static resenMail = async (req, res, next) => {
        try {

            const { email } = req.body

            if(!email) throw next(createError.NotFound('Email is not allowed to be empty'))
            
            const user = await userModel.findOne({ email })

            if(!user) throw next(createError.NotFound('Email is not Registered'))

            await sendMails(user, req.headers.host)

            res.json({
                message: `Email sent your ${email}. Verify you Email`
            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = userController