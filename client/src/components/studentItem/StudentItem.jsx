import React from 'react'
import styles from './student.module.css'

const StudentItem = ({ student }) => {
	return (
		<tr>
			<td>{student.name}</td>
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
