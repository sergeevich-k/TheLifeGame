import { CELLS_SIDE_LENGTH_PX } from '../../constants'
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
    dyingCellsColor,
    fontSecondColor,
    fontGreyerColor,
    fontColor,
    fontLighterColor
} from '../TheLifeGame/style'

const CELL_BORDER_WIDTH_PX = 1
const CELLS_CONTENT_SIDE_LENGTH_PX =
    CELLS_SIDE_LENGTH_PX - 2 * CELL_BORDER_WIDTH_PX

const getThickShadow = (color) => `-2px 0 3px ${color}, -2px 0 3px ${color}, 
                            0 2px 3px ${color}, 0 2px 3px ${color}, 
                            2px 0 3px ${color},2px 0 3px ${color},
                             0 -2px 3px ${color}, 0 -2px 3px ${color};`

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
    color: ${({ isAlive }) => (isAlive ? 'black' : fontGreyerColor)};

    ${({ nextLifeStatus }) => {
        switch (nextLifeStatus) {
            case WILL_DIE:
                return css`
                    &::before {
                        content: '';
                        position: absolute;
                        display: block;

                        height: ${CELLS_CONTENT_SIDE_LENGTH_PX / 2}px;
                        width: ${CELLS_CONTENT_SIDE_LENGTH_PX / 2}px;
                        top: ${CELLS_CONTENT_SIDE_LENGTH_PX / 4}px;
                        left: ${CELLS_CONTENT_SIDE_LENGTH_PX / 4}px;

                        background: ${dyingCellsColor};
                    }

                    color: ${fontLighterColor};
                    text-shadow: ${getThickShadow(dyingCellsColor)};
                `
            case WILL_REVIVE:
                return css`
                    &::before {
                        content: '';
                        position: absolute;
                        display: block;

                        height: ${CELLS_CONTENT_SIDE_LENGTH_PX / 3}px;
                        width: ${CELLS_CONTENT_SIDE_LENGTH_PX / 3}px;
                        top: ${CELLS_CONTENT_SIDE_LENGTH_PX / 3}px;
                        left: ${CELLS_CONTENT_SIDE_LENGTH_PX / 3}px;

                        background: ${revivingCellsColor};
                    }

                    color: ${fontLighterColor};
                    text-shadow: ${getThickShadow('green')};
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
            top={rowI * CELLS_SIDE_LENGTH_PX}
            left={columnI * CELLS_SIDE_LENGTH_PX}
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
            {shouldShowNumberOfAliveNeighbors && (
                <div
                    css={`
                        position: absolute;
                        z-index: 1;
                        font-size: ${CELLS_CONTENT_SIDE_LENGTH_PX}px;
                        line-height: 1;
                        width: 100%;
                        text-align: center;
                    `}>
                    {numberOfAliveNeighbors}
                </div>
            )}
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
