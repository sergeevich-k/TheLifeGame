import { useSelector } from 'react-redux'
import { Cell } from '../Cells'
import { useRef } from 'react'
import {
    CELLS_HEIGHT_PX,
    CELLS_WIDTH_PX,
    HORIZONTAL_CELLS_COUNT,
    VERTICAL_CELLS_COUNT
} from '../../constants'

export function Board({
    shouldShowPrediction,
    shouldShowNumberOfAliveNeighbors
}) {
    let isMouseDownRef = useRef(false)

    const board = useSelector((store) => store.board)

    const handleMouseDown = (e) => {
        e.preventDefault()
        isMouseDownRef.current = true
    }
    const handleMouseUp = () => {
        isMouseDownRef.current = false
    }

    return (
        <div
            css={`
                 {
                    position: relative;
                    border-radius: 3px;
                    border: inherit;

                    margin: 1em;
                    width: ${HORIZONTAL_CELLS_COUNT * CELLS_WIDTH_PX}px;
                    height: ${VERTICAL_CELLS_COUNT * CELLS_HEIGHT_PX}px;
                    flex-grow: 3;
                }
            `}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}>
            {board.reduce((cells, row, rowI) => {
                row.forEach((cell, columnI) => {
                    cells.push(
                        <Cell
                            rowI={rowI}
                            columnI={columnI}
                            key={`${rowI}+${columnI} `}
                            isMouseDownRef={isMouseDownRef}
                            shouldShowPrediction={shouldShowPrediction}
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
