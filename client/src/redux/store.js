import { configureStore } from '@reduxjs/toolkit'
import { answerSlice } from './slices/answerSlice'
import { authSlice } from './slices/authSlice'
import { modalSlice } from './slices/modalSlice'
import { resultSlice } from './slices/resultSlice'

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		answer: answerSlice.reducer,
		is_done: resultSlice.reducer,
		editModal: modalSlice.reducer,
	},
})
