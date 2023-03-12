const { Router } = require('express')
const resultController = require('../controllers/result.controller')

const router = Router()

router.put('/', resultController.updateStudent)

module.exports = router
