import axios from 'axios'
import { useState } from 'react'
import { useHttp } from './useHttp'

const useVideo = id_student => {
	const [mediaStream, setMediaStream] = useState(null)
	const [mediaRecorder, setMediaRecorder] = useState(null)
	const [chunks, setChunks] = useState([])
	const { request } = useHttp()

	const startRecording = () => {
		const recorder = new MediaRecorder(mediaStream, {
			mimeType: 'video/webm',
		})
		recorder.ondataavailable = event => {
			if (event.data && event.data.size > 0) {
				setChunks(chunks => [...chunks, event.data])
			}
		}
		recorder.start()
		setMediaRecorder(recorder)
		console.log('start')
	}

	const stopRecording = () => {
		mediaRecorder.stop()
		setMediaRecorder(null)
		console.log('stop')
	}

	const handleUpload = async () => {
		const formData = new FormData()
		formData.append('id_student', id_student)
		const blob = new Blob(chunks, { type: 'video/webm' })
		formData.append('video', blob, 'video.webm')
		try {
			const res = await request('/video', 'POST', formData)
			console.log(res)
		} catch (e) {
			console.log(e)
		}
	}

	return {
		startRecording,
		stopRecording,
		handleUpload,
		setMediaStream,
	}
}

export default useVideo
