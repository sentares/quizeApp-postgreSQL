import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './register.module.css'
import { toast } from 'react-toastify'
import ReCAPTCHA from 'react-google-recaptcha'
import { useHttp } from '../../../hooks/useHttp'

const RegisterPage = () => {
	const navigate = useNavigate()
	const { request, loader } = useHttp()
	const recaptchaKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY

	const [form, setForm] = useState({
		login: '',
		name: '',
		password: '',
	})
	const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false)

	const handleRegister = async e => {
		e.preventDefault()
		const { name, login, password } = form

		if (!isCaptchaSuccessful) {
			return toast.warn('Подтвердите что вы не робот')
		}
		if (
			name.trim().length &&
			login.trim().length &&
			password.trim().length &&
			isCaptchaSuccessful
		) {
			const { register, message, type } = await request(
				'/auth/register',
				'POST',
				{
					login: login.trim(),
					password: password.trim(),
					name: name.trim(),
				}
			)
			toast[type](message)
			if (register) {
				navigate('/login')
			}
			return
		}

		toast.warn('Заполните пустые поля')
	}

	const onChangeRecap = () => {
		setIsCaptchaSuccess(true)
	}

	const change = e => setForm({ ...form, [e.target.name]: e.target.value })

	return (
		<div className={styles.registerPage}>
			<div className={styles.registerBlock}>
				<form>
					<div className={styles.registerInputs}>
						<div className={styles.inputBlock}>
							<input
								type='name'
								name='name'
								className={styles.registerInput}
								placeholder='Ваше имя'
								value={form.name}
								onChange={change}
							/>
						</div>
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
								name='password'
								className={styles.registerInput}
								placeholder='Ваш пароль'
								value={form.password}
								onChange={change}
							/>
						</div>
						<div className={styles.captcha}>
							<ReCAPTCHA sitekey={recaptchaKey} onChange={onChangeRecap} />
						</div>

						<button className={styles.buttonRegister} onClick={handleRegister}>
							Регистрация
						</button>
						<div className={styles.haveAcc}>
							<p className={styles.acc}>
								Есть аккаунт?{''}
								<Link to='/login' className={styles.signIn}>
									Войти
								</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default RegisterPage
