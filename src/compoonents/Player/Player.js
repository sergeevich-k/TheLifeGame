import { IconButton, Stack } from '@mui/material'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import { useDispatch } from 'react-redux'

import { createNewGeneration } from '../../store/boardSlice/createNewGeneration'
import { useRef, useState } from 'react'
import { SliderOfGameSpeed } from '../Sliders/SliderOfGameSpeed'

export const Player = () => {
    const dispatch = useDispatch()
    const intervalIdRef = useRef(0)
    const speedRatioRef = useRef(1)
    const [doesGameGo, setDoesGameGo] = useState(false)

    const startTheGame = () => {
        if (intervalIdRef.current !== 0) return
        intervalIdRef.current = setInterval(
            () => dispatch(createNewGeneration()),
            1000 / speedRatioRef.current
        )
        setDoesGameGo(true)
    }
    const endTheGame = () => {
        clearInterval(intervalIdRef.current)
        intervalIdRef.current = 0
        setDoesGameGo(false)
    }
    const handleSpeedChange = (newSpeedRatio) => {
        speedRatioRef.current = newSpeedRatio
        if (!doesGameGo) return

        clearInterval(intervalIdRef.current)
        intervalIdRef.current = setInterval(
            () => dispatch(createNewGeneration()),
            1000 / speedRatioRef.current
        )
    }

    return (
        <Stack
            spacing={0}
            direction="row"
            justifyContent="flex-start"
            alignItems="center">
            <IconButton
                onClick={doesGameGo ? endTheGame : startTheGame}
                color="primary">
                {doesGameGo ? (
                    <StopCircleIcon sx={{ fontSize: 60 }} />
                ) : (
                    <PlayCircleIcon sx={{ fontSize: 60 }} />
                )}
            </IconButton>
            <SliderOfGameSpeed
                doesGameGo={doesGameGo}
                handleSpeedChange={handleSpeedChange}
            />
        </Stack>
    )
}
