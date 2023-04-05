import axios from 'axios'
import { useState } from 'react'
// import { toast } from 'react-toastify'
import { useHttp } from './useHttp'

const useScreen = id_student => {
	const [mediaStream, setMediaStream] = useState(null)
	const [mediaRecorder, setMediaRecorder] = useState(null)
	const [chunks, setChunks] = useState([])
	const [screenUrl, setScreenUrl] = useState('')
	const [allPhotos, setAllPhotos] = useState(null)
	const [isDontApplyToShow, setIsDontApplyToShow] = useState(false)
	const [isScreenStart, setIsScreenStart] = useState(false)
	const [isTimeToUpload, setIsTimeToUpload] = useState(false)
	const { request } = useHttp()

	const screenOn = async () => {
		try {
			const stream = await navigator.mediaDevices.getDisplayMedia({
				video: {
					mediaSource: 'screen',
					videoSource: 'screen',
					width: { max: '1920' },
					height: { max: '1080' },
					displaySurface: 'monitor',
					logicalSurface: true,
					resizeMode: 'crop-and-scale',
					selfBrowserSurface: 'exclude',
				},
			})
			const arr = stream.getTracks()
			for (let track of arr) {
				if (!track.label.includes('screen')) {
					track.stop()
					alert('Выберите "Весь экран"')
					setIsDontApplyToShow(true)
					if (!isDontApplyToShow) {
						screenOn()
					}
				}
			}
			setMediaStream(stream)
		} catch (error) {
			console.error(error)
		}
	}

	const screenOff = () => {
		try {
			if (mediaStream) {
				mediaStream.getTracks().forEach(track => track.stop())
				setMediaStream(null)
				console.log('screenOff')
			}
		} catch (e) {
			console.log(e)
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
		setIsScreenStart(true)
		console.log('startScreen')
	}

	const stopScreen = () => {
		if (mediaRecorder) {
			mediaRecorder.stop()
			setMediaRecorder(null)
			setIsScreenStart(false)
			setIsTimeToUpload(true)
			console.log('stopScreen')
		}
	}

	const handleUploadScreen = async () => {
		const formData = new FormData()
		formData.append('id_student', id_student)
		const blob = new Blob(chunks, { type: 'video/webm' })
		formData.append('video', blob, 'video.webm')
		try {
			const { message } = await request('/screen', 'POST', formData)
			setIsTimeToUpload(false)
			setChunks([])
			console.log(message)
			await startScreen()
		} catch (e) {
			console.log(e)
		}
	}

	const takeAndUploadScreenshot = async () => {
		if (isScreenStart) {
			setTimeout(() => {
				stopScreen()
			}, 7000)
		}
		if (isTimeToUpload) {
			handleUploadScreen()
		}
	}

	const fetchScreen = async () => {
		try {
			const response = await axios.get(
				`http://localhost:443/api/screen/${id_student}`,
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
		screenOff,
		takeAndUploadScreenshot,
		isTimeToUpload,
		isScreenStart,
		allPhotos,
		screenUrl,
	}
}

export default useScreen
