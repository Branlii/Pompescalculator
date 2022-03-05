import { createSlice } from '@reduxjs/toolkit'

export const recupSlice = createSlice({
    name: 'recup',
    initialState: {
        recup: '',
    },
    reducers: {
        recupModifie: (state, value) => {
            state.recup = value
        },
    },
})

export const { recupModifie } = recupSlice.actions

export default recupSlice.reducer