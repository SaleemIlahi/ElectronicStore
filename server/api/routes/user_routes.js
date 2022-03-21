
const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller.js')
const { userAuth } = require('../middlewares/userAuth.js')
const { verifyMails } = require('../services/email-service.js')
const {otpEmail, verifyOTP} = require('../services/otp-service.js')

router.post('/api/v1/register', userController.register)
router.post('/api/v1/login', userController.login)
router.get('/api/v1/auth', userAuth, (req, res) => {
    const user = req.user
    res.json({
        email: user.email,
        name: user.name,
        success: true
    })
})
router.get('/api/v1/logout',userController.logout)
router.get('/api/v1/verify-email/:emailToken/:expireToken',verifyMails)
router.post('/api/v1/resend-mail',userController.resenMail)
router.post('/api/v1/opt-service',otpEmail)
router.post('/api/v1/verify-otp',verifyOTP)


module.exports = router
