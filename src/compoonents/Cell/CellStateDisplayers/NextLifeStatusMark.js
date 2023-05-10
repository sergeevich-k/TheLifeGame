import styled, { css } from 'styled-components'
import { CELLS_CONTENT_SIDE_LENGTH_PX, WILL_DIE, WILL_REVIVE } from '../style'
import { dyingCellsColor, revivingCellsColor } from '../../TheLifeGame/style'

export const NextLifeStatusMark = styled.div`
    position: absolute;
    display: block;

    ${({ nextLifeStatus }) => {
        switch (nextLifeStatus) {
            case WILL_DIE:
                return css`
                    height: ${CELLS_CONTENT_SIDE_LENGTH_PX / 2}px;
                    width: ${CELLS_CONTENT_SIDE_LENGTH_PX / 2}px;
                    top: ${CELLS_CONTENT_SIDE_LENGTH_PX / 4}px;
                    left: ${CELLS_CONTENT_SIDE_LENGTH_PX / 4}px;

                    background: ${dyingCellsColor};
                `
            case WILL_REVIVE:
                return css`
                    height: ${CELLS_CONTENT_SIDE_LENGTH_PX / 3}px;
                    width: ${CELLS_CONTENT_SIDE_LENGTH_PX / 3}px;
                    top: ${CELLS_CONTENT_SIDE_LENGTH_PX / 3}px;
                    left: ${CELLS_CONTENT_SIDE_LENGTH_PX / 3}px;

                    background: ${revivingCellsColor};
                `
        }
    }}
`
