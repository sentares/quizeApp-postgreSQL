const db = require('../db/db')

class CheckStudentsController {
	async checkStudent(req, res) {
		try {
			const { id_student } = req.params

			if (!id_student) {
				return res.status(400).json({
					message: 'Не указан id студента',
					status: 'error',
					data: [],
				})
			}

			const { rows } = await db.query(
				'select id_student, name, login, is_done, result from students where id_student = $1',
				[id_student]
			)

			if (rows.length === 0) {
				return res.status(404).json({
					message: 'Студент не найден',
					status: 'error',
					data: [],
				})
			}

			res.status(200).json({
				message: 'Данные получены',
				status: 'success',
				data: rows[0],
			})
		} catch (e) {
			console.log(e)
			res.status(500).json({
				message: 'Ошибка в сервер',
				status: 'error',
				data: [],
			})
		}
	}

	async getAllStudents(req, res) {
		try {
			const { rows } = await db.query(
				`select name, login, id_student, is_done, result from students where is_admin=${false}`
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
				status: 'error',
				data: [],
			})
		}
	}
}

module.exports = new CheckStudentsController()
