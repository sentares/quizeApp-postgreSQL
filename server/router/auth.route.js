const { Router } = require('express')
const AuthController = require('../controllers/auth.controller')

const router = Router()

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.get('/check', AuthController.check)
router.get('/logout', AuthController.logout)

module.exports = router
