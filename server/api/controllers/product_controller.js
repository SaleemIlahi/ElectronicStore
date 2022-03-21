
const { productModel } = require('../models/product_model.js')
const createError = require('http-errors')

class productController {
    static createProduct = async (req,res,next) => {
        try {
            
            const product = new productModel(req.body)

            await product.save()

            res.status(201).json({
                message: 'Product Created Successfully'
            })

        } catch (error) {
            next(error)
        }
    }

    static updateProduct = async (req,res,next) => {
        try {
            
            await productModel.updateOne({_id: req.params.id},req.body)

            res.status(201).json({
                message: 'Product updated'
            })

        } catch (error) {
            next(error)
        }
    }

    static deleteProduct = async (req,res,next) => {
        try {
            
            const productID = req.params.id

            await productModel.deleteOne({_id: productID})

            res.status(201).json({
                message: 'Product deleted'
            })

        } catch (error) {
            next(error)
        }
    }

    static searchProduct = async (req,res,next) => {
        try {
            
            const productName = req.query.q
            const keywords = {
                name: {
                    $regex: productName,
                    $options: "i"
                }
            }
            
            if(!productName) throw next(createError.NotFound())

            const product = await productModel.find(keywords)
            
            res.json({
                product
            })


        } catch (error) {
            next(error)
        }
    }

    static filterProduct = async (req,res,next) => {
        try {
            
            const productPrice = req.query.q
                    
            // if(!productName) throw next(createError.NotFound('Fill search fields'))

            const product = await productModel.find()
            
            const filterPrice = product.filter(product => Number(product.price) < Number(productPrice))
            const fillterBrand = product.filter(product => product.company == productPrice)
            
            res.json({
                filterPrice,
                fillterBrand
            })


        } catch (error) {
            next(error)
        }
    }

    static getProductByID = async (req,res,next) => {
        try {

            const productID = req.query.q

            const product = await productModel.findById(productID)

            res.status(201).json({
                product
            })

        } catch (error) {
            next(error)
        }
    }

    static getProductByCategory = async (req,res,next) => {
        try {

            const productCategory = req.params.ctg

            const product = await productModel.find({category: productCategory})

            res.status(201).json({
                product
            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = productController