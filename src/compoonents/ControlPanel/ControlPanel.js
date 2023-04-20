import { clearBoard } from '../../store/boardSlice/boardSlice'
import { useDispatch } from 'react-redux'

import { SliderOfCondition } from '../Sliders/'
import {
    selectorOfSurvivingConditions,
    setCellsSurvivingConditions,
} from '../../store/ConditionsSlice/survivingConditionsSlice'
import {
    selectorOfCreationConditions,
    setCellsCreationConditions,
} from '../../store/ConditionsSlice/creationConditionsSlice'

import { createNewGeneration } from '../../store/boardSlice/createNewGeneration'
import { CheckboxOfShouldShow } from '../CheckBox'
import { Player } from '../Player'
import { Button, Stack } from '@mui/material'
import { EMPHASIZE_ALL_OUTSIDE, EMPHASIZE_CHOSEN_RANGE } from '../Sliders/style'

export function ControlPanel({
    toggleShouldShowPrediction,
    shouldShowPrediction,
    toggleShouldShowNumberOfAliveNeighbors,
    shouldShowNumberOfAliveNeighbors,
}) {
    const dispatch = useDispatch()

    return (
        <div
            css={`
                 {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    background: #134c89;
                    border-radius: 3px;
                    border: 2px solid palevioletred;
                    margin: 1em;
                    padding: 0.25em 1em;
                    flex-grow: 1;
                }
            `}>
            <SliderOfCondition
                selector={selectorOfSurvivingConditions}
                actionOnChange={setCellsSurvivingConditions}
                label={'Диапазон Выживания:'}
                shouldShowPrediction={shouldShowPrediction}
                emphasizedPart={EMPHASIZE_ALL_OUTSIDE}
            />
            <SliderOfCondition
                selector={selectorOfCreationConditions}
                actionOnChange={setCellsCreationConditions}
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
