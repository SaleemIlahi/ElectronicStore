
const crypto = require('crypto')
const createError = require('http-errors')
const { userModel } = require('../models/user_model.js')
const { optMail } = require('./email-service.js')

const expiresIn = Date.now() + 1000 * 60 * 10

// Hashing otp
const otpHash = (otp, mode, expires) => {
    const data = `${otp}.${mode}.${expires}`

    return crypto.createHmac('sha256', process.env.OTP_SECRET).update(data).digest('hex')
}

const otpEmail = async (req, res, next) => {
    try {
        const { email } = req.body

        const user = await userModel.findOne({ email })

        if (!user) throw next(createError.Unauthorized('Your are not Registered'))

        // generating OTP
        const otp = crypto.randomInt(100000, 999999)

        // hashing otp
        const hash = otpHash(otp, email, expiresIn)

        // updating to dab=tabse
        await user.updateOne({ otp: hash })

        // sending mail
        optMail(user, otp)

        res.json({
            expiresIn,
            hash
        })

    } catch (error) {
        next(error)
    }
}

const verifyOTP = async (req, res, next) => {
    try {
        const { otp, email, password } = req.body

        if (!otp) throw next(createError.Unauthorized('Enter OTP sent you'))
        if (!password) throw next(createError.Unauthorized('Enter password'))

        const user = await userModel.findOne({ email })

        // fetching OTP from database
        const dbOTP = user.otp
        if (!dbOTP) throw next(createError.Unauthorized('OTP is not valid'))

        // hashing user entered otp
        const userOTP = otpHash(otp, email, expiresIn)

        // comparing otp
        if (dbOTP !== userOTP) throw next(createError.Unauthorized('OTP does not match'))

        await user.updateOne({ otp: null })

        if (Date.now() > expiresIn) {
            await user.updateOne({ otp: null })
            throw next(createError.Unauthorized('OTP has been expired'))
        }

        // updating password
        user.password = password
        await user.save()

        res.json({
            message: 'Password updated'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { otpEmail, verifyOTP }