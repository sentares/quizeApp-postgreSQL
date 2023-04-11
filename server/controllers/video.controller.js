const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const dir = `uploads/students/${req.body.id_student}`
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir)
		}
		cb(null, dir)
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		cb(null, 'video' + ext)
	},
})

const upload = multer({ storage })

function uploadVideo(req, res) {
	try {
		upload.single('video')(req, res, err => {
			if (err instanceof multer.MulterError) {
				res.status(400).json({
					message: 'Ошибка загрузки видео',
					type: 'error',
					data: [],
				})
			} else {
				res.status(200).json({
					message: 'Видео успешно загружено',
					type: 'success',
					data: [],
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

function getVideo(req, res) {
	try {
		const id_student = req.params.id_student
		const videoPath = path.join(
			__dirname,
			`../uploads/students/${id_student}/video.webm`
		)

		if (!fs.existsSync(videoPath)) {
			res.status(400).json({
				message: 'Видео не найдено',
				type: 'error',
				data: [],
			})
		} else {
			const stat = fs.statSync(videoPath)
			const fileSize = stat.size
			const range = req.headers.range

			if (range) {
				const parts = range.replace(/bytes=/, '').split('-')
				const start = parseInt(parts[0], 10)
				const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
				const chunkSize = end - start + 1
				const file = fs.createReadStream(videoPath, { start, end })
				const head = {
					'Content-Range': `bytes ${start}-${end}/${fileSize}`,
					'Accept-Ranges': 'bytes',
					'Content-Length': chunkSize,
					'Content-Type': 'video/webm',
				}
				res.writeHead(206, head)
				file.pipe(res)
			} else {
				const head = {
					'Content-Length': fileSize,
					'Content-Type': 'video/webm',
				}
				res.writeHead(200, head)
				fs.createReadStream(videoPath).pipe(res)
			}
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Ошибка в сервер',
			type: 'error',
			data: [],
		})
	}
}

module.exports = { uploadVideo, getVideo }
