import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHttp } from '../../hooks/useHttp'
import { setIsAuth, setUser } from '../../redux/slices/authSlice'
import styles from './home.module.css'

const HomePage = () => {
	const dispath = useDispatch()
	const { request } = useHttp()

	const logout = async () => {
		await request('/auth/logout')
		dispath(
			setUser({
				name: '',
				login: '',
				id_student: null,
			})
		)
		dispath(setIsAuth(false))
	}
	return (
		<div className={styles.home}>
			<div>
				<Link to='/tests'>
					<button className={styles.testButton}>Пройти тест</button>
				</Link>
			</div>
			<div>
				<button className={styles.exitButton} onClick={logout}>
					Выйти
				</button>
			</div>
		</div>
	)
}

export default HomePage
