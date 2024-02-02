import React, { useState, useEffect } from 'react';
import { TextField, Stack, Grid, FormHelperText, Typography, Button, Box } from '@mui/material';
import dayjs from 'dayjs';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import CheckIcon from '@mui/icons-material/Check';

import { CustomSelect } from '@/Components/Customized/CustomComponents/CustomSelect';
import { CustomDatePicker } from '../CustomDatePicker';
import { CustomGeocoder } from '../CustomGeocoder';
import Swal from 'sweetalert2';

import elMovimientoEscucha from './el-movimiento-escucha.png';
import laQuincena from './la-quincena.png';
import picnicNaranja from './picnic-naranja.png';
import pintaElFuturo from './pinta-el-futuro.png';
import escuelaNaranja from './escuela-naranja.png';
import barrioNaranja from './barrio-naranja.png';
import mercaditoNaranja from './mercadito-naranja.png';
import casasNaranjas from './casas-naranjas.png';

const colourMapping = {
    'el-movimiento-escucha': 'linear-gradient(90deg, rgba(26,255,216,1) 0%, rgba(11,255,213,1) 100%)',
    'la-quincena': 'linear-gradient(90deg, rgba(30,168,255,1) 0%, rgba(11,161,255,1) 100%)',
    'picnic-naranja': 'linear-gradient(90deg, rgba(143,119,255,1) 0%, rgba(100,66,255,1) 100%)',
    'pinta-el-futuro': 'linear-gradient(90deg, rgba(255,197,66,1) 0%, rgba(251,154,0,1) 100%)',
    'escuela-naranja': 'linear-gradient(90deg, rgba(255,137,116,1) 0%, rgba(254,68,95,1) 100%)',
    'barrio-naranja': 'linear-gradient(90deg, rgba(255,95,192,1) 0%, rgba(227,0,255,1) 100%)',
    'mercadito-naranja': 'linear-gradient(90deg, rgba(188,53,255,1) 0%, rgba(145,0,255,1) 100%)',
    'casas-naranjas': 'linear-gradient(90deg, rgba(255,88,237,1) 0%, rgba(255,38,143,1) 100%)'
}

const colourCardMapping = {
    'el-movimiento-escucha': 'linear-gradient(90deg, rgba(26,255,216,0.2) 0%, rgba(11,255,213,0.2) 100%)',
    'la-quincena': 'linear-gradient(90deg, rgba(30,168,255,0.2) 0%, rgba(11,161,255,0.2) 100%)',
    'picnic-naranja': 'linear-gradient(90deg, rgba(143,119,255,0.2) 0%, rgba(100,66,255,0.2) 100%)',
    'pinta-el-futuro': 'linear-gradient(90deg, rgba(255,197,66,0.2) 0%, rgba(251,154,0,0.2) 100%)',
    'escuela-naranja': 'linear-gradient(90deg, rgba(255,137,116,0.2) 0%, rgba(254,68,95,0.2) 100%)',
    'barrio-naranja': 'linear-gradient(90deg, rgba(255,95,192,0.2) 0%, rgba(227,0,255,0.2) 100%)',
    'mercadito-naranja': 'linear-gradient(90deg, rgba(188,53,255,0.2) 0%, rgba(145,0,255,0.2) 100%)',
    'casas-naranjas': 'linear-gradient(90deg, rgba(255,88,237,0.2) 0%, rgba(255,38,143,0.2) 100%)'
}

const colourShadowMapping = {
    'el-movimiento-escucha': 'rgba(11,255,213,0.2)',
    'la-quincena': 'rgba(11,161,255,0.2)',
    'picnic-naranja': 'rgba(100,66,255,0.2)',
    'pinta-el-futuro': 'rgba(251,154,0,0.2)',
    'escuela-naranja': 'rgba(254,68,95,0.2)',
    'barrio-naranja': 'rgba(227,0,255,0.2)',
    'mercadito-naranja': 'rgba(145,0,255,0.2)',
    'casas-naranjas': 'rgba(255,38,143,0.2)'
}

const imageMapping = {
    'el-movimiento-escucha': elMovimientoEscucha,
    'la-quincena': laQuincena,
    'picnic-naranja': picnicNaranja,
    'pinta-el-futuro': pintaElFuturo,
    'escuela-naranja': escuelaNaranja,
    'barrio-naranja': barrioNaranja,
    'mercadito-naranja': mercaditoNaranja,
    'casas-naranjas': casasNaranjas,
}

const card = {
    border: '0.3px solid #eee ',
    width: '100%',
    borderRadius: '1rem',
    padding: '1rem',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center'
};

export const PreguntasOchoAcciones = (props) => {
    const { preguntas, setPreguntas } = props;
    return (
        preguntas.map(({ nombre, name }, index) => (
            <React.Fragment key={nombre}>
                <TextField
                    fullWidth
                    label={nombre}
                    name={ name }
                    value={ preguntas[index].value }
                    color="primary"
                    onChange={
                        (event) => setPreguntas(
                            preguntas.map((pregunta) => pregunta.name == name
                                ? { ...pregunta, value : event.target.value }
                                : pregunta
                            )
                        )
                    }
                    style={{
                        width: '100%',
                    }}
                />
            </React.Fragment>
        ))
    );
};

export const OchoAccionesItem = ({ title, color, cardColor, shadowColor, img, selected }) => {
    return (
        <Box sx={ {...card, boxShadow: `0px 0px 5px 1px ${shadowColor}` } } style={ selected ? { background: color } : {} }>
            <Box sx={{ position: 'absolute', top: -20, left: -10, right: -10, height: 30 }} style={{ background: color }}>
            </Box>
            <Box style={{ maxWidth: 55, padding: '.5rem',zIndex: 4 }}>
                <img style={{ filter: selected ? 'unset' : 'invert(100%)', opacity: selected ? 1 : 0.7 }} src={img} alt={title}></img>
            </Box>
            {
                selected ?
                    <>
                        <Box sx={{ position: 'absolute', right: '-2rem', top: '-2rem', width: 120, height: 120, borderRadius: '50%', opacity: 0.5 }} style={{ background: color }}></Box>
                        <Box sx={{ position: 'absolute', right: '-3rem', top: '-3rem', width: 80, height: 80, borderRadius: '50%', opacity: 0.5}} style={{ background: color }}></Box>
                        <Box sx={{ position: 'absolute', right: '.1rem', top: '.2rem', width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }} style={{ color: 'white' }}><CheckIcon /></Box>
                    </> : null
            }
            <Box style={{zIndex: 4}}>
                <h4 style={{color: selected ? 'white' : '#555', fontWeight: 'bolder'}}>{ title.toUpperCase() }</h4>
            </Box>
        </Box>
    );
};

export const OchoAccionesList = (props) => {
    const { listaCatalogoOchoAcciones, acciones, form, setForm } = props;

    const handleClick = (grupo) => {
        if (acciones.includes(grupo.id))
            setForm({
                ...form,
                acciones: acciones.filter((row) => row != grupo.id )
            })
        else
            setForm({
                ...form,
                acciones: [...acciones, grupo.id]
            });
    };

    return (
        listaCatalogoOchoAcciones.map((grupo) => {
            return (
                <React.Fragment key={ grupo.nombre }>
                    <Grid xs={12} sm={6} md={6} item onClick={ () => { handleClick(grupo) } }>
                        <OchoAccionesItem
                            title={ grupo.nombre }
                            color={ colourMapping[grupo.nombre.replaceAll(' ', '-').toLowerCase()] }
                            cardColor={ colourCardMapping[grupo.nombre.replaceAll(' ', '-').toLowerCase()] }
                            shadowColor={ colourShadowMapping[grupo.nombre.replaceAll(' ', '-').toLowerCase()] }
                            img={ imageMapping[grupo.nombre.replaceAll(' ', '-').toLowerCase()] }
                            selected={ acciones.includes(grupo.id) }
                        />
                    </Grid>
                </React.Fragment>
            );
        })
    );
};

export const useFormOchoAcciones = () => {
    const [listaGeneros, setListaGeneros] = useState([]);
    const [listaCatalogoOchoAcciones, setListaCatalogoOchoAcciones] = useState([]);
    const [listaCatalogoPreguntasOchoAcciones, setListaCatalogoPreguntasOchoAcciones] = useState([]);

    useEffect(() => {
        fetch(route('get.ocho.acciones.catalogos'), { method: 'get' })
            .then((res) => res.json())
            .then((res) => {
                setListaGeneros(res.response.generos);
                setListaCatalogoOchoAcciones(res.response.catalogoOchoAcciones)

                const result = res.response.catalogoPreguntasOchoAcciones
                const newResult = result.map((row, index) => {
                    return {
                        ...row,
                        name: `pregunta-${index + 1}`,
                        value: ''
                    };
                });
                setListaCatalogoPreguntasOchoAcciones(newResult)
            })
    }, []);

    const [form, setForm] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        genero: '',
        escolaridad: '',
        motivo: '',
        habilidades: [],
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
        intereses: {},
        acciones: [],
        fechaNacimiento: dayjs(new Date()),
        validacion: {
            nombre: false,
            apellidoPaterno: false,
            genero: false,
            escolaridad: false,
            motivo: false,
            estado: false,
            direccion: false,
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
        motivo,
        habilidades,
        estado,
        direccion,
        direccionObjeto,
        lat,
        lng,
        numeroCalle,
        calle,
        pais,
        codigoPostal,
        intereses,
        acciones,
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
        motivo: validoMotivo,
        estado: validoEstado,
        direccion: validoDireccion,
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
                    escolaridadId: null,
                    motivoId: null,
                    habilidadIds: [],
                    interesIds: [],
                    accionIds: acciones,
                    entidadFederativaId: res.response.id,
                    preguntas: listaCatalogoPreguntasOchoAcciones.map((pregunta) => ({
                        preguntaId: pregunta.id,
                        respuesta: pregunta.value
                    })),
                    direccion,
                    fechaNacimiento: fechaNacimiento.toISOString(),
                };


                const formData = new FormData();
                formData.append('data', JSON.stringify(nuevoForm));

                /** FETCH */
                fetch(route('post.ocho.acciones'), { method: 'post', body: formData })
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
            'id': 4,
            'label': 'Las 8 acciones y dar de alta',
            'validInputsList': [
            ],
            'data': (
                <>
                    <Stack spacing={2}>
                        <Grid container spacing={{ xs: 1, md: 2, }} columns={{ xs: 6, sm: 6, md: 12 }}>
                            <OchoAccionesList
                                listaCatalogoOchoAcciones={ listaCatalogoOchoAcciones }
                                acciones={ acciones }
                                form={ form }
                                setForm={ setForm }
                            />
                        </Grid>
                    </Stack>
                    <br />
                    <Stack spacing={2}>
                        <PreguntasOchoAcciones
                            preguntas={ listaCatalogoPreguntasOchoAcciones }
                            setPreguntas={ setListaCatalogoPreguntasOchoAcciones }
                        />
                    </Stack>
                </>
            ),
        },
    ];

    const icons = {
        1: <AccountCircleIcon />,
        2: <ShareLocationIcon />,
        3: <ReduceCapacityIcon />
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
