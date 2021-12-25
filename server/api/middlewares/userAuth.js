
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const { userModel } = require('../models/user_model.js')

exports.userAuth = async (req, res, next) => {
    try {
        const accessToken = req.cookies.jwt
        if(!accessToken) throw next(createError.Unauthorized('login to access'))

        const verify = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN)
        if (!verify) throw next(createError.Unauthorized('User Not Found'))

        req.user = await userModel.findOne({_id: verify.aud })

        next()
    } catch (error) {
        next(error)
    }
}