
const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Username is required'],
        trim: true,
        minlength: [3,'Username must contain atleast 3 character'],
        maxlength: [50, 'Username cannot exceed more 50 character']
    },
    email: {
        type: String,
        validate: [isEmail,'Enter a valid Email address'],
        required: [true, 'Email is required'],
        unique: [true, 'Email already Registered'],
        lowercase: [true,'Enter email in lowercase']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'minimum length should be atleast 8 character'],
        select: false
    },
    avatar: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    role: {
        type: String,
        default: "user"
    },
    created: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password, salt)
        this.password = hashPassword
        next()
    } catch (error) {
        next(error)
    }
})

exports.userModel = mongoose.model('user', userSchema)