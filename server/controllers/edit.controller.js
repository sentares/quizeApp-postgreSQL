const db = require('../db/db')

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
}

module.exports = new EditController()
