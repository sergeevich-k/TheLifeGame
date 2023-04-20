import { Checkbox, FormControlLabel } from '@mui/material'

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
