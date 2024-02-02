import React, { useState, useEffect } from 'react';
import { TextField, Stack, Grid, FormHelperText, Typography, Button } from '@mui/material';
import dayjs from 'dayjs';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';

import { CustomSelect } from '@/Components/Customized/CustomComponents/CustomSelect';
import { CustomAutoComplete } from '@/Components/Customized/CustomComponents/CustomAutoComplete';
import { CustomDatePicker } from '../CustomDatePicker';
import { CustomGeocoder } from '../CustomGeocoder';
import Swal from 'sweetalert2';

export const useFormCausas = () => {
    const [listaGeneros, setListaGeneros] = useState([]);
    const [listaEscolaridades, setListaEscolaridades] = useState([]);
    const [listaCausas, setListaCausas] = useState([]);

    useEffect(() => {
        fetch(route('get.causas.catalogos'), { method: 'get' })
        .then((res) => res.json())
        .then((res) => {
            setListaGeneros(res.response.generos)
            setListaEscolaridades(res.response.escolaridades)
            setListaCausas(res.response.causas)
        })
    }, []);

    const [form, setForm] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        genero: '',
        escolaridad: '',
        estado: '',
        direccion: '',
        direccionObjeto: null,
        lat: 0,
        lng: 0,
        numeroCalle: '',
        calle: '',
        ciudad: '',
        pais: '',
        codigoPostal: '',
        causas: [],
        fechaNacimiento: dayjs(new Date()),
        validacion: {
          nombre: false,
          apellidoPaterno: false,
          genero: false,
          estado: false,
          direccion: false,
          causa: false
        },
        stepOneSubmitted: false,
        stepTwoSubmitted: false,
        stepThreeSubmitted: false,
        stepFourSubmitted: false,
        submitted: false,
      });
    const [mayorEdad, setMayorEdad] = useState(false);

    const { 
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        genero,
        escolaridad,
        estado,
        direccion,
        direccionObjeto,
        lat,
        lng,
        numeroCalle,
        calle,
        pais,
        codigoPostal,
        causas,
        fechaNacimiento,
        submitted,
        stepOneSubmitted,
        stepTwoSubmitted,
        stepThreeSubmitted,
        stepFourSubmitted,
        validacion
    } = form;

    const {
        nombre: validoNombre,
        apellidoPaterno: validoApellidoPaterno,
        genero: validoGenero,
        escolaridad: validoEscolaridad,
        estado: validoEstado,
        direccion: validoDireccion,
        causas: validoCausas,
    } = validacion;

    const handleChange = (event) => {
        const { target: { value, name } } = event;
        setForm({
            ...form,
            validacion: {
                ...validacion,
                [ name ]: value?.length > 0 || value > 0
            },
            [ name ]: value
        });
    };

    const handleSubmit = (event) => {
        setForm({
            ...form,
            submitted: true
        })
        const { validacion } = { ...form };

        const invalido = Object.values(validacion).some((input) => input == false);
        if(!invalido) return;

        fetch(route('get.entidad', {nombre: estado}), { method: 'get' })
        .then((res) => res.json())
        .then((res) => {
            if (res.success !== true) return;

            const nuevoForm = {
                nombre,
                apellidoPaterno,
                apellidoMaterno,
                generoId: genero,
                escolaridadId: escolaridad,
                causaIds: causas.map((causa) => causa.id),
                entidadFederativaId: res.response.id,
                direccion,
                fechaNacimiento: fechaNacimiento.toISOString(),
              };

        
            const formData = new FormData();
            formData.append('data', JSON.stringify(nuevoForm));
        
            /** FETCH */
            fetch(route('post.causa'), { method: 'post', body: formData }) //////////////////////////////////////////////////////////////////////////
            .then(res => res.json())
            .then(async res => {
                await Swal.fire('Enhorabuena', 'Te has registrado exitosamente como voluntario');
        
                location.href = "/";
            })
            .catch(() => {})
        });
    };

    const set = [
        {
            'id': 1,
            'label': 'Datos personales',
            'validInputsList': [
                validoNombre, validoApellidoPaterno, validoGenero, mayorEdad
            ],
            'data': (
                <Stack spacing={2}>
                <TextField fullWidth
                    label="Nombre"
                    name="nombre"
                    color="primary"
                    value={ nombre }
                    onChange={ handleChange }
                    error={ stepOneSubmitted && nombre.length <= 0 }
                    helperText={ stepOneSubmitted && nombre.length <= 0 ? 'Este campo es obligatorio' : '' }
                />
                <TextField fullWidth
                    label="Apellido paterno"
                    name="apellidoPaterno"
                    color="primary"
                    value={ apellidoPaterno }
                    onChange={ handleChange }
                    error={ stepOneSubmitted && apellidoPaterno.length <= 0 }
                    helperText={ stepOneSubmitted && apellidoPaterno.length <= 0 ? 'Este campo es obligatorio' : '' }
                />
                <TextField fullWidth
                    label="Apellido materno (opcional)"
                    name="apellidoMaterno"
                    color="primary"
                    value={ apellidoMaterno }
                    onChange={ handleChange }
                />
                <CustomDatePicker
                    label="Fecha de nacimiento"
                    name="fechaNacimiento"
                    inputFormat="DD/MM/YYYY"
                    value={ fechaNacimiento }
                    onChange={ 
                    (value) => {
                        const fechaTimestamp = new Date(value)?.getTime() ?? null;
                        const fechaActualTimestamp = new Date().getTime();
                        const anio = new Date(fechaActualTimestamp).getFullYear();

                        const esBisiesto = ( anio % 400 === 0 ) 
                                                ? true
                                                : ( anio % 100 === 0 )
                                                    ? false
                                                    : anio % 4 === 0;

                        if( fechaTimestamp )
                            setMayorEdad( (Math.floor((fechaActualTimestamp - fechaTimestamp) / ( esBisiesto ? 366 : 365 * 24 * 60 * 60 * 1000))) >= 18 );
                        setForm({ ...form, fechaNacimiento: value })
                    }
                    }
                />
                {
                    stepOneSubmitted && mayorEdad === false
                        ?   <FormHelperText style={{ color: '#d32f2f', marginTop: 3, marginLeft: 10 }}>Debes cumplir la mayoría de edad para participar</FormHelperText>
                        :   null
                }
                {
                    stepOneSubmitted && fechaNacimiento === null
                        ?   <FormHelperText style={{ color: '#d32f2f', marginTop: 3, marginLeft: 10 }}>Este campo es obligatorio</FormHelperText>
                        :   null
                }
                <CustomSelect
                    label="Género"
                    name="genero"
                    value={ genero }
                    onChange={ handleChange }
                    error={ stepOneSubmitted && genero.length <= 0 }
                    helperText={ stepOneSubmitted && genero.length <= 0 ? 'Este campo es obligatorio' : '' }
                    list={ listaGeneros }
                />
                </Stack>
            ),
        },
        {
            'id': 2,
            'label': 'Ubicación',
            'validInputsList': [
                validoEstado
            ],
            'data': (
                <Stack spacing={2}>
                <CustomGeocoder
                    label="Dirección"
                    name="direccion"
                    object="direccionObjeto"
                    form={ form }
                    setForm={ setForm }
                />
                {
                    stepTwoSubmitted && validoEstado === false
                        ?   <FormHelperText style={{ color: '#d32f2f', marginTop: 3, marginLeft: 10 }}>La dirección que elegiste no es válida</FormHelperText>
                        :   null
                }
                {/* <CustomMap
                /> */}
                </Stack>
            ),
        },
        {
            'id': 3,
            'label': 'Desarrollo y habilidades',
            'validInputsList': [
                validoEscolaridad
            ],
            'data': (
                <Stack spacing={2}>
                    <CustomSelect
                        label="Escolaridad"
                        name="escolaridad"
                        value={ escolaridad }
                        onChange={ handleChange }
                        error={ (submitted || stepThreeSubmitted) && escolaridad.length <= 0 }
                        helperText={ (submitted || stepThreeSubmitted) && escolaridad.length <= 0 ? 'Este campo es obligatorio' : '' }
                        list={ listaEscolaridades }
                    />
                    <CustomAutoComplete
                        label="Causas"
                        name="causas"
                        freeSolo={ true }
                        checkboxes={ false }
                        options={ listaCausas }
                        value={ causas }
                        onChange={ (event, value) => setForm({ ...form, causas: value }) }
                    />
                </Stack>
              ),
        }
    ];

    const icons = {
        1: <AccountCircleIcon />,
        2: <ShareLocationIcon />,
        3: <ModelTrainingIcon />
    };

    return {
        set,
        icons,
        handleChange,
        handleSubmit,
        setForm,
        form
    }
};
