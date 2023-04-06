import React, { useEffect } from 'react'
import GoHome from '../../../components/goHome/GoHome'
import QuestionItem from '../../../components/questionItem/QuestionItem'
import useGetQuestions from '../../../hooks/useGetQuestions'
import styles from './questions.module.css'

const QuestionsPage = () => {
	const { getQuestions, allTests } = useGetQuestions()

	useEffect(() => {
		getQuestions()
	}, [])

	return (
		<div className={styles.QuestionsPage}>
			<GoHome />
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
