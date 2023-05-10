import { Slider } from '@mui/material'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { initialSpeedRatio } from '../Player'

export function SliderOfGameSpeed({ handleSpeedChange }) {
    const [speed, setSpeed] = useState(initialSpeedRatio)

    const handleChange = (e, newSpeed) => {
        if (speed !== newSpeed) {
            setSpeed(newSpeed)
            handleSpeedChange(newSpeed)
        }
    }

    return (
        <Slider
            size="small"
            value={speed}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0.5}
            max={6}
            step={0.5}
            marks={true}
            track={false}
            valueLabelFormat={(value) => `x ${value}`}
        />
    )
}

SliderOfGameSpeed.propTypes = {
    handleSpeedChange: PropTypes.func
}
