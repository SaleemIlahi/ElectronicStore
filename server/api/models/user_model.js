
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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
    otp: {
        type: String,
        default: null
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
    return bcrypt.compare(password,this.password)
}

exports.userModel = mongoose.model('user', userSchema)