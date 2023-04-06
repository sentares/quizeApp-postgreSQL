import React from 'react'
import { Link } from 'react-router-dom'

const QuestionItem = ({ question }) => {
	return (
		<tr>
			<td>{question.id_question}</td>
			<td>
				<Link
					to={`/question/${question.id_question}`}
					style={{ textDecoration: 'none' }}
				>
					{question.question}
				</Link>
			</td>
		</tr>
	)
}

export default QuestionItem
