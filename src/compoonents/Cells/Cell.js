import { CELLS_HEIGHT_PX, CELLS_WIDTH_PX } from '../../constants'
import styled, { css } from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'
import { reviveCell, killCell } from '../../store/boardSlice/boardSlice'
import { isWithinRange } from '../../store/boardSlice/createNewGeneration'
import { selectorOfSurvivalConditions } from '../../store/ConditionsSlice/survivalConditionsSlice'
import { selectorOfRevivalConditions } from '../../store/ConditionsSlice/revivalConditionsSlice'
import { WILL_REVIVE, WILL_DIE } from './style'
import {
    aliveCellsColor,
    revivingCellsColor,
    deadCellsColor,
    dyingCellsColor
} from '../TheLifeGame/style'

const CELL_BORDER_WIDTH_PX = 1

const CellContainer = styled.div.attrs(({ top, left }) => ({
    style: {
        top: top,
        left: left
    }
}))`
    position: absolute;
    width: ${CELLS_WIDTH_PX}px;
    height: ${CELLS_HEIGHT_PX}px;
    border: ${CELL_BORDER_WIDTH_PX}px solid darkcyan;
    box-sizing: border-box;
    text-align: center;

    font-size: ${CELLS_HEIGHT_PX - 2 * CELL_BORDER_WIDTH_PX}px;

    ${({ nextLifeStatus }) => {
        switch (nextLifeStatus) {
            case WILL_DIE:
                return css`
                    background: ${dyingCellsColor};
                    color: white;
                `
            case WILL_REVIVE:
                return css`
                    background: ${revivingCellsColor};
                    color: black;
                `
            default:
                return css`
                    background: ${({ isAlive }) =>
                        isAlive ? aliveCellsColor : deadCellsColor};
                    color: ${({ isAlive }) => isAlive && 'black'};
                `
        }
    }}
`

const computeNextLifeStatus = (
    isAlive,
    numberOfAliveNeighbors,
    [minForSurvival, MaxForSurviving],
    [minForRevival, MaxForCreation]
) => {
    if (isAlive) {
        return (
            !isWithinRange(
                numberOfAliveNeighbors,
                minForSurvival,
                MaxForSurviving
            ) && WILL_DIE
        )
    } else {
        return (
            isWithinRange(
                numberOfAliveNeighbors,
                minForRevival,
                MaxForCreation
            ) && WILL_REVIVE
        )
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

    const survivalConditions = useSelector(selectorOfSurvivalConditions)
    const revivalConditions = useSelector(selectorOfRevivalConditions)
    const { numberOfAliveNeighbors } = useSelector(
        (store) => store.board[rowI][columnI]
    )

    const handleMouseDown = () => {
        dispatch((isAlive ? killCell : reviveCell)([rowI, columnI]))
    }

    const handleMouseOver = () => {
        !isAlive &&
            isMouseDownRef.current &&
            dispatch(reviveCell([rowI, columnI]))
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
                    survivalConditions,
                    revivalConditions
                )
            }>
            {shouldShowNumberOfAliveNeighbors && numberOfAliveNeighbors}
        </CellContainer>
    )
}

CellView.propTypes = {
    rowI: PropTypes.number,
    columnI: PropTypes.number,
    isMouseDownRef: PropTypes.shape({
        current: PropTypes.bool
    }),
    shouldShowPrediction: PropTypes.bool,
    shouldShowNumberOfAliveNeighbors: PropTypes.bool
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
