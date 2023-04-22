import {
    getNextColumnIndex,
    getPreviousColumnIndex,
    getRowAboveIndex,
    getRowBelowIndex
} from './createNewGeneration'

const changeInCellAbove = (rowI, columnI, board, changeFn) => {
    const rowAboveI = getRowAboveIndex(rowI)
    const { numberOfAliveNeighbors } = board[rowAboveI][columnI]

    board[rowAboveI][columnI].numberOfAliveNeighbors = changeFn(
        numberOfAliveNeighbors
    )
}
const changeInCellBelow = (rowI, columnI, board, changeFn) => {
    const rowBelowI = getRowBelowIndex(rowI)

    const { numberOfAliveNeighbors } = board[rowBelowI][columnI]
    board[rowBelowI][columnI].numberOfAliveNeighbors = changeFn(
        numberOfAliveNeighbors
    )
}

const changeInCellToTheLeft = (rowI, columnI, board, changeFn) => {
    const previousColumnI = getPreviousColumnIndex(columnI)

    const { numberOfAliveNeighbors } = board[rowI][previousColumnI]
    board[rowI][previousColumnI].numberOfAliveNeighbors = changeFn(
        numberOfAliveNeighbors
    )
}

const changeInCellToTheRight = (rowI, columnI, board, changeFn) => {
    const nextColumnI = getNextColumnIndex(columnI)

    const { numberOfAliveNeighbors } = board[rowI][nextColumnI]
    board[rowI][nextColumnI].numberOfAliveNeighbors = changeFn(
        numberOfAliveNeighbors
    )
}

const changeInCellToTheTopLeft = (rowI, columnI, board, changeFn) => {
    const previousColumnI = getPreviousColumnIndex(columnI)
    const rowAboveI = getRowAboveIndex(rowI)

    const { numberOfAliveNeighbors } = board[rowAboveI][previousColumnI]
    board[rowAboveI][previousColumnI].numberOfAliveNeighbors = changeFn(
        numberOfAliveNeighbors
    )
}

const changeInCellToTheBottomLeft = (rowI, columnI, board, changeFn) => {
    const previousColumnI = getPreviousColumnIndex(columnI)
    const belowRowI = getRowBelowIndex(rowI)

    const { numberOfAliveNeighbors } = board[belowRowI][previousColumnI]
    board[belowRowI][previousColumnI].numberOfAliveNeighbors = changeFn(
        numberOfAliveNeighbors
    )
}

const changeInCellToTheTopRight = (rowI, columnI, board, changeFn) => {
    const nextColumnI = getNextColumnIndex(columnI)
    const rowAboveI = getRowAboveIndex(rowI)

    const { numberOfAliveNeighbors } = board[rowAboveI][nextColumnI]
    board[rowAboveI][nextColumnI].numberOfAliveNeighbors = changeFn(
        numberOfAliveNeighbors
    )
}

const changeInCellToTheBottomRight = (rowI, columnI, board, changeFn) => {
    const nextColumnI = getNextColumnIndex(columnI)
    const rowBelowI = getRowBelowIndex(rowI)

    const { numberOfAliveNeighbors } = board[rowBelowI][nextColumnI]
    board[rowBelowI][nextColumnI].numberOfAliveNeighbors = changeFn(
        numberOfAliveNeighbors
    )
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
