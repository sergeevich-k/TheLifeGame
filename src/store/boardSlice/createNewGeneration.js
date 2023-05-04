import { setNewBoard } from './boardSlice'
import { HORIZONTAL_CELLS_COUNT, VERTICAL_CELLS_COUNT } from '../../constants'

export const getRowAboveIndex = (rowI) => {
    let rowAboveI = rowI - 1
    if (rowAboveI < 0) rowAboveI = VERTICAL_CELLS_COUNT - 1
    return rowAboveI
}
export const getRowBelowIndex = (rowI) => {
    let rowBelowI = rowI + 1
    if (rowBelowI > VERTICAL_CELLS_COUNT - 1) rowBelowI = 0
    return rowBelowI
}
export const getNextColumnIndex = (columnI) => {
    let nextColumnI = columnI + 1
    if (nextColumnI > HORIZONTAL_CELLS_COUNT - 1) nextColumnI = 0
    return nextColumnI
}
export const getPreviousColumnIndex = (columnI) => {
    let previousColumnI = columnI - 1
    if (previousColumnI < 0) previousColumnI = HORIZONTAL_CELLS_COUNT - 1
    return previousColumnI
}

const isCellAboveAlive = (rowI, columnI, board) => {
    return board[getRowAboveIndex(rowI)][columnI].isAlive
}

const isCellBelowAlive = (rowI, columnI, board) => {
    return board[getRowBelowIndex(rowI)][columnI].isAlive
}

const isCellToTheLeftAlive = (rowI, columnI, board) => {
    return board[rowI][getPreviousColumnIndex(columnI)].isAlive
}

const isCellToTheRightAlive = (rowI, columnI, board) => {
    return board[rowI][getNextColumnIndex(columnI)].isAlive
}

const isCellToTheTopLeftAlive = (rowI, columnI, board) => {
    return board[getRowAboveIndex(rowI)][getPreviousColumnIndex(columnI)]
        .isAlive
}

const isCellToTheBottomLeftAlive = (rowI, columnI, board) => {
    return board[getRowBelowIndex(rowI)][getPreviousColumnIndex(columnI)]
        .isAlive
}
const isCellToTheTopRightAlive = (rowI, columnI, board) => {
    return board[getRowAboveIndex(rowI)][getNextColumnIndex(columnI)].isAlive
}

const isCellToTheBottomRightAlive = (rowI, columnI, board) => {
    return board[getRowBelowIndex(rowI)][getNextColumnIndex(columnI)].isAlive
}

export const countNumberOfAliveNeighbors = (rowI, columnI, board) => {
    let numberOfAliveNeighbors = 0

    const increment = () => {
        numberOfAliveNeighbors++
    }

    isCellAboveAlive(rowI, columnI, board) && increment()
    isCellBelowAlive(rowI, columnI, board) && increment()
    isCellToTheLeftAlive(rowI, columnI, board) && increment()
    isCellToTheRightAlive(rowI, columnI, board) && increment()
    isCellToTheTopLeftAlive(rowI, columnI, board) && increment()
    isCellToTheBottomLeftAlive(rowI, columnI, board) && increment()
    isCellToTheTopRightAlive(rowI, columnI, board) && increment()
    isCellToTheBottomRightAlive(rowI, columnI, board) && increment()

    return numberOfAliveNeighbors
}

export const isWithinRange = (number, min, max) => {
    return number >= min && number <= max
}

const computeNextCell = (
    rowI,
    columnI,
    board,
    [minForSurvival, maxForSurvival],
    [minForRevival, maxForRevival]
) => {
    const { isAlive } = board[rowI][columnI]
    const numberOfAliveNeighbors = countNumberOfAliveNeighbors(
        rowI,
        columnI,
        board
    )

    let newCell = {}

    if (isAlive) {
        newCell.isAlive = isWithinRange(
            numberOfAliveNeighbors,
            minForSurvival,
            maxForSurvival
        )
    } else {
        newCell.isAlive = isWithinRange(
            numberOfAliveNeighbors,
            minForRevival,
            maxForRevival
        )
    }

    return newCell
}

export const createNewGeneration = () => (dispatch, getState) => {
    const board = getState().board
    const survivalConditions = getState().gameSettings.survivalConditions
    const revivalConditions = getState().gameSettings.revivalConditions

    let newBoard = board.map((row, rowI) => {
        return row.map((cell, columnI) => {
            return computeNextCell(
                rowI,
                columnI,
                board,
                survivalConditions,
                revivalConditions
            )
        })
    })

    newBoard = newBoard.map((row, rowI) => {
        return row.map((cell, columnI) => {
            cell.numberOfAliveNeighbors = countNumberOfAliveNeighbors(
                rowI,
                columnI,
                newBoard
            )
            return cell
        })
    })

    dispatch(setNewBoard(newBoard))
}
