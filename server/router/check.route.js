const { Router } = require('express')
const checkController = require('../controllers/check.controller')

const router = Router()

router.get('/:id_student', checkController.checkStudent)
router.get('/', checkController.getAllStudents)

module.exports = router
