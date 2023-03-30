import React, { useState } from 'react'
import styles from './finish.module.css'

const Finish = ({
	percentageOfRightAnswer,
	handlePostResult,
	user,
	stopRecording,
}) => {
	const [stoped, setStoped] = useState(false)
	const handleStop = async () => {
		stopRecording()
		setStoped(true)
	}

	return (
		<div className={styles.finish}>
			{stoped ? (
				<div>
					<div className={styles.textForm}>
						<div className={styles.userName}>{user.name}</div>
						вы прошли тест. Правильных ответов: {percentageOfRightAnswer}
						%.
					</div>
					<div className={styles.buttonBlock}>
						<button className={styles.buttonAgain} onClick={handlePostResult}>
							Отправить результаты
						</button>
					</div>
				</div>
			) : (
				<div className={styles.buttonBlock}>
					<button className={styles.buttonAgain} onClick={handleStop}>
						завершить тест
					</button>
				</div>
			)}
		</div>
	)
}

export default Finish
