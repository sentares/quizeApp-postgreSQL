import html2canvas from 'html2canvas'
import { useState } from 'react'
import { useHttp } from './useHttp'

const usePhoto = id_student => {
	const [img, setImg] = useState()
	const [isScreenshotReady, setIsScreenshotReady] = useState(false)
	const [lastScreenshotTime, setLastScreenshotTime] = useState(null)
	const [allPhotos, setAllPhotos] = useState(null)
	const { request } = useHttp()

	const takeScreenshot = async () => {
		const canvas = await html2canvas(document.body)
		const blob = await new Promise(resolve =>
			canvas.toBlob(resolve, 'image/jpeg')
		)
		const url = URL.createObjectURL(blob)
		await Promise.all([setImg(blob)])
		setIsScreenshotReady(true)
		console.log('screenShot')
	}

	const uploadPhoto = async () => {
		if (!isScreenshotReady || !img) {
			return
		}
		const currentTime = Date.now()
		if (currentTime - lastScreenshotTime < 5000) {
			return
		}
		setLastScreenshotTime(currentTime)
		const formData = new FormData()
		formData.append('id_student', id_student)
		formData.append('photos', img, 'screenshot.jpg')
		try {
			const res = await request('/photo', 'POST', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			console.log(res)
		} catch (e) {
			console.log(e)
		}
		setIsScreenshotReady(false)
	}

	const getPhoto = async () => {
		const { data } = await request(`/photo/${id_student}`)
		setAllPhotos(data)
	}

	return { takeScreenshot, uploadPhoto, isScreenshotReady, getPhoto, allPhotos }
}

export default usePhoto
