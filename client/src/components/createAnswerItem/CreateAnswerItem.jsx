import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import styles from './createAnswer.module.css'

const CreateAnswerItem = ({ option, onTextChange, onCorrectChange }) => {
	const handleTextChange = event => {
		onTextChange(option.number, event.target.value)
	}

	const handleCorrectChange = () => {
		onCorrectChange(option.number)
	}

	return (
		<div className={styles.answers}>
			<input
				className={styles.answer}
				type='text'
				value={option.text}
				onChange={handleTextChange}
				placeholder={`Ответ ${option.number}`}
				style={option.isCorrect ? { backgroundColor: 'lightgreen' } : {}}
			/>
			<button
				style={option.isCorrect ? { color: 'lightgreen' } : {}}
				type='button'
				className={styles.checkpoint}
				onClick={handleCorrectChange}
			>
				<AiOutlineCheckCircle />
			</button>
		</div>
	)
}

export default CreateAnswerItem
