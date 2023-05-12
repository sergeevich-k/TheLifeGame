import { useDispatch, useSelector } from 'react-redux'
import { Cell } from '../Cell'
import { useRef } from 'react'
import {
    CELLS_SIDE_LENGTH_PX,
    HORIZONTAL_CELLS_COUNT,
    VERTICAL_CELLS_COUNT
} from '../../constants'
import PropTypes from 'prop-types'
import { reviveCell } from '../../store/boardSlice/boardSlice'

export function Board({
    shouldShowNextLifeStatus,
    shouldShowNumberOfAliveNeighbors
}) {
    let isMouseDownRef = useRef(false)
    const dispatch = useDispatch()

    const board = useSelector((store) => store.board)

    const handleMouseDown = (e) => {
        e.preventDefault()
        isMouseDownRef.current = true
    }
    const handleMouseUp = () => {
        isMouseDownRef.current = false
    }

    const handleMouseOverCell = (isAlive, rowI, columnI) => {
        !isAlive &&
            isMouseDownRef.current &&
            dispatch(reviveCell([rowI, columnI]))
    }

    return (
        <div
            css={`
                 {
                    position: relative;
                    border-radius: 3px;
                    border: inherit;

                    margin: 1em;
                    width: ${HORIZONTAL_CELLS_COUNT * CELLS_SIDE_LENGTH_PX}px;
                    height: ${VERTICAL_CELLS_COUNT * CELLS_SIDE_LENGTH_PX}px;
                    flex-grow: 3;
                }
            `}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}>
            {board.reduce((cells, row, rowI) => {
                row.forEach(({ isAlive, numberOfAliveNeighbors }, columnI) => {
                    cells.push(
                        <Cell
                            isAlive={isAlive}
                            numberOfAliveNeighbors={numberOfAliveNeighbors}
                            rowI={rowI}
                            columnI={columnI}
                            key={`${rowI}+${columnI} `}
                            handleMouseOver={() =>
                                handleMouseOverCell(isAlive, rowI, columnI)
                            }
                            isMouseDownRef={isMouseDownRef}
                            shouldShowNextLifeStatus={shouldShowNextLifeStatus}
                            shouldShowNumberOfAliveNeighbors={
                                shouldShowNumberOfAliveNeighbors
                            }
                        />
                    )
                })
                return cells
            }, [])}
        </div>
    )
}

Board.propTypes = {
    shouldShowNextLifeStatus: PropTypes.bool,
    shouldShowNumberOfAliveNeighbors: PropTypes.bool
}
