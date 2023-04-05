import axios from 'axios'
import { useState } from 'react'
import { useHttp } from './useHttp'

const useVideo = id_student => {
	const [mediaStream, setMediaStream] = useState(null)
	const [mediaRecorder, setMediaRecorder] = useState(null)
	const [chunks, setChunks] = useState([])
	const [videoUrl, setVideoUrl] = useState('')
	const { request } = useHttp()

	const streamOn = async () => {
		try {
			const constraints = { video: true }
			const stream = await navigator.mediaDevices.getUserMedia(constraints)
			setMediaStream(stream)
		} catch (error) {
			console.error(error)
		}
	}

	const streamOff = async () => {
		try {
			if (mediaStream) {
				mediaStream.getTracks().forEach(track => track.stop())
				setMediaStream(null)
				console.log('streamOff')
			}
		} catch (e) {
			console.log(e)
		}
	}

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
			const { message } = await request('/video', 'POST', formData)
			console.log(message)
		} catch (e) {
			console.log(e)
		}
	}

	const fetchVideo = async () => {
		try {
			const response = await axios.get(
				`http://localhost:443/api/video/${id_student}`,
				{
					responseType: 'blob',
				}
			)
			setVideoUrl(URL.createObjectURL(response.data))
		} catch (e) {
			console.log(e)
		}
	}

	return {
		startRecording,
		stopRecording,
		handleUpload,
		setMediaStream,
		fetchVideo,
		streamOn,
		streamOff,
		videoUrl,
	}
}

export default useVideo
