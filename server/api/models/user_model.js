
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Username is required'],
        trim: true,
        maxlength: [50, 'Username cannot exceed more 50 character']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already Registered']
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

exports.userModel = mongoose.model('user',userSchema)