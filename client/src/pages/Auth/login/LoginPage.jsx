import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './login.module.css'
import { toast } from 'react-toastify'
import { useHttp } from '../../../hooks/useHttp'
import { useDispatch } from 'react-redux'
import { setIsAuth, setUser } from '../../../redux/slices/authSlice'
import ReCAPTCHA from 'react-google-recaptcha'

const LoginPage = () => {
	const { request, loader } = useHttp()
	const dispath = useDispatch()
	const recaptchaKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY
	const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false)

	const getData = data => {
		dispath(setUser(data))
		dispath(setIsAuth(true))
	}
	const [form, setForm] = useState({
		login: '',
		password: '',
	})

	const handleLogin = async e => {
		e.preventDefault()
		const { login, password } = form
		if (!isCaptchaSuccessful) {
			return toast.warn('Подтвердите что вы не робот')
		}
		if (login.trim().length && password.trim().length) {
			const { data, accessToken, message, type } = await request(
				'/auth/login',
				'POST',
				{ login: login.trim(), password: password.trim() }
			)
			toast[type](message)
			if (accessToken.length) {
				getData(data)
			}
			return
		}
		toast.warn('Заполните пустые поля')
	}

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })

	const onChangeRecap = () => {
		setIsCaptchaSuccess(true)
	}

	return (
		<div className={styles.registerPage}>
			<div className={styles.registerBlock}>
				<form>
					<div className={styles.registerInputs}>
						<div className={styles.inputBlock}>
							<input
								type='login'
								name='login'
								className={styles.registerInput}
								placeholder='Ваш login'
								value={form.login}
								onChange={change}
							/>
						</div>
						<div className={styles.inputBlock}>
							<input
								type='password'
								className={styles.registerInput}
								placeholder='Ваш пароль'
								value={form.password}
								name='password'
								onChange={change}
							/>
						</div>
						<div className={styles.captcha}>
							<ReCAPTCHA sitekey={recaptchaKey} onChange={onChangeRecap} />
						</div>
						<button className={styles.buttonRegister} onClick={handleLogin}>
							Войти
						</button>
						<div className={styles.haveAcc}>
							<p className={styles.acc}>
								Нет аккаунта?
								<Link to='/register' className={styles.signIn}>
									Регистрация
								</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginPage
