const { Router } = require('express')
const TestsController = require('../controllers/tests.controller')

const router = Router()

router.get('/', TestsController.getPost)
router.get('/special/:id_question', TestsController.getSpecialPost)
router.get('/special/answers/:id_question', TestsController.getSpecialAnswers)
router.get(
	'/special/right_answers/:id_question',
	TestsController.getRightAnswer
)

module.exports = router
