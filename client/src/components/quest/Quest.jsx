import React from 'react'
import AnswerItem from '../answerItem/AnswerItem'
import styles from './quest.module.css'

const Quest = ({
	percentageOfProgress,
	test,
	answers,
	nextQuestion,
	allTests,
	checkAnswer,
	isRight,
}) => {
	return (
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
	)
}

export default Quest
