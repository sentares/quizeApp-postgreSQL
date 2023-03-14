import React from 'react'
import { Link } from 'react-router-dom'
import styles from './student.module.css'

const StudentItem = ({ student }) => {
	return (
		<tr>
			<td>
				<Link
					to={`/student/${student.id_student}`}
					style={{ textDecoration: 'none' }}
				>
					{student.name}
				</Link>
			</td>
			<td>{student.login}</td>
			{student.is_done ? (
				<td className={styles.yes}>да</td>
			) : (
				<td className={styles.not}>нет</td>
			)}
			<td>{student.result}</td>
		</tr>
	)
}

export default StudentItem
