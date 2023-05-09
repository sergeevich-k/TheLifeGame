import { ControlPanel } from '../ControlPanel'
import { Board } from '../Board'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewGeneration } from '../../store/boardSlice/createNewGeneration'
import { clearBoard } from '../../store/boardSlice/boardSlice'
import {
    fontFirstColor,
    fontGreyerColor,
    fontSecondColor,
    fontColor
} from './style'

const useKeyboardBinding = () => {
    const dispatch = useDispatch()
    const onVKeyDown = (event) => {
        const pressedKey = event.key.toLowerCase()
        if (pressedKey === 'n' || pressedKey === 'т')
            dispatch(createNewGeneration())
    }
    const onCKeyDown = (event) => {
        const pressedKey = event.key.toLowerCase()
        if (pressedKey === 'v' || pressedKey === 'м') dispatch(clearBoard())
    }

    useEffect(() => {
        window.addEventListener('keydown', onVKeyDown)
        window.addEventListener('keydown', onCKeyDown)
        return () => {
            window.removeEventListener('keydown', onVKeyDown)
            window.removeEventListener('keydown', onCKeyDown)
        }
    })
}

export function TheLifeGame() {
    useKeyboardBinding()

    const [shouldShowPrediction, setShouldShowPrediction] = useState(false)
    const [
        shouldShowNumberOfAliveNeighbors,
        setShouldShowNumberOfAliveNeighbors
    ] = useState(false)

    const toggleShouldShowPrediction = () => {
        setShouldShowPrediction(!shouldShowPrediction)
    }
    const toggleShouldShowNumberOfAliveNeighbors = () => {
        setShouldShowNumberOfAliveNeighbors(!shouldShowNumberOfAliveNeighbors)
    }

    return (
        <div
            css={`
                 {
                    background: #17487c;
                    border-radius: 3px;
                    border: 2px solid ${fontGreyerColor};
                    color: ${fontColor};
                    margin: 0 1em;
                    padding: 0.25em 1em;
                    display: flex;
                    font-size: 1.05em;
                    letter-spacing: 0.02857em;
                }
            `}>
            <ControlPanel
                toggleShouldShowPrediction={toggleShouldShowPrediction}
                shouldShowPrediction={shouldShowPrediction}
                toggleShouldShowNumberOfAliveNeighbors={
                    toggleShouldShowNumberOfAliveNeighbors
                }
                shouldShowNumberOfAliveNeighbors={
                    shouldShowNumberOfAliveNeighbors
                }
            />
            <Board
                shouldShowPrediction={shouldShowPrediction}
                shouldShowNumberOfAliveNeighbors={
                    shouldShowNumberOfAliveNeighbors
                }
            />
        </div>
    )
}
