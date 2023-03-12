import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	is_done: false,
}

export const resultSlice = createSlice({
	name: 'isDone',
	initialState,
	reducers: {
		setIsDone: (state, action) => {
			state.is_done = action.payload
		},
	},
})

export const { setIsDone } = resultSlice.actions
export default resultSlice.reducer
