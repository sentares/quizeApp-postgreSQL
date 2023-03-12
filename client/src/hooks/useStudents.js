import { useState } from 'react'
import { useHttp } from './useHttp'

const useStudents = id_student => {
	const { request } = useHttp()
	const [allStudents, setAllStudents] = useState([])
	const [studentInfo, setStudentInfo] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const getAllStudetns = async () => {
		const { data } = await request('/checkStudent')
		setAllStudents(data)
	}

	const fetchStudentData = async () => {
		setIsLoading(true)
		try {
			const { data } = await request(`/checkStudent/${id_student}`)
			setStudentInfo(data)
		} catch (error) {
			console.error(error)
		}
		setIsLoading(false)
	}

	return {
		getAllStudetns,
		allStudents,
		fetchStudentData,
		studentInfo,
		isLoading,
	}
}

export default useStudents
