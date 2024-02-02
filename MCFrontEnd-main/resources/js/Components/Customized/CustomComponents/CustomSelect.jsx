import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

export const CustomSelect = ({ label, name, value, onChange, list, error, sx = {}, helperText = "" }) => {
  return (
    <FormControl fullWidth>
      <InputLabel sx={sx} id={ label }>{ label }</InputLabel>
      <Select
        labelId={ label }
        label={ label }
        name={ name }
        value={ value }
        onChange={ onChange }
        defaultValue = ""
        error={ error }
        sx={ sx }
      >
        {list?.map((elem) => (
          <MenuItem key={ elem.nombre } value={ elem.id }>
            { elem.nombre }
          </MenuItem>
        ))}
      </Select>
      {
        helperText.length > 0
        ? ( <FormHelperText sx={{ color: '#d32f2f' }}>{ helperText }</FormHelperText> )
        : ( <></> )
      }
    </FormControl>
  );
};
