import React, { useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useHttp } from '../../../hooks/useHttp'
import { setOpenEditAnswerModal } from '../../../redux/slices/modalSlice'
import styles from './editAnswer.module.css'

const EditAnswerModal = ({ rightAnswer }) => {
	const choseAnswer = useSelector(state => state.answer.choseAnswer)
	const [answer, setTitle] = useState(choseAnswer.answers)
	const [originalAnswer] = useState(choseAnswer.answers)
	const { id_right_answers } = rightAnswer

	const isAnswerChanged = answer !== originalAnswer

	const dispatch = useDispatch()
	const { id_answers } = choseAnswer
	const { request } = useHttp()

	const changeTitle = e => {
		e.preventDefault()
		setTitle(e.target.value)
	}

	const clickCloseModal = e => {
		e.preventDefault()
		dispatch(setOpenEditAnswerModal(false))
	}

	const changeQuestionTitle = async (id_answers, answer) => {
		const { type, message } = await request(
			`/edit/answer/${id_answers}`,
			'PUT',
			{ answer }
		)
		toast[type](message)
		dispatch(setOpenEditAnswerModal(false))
	}

	const updateToRight = async () => {
		try {
			const { type, message } = await request(`edit/answer`, 'PUT', {
				id_answers,
				id_right_answers,
			})
			toast[type](message)
			dispatch(setOpenEditAnswerModal(false))
			window.location.reload()
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className={styles.modal}>
			<div className={styles.content}>
				<div className={styles.close}>
					<button className={styles.closeIcon} onClick={clickCloseModal}>
						<MdOutlineClose />
					</button>
				</div>
				<div className={styles.text}>
					<div className={styles.inputBlock}>
						<input
							className={styles.input}
							type='text'
							placeholder={answer}
							onChange={changeTitle}
							value={answer}
						/>
					</div>
					<div className={styles.buttonBlock}>
						{rightAnswer.id_answers !== choseAnswer.id_answers && (
							<button className={styles.rightAnswer} onClick={updateToRight}>
								Сделать правильным ответом
							</button>
						)}
						<button
							className={isAnswerChanged ? styles.save : styles.unsave}
							disabled={!isAnswerChanged}
							onClick={() => {
								changeQuestionTitle(id_answers, answer)
							}}
						>
							Сохранить
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditAnswerModal
