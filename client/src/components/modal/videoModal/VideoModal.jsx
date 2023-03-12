import React from 'react'
import styles from './modal.module.css'

const Modal = ({ onClose, onAllow }) => {
	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>
				<h2>Разрешить съемку видео?</h2>
				<p>Для продолжения теста необходимо разрешить съемку видео.</p>
				<div className={styles.modalButtons}>
					<button className={styles.modalButton} onClick={onAllow}>
						Разрешить
					</button>
					<button className={styles.modalButton} onClick={onClose}>
						Отмена
					</button>
				</div>
			</div>
		</div>
	)
}

export default Modal
