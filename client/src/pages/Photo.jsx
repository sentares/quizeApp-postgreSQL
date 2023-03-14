import React, { useState, useEffect } from 'react'
import usePhoto from '../hooks/usePhoto'

const Photo = () => {
	const { takeScreenshot, uploadPhoto } = usePhoto(32)
	const [lastScreenshotTime, setLastScreenshotTime] = useState(Date.now())

	const handleClick = async () => {
		await takeScreenshot()
		setLastScreenshotTime(Date.now())
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			handleClick()
		}, 7000)
		return () => clearInterval(intervalId)
	}, [])

	useEffect(() => {
		if (lastScreenshotTime) {
			uploadPhoto()
		}
	}, [lastScreenshotTime, uploadPhoto])

	return (
		<div>
			<button onClick={handleClick}>Сделать скриншот</button>
		</div>
	)
}

export default Photo
