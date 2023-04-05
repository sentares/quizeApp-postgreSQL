import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminPage from './Admin/adminPage/AdminPage'
import CreateQuestion from './Admin/createQusetion/CreateQuestion'
import LoginPage from './Auth/login/LoginPage'
import RegisterPage from './Auth/register/RegisterPage'
import QuestionsPage from './Admin/questionsPage/QuestionsPage'
import SpecialStudent from './Admin/specialStudent/SpecialStudent'
import StudentList from './Admin/studentList/StudentList'
import HomePage from './Student/homePage/HomePage'
import TestsPage from './Student/testsPage/TestsPage'

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
				<Route path='/student/:id_student' element={<SpecialStudent />} />
				<Route path='/questions' element={<QuestionsPage />} />
				<Route path='/questions/create' element={<CreateQuestion />} />
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
