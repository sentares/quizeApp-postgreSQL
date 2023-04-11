import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GoHome from '../../../components/goHome/GoHome'
import QuestionItem from '../../../components/questionItem/QuestionItem'
import useGetQuestions from '../../../hooks/useGetQuestions'
import styles from './questions.module.css'

const QuestionsPage = () => {
	const [openNewQuestModal, setOpenNewQuestionModal] = useState(false)
	const { getQuestions, allTests } = useGetQuestions()
	const navigate = useNavigate()

	const createNewQuestion = () => {
		navigate('/create')
	}

	useEffect(() => {
		getQuestions()
	}, [])

	return (
		<div className={styles.QuestionsPage}>
			<GoHome />
			<div className={styles.newQuest}>
				<button className={styles.createNew} onClick={createNewQuestion}>
					Новый вопрос
				</button>
			</div>
			<div className={styles.list}>Список вопросов</div>
			<table className={styles.studentTable}>
				<thead>
					<tr>
						<th className={styles.nameColumn}>Номер</th>
						<th className={styles.loginColumn}>Вопрос</th>
					</tr>
				</thead>
				<tbody>
					{allTests &&
						allTests.map(question => (
							<QuestionItem key={question.id_question} question={question} />
						))}
				</tbody>
			</table>
		</div>
	)
}

export default QuestionsPage
