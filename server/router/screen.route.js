const { Router } = require('express')
const { uploadScreen, getScreen } = require('../controllers/screen.controller')

const router = Router()

router.post('/', uploadScreen)
router.get('/:id_student', getScreen)

module.exports = router
