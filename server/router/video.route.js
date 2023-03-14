const { Router } = require('express')
const { uploadVideo, getVideo } = require('../controllers/video.controller')

const router = Router()

router.post('/', uploadVideo)
router.get('/:id_student', getVideo)

module.exports = router
