import {useDispatch, useSelector} from "react-redux";
import {Slider} from "@mui/material";
import {useState} from "react";


export function SliderOfGameSpeed({ handleSpeedChange }) {
    const [speed, setSpeed] = useState(1)

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
            max={4}
            step={0.5}
            marks={true}
            track={false}
            valueLabelFormat={(value) => `x ${value}`}
        />
    )
}
