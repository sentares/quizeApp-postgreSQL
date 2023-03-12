import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AnswerItem from '../../components/answerItem/AnswerItem'
import Finish from '../../components/finish/Finish'
import Modal from '../../components/modal/videoModal/VideoModal'
import useGetAnswer from '../../hooks/useGetAnswer'
import useGetQuestions from '../../hooks/useGetQuestions'
import usePostResult from '../../hooks/usePostResult'
import useVideo from '../../hooks/useVideo'
import styles from './test.module.css'

const TestsPage = () => {
	const [isRight, setIsRight] = useState('')
	const [countRightAnswers, setCountRightAnswers] = useState(0)
	const [loader, setLoader] = useState(false)
	const [showModal, setShowModal] = useState(true)
	const videoRef = useRef(null)
	const navigate = useNavigate()
	const user = useSelector(state => state.auth.user)
	const choseAnswer = useSelector(state => state.answer.choseAnswer)

	const {
		allTests,
		test,
		id_question,
		getQuestions,
		getSpecialQuestion,
		setIdQuestion,
	} = useGetQuestions()

	const { answers, rightAnswer, getSpecialAnswer, getSpecialRightAnswer } =
		useGetAnswer(id_question)

	const { updateStudentsResult } = usePostResult(countRightAnswers, user)

	const { startRecording, stopRecording, handleUpload, setMediaStream } =
		useVideo(user.id_student)

	const handleAllow = async () => {
		try {
			startRecording()
			setShowModal(false)
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
			})
		} catch (error) {
			window.location.href = '/'
			console.log(error)
			toast.warn('Для продолжения необходимо предоставить доступ к камере')
		}
	}

	const handleDeny = () => {
		window.location.href = '/'
		toast.warn('Для продолжения необходимо предоставить доступ к камере')
	}

	const nextQuestion = () => {
		if (id_question < allTests.length) {
			setIdQuestion(id_question + 1)
		} else {
			setIdQuestion(0)
		}
	}

	const checkAnswer = () => {
		const id_answers = rightAnswer ? rightAnswer.id_answers : null
		if (choseAnswer === id_answers) {
			setIsRight('true')
			setCountRightAnswers(count => count + 1)
		} else {
			setIsRight('false')
		}
	}

	useEffect(() => {
		getQuestions()
		const constraints = { video: true }
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(stream => {
				setMediaStream(stream)
				videoRef.current.srcObject = stream
			})
			.catch(error => console.error(error))
	}, [])

	useEffect(() => {
		if (allTests.length > 0) {
			getSpecialQuestion()
			getSpecialAnswer()
			getSpecialRightAnswer()
			checkAnswer()
		}
	}, [id_question, choseAnswer, allTests])

	const handlePostResult = async () => {
		await handleUpload()
		await updateStudentsResult()
		await navigate('/')
	}

	const percentageOfProgress = (id_question / allTests.length) * 100
	const percentageOfRightAnswer = (
		(countRightAnswers / allTests.length) *
		100
	).toFixed(2)

	return (
		<>
			{showModal && (
				<Modal
					title='Разрешить доступ к камере?'
					description='Для прохождения теста необходимо разрешить доступ к камере.'
					onClose={handleDeny}
					onAllow={handleAllow}
				/>
			)}
			<video
				className={styles.video}
				ref={videoRef}
				width={260}
				height={200}
				autoPlay
			/>

			<div className={styles.testPage}>
				<div>
					<Link to='/'>
						<button className={styles.goHome}>На главную</button>
					</Link>
				</div>
				<div className={styles.questionsBlock}>
					{id_question ? (
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
					) : (
						<Finish
							user={user}
							handlePostResult={handlePostResult}
							percentageOfRightAnswer={percentageOfRightAnswer}
							stopRecording={stopRecording}
							handleUpload={handleUpload}
						/>
					)}
				</div>
			</div>
		</>
	)
}

export default TestsPage
