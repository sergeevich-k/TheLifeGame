import {
    getNextColumnIndex,
    getPreviousColumnIndex,
    getRowAboveIndex,
    getRowBelowIndex
} from './createNewGeneration'

const changeInCell = (rowI, columnI, board, changeFn) => {
    const { numberOfAliveNeighbors } = board[rowI][columnI]

    board[rowI][columnI].numberOfAliveNeighbors = changeFn(
        numberOfAliveNeighbors
    )
}

const changeInCellAbove = (rowI, columnI, board, changeFn) => {
    const rowAboveI = getRowAboveIndex(rowI)
    changeInCell(rowAboveI, columnI, board, changeFn)
}

const changeInCellBelow = (rowI, columnI, board, changeFn) => {
    const rowBelowI = getRowBelowIndex(rowI)

    changeInCell(rowBelowI, columnI, board, changeFn)
}

const changeInCellToTheLeft = (rowI, columnI, board, changeFn) => {
    const previousColumnI = getPreviousColumnIndex(columnI)

    changeInCell(rowI, previousColumnI, board, changeFn)
}

const changeInCellToTheRight = (rowI, columnI, board, changeFn) => {
    const nextColumnI = getNextColumnIndex(columnI)

    changeInCell(rowI, nextColumnI, board, changeFn)
}

const changeInCellToTheTopLeft = (rowI, columnI, board, changeFn) => {
    const previousColumnI = getPreviousColumnIndex(columnI)
    const rowAboveI = getRowAboveIndex(rowI)

    changeInCell(rowAboveI, previousColumnI, board, changeFn)
}

const changeInCellToTheBottomLeft = (rowI, columnI, board, changeFn) => {
    const previousColumnI = getPreviousColumnIndex(columnI)
    const rowBelowI = getRowBelowIndex(rowI)

    changeInCell(rowBelowI, previousColumnI, board, changeFn)
}

const changeInCellToTheTopRight = (rowI, columnI, board, changeFn) => {
    const nextColumnI = getNextColumnIndex(columnI)
    const rowAboveI = getRowAboveIndex(rowI)

    changeInCell(rowAboveI, nextColumnI, board, changeFn)
}

const changeInCellToTheBottomRight = (rowI, columnI, board, changeFn) => {
    const nextColumnI = getNextColumnIndex(columnI)
    const rowBelowI = getRowBelowIndex(rowI)

    changeInCell(rowBelowI, nextColumnI, board, changeFn)
}

const changeNumberOfAliveNeighborsInSurroundingCells = (
    rowI,
    columnI,
    board,
    changeFn
) => {
    changeInCellAbove(rowI, columnI, board, changeFn)
    changeInCellBelow(rowI, columnI, board, changeFn)
    changeInCellToTheLeft(rowI, columnI, board, changeFn)
    changeInCellToTheRight(rowI, columnI, board, changeFn)
    changeInCellToTheTopLeft(rowI, columnI, board, changeFn)
    changeInCellToTheBottomLeft(rowI, columnI, board, changeFn)
    changeInCellToTheTopRight(rowI, columnI, board, changeFn)
    changeInCellToTheBottomRight(rowI, columnI, board, changeFn)
}

export default changeNumberOfAliveNeighborsInSurroundingCells

export const decrement = (num) => {
    return num === 0 ? 0 : num - 1
}

export const increment = (num) => {
    return num === 8 ? 8 : num + 1
}
