import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        serie: '',
        rep: '',
        recup: '',
        step: null,
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
        stepCreate: (state, value) => {
            state.step = value.payload
        },
        stepDecrement: (state) => {
            --state.step
        }
    },
})

export const { serieModifie, repModifie, recupModifie, stepCreate, stepDecrement } = counterSlice.actions

export default counterSlice.reducer