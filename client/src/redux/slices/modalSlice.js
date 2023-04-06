import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	openEditAnswerModal: false,
}

export const modalSlice = createSlice({
	name: 'editModal',
	initialState,
	reducers: {
		setOpenEditAnswerModal: (state, action) => {
			state.openEditAnswerModal = action.payload
		},
	},
})

export const { setOpenEditAnswerModal } = modalSlice.actions
export default modalSlice.reducer
