import { Checkbox, FormControlLabel } from '@mui/material'
import PropTypes from 'prop-types'

export function CheckboxOfShouldShow({ checked, onChange, label }) {
    return (
        <FormControlLabel
            label={label}
            checked={checked}
            disableTypography={true}
            control={<Checkbox onChange={onChange} />}
        />
    )
}

CheckboxOfShouldShow.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string
}
