import { useState } from 'react'
import { useHttp } from './useHttp'

const useGetQuestions = () => {
	const { request } = useHttp()
	const [allTests, setAllTests] = useState([])
	const [test, setTest] = useState()
	const [id_question, setIdQuestion] = useState(1)

	const getQuestions = async () => {
		const { data } = await request('/tests')
		setAllTests(data)
	}

	const getSpecialQuestion = async () => {
		const { data } = await request(`/tests/special/${id_question}`)
		setTest(data)
	}

	return {
		allTests,
		test,
		id_question,
		getQuestions,
		setIdQuestion,
		getSpecialQuestion,
	}
}

export default useGetQuestions
