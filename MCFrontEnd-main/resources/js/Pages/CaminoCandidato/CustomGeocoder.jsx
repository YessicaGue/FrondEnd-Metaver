import { useState, useEffect, useMemo, useRef } from 'react';
import { Box, TextField, Autocomplete, Grid, Typography } from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';

const autocompleteService = { current: null };

export const CustomGeocoder = (props) => {
    const {
        label,
        value: inputValue,
        object: value,
        onChange,
        onInputChange
    } = props;

    const [options, setOptions] = useState([]);

    const fetch = useMemo(() =>
        debounce((request, callback) => {
            request.componentRestrictions = {country: 'mx'};
            autocompleteService.current.getPlacePredictions(request, callback);
        }, 400),
        [],
    );

    useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google)
            autocompleteService.current = new window.google.maps.places.AutocompleteService(options);

        if (!autocompleteService.current)
            return undefined;

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (value)
                    newOptions = [value];

                if (results)
                    newOptions = [...newOptions, ...results];

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Autocomplete
            getOptionLabel={(option) => typeof option === 'string' ? option : option.description}
            filterOptions={(x) => x}
            options={ options }
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={ value }
            noOptionsText="Escribe tu dirección"
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                onChange(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                onInputChange(newInputValue)
            }}
            renderInput={(params) => (
                <TextField
                    fullWidth
                    color="primary"
                    label={ label }
                    {...params}
                />
            )}
            renderOption={(props, option) => {
                const matches = option.structured_formatting.main_text_matched_substrings || [];

                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length]),
                );

                return (
                    <li {...props}>
                        <Grid
                            container
                            alignItems="center"
                        >
                            <Grid item sx={{ display: 'flex', width: 44 }}></Grid>

                            <Grid
                                item
                                sx={{
                                    width: 'calc(100% - 44px)',
                                    wordWrap: 'break-word'
                                }}
                            >
                                {
                                    parts.map((part, index) => (
                                        <Box
                                            key={ index }
                                            component="span"
                                            sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                        >
                                            { part.text }
                                        </Box>
                                    ))
                                }

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    { option.structured_formatting.secondary_text }
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
}
