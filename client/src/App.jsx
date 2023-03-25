import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { useHttp } from './hooks/useHttp'
import Router from './pages/Router'
import { setIsAuth, setLoader, setUser } from './redux/slices/authSlice'

function App() {
	const { request } = useHttp()
	const loader = useSelector(state => state.auth.loader)
	const dispath = useDispatch()

	const checkAuth = async () => {
		try {
			const { data, accessToken } = await request('/auth/check')
			if (accessToken.length) {
				dispath(setUser(data))
				dispath(setIsAuth(true))
			}
			dispath(setLoader(false))
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		checkAuth()
	}, [])

	if (loader) {
		return <>loader </>
	}
	return (
		<>
			<ToastContainer />
			<div>
				<Router />
			</div>
		</>
	)
}

export default App
