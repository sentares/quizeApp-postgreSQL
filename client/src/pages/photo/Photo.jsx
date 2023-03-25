import { useState, useEffect, useRef } from 'react'
import { useHttp } from '../../hooks/useHttp'

const Video = () => {
	const [mediaStream, setMediaStream] = useState(null)
	const [mediaRecorder, setMediaRecorder] = useState(null)
	const [chunks, setChunks] = useState([])
	const { request } = useHttp()

	const id_student = 3

	const streamOn = async () => {
		try {
			const stream = await navigator.mediaDevices.getDisplayMedia({
				video: {
					mediaSource: 'screen',
					width: { ideal: 1280 },
					height: { ideal: 720 },
				},
			})
			setMediaStream(stream)
		} catch (error) {
			console.error(error)
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
			const { message } = await request('/screen', 'POST', formData)
			console.log(message)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div>
			<button onClick={streamOn}>Start Stream</button>
			<button onClick={startRecording}>Start Recording</button>
			<button onClick={stopRecording}>Stop Recording</button>
			<button onClick={handleUpload}>Upload</button>
		</div>
	)
}

export default Video
