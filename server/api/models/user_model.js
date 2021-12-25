
const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

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
    emailToken: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
})

// hashing password
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password, salt)
        this.password = hashPassword

        const emailverificationtoken = crypto.randomBytes(64).toString('hex')
        this.emailToken = emailverificationtoken

        next()
    } catch (error) {
        next(error)
    }
})

// comparing hash password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password)
}

exports.userModel = mongoose.model('user', userSchema)