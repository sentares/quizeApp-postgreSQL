import axios from 'axios'
import { useState } from 'react'
import { useHttp } from './useHttp'

const useScreen = id_student => {
	const [mediaStream, setMediaStream] = useState(null)
	const [mediaRecorder, setMediaRecorder] = useState(null)
	const [chunks, setChunks] = useState([])
	const [screenUrl, setScreenUrl] = useState('')
	const [allPhotos, setAllPhotos] = useState(null)
	const { request } = useHttp()

	const screenOn = async () => {
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

	const startScreen = () => {
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

	const stopScreen = () => {
		mediaRecorder.stop()
		setMediaRecorder(null)
		console.log('stop')
	}

	const handleUploadScreen = async () => {
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

	const fetchScreen = async () => {
		try {
			const response = await axios.get(
				`http://localhost:4000/api/screen/${id_student}`,
				{
					responseType: 'blob',
				}
			)
			setScreenUrl(URL.createObjectURL(response.data))
		} catch (e) {
			console.log(e)
		}
	}

	const getScreenshots = async () => {
		const { data } = await request(`/screen/screenshots/${id_student}`)
		console.log(data)
		setAllPhotos(data)
	}

	return {
		startScreen,
		stopScreen,
		handleUploadScreen,
		setMediaStream,
		fetchScreen,
		screenOn,
		getScreenshots,
		allPhotos,
		screenUrl,
	}
}

export default useScreen
