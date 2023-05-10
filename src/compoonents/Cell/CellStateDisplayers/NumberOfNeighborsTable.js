import styled, { css } from 'styled-components'
import {
    dyingCellsColor,
    fontGreyerColor,
    fontLighterColor
} from '../../TheLifeGame/style'
import { CELLS_CONTENT_SIDE_LENGTH_PX, WILL_DIE, WILL_REVIVE } from '../style'

const getThickShadow = (color) => `-2px 0 3px ${color}, -2px 0 3px ${color}, 
                            0 2px 3px ${color}, 0 2px 3px ${color}, 
                            2px 0 3px ${color},2px 0 3px ${color},
                             0 -2px 3px ${color}, 0 -2px 3px ${color};`

export const NumberOfNeighborsTable = styled.div`
    font-size: ${CELLS_CONTENT_SIDE_LENGTH_PX}px;
    line-height: 1;
    width: 100%;
    text-align: center;
    color: ${({ isAlive }) => (isAlive ? 'black' : fontGreyerColor)};

    ${({ nextLifeStatus }) => {
        switch (nextLifeStatus) {
            case WILL_DIE:
                return css`
                    color: ${fontLighterColor};
                    text-shadow: ${getThickShadow(dyingCellsColor)};
                `

            case WILL_REVIVE:
                return css`
                    color: ${fontLighterColor};
                    text-shadow: ${getThickShadow('green')};
                `
        }
    }}
`
