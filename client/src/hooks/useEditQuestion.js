import { toast } from 'react-toastify'
import { useHttp } from './useHttp'

const useEditQuestion = (
	question,
	id_question,
	selectedImage,
	image_question
) => {
	const { request } = useHttp()

	const changeQuestionTitle = async () => {
		const { type, message } = await request(
			`/edit/question/${id_question}`,
			'PUT',
			{ question }
		)
		toast[type](message)
	}

	const handleSavePhoto = async () => {
		const headers = {
			'Content-Type': 'multipart/form-data',
			'Access-Control-Allow-Origin': '*',
		}
		const formData = new FormData()
		formData.append('photo', selectedImage)
		try {
			const response = await request(
				`/edit/imageQuestions/${id_question}`,
				'POST',
				formData,
				headers
			)
			console.log(response)
		} catch (error) {
			console.error(error)
		}
	}

	const deleteQuestionImage = async () => {
		const { id_image } = image_question
		try {
			const { type, message } = await request(
				`/edit/imageQuestions/delete/${id_image}`,
				'DELETE',
				{ id_image }
			)
			toast[type](message)
		} catch (e) {
			console.log(e)
		}
	}

	return { changeQuestionTitle, handleSavePhoto, deleteQuestionImage }
}

export default useEditQuestion
