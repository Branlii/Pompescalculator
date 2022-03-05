import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        serie: '',
        rep: '',
        recup: '',
    },
    reducers: {
        serieModifie: (state, value) => {
            state.serie = value.payload
        },
        repModifie: (state, value) => {
            state.rep = value.payload
        },
        recupModifie: (state, value) => {
            state.recup = value.payload
        },
    },
})

export const { serieModifie, repModifie, recupModifie } = counterSlice.actions

export default counterSlice.reducer