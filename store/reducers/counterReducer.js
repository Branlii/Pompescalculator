import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        serie: '',
        rep: '',
        recup: '',
        step: null,
        diffDays: null,
        fill: false,
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
        clearCounter: (state) => {
            state.serie = ''
            state.rep = ''
            state.recup = ''
            state.step = null
            state.diffDays = null
            state.fill = false
        },
        stepCreate: (state, value) => {
            state.step = value.payload
        },
        stepDecrement: (state) => {
            --state.step
        },
        diffDaysModifie: (state, value) => {
            state.diffDays = value.payload
        },
        fillModifie: (state) => {
            state.fill = !state.fill
        },
    },
})

export const { 
    serieModifie,
    repModifie,
    recupModifie,
    stepCreate,
    stepDecrement,
    diffDaysModifie,
    clearCounter,
    fillModifie,
} = counterSlice.actions

export default counterSlice.reducer