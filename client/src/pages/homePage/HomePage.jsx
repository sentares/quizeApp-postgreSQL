import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHttp } from '../../hooks/useHttp'
import useStudents from '../../hooks/useStudents'
import { setIsAuth, setUser } from '../../redux/slices/authSlice'
import styles from './home.module.css'

const HomePage = () => {
	const dispatch = useDispatch()
	const { request } = useHttp()
	const user = useSelector(state => state.auth.user)

	const { id_student } = user

	const logout = async () => {
		await request('/auth/logout')
		dispatch(
			setUser({
				name: '',
				login: '',
				id_student: null,
				is_admin: null,
			})
		)
		dispatch(setIsAuth(false))
	}

	const { fetchStudentData, studentInfo, isLoading } = useStudents(id_student)

	const percentageResult = (studentInfo.result * 10).toFixed(2)

	const handleClick = async () => {
		window.location.href = '/tests'
	}

	React.useEffect(() => {
		fetchStudentData()
	}, [])

	return (
		<>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className={styles.home}>
					{studentInfo.is_done ? (
						<div className={styles.form}>
							<div>
								<div className={styles.result}>
									Ваш прошлый результат: {percentageResult}%
								</div>
								<div className={styles.choseBlock}>
									<div>
										{/* <Link to='/tests'> */}
										<button className={styles.testButton} onClick={handleClick}>
											Перепройти тест
										</button>
										{/* </Link> */}
									</div>
									<div className={styles.form}>
										<button className={styles.exitButton} onClick={logout}>
											Выйти
										</button>
									</div>
								</div>
							</div>
						</div>
					) : (
						<>
							<div>
								{/* <Link to='/tests'> */}
								<button className={styles.testButton} onClick={handleClick}>
									Пройти тест
								</button>
								{/* </Link> */}
							</div>
							<div>
								<button className={styles.exitButton} onClick={logout}>
									Выйти
								</button>
							</div>
						</>
					)}
				</div>
			)}
		</>
	)
}

export default HomePage
