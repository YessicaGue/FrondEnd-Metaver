import React, { useState, useEffect } from 'react';
import { TextField, Stack, Grid, FormHelperText, Typography, Button } from '@mui/material';
import dayjs from 'dayjs';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import RecommendIcon from '@mui/icons-material/Recommend';
import { AttachMoney, CameraAlt, ChangeHistory, ConnectingAirports, Yard, OutdoorGrill } from '@mui/icons-material';

import { CustomSelect } from '@/Components/Customized/CustomComponents/CustomSelect';
import { CustomAutoComplete } from '@/Components/Customized/CustomComponents/CustomAutoComplete';
import { CustomDatePicker } from '../CustomDatePicker';
import { CustomGeocoder } from '../CustomGeocoder';
import { CustomModal } from '../CustomModal';
import Swal from 'sweetalert2';

const icons = {
  'Economía': <AttachMoney color='primary' />,
  'Fotografía': <CameraAlt color='primary' />,
  'Viajes': <ConnectingAirports color='primary' />,
  'Medio ambiente': <Yard color='primary' />,
  'Cocina': <OutdoorGrill color='primary' />
};

export const InteresesItem = ({ icon, title, count }) => {
    return (
        <div className='w-full bg-[#e0e0e0] shadow-md p-4 cursor-pointer rounded-lg flex flex-col gap-2 hover:shadow-xl transform hover:translate-y-[-5px] transition-all'>
            <div className='w-[40px] h-[40px] bg-[#eee] rounded-xl flex justify-center items-center'>
                { icon }
            </div>
            <div>
                <h4>{ title }</h4>
                <small>{ count } { count !== 1 ? 'intereses seleccionados' : 'interés seleccionado' }</small>
            </div>
        </div>
    );
};

export const InteresesList = ({ form, setForm, listaGruposIntereses }) => {
    const [listaGrupos, setListaGrupos] = useState({});
    const [grupoSeleccionado, setGrupoSeleccionado] = useState({});
    const [sublistaIntereses, setSublistaIntereses] = useState([]);
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
        if (Object.keys(listaGrupos).length && Object.keys(listaGrupos).length > 0) return;
        listaGruposIntereses.forEach((grupo) => {
            setListaGrupos({ ...listaGrupos, [grupo.nombre]: { id: grupo.id, nombre: grupo.nombre } });
        });
    }, []);
  
        const handleOpen = (grupo) => {
        setOpen(true);
        setGrupoSeleccionado(grupo);
        fetch(route('get.intereses.by.grupo', {id: grupo.id}), { method: 'get' })
        .then((res) => res.json())
        .then((res) => {
            setSublistaIntereses(res.response.map((row) => ({id: row.interes.id, nombre: row.interes.nombre})));
        })
    };
  
    const handleSeleccion = (event, value, grupo) => {
        setListaGrupos({ ...listaGrupos, [grupo.nombre]: value });
    };
  
    const handleButton = () => {
        setForm({
            ...form,
            intereses: listaGrupos
        })
        setOpen(false);
    };
  
    return (
        listaGruposIntereses.map((grupo) => (
            <React.Fragment key={ grupo.nombre }>
                <div onClick={ () => { handleOpen(grupo) } }>
                    <InteresesItem
                        icon={ icons[grupo.nombre] || <ChangeHistory color='primary' /> }
                        title={ grupo.nombre }
                        count={ listaGrupos[grupo.nombre]?.length ?? 0 }
                    />
                </div>
                <CustomModal
                    open={ open }
                    setOpen={ setOpen }
                >
                    <Typography mb={2}>
                        Selecciona tus intereses de 
                        <span style={{ textTransform: 'lowercase', fontWeight: 'bolder' }}>
                            { grupoSeleccionado.nombre }
                        </span>
                    </Typography>
                    <CustomAutoComplete
                        label="Intereses"
                        name={grupoSeleccionado.nombre}
                        options={ sublistaIntereses || [] }
                        value={ listaGrupos[grupoSeleccionado.nombre] ?? [] }
                        onChange={ (event, value) => handleSeleccion(event, value, grupoSeleccionado) }
                    />
                    <Button onClick={handleButton} sx={{ backgroundColor: '#ff7801', width: '100%', margin: '2rem 0 0 0' }} variant="contained">
                        Aceptar
                    </Button>
                </CustomModal>
            </React.Fragment>
        ))
    );
  };

export const useFormVoluntarios = () => {
    const [listaGeneros, setListaGeneros] = useState([]);
    const [listaEscolaridades, setListaEscolaridades] = useState([]);
    const [listaMotivos, setListaMotivos] = useState([]);
    const [listaHabilidades, setListaHabilidades] = useState([]);
    const [listaGruposIntereses, setListaGruposIntereses] = useState([]);
    const [listaIntereses, setListaIntereses] = useState([]);
    const regexNumeroTelefono = /^[0-9]+$/;
    const regexCorreoElectronico = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    useEffect(() => {
        fetch(route('get.voluntarios.catalogos'), { method: 'get' })
        .then((res) => res.json())
        .then((res) => {
            setListaGeneros(res.response.generos)
            setListaEscolaridades(res.response.escolaridades)
            setListaMotivos(res.response.motivos)
            setListaHabilidades(res.response.habilidades)
            setListaGruposIntereses(res.response.gruposIntereses)
            setListaIntereses(res.response.intereses)
        })
    }, []);

    const [form, setForm] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correoElectronico: '',
        telefono: '',
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
        fechaNacimiento: dayjs(new Date()),
        validacion: {
            nombre: false,
            apellidoPaterno: false,
            correoElectronico: false,
            telefono: false,
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
        correoElectronico,
        telefono,
        genero,
        escolaridad,
        motivo,
        habilidades,
        estado,
        direccion,
        intereses,
        fechaNacimiento,
        submitted,
        stepOneSubmitted,
        stepTwoSubmitted,
        stepThreeSubmitted,
        validacion
    } = form;

    const {
        nombre: validoNombre,
        apellidoPaterno: validoApellidoPaterno,
        genero: validoGenero,
        correoElectronico: validoCorreoElectronico,
        telefono: validoTelefono,
        escolaridad: validoEscolaridad,
        motivo: validoMotivo,
        estado: validoEstado,
        direccion: validoDireccion,
    } = validacion;

    const getIntereses = () => {
        let interesesGrupos = {};
        for (const key in intereses)
            if (Object.hasOwnProperty.call(intereses, key))
                interesesGrupos[key] = [];

        const { interesesSeleccionados } = form;

        setForm({
            ...form,
            interesesSeleccionados: { ...interesesSeleccionados, ...interesesGrupos }
        });
    };

    useEffect(() => {
        getIntereses();
    }, []);

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
        });
      
        const { validacion } = { ...form };
      
        const invalido = Object.values(validacion).some((input) => input == false);
        if (!invalido) return;
      
        axios.get(route('get.entidad', { nombre: estado }))
          .then((res) => {
            if (res.data.success !== true) return;
      
            const listaIntereses = Object.values(intereses);
            const listaInteresesValida = listaIntereses.map((intereses) => intereses).filter((lista) => lista.length);
            let listaInteresesDesagrupada = [];
            listaInteresesValida.forEach((grupo) => {
              listaInteresesDesagrupada = listaInteresesDesagrupada.concat(grupo);
            });
      
            const nuevoForm = {
              nombre,
              apellidoPaterno,
              apellidoMaterno,
              correoElectronico,
              telefono,
              generoId: genero,
              escolaridadId: escolaridad,
              motivoId: motivo,
              habilidadIds: habilidades.map((habilidad) => habilidad.id),
              interesIds: listaInteresesDesagrupada.map((interes) => interes.id),
              entidadFederativaId: res.data.response.id,
              direccion,
              fechaNacimiento: fechaNacimiento.toISOString(),
            };
      
            const formData = new FormData();
            formData.append('data', JSON.stringify(nuevoForm));
      
            /** AXIOS */
            axios.post(route('post.voluntario'), formData)
              .then(async (res) => {
                await Swal.fire('Enhorabuena', 'Te has registrado exitosamente como voluntario');
                location.href = "/";
              })
              .catch(() => {});
          })
          .catch((error) => {
            console.error('Error en la solicitud:', error);
          });
    };

    // const handleSubmit = (event) => {
    //     setForm({
    //         ...form,
    //         submitted: true
    //     })
    //     const { validacion } = { ...form };

    //     const invalido = Object.values(validacion).some((input) => input == false);
    //     if(!invalido) return;

    //     fetch(route('get.entidad', {nombre: estado}), { method: 'get' })
    //     .then((res) => res.json())
    //     .then((res) => {
    //         if (res.success !== true) return;

    //         const listaIntereses = Object.values(intereses);
    //         const listaInteresesValida = listaIntereses.map((intereses) => intereses).filter((lista) => lista.length);
    //         let listaInteresesDesagrupada = [];
    //         listaInteresesValida.forEach((grupo) => {
    //             listaInteresesDesagrupada = listaInteresesDesagrupada.concat(grupo)
    //         });

    //         const nuevoForm = {
    //             nombre,
    //             apellidoPaterno,
    //             apellidoMaterno,
    //             correoElectronico,
    //             telefono,
    //             generoId: genero,
    //             escolaridadId: escolaridad,
    //             motivoId: motivo,
    //             habilidadIds: habilidades.map((habilidad) => habilidad.id),
    //             interesIds: listaInteresesDesagrupada.map((interes) => interes.id),
    //             entidadFederativaId: res.response.id,
    //             direccion,
    //             fechaNacimiento: fechaNacimiento.toISOString(),
    //         };

        
    //         const formData = new FormData();
    //         formData.append('data', JSON.stringify(nuevoForm));
        
    //         /** FETCH */
    //         fetch(route('post.voluntario'), { method: 'post', body: formData })
    //         .then(res => res.json())
    //         .then(async res => {
    //             await Swal.fire('Enhorabuena', 'Te has registrado exitosamente como voluntario');
        
    //             location.href = "/";
    //         })
    //         .catch(() => {})
    //     });
    // };

    const set = [
        {
            'id': 1,
            'label': 'Datos personales',
            'validInputsList': [
                validoNombre, validoApellidoPaterno, validoGenero, mayorEdad, validoCorreoElectronico, validoTelefono
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
                <TextField fullWidth
                    label="Correo Electrónico"
                    name="correoElectronico"
                    color="primary"
                    value={ correoElectronico }
                    onChange={ handleChange }
                    error={stepOneSubmitted && (!correoElectronico || correoElectronico.length === 0 || !regexCorreoElectronico.test(correoElectronico))}
                    helperText={stepOneSubmitted && (!correoElectronico || correoElectronico.length === 0 || !regexCorreoElectronico.test(correoElectronico)) ? 'Debe ingresar un correo electrónico válido' : ''}
                />
                <TextField fullWidth
                    label="Número de Teléfono"
                    name="telefono"
                    color="primary"
                    value={ telefono }
                    onChange={ handleChange }
                    error={stepOneSubmitted && (!telefono || telefono.length === 0 || !regexNumeroTelefono.test(telefono) || telefono.length <= 7)}
                    helperText={stepOneSubmitted && (!telefono || telefono.length === 0 || !regexNumeroTelefono.test(telefono)|| telefono.length <= 7) ? 'Debe ingresar solo números y validos' : ''}
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
                validoMotivo, validoEscolaridad
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
                        label="Habilidades"
                        name="habilidades"
                        freeSolo={ true }
                        checkboxes={ false }
                        options={ listaHabilidades }
                        value={ habilidades }
                        onChange={ (event, value) => setForm({ ...form, habilidades: value }) }
                    />
                    <CustomSelect
                        label="Motivo"
                        name="motivo"
                        value={ motivo }
                        onChange={ handleChange }
                        error={ (submitted || stepThreeSubmitted) && motivo.length <= 0 }
                        helperText={ (submitted || stepThreeSubmitted) && motivo.length <= 0 ? 'Este campo es obligatorio' : '' }
                        list={ listaMotivos }
                    />
                </Stack>
            ),
        },
        {
            'id': 4,
            'label': 'Intereses y dar de alta',
            'validInputsList': [
            ],
            'data': (
                <Stack spacing={2}>
                    <div className='w-full grid gap-4 grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1'>
                        <InteresesList
                            form={ form }
                            setForm={ setForm }
                            listaGruposIntereses={ listaGruposIntereses }
                            listaIntereses={ listaIntereses }
                            intereses={ intereses }
                        />
                    </div>
                </Stack>
            ),
        },
    ];

    const icons = {
        1: <AccountCircleIcon />,
        2: <ShareLocationIcon />,
        3: <ModelTrainingIcon />,
        4: <RecommendIcon />
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
