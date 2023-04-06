const { Router } = require('express')
const EditController = require('../controllers/edit.controller')

const router = Router()

router.put('/question/:id_question', EditController.editQuestion)
router.put('/answer/:id_answers', EditController.editAnswer)
router.put('/answer', EditController.editRightAnswer)

module.exports = router
