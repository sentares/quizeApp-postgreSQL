import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AnswerItem from '../../components/answerItem/AnswerItem'
import useGetAnswer from '../../hooks/useGetAnswer'
import useGetQuestions from '../../hooks/useGetQuestions'
import styles from './test.module.css'
import { Link } from 'react-router-dom'

const TestsPage = () => {
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

	const { answers, rightAnswer, getSpecialAnswer, getSpecialRightAnswer } =
		useGetAnswer(id_question)

	const choseAnswer = useSelector(state => state.answer.choseAnswer)

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

	const handleRestartTest = () => {
		setCountRightAnswers(0)
		setIdQuestion(1)
	}

	const percentageOfProgress = (id_question / allTests.length) * 100
	const percentageOfRightAnswer = (countRightAnswers / allTests.length) * 100

	return (
		<div className={styles.testPage}>
			<div>
				<Link to='/'>
					<button className={styles.goHome}>На главную</button>
				</Link>
			</div>
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
							<div className={styles.buttonBlock}>
								<button
									className={styles.buttonAgain}
									onClick={handleRestartTest}
								>
									Пройти снова
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default TestsPage
