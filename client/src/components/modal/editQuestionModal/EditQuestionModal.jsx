import React, { useState } from 'react'
import { useHttp } from '../../../hooks/useHttp'
import { MdOutlineClose } from 'react-icons/md'
import styles from './editQuestion.module.css'
import { toast } from 'react-toastify'

const EditQuestionModal = ({
	setOpenEditModal,
	test,
	getSpecialQuestionForEdit,
}) => {
	const [question, setTitle] = useState(test.question)
	const { id_question } = test
	const { request } = useHttp()

	const changeTitle = e => {
		e.preventDefault()
		setTitle(e.target.value)
	}

	const clickCloseModal = e => {
		e.preventDefault()
		setOpenEditModal(false)
	}

	const changeQuestionTitle = async (id_question, question) => {
		const { type, message } = await request(
			`/edit/question/${id_question}`,
			'PUT',
			{ question }
		)
		toast[type](message)

		await getSpecialQuestionForEdit()
		setOpenEditModal(false)
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
							placeholder={question}
							onChange={changeTitle}
							value={question}
						/>
					</div>
					<div className={styles.buttonBlock}>
						<button
							className={styles.save}
							onClick={() => {
								changeQuestionTitle(id_question, question)
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

export default EditQuestionModal
