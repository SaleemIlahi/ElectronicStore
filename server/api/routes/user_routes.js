
const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller.js')

router.post('/api/v1/register',userController.register)


module.exports = router
