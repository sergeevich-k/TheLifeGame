import { CELLS_HEIGHT_PX, CELLS_WIDTH_PX } from '../../constants'
import styled, { css } from 'styled-components'
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { createCell, killCell } from '../../store/boardSlice/boardSlice'
import { isWithinRange } from '../../store/boardSlice/createNewGeneration'
import { selectorOfSurvivingConditions } from '../../store/ConditionsSlice/survivingConditionsSlice'
import { selectorOfCreationConditions } from '../../store/ConditionsSlice/creationConditionsSlice'
import { WILL_APPEAR, WILL_DIE, WILL_REMAIN_THE_SAME } from './style'

const aliveCellsBackground = '#75a6f6'
const deadCellsBackground = '#1b4d72'

const CellContainer = styled.div.attrs(({ top, left }) => ({
    style: {
        top: top,
        left: left
    }
}))`
    position: absolute;
    width: ${CELLS_WIDTH_PX}px;
    height: ${CELLS_HEIGHT_PX}px;
    /*border: 2px solid darkcyan;*/

    box-sizing: border-box;

    ${({ isAlive }) =>
        isAlive &&
        css`
            color: black;
        `}

    ${({ nextLifeStatus }) => {
        switch (nextLifeStatus) {
            case WILL_DIE:
                return css`
                    background: red;
                    color: white;
                `
            case WILL_APPEAR:
                return css`
                    background: #3de73d;
                    color: black;
                `
            default:
                return css`
                    background: ${({ isAlive }) =>
                        isAlive ? aliveCellsBackground : deadCellsBackground};
                `
        }
    }}
`

const computeNextLifeStatus = (
    isAlive,
    numberOfAliveNeighbors,
    [minForSurviving, MaxForSurviving],
    [minForCreation, MaxForCreation]
) => {
    if (numberOfAliveNeighbors === '') return WILL_REMAIN_THE_SAME
    if (isAlive) {
        return isWithinRange(
            numberOfAliveNeighbors,
            minForSurviving,
            MaxForSurviving
        )
            ? WILL_REMAIN_THE_SAME
            : WILL_DIE
    } else {
        return isWithinRange(
            numberOfAliveNeighbors,
            minForCreation,
            MaxForCreation
        )
            ? WILL_APPEAR
            : WILL_REMAIN_THE_SAME
    }
}

function CellView({
    rowI,
    columnI,
    isMouseDownRef,
    shouldShowPrediction,
    shouldShowNumberOfAliveNeighbors
}) {
    const dispatch = useDispatch()
    const { isAlive } = useSelector((state) => state.board[rowI][columnI])

    const survivingConditions = useSelector(selectorOfSurvivingConditions)
    const creationConditions = useSelector(selectorOfCreationConditions)
    const { numberOfAliveNeighbors } = useSelector(
        (store) => store.board[rowI][columnI]
    )

    const handleMouseDown = () => {
        dispatch((isAlive ? killCell : createCell)({ rowI, columnI }))
    }

    const handleMouseOver = () => {
        !isAlive &&
            isMouseDownRef.current &&
            dispatch(createCell({ rowI, columnI }))
    }

    return (
        <CellContainer
            top={rowI * CELLS_HEIGHT_PX}
            left={columnI * CELLS_WIDTH_PX}
            isAlive={isAlive}
            onMouseDown={handleMouseDown}
            onMouseOver={handleMouseOver}
            nextLifeStatus={
                shouldShowPrediction &&
                computeNextLifeStatus(
                    isAlive,
                    numberOfAliveNeighbors,
                    survivingConditions,
                    creationConditions
                )
            }>
            {shouldShowNumberOfAliveNeighbors && numberOfAliveNeighbors}
        </CellContainer>
    )
}

const areEqual = (
    { shouldShowPrediction, shouldShowNumberOfAliveNeighbors },
    {
        shouldShowPrediction: newShouldShowPrediction,
        shouldShowNumberOfAliveNeighbors: newShouldShowNumberOfAliveNeighbors
    }
) => {
    return (
        shouldShowPrediction === newShouldShowPrediction &&
        shouldShowNumberOfAliveNeighbors === newShouldShowNumberOfAliveNeighbors
    )
}
export const Cell = React.memo(CellView, areEqual)
