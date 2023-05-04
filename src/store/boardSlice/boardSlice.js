import { createSlice } from '@reduxjs/toolkit'
import { HORIZONTAL_CELLS_COUNT, VERTICAL_CELLS_COUNT } from '../../constants'
import changeNumberOfAliveNeighborsInSurroundingCells, {
    decrement,
    increment
} from './changeNumberOfAliveNeighbors'

const initialState = []

for (let row = 0; row < VERTICAL_CELLS_COUNT; row++) {
    initialState.push([])
    for (let column = 0; column < HORIZONTAL_CELLS_COUNT; column++) {
        initialState[row].push({ isAlive: false, numberOfAliveNeighbors: 0 })
    }
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        reviveCell(board, { payload: [rowI, columnI] }) {
            board[rowI][columnI].isAlive = true

            changeNumberOfAliveNeighborsInSurroundingCells(
                rowI,
                columnI,
                board,
                increment
            )
        },
        killCell(board, { payload: [rowI, columnI] }) {
            board[rowI][columnI].isAlive = false

            changeNumberOfAliveNeighborsInSurroundingCells(
                rowI,
                columnI,
                board,
                decrement
            )
        },
        clearBoard() {
            return initialState
        },
        setNewBoard(state, { payload }) {
            return payload
        }
    }
})

export const { reviveCell, clearBoard, setNewBoard, killCell } =
    boardSlice.actions

export default boardSlice.reducer
