
const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller.js')
const { userAuth } = require('../middlewares/userAuth.js')
// const { verifyMailID } = require('../helpers/verify_mail_id.js')

router.post('/api/v1/register', userController.register)
router.post('/api/v1/login', userController.login)
router.get('/api/v1/home', userAuth, (req, res) => {
    const user = req.user
    res.json({
        user
    })
})
// router.get('/api/v1/verify-email',verifyMailID)


module.exports = router
