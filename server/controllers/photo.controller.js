const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const { id_student } = req.body
		const dir = `uploads/${id_student}/photo`
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir)
		}
		cb(null, dir)
	},
	filename: (req, file, cb) => {
		// используем оригинальное имя файла и его расширение
		const ext = path.extname(file.originalname)
		const fileName = path.basename(file.originalname, ext)
		cb(null, fileName + '-' + Date.now() + ext)
	},
})

const upload = multer({ storage })

function uploadPhotos(req, res) {
	try {
		upload.array('photos')(req, res, function (err) {
			if (err) {
				res.status(500).json({
					message: 'Ошибка загрузки фотографий',
					type: 'error',
					data: [],
				})
			} else {
				const files = req.files.map(file => {
					// сохраняем метаданные оригинального имени и расширении файла
					const { originalname, mimetype } = file
					return { path: file.path, originalname, mimetype }
				})
				res.status(200).json({
					message: 'Фотографии успешно загружены',
					type: 'success',
					data: { files },
				})
			}
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Ошибка в сервер',
			type: 'error',
			data: [],
		})
	}
}

module.exports = { uploadPhotos }
