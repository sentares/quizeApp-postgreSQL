const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const dir = `uploads/${req.body.id_student}`
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir)
		}
		cb(null, dir)
	},

	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		cb(null, Date.now() + ext)
	},
})

const upload = multer({ storage })

function uploadVideo(req, res) {
	upload.single('video')(req, res, err => {
		if (err instanceof multer.MulterError) {
			res.status(400).send('Ошибка загрузки видео')
		} else if (err) {
			res.status(500).send('Ошибка сервера')
		} else {
			res.send('Видео успешно загружено')
		}
	})
}

module.exports = { uploadVideo }
