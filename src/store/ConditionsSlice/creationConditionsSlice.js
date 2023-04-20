import { createSlice } from '@reduxjs/toolkit'
import { HORIZONTAL_CELLS_COUNT, VERTICAL_CELLS_COUNT } from '../../constants'

const initialState = [3, 5]

export const creationConditionsSlice = createSlice({
    name: 'creationConditions',
    initialState,
    reducers: {
        setCellsCreationConditions(state, { payload }) {
            return payload
        },
    },
})

export const { setCellsCreationConditions } = creationConditionsSlice.actions

export default creationConditionsSlice

export const selectorOfCreationConditions = (state) =>
    state.gameSettings.creationConditions
