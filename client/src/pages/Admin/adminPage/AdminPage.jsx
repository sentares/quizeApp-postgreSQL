import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useHttp } from '../../../hooks/useHttp'
import { setIsAuth, setUser } from '../../../redux/slices/authSlice'
import styles from './admin.module.css'

const AdminPage = () => {
	const dispatch = useDispatch()
	const { request } = useHttp()
	// const [studentInfo, setStudentInfo] = useState([])
	const user = useSelector(state => state.auth.user)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

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
		navigate('/')
	}

	// const fetchStudentData = async () => {
	// 	setIsLoading(true)
	// 	try {
	// 		const { data } = await request(`/checkStudent/${id_student}`)
	// 		setStudentInfo(data)
	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// 	setIsLoading(false)
	// }

	// useEffect(() => {
	// 	fetchStudentData()
	// }, [setIsLoading])

	return (
		<>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className={styles.home}>
					<div>
						<div className={styles.adminName}>{user.name}</div>
						<div className={styles.choseBlock}>
							<div>
								<Link to='/check'>
									<button className={styles.testButton}>
										Список студентов
									</button>
								</Link>
							</div>
							<div>
								<Link to='/questions'>
									<button className={styles.testButton}>Список вопросов</button>
								</Link>
							</div>
							<div>
								<button className={styles.exitButton} onClick={logout}>
									Выйти
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default AdminPage
