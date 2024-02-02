import * as React from 'react';
import { Box, TextField, Autocomplete, Grid, Typography } from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';

const GOOGLE_MAPS_API_KEY = 'AIzaSyC1wdZv-4Y09fSIV7E-729dwzGFzI5Dq6A';

function loadScript(src, position, id) {
  if(!position)
    return;

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

export const CustomGeocoder = ({ label, name, object, form, setForm }) => {
  const { direccionObjeto: value } = form;
  const { direccion: inputValue } = form;
  const { validacion } = form;
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=Function.prototype`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        request.componentRestrictions = {country: 'mx'};
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService(options);
    }

    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    if(loaded.current && value && value.place_id){
      const geocoder = new window.google.maps.Geocoder();
      geocoder
        .geocode({ placeId: value.place_id || '' })
        .then(({ results }) => {
          const [{ address_components, geometry }] = results;
          const lat = geometry.location.lat();
          const lng = geometry.location.lng();

          const [{ long_name: numeroCalle } = { long_name: '' }] = address_components.filter((element) => element.types.includes('street_number'));
          const [{ long_name: calle } = { long_name: '' }] = address_components.filter((element) => element.types.includes('route'));
          const [{ long_name: estado } = { long_name: '' }] = address_components.filter((element) => element.types.includes('administrative_area_level_1'));
          const [{ long_name: pais } = { long_name: '' }] = address_components.filter((element) => element.types.includes('country'));
          const [{ long_name: codigoPostal } = { long_name: '' }] = address_components.filter((element) => element.types.includes('postal_code'));

          if (estado.length <= 0 || pais.length <= 0 || pais !== 'México')
            return setForm({
              ...form,
              validacion: {
                ...validacion,
                estado: false
              },
            })

          setForm({
            ...form,
            lat,
            lng,
            numeroCalle,
            calle,
            estado,
            pais,
            direccion: results[0].formatted_address,
            codigoPostal,
            validacion: {
              ...validacion,
              estado: true
            },
          })
        })
        // .catch((e) => {});
    }

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={ value }
      noOptionsText="Escribe tu dirección"
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setForm({
          ...form,
          [ object ]: newValue
        });
        
      }}
      onInputChange={(event, newInputValue) => {
        setForm({
          ...form,
          [ name ]: newInputValue
        });
        // setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField color="primary" {...params} label={ label } fullWidth />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                {/* <LocationOnIcon sx={{ color: 'text.secondary' }} /> */}
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
