const multer = require('multer')
const path = require('path')
const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const dir = `uploads/students/${req.body.id_student}/screen`
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

function extractFrames(videoPath, outputPath, intervalSeconds) {
	return new Promise((resolve, reject) => {
		const command = ffmpeg(videoPath)
			.on('error', err => reject(err))
			.on('end', () => resolve())
		const date = Date.now()
		const outputFilename = path.join(outputPath, `frame-${date}-%d.jpeg`)

		command
			.output(outputFilename)
			.outputOptions([`-vf fps=1/${intervalSeconds}`])
			.run()
	})
}

function uploadScreen(req, res) {
	try {
		upload.single('video')(req, res, err => {
			if (err instanceof multer.MulterError) {
				res.status(400).json({
					message: 'Ошибка загрузки видео',
					type: 'error',
					data: [],
				})
			} else if (err) {
				console.error(err)
				res.status(500).json({
					message: 'Ошибка в сервер',
					type: 'error',
					data: [],
				})
			} else {
				const videoPath = req.file.path
				const framesPath = path.join(path.dirname(videoPath), 'frames')
				const intervalSeconds = 6.9

				if (!fs.existsSync(framesPath)) {
					fs.mkdirSync(framesPath)
				}

				extractFrames(videoPath, framesPath, intervalSeconds)
					.then(() => {
						res.status(200).json({
							message: 'Видео успешно загружено и обработано',
							type: 'success',
							data: [],
						})
					})
					.catch(err => {
						console.error(`Ошибка извлечения кадров: ${err.message}`)
						res.status(500).json({
							message: 'Ошибка в сервер',
							type: 'error',
							data: [],
						})
					})
			}
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			message: 'Ошибка в сервер',
			type: 'error',
			data: [],
		})
	}
}

function getScreen(req, res) {
	try {
		const id_student = req.params.id_student
		const videoPath = path.join(
			__dirname,
			`../uploads/students/${id_student}/screen/video.webm`
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

function getScreenshots(req, res) {
	try {
		const { id_student } = req.params
		const photosDir = `uploads/students/${id_student}/screen/frames`
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
				url: `/uploads/students/${id_student}/screen/frames/${file}`,
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

module.exports = { uploadScreen, getScreen, getScreenshots }
