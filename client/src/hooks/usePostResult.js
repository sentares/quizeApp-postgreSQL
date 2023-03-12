import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setIsDone } from '../redux/slices/resultSlice'
import { useHttp } from './useHttp'

const usePostResult = (countRightAnswers, user) => {
	const { request } = useHttp()
	const { id_student } = user
	const dispatch = useDispatch()
	const is_done = useSelector(state => state.is_done.is_done)

	const updateStudentsResult = async () => {
		dispatch(setIsDone(true))
		const result = countRightAnswers
		const { type, message } = await request('/result', 'PUT', {
			id_student,
			is_done,
			result,
		})
		toast[type](message)
	}

	return { updateStudentsResult }
}

export default usePostResult
