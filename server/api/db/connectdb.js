
const mongoose = require('mongoose')

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('connected Successfully')
    } catch (error) {
        console.log(error)
    }
}