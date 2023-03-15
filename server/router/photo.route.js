const { Router } = require('express')
const { uploadPhotos, getPhotos } = require('../controllers/photo.controller')

const router = Router()

router.post('/', uploadPhotos)
router.get('/:id_student', getPhotos)

module.exports = router
