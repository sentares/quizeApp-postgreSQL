import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './homePage/HomePage'
import LoginPage from './login/LoginPage'
import RegisterPage from './register/RegisterPage'
import TestsPage from './testsPage/TestsPage'

const Router = () => {
	const isAuth = useSelector(state => state.auth.isAuth)

	if (isAuth) {
		return (
			<Routes>
				<Route path='/login' element={<Navigate replace to='/' />} />
				<Route path='/register' element={<Navigate replace to='/' />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/tests' element={<TestsPage />} />
			</Routes>
		)
	}
	return (
		<Routes>
			<Route path='/' element={<Navigate replace to='/login' />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />
		</Routes>
	)
}

export default Router
