import { useState } from 'react'
import { useHttp } from './useHttp'

const useGetQuestions = chosedQuestion => {
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

	const getSpecialQuestionForEdit = async () => {
		const { data } = await request(`/tests/special/${chosedQuestion}`)
		setTest(data)
	}

	return {
		allTests,
		test,
		id_question,
		getQuestions,
		setIdQuestion,
		getSpecialQuestion,
		getSpecialQuestionForEdit,
	}
}

export default useGetQuestions
