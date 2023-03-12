const db = require('../db/db')

class ResultController {
	async updateStudent(req, res) {
		try {
			const { id_student, is_done, result } = req.body
			await db.query(
				`update students set is_done=${true}, result=${result} where id_student=${id_student}`
			)

			res.status(201).json({
				message: 'Результаты успешно отправлены',
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

module.exports = new ResultController()
