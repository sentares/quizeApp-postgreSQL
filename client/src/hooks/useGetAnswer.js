import { useState } from 'react'
import { useHttp } from './useHttp'

const useGetAnswer = id_question => {
	const { request } = useHttp()
	const [answers, setAnswers] = useState([])
	const [rightAnswer, setRightAnswer] = useState({})

	const getSpecialAnswer = async () => {
		const { data } = await request(`/tests/special/answers/${id_question}`)
		setAnswers(data)
	}

	const getSpecialRightAnswer = async () => {
		const { data } = await request(
			`/tests/special/right_answers/${id_question}`
		)
		setRightAnswer(data)
	}

	return {
		answers,
		setAnswers,
		rightAnswer,
		setRightAnswer,
		getSpecialAnswer,
		getSpecialRightAnswer,
	}
}

export default useGetAnswer
