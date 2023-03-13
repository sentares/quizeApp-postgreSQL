const { Router } = require('express')
const { uploadVideo, getVideo } = require('../controllers/video.controller')

const router = Router()

router.post('/', uploadVideo)
router.get('/get', getVideo)

module.exports = router
