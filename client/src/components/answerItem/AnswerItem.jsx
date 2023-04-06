import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { setChoseAnswer } from '../../redux/slices/answerSlice'
import { setOpenEditAnswerModal } from '../../redux/slices/modalSlice'
import EditAnswerModal from '../modal/editAnswerModal.jsx/EditAnswerModal'
import styles from './answerItem.module.css'

const AnswerItem = ({ item, nextQuestion, checkAnswer, isRight, user }) => {
	const [clicked, setClicked] = useState('')
	const dispatch = useDispatch()
	const choseAnswer = useSelector(state => state.answer.choseAnswer)
	const openEditAnswerModal = useSelector(
		state => state.editModal.openEditAnswerModal
	)

	const handleClick = () => {
		dispatch(setChoseAnswer(item.id_answers))
		checkAnswer()
		nextQuestion()
	}

	const handleAdminClick = () => {
		nextQuestion()
	}

	const answerClass = classNames(styles.answer, {
		[styles.answerCorrect]:
			isRight === 'true' && choseAnswer === item.id_answers,
		[styles.answerIncorrect]:
			isRight === 'false' && choseAnswer === item.id_answers,
	})

	const adminAnswerClass = classNames(styles.answer, {
		[styles.answerCorrect]: isRight.id_answers === item.id_answers,
	})

	const handleEditModal = async () => {
		dispatch(setChoseAnswer(item))
		dispatch(setOpenEditAnswerModal(true))
	}

	return (
		<div>
			{openEditAnswerModal && <EditAnswerModal rightAnswer={isRight} />}
			{user.is_admin ? (
				<div className={adminAnswerClass}>
					<div onClick={handleAdminClick}>{item.answers}</div>
					<button className={styles.pen} onClick={handleEditModal}>
						<BiPencil />
					</button>
				</div>
			) : (
				<div className={answerClass} onClick={handleClick}>
					{item.answers}
				</div>
			)}
		</div>
	)
}

export default AnswerItem
