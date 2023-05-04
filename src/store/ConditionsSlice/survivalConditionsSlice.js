import { createSlice } from '@reduxjs/toolkit'

const initialState = [2, 3]

export const survivalConditionsSlice = createSlice({
    name: 'survivalConditions',
    initialState,
    reducers: {
        setCellsSurvivalConditions(state, { payload }) {
            return payload
        }
    }
})

export const { setCellsSurvivalConditions } = survivalConditionsSlice.actions

export default survivalConditionsSlice

export const selectorOfSurvivalConditions = (state) =>
    state.gameSettings.survivalConditions
