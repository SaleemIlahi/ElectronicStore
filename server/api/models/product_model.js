
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Enter Product name'],
        trim: true
    },
    price: {
        type: String,
        require: [true, 'Enter Product price'],
        maxLength: [8, 'Price cannot exceed 8 figures']
    },
    description: {
        type: String,
        require: [true, 'Enter Product description']
    },
    category: {
        type: String,
        require: [true, 'Specify Product category']
    },
    url: [
        {
            type: String,
        }
    ],
    company: {
        type: String,
    },
    stock: {
        type: Number,
    },
    created: {
        type: Date,
        default: Date.now
    }
})

exports.productModel = mongoose.model('product',productSchema)