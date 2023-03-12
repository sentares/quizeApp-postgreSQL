import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import StudentItem from '../../components/studentItem/StudentItem'
import useStudents from '../../hooks/useStudents'
import styles from './student.module.css'

const StudentList = () => {
	const { getAllStudetns, allStudents } = useStudents()

	useEffect(() => {
		getAllStudetns()
	}, [])

	return (
		<div className={styles.studentList}>
			<div>
				<Link to='/'>
					<button className={styles.goHome}>На главную</button>
				</Link>
			</div>
			<div className={styles.list}>Список студентов</div>
			<table className={styles.studentTable}>
				<thead>
					<tr>
						<th className={styles.nameColumn}>Имя</th>
						<th className={styles.loginColumn}>Логин</th>
						<th className={styles.isDoneColumn}>Сдал</th>
						<th className={styles.resultColumn}>Ответы</th>
					</tr>
				</thead>
				<tbody>
					{allStudents &&
						allStudents.map(student => (
							<StudentItem key={student.id_student} student={student} />
						))}
				</tbody>
			</table>
		</div>
	)
}

export default StudentList
