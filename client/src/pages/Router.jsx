import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminPage from './adminPage/AdminPage'
import HomePage from './homePage/HomePage'
import LoginPage from './login/LoginPage'
import RegisterPage from './register/RegisterPage'
import StudentList from './studentList/StudentList'
import TestsPage from './testsPage/TestsPage'

const Router = () => {
	const isAuth = useSelector(state => state.auth.isAuth)
	const user = useSelector(state => state.auth.user)
	const { is_admin } = user

	if (isAuth && is_admin) {
		return (
			<Routes>
				<Route path='/login' element={<Navigate replace to='/' />} />
				<Route path='/register' element={<Navigate replace to='/' />} />
				<Route path='/' element={<Navigate replace to='/admin' />} />
				<Route path='/admin' element={<AdminPage />} />
				<Route path='/check' element={<StudentList />} />
			</Routes>
		)
	} else if (isAuth) {
		return (
			<Routes>
				<Route path='/login' element={<Navigate replace to='/' />} />
				<Route path='/register' element={<Navigate replace to='/' />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/tests' element={<TestsPage />} />
			</Routes>
		)
	} else {
		return (
			<Routes>
				<Route path='/' element={<Navigate replace to='/login' />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
			</Routes>
		)
	}
}

export default Router
