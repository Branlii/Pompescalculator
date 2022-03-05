import { createSlice } from '@reduxjs/toolkit'

export const repSlice = createSlice({
    name: 'rep',
    initialState: {
        rep: '',
    },
    reducers: {
        repModifie: (state, value) => {
            state.rep = value
        },
    },
})

export const { repModifie } = repSlice.actions

export default repSlice.reducer