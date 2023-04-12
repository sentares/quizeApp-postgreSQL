const { Router } = require('express')
const EditController = require('../controllers/edit.controller')

const router = Router()

router.put('/question/:id_question', EditController.editQuestion)
router.put('/answer/:id_answers', EditController.editAnswer)
router.put('/answer', EditController.editRightAnswer)
router.post('/imageQuestions/:id_question', EditController.savePhoto)
router.delete(
	'/imageQuestions/delete/:id_image',
	EditController.deleteQuestionImage
)
router.post('/create/question', EditController.createQuestion)

module.exports = router
