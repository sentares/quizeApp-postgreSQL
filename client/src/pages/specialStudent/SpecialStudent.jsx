import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/useHttp'
import useStudents from '../../hooks/useStudents'

const SpecialStudent = () => {
	const { request } = useHttp()
	const params = useParams()
	const { id_student } = params

	const [videoSrc, setVideoSrc] = useState('')

	const { fetchStudentData, studentInfo } = useStudents(id_student)

	async function getVideo() {
		try {
			const res = await fetch(
				`http://localhost:4000/api/video/get/${id_student}`
			)
			if (res.ok) {
				const blob = await res.blob()
				const videoUrl = URL.createObjectURL(blob)
				setVideoSrc(videoUrl)
				console.log(res)
			} else {
				console.error(`Ошибка загрузки видео: ${res.status}`)
			}
		} catch (err) {
			console.error(`Ошибка загрузки видео: ${err.message}`)
		}
	}

	console.log(videoSrc)
	useEffect(() => {
		fetchStudentData()
	}, [])

	return (
		<div>
			<button onClick={getVideo}>Загрузить видео</button>
			<video src={videoSrc} controls />
		</div>
	)
}

export default SpecialStudent
