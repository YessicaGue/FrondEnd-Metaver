import React from 'react';
import { TextField, Autocomplete, Chip, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const CustomAutoComplete = ({ name, options, label, onChange, value }) => {
    return (
        <Autocomplete
            fullWidth
            multiple
            name={ name }
            options={ options }
            getOptionLabel={(option) => option.nombre}
            value={ value }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            disableCloseOnSelect
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={ icon }
                        checkedIcon={ checkedIcon }
                        style={{ marginRight: 8 }}
                        checked={ selected }
                    />
                    {option.nombre}
                </li>
            )}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip color='primary' variant="filled" label={ option.nombre } {...getTagProps({ index })} />
                ))
            }
            renderInput={ (params) => <TextField inputProps={{ readOnly: true }} color="primary" {...params} label={ label } /> }
            onChange={ onChange }
        />
    );
};
