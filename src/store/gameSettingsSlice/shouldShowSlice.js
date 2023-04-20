import { createSlice } from '@reduxjs/toolkit'
import { HORIZONTAL_CELLS_COUNT, VERTICAL_CELLS_COUNT } from '../../constants'

const initialState = false

export const shouldShowNumberOfAliveNeighborsSlice = createSlice({
    name: 'shouldShowNumberOfAliveNeighbors',
    initialState,
    reducers: {
        toggleShouldShowNumberOfAliveNeighbors(
            shouldShowNumberOfAliveNeighbors
        ) {
            return !shouldShowNumberOfAliveNeighbors
        },
    },
})

export const { toggleShouldShowNumberOfAliveNeighbors } =
    shouldShowNumberOfAliveNeighborsSlice.actions

export default shouldShowNumberOfAliveNeighborsSlice
