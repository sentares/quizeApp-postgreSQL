import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AnswerItem from '../../components/answerItem/AnswerItem'
import useGetQuestions from '../../hooks/useGetQuestions'
import { useHttp } from '../../hooks/useHttp'
import styles from './test.module.css'

const TestsPage = () => {
	const { request } = useHttp()
	// const [test, setTest] = useState()
	// const [allTests, setAllTests] = useState([])
	// const [id_question, setIdQuestion] = useState(1)
	const [answers, setAnswers] = useState([])
	const [rightAnswer, setRightAnswer] = useState({})
	const [isRight, setIsRight] = useState('')
	const [countRightAnswers, setCountRightAnswers] = useState(0)

	const {
		allTests,
		test,
		id_question,
		getQuestions,
		getSpecialQuestion,
		setIdQuestion,
	} = useGetQuestions()

	const choseAnswer = useSelector(state => state.answer.choseAnswer)

	// const getQuestions = async () => {
	// 	const { data } = await request('/tests')
	// 	setAllTests(data)
	// 	return
	// }

	// const getSpecialQuestion = async () => {
	// 	const { data } = await request(`/tests/special/${id_question}`)
	// 	setTest(data)
	// 	return
	// }

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

	const nextQuestion = () => {
		if (id_question < allTests.length) {
			setIdQuestion(id_question + 1)
		} else {
			setIdQuestion(0)
		}
	}

	const checkAnswer = () => {
		const id_answers = rightAnswer ? rightAnswer.id_answers : null
		if (choseAnswer === id_answers) {
			setIsRight('true')
			setCountRightAnswers(count => count + 1)
		} else {
			setIsRight('false')
		}
	}
	useEffect(() => {
		getQuestions()
	}, [])

	useEffect(() => {
		if (allTests.length > 0) {
			getSpecialQuestion()
			getSpecialAnswer()
			getSpecialRightAnswer()
			checkAnswer()
		}
	}, [id_question, choseAnswer, allTests])

	// const handleRestartTest = () => {
	// 	setCountRightAnswers(0)
	// 	setIdQuestion(1)
	// }

	const percentageOfProgress = (id_question / allTests.length) * 100
	const percentageOfRightAnswer = (countRightAnswers / allTests.length) * 100

	return (
		<div className={styles.testPage}>
			<div className={styles.questionsBlock}>
				{id_question ? (
					<div className={styles.quest}>
						<div
							className={styles.progressBar}
							style={{ width: `${percentageOfProgress}%` }}
						></div>
						<div className={styles.questions}>
							{test && (
								<>
									{test.map(item => (
										<div
											className={styles.question}
											key={item.id_question}
											item={item}
										>
											{item.question}
										</div>
									))}
								</>
							)}
						</div>
						<div className={styles.answersBlock}>
							<div>
								{answers && (
									<>
										{answers.map((item, index) => (
											<AnswerItem
												key={item.id_answers}
												item={item}
												nextQuestion={nextQuestion}
												allTests={allTests}
												checkAnswer={checkAnswer}
												isRight={isRight}
												index={item.id_answers}
											/>
										))}
									</>
								)}
							</div>
						</div>
					</div>
				) : (
					<div className={styles.finish}>
						<div>
							<div className={styles.textForm}>
								Вы прошли тест. Правильных ответов: {percentageOfRightAnswer}%.
							</div>
							{/* <div className={styles.buttonBlock}>
								<button
									className={styles.buttonAgain}
									onClick={handleRestartTest}
								>
									Пройти снова
								</button>
							</div> */}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default TestsPage
