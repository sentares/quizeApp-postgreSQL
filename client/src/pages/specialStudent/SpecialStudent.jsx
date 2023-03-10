import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useStudents from '../../hooks/useStudents'
import useVideo from '../../hooks/useVideo'
import styles from './special.module.css'

const SpecialStudent = () => {
	const params = useParams()
	const { id_student } = params

	const { fetchVideo, videoUrl } = useVideo(id_student)
	const { fetchStudentData, studentInfo } = useStudents(id_student)

	useEffect(() => {
		fetchVideo()
		fetchStudentData()
	}, [])

	return (
		<div className={styles.special}>
			<div className={styles.tbl}>
				<table>
					<thead>
						<tr>
							<th>Имя</th>
							<th>Логин</th>
							<th>Результат</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{studentInfo.name}</td>
							<td>{studentInfo.login}</td>
							<td>{studentInfo.result}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div>
				{videoUrl && <video className={styles.video} src={videoUrl} controls />}
			</div>
		</div>
	)
}

export default SpecialStudent
