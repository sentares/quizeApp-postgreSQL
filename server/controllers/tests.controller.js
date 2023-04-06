const db = require('../db/db')

class TestsController {
	async getPost(req, res) {
		try {
			const { rows } = await db.query(
				'select * from questions order by id_question asc'
			)

			res.status(200).json({
				message: 'Данные успешно получены',
				type: 'success',
				data: rows,
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

	async getSpecialPost(req, res) {
		try {
			const { id_question } = req.params

			if (!id_question) {
				return res.status(400).json({
					message: 'Не указан id поста',
					type: 'error',
					data: [],
				})
			}

			const { rows } = await db.query(
				'select * from questions where id_question=$1',
				[id_question]
			)

			res.status(200).json({
				message: 'Данные успешно получены',
				type: 'success',
				data: rows[0],
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

	async getSpecialAnswers(req, res) {
		try {
			const { id_question } = req.params

			if (!id_question) {
				return res.status(400).json({
					message: 'Не указан id поста',
					type: 'error',
					data: [],
				})
			}

			const { rows } = await db.query(
				'select * from answers where id_question = $1 order by id_answers asc',
				[id_question]
			)

			res.status(200).json({
				message: 'Данные успешно получены',
				type: 'success',
				data: rows,
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

	async getRightAnswer(req, res) {
		try {
			const { id_question } = req.params

			if (!id_question) {
				return res.status(400).json({
					message: 'Не указан id поста',
					type: 'error',
					data: [],
				})
			}

			const { rows } = await db.query(
				'select * from right_answers where id_question = $1',
				[id_question]
			)

			res.status(200).json({
				message: 'Данные успешно получены',
				type: 'success',
				data: rows[0],
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

module.exports = new TestsController()
