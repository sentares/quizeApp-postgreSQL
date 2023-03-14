const { Router } = require('express')
const { uploadPhotos } = require('../controllers/photo.controller')

const router = Router()

router.post('/', uploadPhotos)
router.get('/:id_student')

module.exports = router
