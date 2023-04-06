import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AnswerItem from '../../../components/answerItem/AnswerItem'
import useGetAnswer from '../../../hooks/useGetAnswer'
import useGetQuestions from '../../../hooks/useGetQuestions'
import { BiPencil } from 'react-icons/bi'
import styles from './specialQuestion.module.css'
import EditQuestionModal from '../../../components/modal/editQuestionModal/EditQuestionModal'

const SpecialQuestion = () => {
	const [openQuestionModal, setOpenEditModal] = useState(false)
	const openEditAnswerModal = useSelector(
		state => state.editModal.openEditAnswerModal
	)
	const params = useParams()
	const { id_question } = params
	const user = useSelector(state => state.auth.user)
	const chosedQuestion = id_question

	const { getSpecialAnswer, getSpecialRightAnswer, answers, rightAnswer } =
		useGetAnswer(id_question)

	const { getSpecialQuestionForEdit, test } = useGetQuestions(chosedQuestion)

	// const id_rightAnswer = useMemo(() => rightAnswer?.id_answers, [rightAnswer])

	useEffect(() => {
		getSpecialQuestionForEdit()
		getSpecialAnswer()
		getSpecialRightAnswer()
	}, [])

	const nextQuestion = () => {
		console.log('adminClick')
	}
	const checkAnswer = () => {}

	const handleModal = () => {
		setOpenEditModal(true)
	}

	useEffect(() => {
		getSpecialAnswer()
	}, [openEditAnswerModal])

	return (
		<div className={styles.SpecialQuestion}>
			{test ? (
				<div>
					{openQuestionModal && (
						<EditQuestionModal
							getSpecialQuestionForEdit={getSpecialQuestionForEdit}
							setOpenEditModal={setOpenEditModal}
							test={test}
						/>
					)}
					<div className={styles.questionBlock}>
						<div className={styles.question}>{test.question}</div>
						<button onClick={handleModal} className={styles.pen}>
							<BiPencil />
						</button>
					</div>
					<div>
						{answers && (
							<>
								{answers.map((item, index) => (
									<AnswerItem
										key={item.id_answers}
										item={item}
										nextQuestion={nextQuestion}
										checkAnswer={checkAnswer}
										isRight={rightAnswer}
										index={item.id_answers}
										user={user}
									/>
								))}
							</>
						)}
					</div>
				</div>
			) : (
				<div>Loading</div>
			)}
		</div>
	)
}

export default SpecialQuestion
