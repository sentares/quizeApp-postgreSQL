import React from 'react'
import { Link } from 'react-router-dom'
import styles from './gohome.module.css'

const GoHome = () => {
	return (
		<div>
			<Link to='/'>
				<button className={styles.goHome}>На главную</button>
			</Link>
		</div>
	)
}

export default GoHome
