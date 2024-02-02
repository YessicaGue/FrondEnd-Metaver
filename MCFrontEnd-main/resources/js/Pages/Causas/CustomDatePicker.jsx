import React from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider, esES, DatePicker} from '@mui/x-date-pickers/';
import {TextField} from '@mui/material';
import 'dayjs/locale/es';

export const CustomDatePicker = (props) => {

    return (
        <LocalizationProvider
            adapterLocale="es"
            localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
            dateAdapter={AdapterDayjs}
        >
            <DatePicker
                {...props}
                renderInput={(params) => <TextField fullWidth {...params} />}
            />
        </LocalizationProvider>
    );
};
