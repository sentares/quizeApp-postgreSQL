import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	choseAnswer: null,
}

export const answerSlice = createSlice({
	name: 'answer',
	initialState,
	reducers: {
		setChoseAnswer: (state, action) => {
			state.choseAnswer = action.payload
		},
	},
})

export const { setChoseAnswer } = answerSlice.actions
export default answerSlice.reducer
