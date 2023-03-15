const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const { id_student } = req.body
		const mainDir = `uploads/${id_student}`
		const photoDir = `${mainDir}/photo`
		if (!fs.existsSync(mainDir)) {
			fs.mkdirSync(mainDir)
		}
		if (!fs.existsSync(photoDir)) {
			fs.mkdirSync(photoDir)
		}

		cb(null, photoDir)
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

function getPhotos(req, res) {
	try {
		const { id_student } = req.params
		const photosDir = `uploads/${id_student}/photo`
		if (!fs.existsSync(photosDir)) {
			return res.status(404).json({ message: 'Фотографии не найдены' })
		}
		fs.readdir(photosDir, (err, files) => {
			if (err) {
				res.status(500).json({
					message: 'Ошибка чтения дериктории',
					type: 'error',
					data: [],
				})
			}
			const photos = files.map(file => ({
				name: file,
				url: `/uploads/${id_student}/photo/${file}`,
			}))
			res.status(200).json({
				message: 'Фотографии успешно загружены',
				type: 'success',
				data: photos,
			})
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

module.exports = { uploadPhotos, getPhotos }
