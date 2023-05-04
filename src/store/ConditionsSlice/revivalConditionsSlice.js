import { createSlice } from '@reduxjs/toolkit'

const initialState = [3, 3]

export const revivalConditionsSlice = createSlice({
    name: 'revivalConditions',
    initialState,
    reducers: {
        setCellsRevivalConditions(state, { payload }) {
            return payload
        }
    }
})

export const { setCellsRevivalConditions } = revivalConditionsSlice.actions

export default revivalConditionsSlice

export const selectorOfRevivalConditions = (state) =>
    state.gameSettings.revivalConditions
