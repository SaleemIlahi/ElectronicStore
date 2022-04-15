
const express = require('express')
const router = express.Router()
const productController = require('../controllers/product_controller.js')
const payment = require('../services/payment_service.js')

router.post('/api/v1/createProduct',productController.createProduct)
router.post('/api/v1/updateProduct/:id',productController.updateProduct)
router.post('/api/v1/deleteProduct/:id',productController.deleteProduct)
router.get('/api/v1/getProductByCategory/:ctg',productController.getProductByCategory)
router.get('/api/v1/getProductByID',productController.getProductByID)
router.get('/api/v1/search',productController.searchProduct)
router.get('/api/v1/filter',productController.filterProduct)
router.post('/api/v1/checkout',payment)


module.exports = router