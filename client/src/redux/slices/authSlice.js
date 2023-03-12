import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: {
		name: '',
		login: '',
		id_student: null,
		is_admin: null,
	},
	loader: false,
	isAuth: false,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},
		setLoader: (state, action) => {
			state.loader = action.payload
		},
		setIsAuth: (state, action) => {
			state.isAuth = action.payload
		},
	},
})

export const { setUser, setLoader, setIsAuth } = authSlice.actions
export default authSlice.reducer
