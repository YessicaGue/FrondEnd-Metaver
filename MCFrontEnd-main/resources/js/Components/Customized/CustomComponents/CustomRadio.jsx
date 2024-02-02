import * as React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

export const CustomRadio = (props) => {
    const { label, list, value, onChange, name } = props;
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">{ label }</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                {
                    list.map(
                        (el, index) => 
                            <FormControlLabel
                                key={ el.value }
                                value={ el.value }
                                name={ name }
                                control={ <Radio checked={ el.value === value } /> }
                                label={ el.label }
                                onChange={ onChange }
                            />
                    )
                }
            </RadioGroup>
        </FormControl>
    );
};
