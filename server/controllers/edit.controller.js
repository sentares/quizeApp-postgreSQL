const multer = require('multer')
const fs = require('fs')
const path = require('path')
const db = require('../db/db')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const dir = `uploads/questions/${req.params.id_question}/images`
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true })
		}
		cb(null, dir)
	},
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname)
		const name = file.originalname.replace(ext, '')
		cb(null, `${name}_${Date.now()}${ext}`)
	},
})
const upload = multer({ storage: storage })

class EditController {
	async editQuestion(req, res) {
		try {
			const { id_question } = req.params
			const { question } = req.body
			await db.query(
				`update questions set question='${question}' where id_question=${id_question}`
			)

			res.status(201).json({
				message: 'Вопрос успешно изменен',
				type: 'success',
				data: [],
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервер',
				type: 'error',
				data: [],
			})
		}
	}

	async editAnswer(req, res) {
		try {
			const { id_answers } = req.params
			const { answer } = req.body
			await db.query(
				`update answers set answers='${answer}' where id_answers=${id_answers}`
			)

			res.status(201).json({
				message: 'Ответ успешно изменен',
				type: 'success',
				data: [],
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервер',
				type: 'error',
				data: [],
			})
		}
	}

	async editRightAnswer(req, res) {
		try {
			const { id_right_answers } = req.body
			const { id_answers } = req.body
			await db.query(
				`update right_answers set id_answers=${id_answers} where id_right_answers=${id_right_answers}`
			)

			res.status(200).json({
				message: 'Запрос успешно выполнен',
				type: 'success',
				data: [],
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервер',
				type: 'error',
				data: [],
			})
		}
	}

	async savePhoto(req, res) {
		try {
			const { id_question } = req.params
			upload.single('photo')(req, res, async err => {
				if (err) {
					return res.status(500).json({
						message: 'Ошибка при загрузке файла',
						type: 'error',
						data: [],
						error: err,
					})
				}
				const filePath = req.file.path
				await db.query(
					'insert into image_questions (filename, id_question, path) values ($1, $2, $3) returning *',
					[req.file.filename, id_question, filePath]
				)

				res.status(201).json({
					message: 'Файл успешно загружен',
					type: 'success',
					data: { filePath },
				})
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервер',
				type: 'error',
				data: [],
			})
		}
	}
}

module.exports = new EditController()
