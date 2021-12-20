
const { userModel } = require('../models/user_model.js')
const createError = require('http-errors')

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

            res.status(201).json({
                message: 'Register Successfully',
                data
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
            if(!isMatch) throw next(createError.NotFound('Invalid Email or Password'))

            if(!isMatch.comparePassword(password)) throw next(createError.NotFound('Invalid Email or Password'))

            res.status(201).json({
                message: 'Login Successfully'
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = userController