import { CELLS_SIDE_LENGTH_PX } from '../../constants'
import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'
import { reviveCell, killCell } from '../../store/boardSlice/boardSlice'
import { isWithinRange } from '../../store/boardSlice/createNewGeneration'
import { selectorOfSurvivalConditions } from '../../store/ConditionsSlice/survivalConditionsSlice'
import { selectorOfRevivalConditions } from '../../store/ConditionsSlice/revivalConditionsSlice'
import { WILL_REVIVE, WILL_DIE, CELL_BORDER_WIDTH_PX } from './style'
import { aliveCellsColor } from '../TheLifeGame/style'
import {
    NextLifeStatusMark,
    NumberOfNeighborsTable
} from './CellStateDisplayers'

const CellContainer = styled.div.attrs(({ top, left }) => ({
    style: {
        top: top,
        left: left
    }
}))`
    position: absolute;
    width: ${CELLS_SIDE_LENGTH_PX}px;
    height: ${CELLS_SIDE_LENGTH_PX}px;
    border: ${CELL_BORDER_WIDTH_PX}px solid darkcyan;
    box-sizing: border-box;

    background: ${({ isAlive }) => isAlive && aliveCellsColor};
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
    isAlive,
    numberOfAliveNeighbors,
    rowI,
    columnI,
    handleMouseOver,
    shouldShowNextLifeStatus,
    shouldShowNumberOfAliveNeighbors
}) {
    const dispatch = useDispatch()

    const survivalConditions = useSelector(selectorOfSurvivalConditions)
    const revivalConditions = useSelector(selectorOfRevivalConditions)

    const handleMouseDown = () => {
        dispatch((isAlive ? killCell : reviveCell)([rowI, columnI]))
    }

    const nextLifeStatus =
        shouldShowNextLifeStatus &&
        computeNextLifeStatus(
            isAlive,
            numberOfAliveNeighbors,
            survivalConditions,
            revivalConditions
        )

    return (
        <CellContainer
            top={rowI * CELLS_SIDE_LENGTH_PX}
            left={columnI * CELLS_SIDE_LENGTH_PX}
            isAlive={isAlive}
            onMouseDown={handleMouseDown}
            onMouseOver={handleMouseOver}>
            {shouldShowNextLifeStatus && !shouldShowNumberOfAliveNeighbors && (
                <NextLifeStatusMark nextLifeStatus={nextLifeStatus} />
            )}

            {shouldShowNumberOfAliveNeighbors && (
                <NumberOfNeighborsTable
                    isAlive={isAlive}
                    nextLifeStatus={shouldShowNextLifeStatus && nextLifeStatus}>
                    {numberOfAliveNeighbors}
                </NumberOfNeighborsTable>
            )}
        </CellContainer>
    )
}

CellView.propTypes = {
    isAlive: PropTypes.bool,
    numberOfAliveNeighbors: PropTypes.number,
    rowI: PropTypes.number,
    columnI: PropTypes.number,
    shouldShowNextLifeStatus: PropTypes.bool,
    shouldShowNumberOfAliveNeighbors: PropTypes.bool
}

const areEqual = (
    {
        shouldShowNextLifeStatus,
        shouldShowNumberOfAliveNeighbors,
        isAlive,
        numberOfAliveNeighbors
    },
    {
        isAlive: newIsAlive,
        numberOfAliveNeighbors: newNumberOfAliveNeighbors,
        shouldShowNextLifeStatus: newShouldShowPrediction,
        shouldShowNumberOfAliveNeighbors: newShouldShowNumberOfAliveNeighbors
    }
) => {
    return (
        isAlive === newIsAlive &&
        numberOfAliveNeighbors === newNumberOfAliveNeighbors &&
        shouldShowNextLifeStatus === newShouldShowPrediction &&
        shouldShowNumberOfAliveNeighbors === newShouldShowNumberOfAliveNeighbors
    )
}
export const Cell = React.memo(CellView, areEqual)
