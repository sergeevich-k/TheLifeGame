import { useDispatch, useSelector } from 'react-redux'
import { Slider } from '@mui/material'

import styled, { css } from 'styled-components'
import { EMPHASIZE_ALL_OUTSIDE, EMPHASIZE_CHOSEN_RANGE } from './style'
import {
    aliveCellsColor,
    revivingCellsColor,
    deadCellsColor,
    dyingCellsColor
} from '../TheLifeGame/style'
import PropTypes from 'prop-types'

const marks = []

for (let i = 0; i <= 8; i++) {
    marks.push({ value: i, label: `${i}` })
}

const EmphasizingSlider = styled(Slider)`
    ${({ $emphasizedPart, $shouldShowNextLifeStatus }) => {
        if (!$shouldShowNextLifeStatus) return
        switch ($emphasizedPart) {
            case EMPHASIZE_ALL_OUTSIDE:
                return css`
                    & .MuiSlider-rail {
                        background-color: ${dyingCellsColor};
                        height: 5px;
                        opacity: 0.75;
                    }

                    & .MuiSlider-track {
                        background-color: ${aliveCellsColor};
                        height: 5px;
                    }

                    & .MuiSlider-thumb {
                        background-color: ${aliveCellsColor};
                    }
                `
            case EMPHASIZE_CHOSEN_RANGE:
                return css`
                    & .MuiSlider-track {
                        background-color: ${revivingCellsColor};
                        height: 5px;
                    }

                    & .MuiSlider-thumb {
                        background-color: ${revivingCellsColor};
                    }

                    & .MuiSlider-rail {
                        background-color: ${deadCellsColor};
                        height: 5px;
                        opacity: 0.75;
                    }
                `
        }
    }}
`

export function SliderOfCondition({
    selector,
    actionOnChange,
    label,
    emphasizedPart,
    shouldShowNextLifeStatus
}) {
    const dispatch = useDispatch()

    const [minNumber, maxNumber] = useSelector(selector)

    const handleChange = (e, newValues) => {
        const [newMinNumber, newMaxNumber] = newValues
        if (minNumber !== newMinNumber || maxNumber !== newMaxNumber) {
            dispatch(actionOnChange(newValues))
        }
    }

    return (
        <div
            css={css`
                margin: 7px 10px;
            `}>
            {label}
            <EmphasizingSlider
                value={[minNumber, maxNumber]}
                onChange={handleChange}
                valueLabelDisplay="off"
                step={1}
                marks={marks}
                min={0}
                max={8}
                $emphasizedPart={emphasizedPart}
                $shouldShowNextLifeStatus={shouldShowNextLifeStatus}
            />
        </div>
    )
}

SliderOfCondition.propTypes = {
    selector: PropTypes.func,
    actionOnChange: PropTypes.func,
    label: PropTypes.string,
    emphasizedPart: PropTypes.string,
    shouldShowNextLifeStatus: PropTypes.bool
}
