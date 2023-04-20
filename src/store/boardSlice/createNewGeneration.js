import { setNewBoard } from './boardSlice'

const isCellAboveAlive = (rowI, columnI, board) => {
    const neighboringRowI = rowI - 1
    if (neighboringRowI < 0) return false
    return board[neighboringRowI][columnI].isAlive
}
const isCellBelowAlive = (rowI, columnI, board) => {
    const neighboringRowI = rowI + 1
    if (neighboringRowI > board.length - 1) return false
    return board[neighboringRowI][columnI].isAlive
}
const isCellToTheLeftAlive = (rowI, columnI, board) => {
    const neighboringColumnI = columnI - 1
    if (neighboringColumnI < 0) return false
    return board[rowI][neighboringColumnI].isAlive
}
const isCellToTheRightAlive = (rowI, columnI, board) => {
    const neighboringColumnI = columnI + 1
    if (neighboringColumnI > board[0].length - 1) return false
    return board[rowI][neighboringColumnI].isAlive
}
const isCellToTheTopLeftAlive = (rowI, columnI, board) => {
    const neighboringColumnI = columnI - 1
    const neighboringRowI = rowI - 1

    if (neighboringColumnI < 0) return false
    if (neighboringRowI < 0) return false
    return board[neighboringRowI][neighboringColumnI].isAlive
}
const isCellToTheBottomLeftAlive = (rowI, columnI, board) => {
    const neighboringColumnI = columnI - 1
    const neighboringRowI = rowI + 1

    if (neighboringColumnI < 0) return false
    if (neighboringRowI > board.length - 1) return false
    return board[neighboringRowI][neighboringColumnI].isAlive
}
const isCellToTheTopRightAlive = (rowI, columnI, board) => {
    const neighboringColumnI = columnI + 1
    const neighboringRowI = rowI - 1

    if (neighboringColumnI > board[0].length - 1) return false
    if (neighboringRowI < 0) return false
    return board[neighboringRowI][neighboringColumnI].isAlive
}
const isCellToTheBottomRightAlive = (rowI, columnI, board) => {
    const neighboringColumnI = columnI + 1
    const neighboringRowI = rowI + 1

    if (neighboringColumnI > board[0].length - 1) return false
    if (neighboringRowI > board.length - 1) return false
    return board[neighboringRowI][neighboringColumnI].isAlive
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
    [minForSurviving, maxForSurviving],
    [minForCreation, maxForCreation]
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
            minForSurviving,
            maxForSurviving
        )
    } else {
        newCell.isAlive = isWithinRange(
            numberOfAliveNeighbors,
            minForCreation,
            maxForCreation
        )
    }

    return newCell
}

export const createNewGeneration = () => (dispatch, getState) => {
    const board = getState().board
    const survivingConditions = getState().gameSettings.survivingConditions
    const creationConditions = getState().gameSettings.creationConditions

    let newBoard = board.map((row, rowI) => {
        return row.map((cell, columnI) => {
            return computeNextCell(
                rowI,
                columnI,
                board,
                survivingConditions,
                creationConditions
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
