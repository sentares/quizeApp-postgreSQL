import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AnswerItem from '../../components/answerItem/AnswerItem'
import Finish from '../../components/finish/Finish'
import GoHome from '../../components/goHome/GoHome'
import Modal from '../../components/modal/videoModal/VideoModal'
import useGetAnswer from '../../hooks/useGetAnswer'
import useGetQuestions from '../../hooks/useGetQuestions'
import usePhoto from '../../hooks/usePhoto'
import usePostResult from '../../hooks/usePostResult'
import useVideo from '../../hooks/useVideo'
import styles from './test.module.css'

const TestsPage = () => {
	const [state, setState] = useState({
		isRight: '',
		countRightAnswers: 0,
		loader: false,
		showModal: true,
	})
	const { isRight, countRightAnswers, loader, showModal } = state

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

	const { takeScreenshot, uploadPhoto, isScreenshotReady } = usePhoto(
		user.id_student
	)

	const handleAllow = useCallback(async () => {
		try {
			setState(prevState => ({ ...prevState, loader: true }))
			startRecording()
			setState(prevState => ({ ...prevState, showModal: false }))
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
			})
			setMediaStream(stream)
			videoRef.current.srcObject = stream
		} catch (error) {
			console.log(error)
			toast.warn('Для продолжения необходимо предоставить доступ к камере')
		} finally {
			setState(prevState => ({ ...prevState, loader: false }))
		}
	}, [startRecording, showModal, setMediaStream])

	const handleDeny = useCallback(() => {
		window.location.href = '/'
		toast.warn('Для продолжения необходимо предоставить доступ к камере')
	}, [])

	const nextQuestion = useCallback(() => {
		setIdQuestion(id_question =>
			id_question < allTests.length ? id_question + 1 : 0
		)
	}, [allTests.length, setIdQuestion])

	const id_answers = useMemo(() => rightAnswer?.id_answers, [rightAnswer])

	const checkAnswer = useCallback(() => {
		if (choseAnswer === id_answers) {
			setState(prevState => ({
				...prevState,
				isRight: 'true',
				countRightAnswers: prevState.countRightAnswers + 1,
			}))
		} else {
			setState(prevState => ({ ...prevState, isRight: 'false' }))
		}
	}, [choseAnswer, rightAnswer])

	const handlePostResult = useCallback(async () => {
		await handleUpload()
		await updateStudentsResult()
		await navigate('/')
	}, [handleUpload, updateStudentsResult, navigate])

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

	useEffect(() => {
		const intervalId = setInterval(() => {
			takeScreenshot()
			isScreenshotReady && uploadPhoto()
		}, 5000)
		return () => clearInterval(intervalId)
	}, [takeScreenshot, uploadPhoto])

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
				<GoHome />
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
