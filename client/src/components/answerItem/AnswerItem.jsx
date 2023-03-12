import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChoseAnswer } from '../../redux/slices/answerSlice'
import classNames from 'classnames'
import styles from './answerItem.module.css'

const AnswerItem = ({ item, nextQuestion, checkAnswer, isRight }) => {
	const dispatch = useDispatch()
	const choseAnswer = useSelector(state => state.answer.choseAnswer)

	const handleClick = () => {
		dispatch(setChoseAnswer(item.id_answers))
		checkAnswer()
		nextQuestion()
	}

	const answerClass = classNames(styles.answer, {
		[styles.answerCorrect]:
			isRight === 'true' && choseAnswer === item.id_answers,
		[styles.answerIncorrect]:
			isRight === 'false' && choseAnswer === item.id_answers,
	})

	return (
		<div>
			<div className={answerClass} onClick={handleClick}>
				{item.answers}
			</div>
		</div>
	)
}

export default AnswerItem
