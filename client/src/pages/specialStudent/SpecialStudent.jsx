import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useStudents from '../../hooks/useStudents'
import useVideo from '../../hooks/useVideo'
import useScreen from '../../hooks/useScreen'
import styles from './special.module.css'

const SpecialStudent = () => {
	const params = useParams()
	const { id_student } = params

	const { fetchVideo, videoUrl } = useVideo(id_student)
	const { fetchScreen, screenUrl } = useScreen(id_student)
	const { fetchStudentData, studentInfo } = useStudents(id_student)

	useEffect(() => {
		fetchVideo()
		fetchScreen()
		fetchStudentData()
	}, [])

	return (
		<>
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
					{videoUrl && (
						<video className={styles.video} src={videoUrl} controls />
					)}
					{screenUrl && (
						<video className={styles.video} src={screenUrl} controls />
					)}
				</div>
			</div>
			<div>
				{/* <h3>Запись экрана студента</h3> */}

				{/* {allPhotos && (
					<ul>
						{allPhotos.map(photo => {
							const timestamp = parseInt(photo.name.match(/-(\d+)\./)[1])
							const date = new Date(timestamp)

							return (
								<li key={photo.name} onClick={() => handlePhotoClick(photo)}>
									<div>
										<img
											className={styles.photo}
											src={`http://localhost:4000/uploads/${id_student}/photo/${photo.name}`}
											alt={photo.name}
										/>
									</div>
									<div className={styles.time}>
										<div>{date.toLocaleDateString()}</div>
										<div>{date.toLocaleTimeString()}</div>
									</div>
								</li>
							)
						})}
						{fullscreenPhoto && (
							<div
								className={styles.fullscreen}
								onClick={handleCloseFullscreen}
							>
								<img
									src={`http://localhost:4000/uploads/${id_student}/photo/${fullscreenPhoto.name}`}
									alt={fullscreenPhoto.name}
								/>
							</div>
						)}
					</ul>
				)} */}
			</div>
		</>
	)
}

export default SpecialStudent
