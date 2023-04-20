import { createSlice } from '@reduxjs/toolkit'

const initialState = [3, 5]

export const survivingConditionsSlice = createSlice({
    name: 'survivingConditions',
    initialState,
    reducers: {
        setCellsSurvivingConditions(state, { payload }) {
            return payload
        },
    },
})

export const { setCellsSurvivingConditions } = survivingConditionsSlice.actions

export default survivingConditionsSlice

export const selectorOfSurvivingConditions = (state) =>
    state.gameSettings.survivingConditions
