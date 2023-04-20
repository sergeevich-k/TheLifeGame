import { useDispatch, useSelector } from 'react-redux'
import { Slider } from '@mui/material'

import styled, { css } from 'styled-components'
import { EMPHASIZE_ALL_OUTSIDE, EMPHASIZE_CHOSEN_RANGE } from './style'

const marks = []

for (let i = 0; i <= 8; i++) {
    marks.push({ value: i, label: `${i}` })
}

const aliveCellsBackground = '#75a6f6'
const deadCellsBackground = '#1b4d72'
const appearingCellsBackground = '#3de73d'

const EmphasizingSlider = styled(Slider)`
    ${({ $emphasizedPart, $shouldShowPrediction }) => {
        if (!$shouldShowPrediction) return
        switch ($emphasizedPart) {
            case EMPHASIZE_ALL_OUTSIDE:
                return css`
                    & .MuiSlider-rail {
                        background-color: red;
                        height: 5px;
                        opacity: 0.75;
                    }

                    & .MuiSlider-track {
                        background-color: ${aliveCellsBackground};
                        height: 5px;
                    }

                    & .MuiSlider-thumb {
                        background-color: ${aliveCellsBackground};
                    }
                `
            case EMPHASIZE_CHOSEN_RANGE:
                return css`
                    & .MuiSlider-track {
                        background-color: ${appearingCellsBackground};
                        height: 5px;
                    }

                    & .MuiSlider-thumb {
                        background-color: ${appearingCellsBackground};
                    }

                    & .MuiSlider-rail {
                        background-color: ${deadCellsBackground};
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
    shouldShowPrediction,
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
                margin: 2px 0;
                /*     border : 1px solid palevioletred;*/
                border-radius: 3px;
                padding: 5px 10px;
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
                disableSwap
                $emphasizedPart={emphasizedPart}
                $shouldShowPrediction={shouldShowPrediction}
            />
        </div>
    )
}
