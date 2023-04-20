const changeInCellAbove = (rowI, columnI, board, changeFn) => {
    const neighboringRowI = rowI - 1

    if (neighboringRowI < 0) return
    const { numberOfAliveNeighbors } = board[neighboringRowI][columnI]

    board[neighboringRowI][columnI].numberOfAliveNeighbors = changeFn(
        numberOfAliveNeighbors
    )
}
const changeInCellBelow = (rowI, columnI, board, changeFn) => {
    const neighboringRowI = rowI + 1
    if (neighboringRowI > board.length - 1) return

    const { numberOfAliveNeighbors } = board[neighboringRowI][columnI]
    board[neighboringRowI][columnI].numberOfAliveNeighbors = changeFn(
        numberOfAliveNeighbors
    )
}

const changeInCellToTheLeft = (rowI, columnI, board, changeFn) => {
    const neighboringColumnI = columnI - 1
    if (neighboringColumnI < 0) return

    const { numberOfAliveNeighbors } = board[rowI][neighboringColumnI]
    board[rowI][neighboringColumnI].numberOfAliveNeighbors = changeFn(
        numberOfAliveNeighbors
    )
}

const changeInCellToTheRight = (rowI, columnI, board, changeFn) => {
    const neighboringColumnI = columnI + 1
    if (neighboringColumnI > board[0].length - 1) return

    const { numberOfAliveNeighbors } = board[rowI][neighboringColumnI]
    board[rowI][neighboringColumnI].numberOfAliveNeighbors = changeFn(
        numberOfAliveNeighbors
    )
}

const changeInCellToTheTopLeft = (rowI, columnI, board, changeFn) => {
    const neighboringColumnI = columnI - 1
    const neighboringRowI = rowI - 1

    if (neighboringColumnI < 0) return
    if (neighboringRowI < 0) return

    const { numberOfAliveNeighbors } =
        board[neighboringRowI][neighboringColumnI]
    board[neighboringRowI][neighboringColumnI].numberOfAliveNeighbors =
        changeFn(numberOfAliveNeighbors)
}

const changeInCellToTheBottomLeft = (rowI, columnI, board, changeFn) => {
    const neighboringColumnI = columnI - 1
    const neighboringRowI = rowI + 1

    if (neighboringColumnI < 0) return
    if (neighboringRowI > board.length - 1) return

    const { numberOfAliveNeighbors } =
        board[neighboringRowI][neighboringColumnI]
    board[neighboringRowI][neighboringColumnI].numberOfAliveNeighbors =
        changeFn(numberOfAliveNeighbors)
}

const changeInCellToTheTopRight = (rowI, columnI, board, changeFn) => {
    const neighboringColumnI = columnI + 1
    const neighboringRowI = rowI - 1

    if (neighboringColumnI > board[0].length - 1) return
    if (neighboringRowI < 0) return

    const { numberOfAliveNeighbors } =
        board[neighboringRowI][neighboringColumnI]
    board[neighboringRowI][neighboringColumnI].numberOfAliveNeighbors =
        changeFn(numberOfAliveNeighbors)
}

const changeInCellToTheBottomRight = (rowI, columnI, board, changeFn) => {
    const neighboringColumnI = columnI + 1
    const neighboringRowI = rowI + 1

    if (neighboringColumnI > board[0].length - 1) return
    if (neighboringRowI > board.length - 1) return

    const { numberOfAliveNeighbors } =
        board[neighboringRowI][neighboringColumnI]
    board[neighboringRowI][neighboringColumnI].numberOfAliveNeighbors =
        changeFn(numberOfAliveNeighbors)
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
