import { clearBoard } from '../../store/boardSlice/boardSlice'
import { useDispatch } from 'react-redux'

import { SliderOfCondition } from '../Sliders/'
import {
    selectorOfSurvivalConditions,
    setCellsSurvivalConditions
} from '../../store/ConditionsSlice/survivalConditionsSlice'
import {
    selectorOfRevivalConditions,
    setCellsRevivalConditions
} from '../../store/ConditionsSlice/revivalConditionsSlice'

import { createNewGeneration } from '../../store/boardSlice/createNewGeneration'
import { CheckboxOfShouldShow } from '../CheckBox'
import { Player } from '../Player'
import { Button, Stack } from '@mui/material'
import { EMPHASIZE_ALL_OUTSIDE, EMPHASIZE_CHOSEN_RANGE } from '../Sliders/style'
import PropTypes from 'prop-types'

export function ControlPanel({
    toggleShouldShowPrediction,
    shouldShowPrediction,
    toggleShouldShowNumberOfAliveNeighbors,
    shouldShowNumberOfAliveNeighbors
}) {
    const dispatch = useDispatch()

    return (
        <div
            css={`
                 {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    border-radius: 3px;
                    border: inherit;
                    margin: 1em;
                    padding: 0.25em 1em;
                    flex-grow: 1;
                }
            `}>
            <SliderOfCondition
                selector={selectorOfSurvivalConditions}
                actionOnChange={setCellsSurvivalConditions}
                label={'Диапазон Выживания:'}
                shouldShowPrediction={shouldShowPrediction}
                emphasizedPart={EMPHASIZE_ALL_OUTSIDE}
            />
            <SliderOfCondition
                selector={selectorOfRevivalConditions}
                actionOnChange={setCellsRevivalConditions}
                label={'Диапазон Появления:'}
                shouldShowPrediction={shouldShowPrediction}
                emphasizedPart={EMPHASIZE_CHOSEN_RANGE}
            />

            <CheckboxOfShouldShow
                checked={shouldShowNumberOfAliveNeighbors}
                onChange={toggleShouldShowNumberOfAliveNeighbors}
                label="Показывать количество живых соседй"
            />

            <CheckboxOfShouldShow
                checked={shouldShowPrediction}
                onChange={toggleShouldShowPrediction}
                label="Показывать следующее поколение"
            />
            <Stack spacing={1} direction="row">
                <Button
                    variant="contained"
                    disableRipple={true}
                    onClick={() => dispatch(clearBoard())}>
                    Очистить доску
                </Button>
                <Button
                    variant="contained"
                    disableRipple={true}
                    onClick={() => dispatch(createNewGeneration())}>
                    Создать поколение
                </Button>
            </Stack>
            <Player />
        </div>
    )
}

ControlPanel.propTypes = {
    toggleShouldShowPrediction: PropTypes.func,
    shouldShowPrediction: PropTypes.bool,
    toggleShouldShowNumberOfAliveNeighbors: PropTypes.func,
    shouldShowNumberOfAliveNeighbors: PropTypes.bool
}
