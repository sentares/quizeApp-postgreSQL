import { configureStore } from '@reduxjs/toolkit'
import { answerSlice } from './slices/answerSlice'
import { authSlice } from './slices/authSlice'

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		answer: answerSlice.reducer,
	},
})
