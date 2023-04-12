import React, { useState } from 'react'
import { BsImage } from 'react-icons/bs'
import { MdOutlineClose } from 'react-icons/md'
import { toast } from 'react-toastify'
import useEditQuestion from '../../../hooks/useEditQuestion'
import styles from './editQuestion.module.css'

const EditQuestionModal = ({
	setOpenEditModal,
	test,
	getSpecialQuestionForEdit,
	image_question,
}) => {
	const [question, setTitle] = useState(test.question)
	const [originalQuestion] = useState(test.question)
	const [selectedImage, setSelectedImage] = useState(null)
	const [imageQuestionURL, setImageQuestionUrl] = useState(image_question?.path)
	const [image, setImage] = useState('')
	const isQuestionChanged = question !== originalQuestion
	const { id_question } = test

	const changeTitle = e => {
		e.preventDefault()
		setTitle(e.target.value)
	}
	const clickCloseModal = e => {
		e.preventDefault()
		setOpenEditModal(false)
	}
	const handleCloseImage = () => {
		setSelectedImage(null)
	}

	const handleFileChange = e => {
		setSelectedImage(e.target.files[0])
		const file = e.target.files[0]
		const imageUrl = URL.createObjectURL(file)
		setImage(imageUrl)
	}

	const { changeQuestionTitle, handleSavePhoto, deleteQuestionImage } =
		useEditQuestion(question, id_question, selectedImage, image_question)

	const handleSaveEdits = async () => {
		try {
			if (isQuestionChanged && selectedImage) {
				await changeQuestionTitle()
				await handleSavePhoto()
			} else if (isQuestionChanged) {
				await changeQuestionTitle()
			} else if (selectedImage) {
				await handleSavePhoto()
			}
			setOpenEditModal(false)
			getSpecialQuestionForEdit()
		} catch (e) {
			toast.error('Ошибка сохранения изменений')
			console.log(e)
		}
	}

	const handleDeleteQuestionImage = async () => {
		await deleteQuestionImage()
		setImageQuestionUrl(null)
		await getSpecialQuestionForEdit()
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
						{imageQuestionURL ? (
							<div className={styles.imageBlock}>
								<img
									className={styles.selectedImage}
									src={`http://localhost:443/${imageQuestionURL}`}
									alt='photo'
								/>
								<button
									className={styles.closeImage}
									onClick={handleDeleteQuestionImage}
								>
									<MdOutlineClose />
								</button>
							</div>
						) : (
							<>
								<input
									className={styles.fileInput}
									type='file'
									onChange={handleFileChange}
								/>
								{selectedImage ? (
									<div className={styles.imageBlock}>
										<img
											src={image}
											alt='Selected image'
											className={styles.selectedImage}
										/>
										<button
											className={styles.closeImage}
											onClick={handleCloseImage}
										>
											<MdOutlineClose />
										</button>
									</div>
								) : (
									<button
										className={styles.galleryButton}
										onClick={() => {
											document.querySelector(`.${styles.fileInput}`).click()
										}}
									>
										<BsImage />
									</button>
								)}
							</>
						)}

						<button
							className={
								isQuestionChanged || selectedImage ? styles.save : styles.unsave
							}
							// disabled={!isQuestionChanged || !selectedImage}
							onClick={handleSaveEdits}
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
