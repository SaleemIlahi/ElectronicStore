const nodemailer = require('nodemailer')
const ejs = require('ejs')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const { userModel } = require('../models/user_model.js')
const { google } = require('googleapis')


const emailOAuth2 = async () => {
    const CLIENT_ID = process.env.EMAIL_CLIENT_ID
    const CLIENT_SECRET = process.env.EMAIL_CLIENT_SECRET
    const REDIRECT_URL = process.env.EMAIL_REDIRECT_URL
    const REFRESH_TOKEN = process.env.EMAIL_REFRESH_TOKEN
    
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
    const ACCESS_TOKEN = await oAuth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.USER,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: ACCESS_TOKEN
        }
    })

    return transporter
}

async function sendMails(user) {

    const transporter = await emailOAuth2()

    const playoad = {
        aud: user.id,
        iss: 'ElectronicStore.com',
    }

    const expireToken = jwt.sign(playoad, process.env.JWT_ACCESS_TOKEN, { expiresIn: '10m' })
   
    const data = await ejs.renderFile(process.cwd() + "\\server\\api\\views\\verification-template.ejs", {
        name: user.name,
        token: user.emailToken,
        expireToken
    })

    const mailOptions = {
        from: 'Electronic Store <process.env.USER>',
        to: user.email,
        subject: 'ElectronicStore Email Verification',
        html: data
    }

    const mailsent = transporter.sendMail(mailOptions)
    
    return mailsent
}

const optMail = async (user,otp) => {
    const transporter = await emailOAuth2()

    const data = await ejs.renderFile(process.cwd() + "\\server\\api\\views\\otp-template.ejs", {
        name: user.name,
        otp
    })

    const mailOptions = {
        from: 'Electronic Store <process.env.USER>',
        to: user.email,
        subject: `ElectronicStore Account - ${otp} is your verification code for secure access`,
        html: data
    }

    const mailsent = transporter.sendMail(mailOptions)

    return mailsent
}

const verifyMails = async (req, res, next) => {
    try {
        const token = req.params.emailToken
        const expiretoken = req.params.expireToken

        const verifyexpire = jwt.verify(expiretoken, process.env.JWT_ACCESS_TOKEN)

        if (!verifyexpire) throw next(createError.Unauthorized('Email verification expired'))

        const updateToken = {
            emailToken: null,
            isVerified: true
        }

        await userModel.updateOne({ emailToken: token }, updateToken)

        res.status(200).json({
            errorStatus: true,
            message: 'Your Email is Verified',
        })

    } catch (error) {
        next(error)
    }
}




module.exports = { sendMails, optMail, verifyMails }