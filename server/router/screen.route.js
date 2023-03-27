const { Router } = require('express')
const {
	uploadScreen,
	getScreen,
	getScreenshots,
} = require('../controllers/screen.controller')

const router = Router()

router.post('/', uploadScreen)
router.get('/:id_student', getScreen)
router.get('/screenshots/:id_student', getScreenshots)

module.exports = router
