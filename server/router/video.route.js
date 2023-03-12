const { Router } = require('express')
const { uploadVideo } = require('../controllers/video.controller')

const router = Router()

router.post('/', uploadVideo)

module.exports = router
