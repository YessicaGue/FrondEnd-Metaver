import React, { useEffect, useState, useMemo } from "react";
import { Skeleton, Container, Grid, Box, Stack, Typography, Button, TextField, FormGroup, FormControlLabel, Checkbox, FormHelperText, CircularProgress, Modal, Backdrop } from "@mui/material";
import { useSpring, animated } from '@react-spring/web';
import { MuiTelInput } from 'mui-tel-input';
import { Marker } from '@react-google-maps/api';
import EventIcon from '@mui/icons-material/Event';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';
import AlarmIcon from '@mui/icons-material/Alarm';
import './eventos.css';
import fallback_url from './imagen-eventos.png';
import dayjs from "dayjs";
import { estados } from '../../data/estados';
import { sexos } from '../../data/sexos';
import { CustomDatePicker } from "./CustomDatePicker";
import { CustomMap } from "@/Components/Customized/CustomComponents/CustomMap";
import { CustomRadio } from "@/Components/Customized/CustomComponents/CustomRadio";
import { CustomSelect } from "@/Components/Customized/CustomComponents/CustomSelect";
import CustomLayout from '@/Layouts/CustomLayout';

const url = 'https://dashboard.ciudadanosenmovimiento.org';

const listaRadio = [
    { label: 'Virtual', value: 'virtual' },
    { label: 'Presencial', value: 'presencial' }
];

const initialFormulario = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    telefono: '',
    infoTelefono: {},
    fechaNacimiento: dayjs(new Date()),
    estado: {},
    sexo: {},
    cargo: '',
    modoAsistencia: listaRadio[0].value,
    invitacionActivada: true
};

const Fade = React.forwardRef(function Fade(props, ref) {
    const {
        children,
        in: open,
        onClick,
        onEnter,
        onExited,
        ownerState,
        ...other
    } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter)
                onEnter(null, true);
        },
        onRest: () => {
            if (!open && onExited)
                onExited(null, true);
        },
    });

    return (
        <animated.div
            ref={ref}
            style={style}
            {...other}
        >
            {React.cloneElement(children, { onClick })}
        </animated.div>
    );
});

export const EventosLandingModal = (props) => {
    const { tituloBoton, contenido, ...botonProps } = props;
    const [ open, setOpen ] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={ handleOpen } { ...botonProps }>{ tituloBoton }</Button>
            <Modal
                open={ open }
                onClose={ handleClose }
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        TransitionComponent: Fade,
                    },
                }}
            >
                <Fade in={ open }>
                    <Box
                        style={{
                            position: 'absolute',
                            left: '1rem',
                            right: '1rem',
                            top: '1rem',
                            bottom: '1rem',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            maxWidth: 700,
                            boxShadow: 24,
                            maxHeight: '100vh',
                            overflow: 'auto'
                        }}
                    >
                        { contenido }
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export const EventosLandingEncabezado = (props) => {

    const { imagenEvento } = props;

    return (
        <div className='absolute top-0 w-full h-full flex overflow-hidden'>
            <div className='w-full'>
                <div style={{
                    height: '100%',
                    width: '100%',
                    backgroundImage: `url( ${imagenEvento} ), url( ${fallback_url} )`,
                    maxWidth: '100vw',
                    filter: 'blur(10px)'
                }}>
                </div>
            </div>

            <div className="absolute w-full h-full flex items-center justify-center">
                <img
                    className='object-cover max-h-full'
                    src={ imagenEvento || fallback_url  }
                    onError={e => {
                        e.target.src = fallback_url;
                    }}
                    alt="imagen evento"
                />
            </div>

        </div>
    );
};

export const EventosLandingInformacion = (props) => {
    const { id, nombreEvento, descripcionEvento, fechaEvento, direccionEvento, latitudPuntoInteres, longitudPuntoInteres, mapa, avisoPrivacidad } = props;
    const [ correo, setCorreo ] = useState('');
    const [ suscrito, setSuscrito ] = useState(false);
    const [ formulario, setFormulario ] = useState(initialFormulario);
    const {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        telefono,
        infoTelefono,
        fechaNacimiento,
        estado,
        sexo,
        cargo,
        modoAsistencia,
        invitacionActivada
    } = formulario;
    const [ entregado, setEntregado ] = useState(false);
    const [ mayorEdad, setMayorEdad ] = useState(false);

    const [ isLoading, setIsLoading ] = useState(false);

    const handleChangeFormulario = (event) => {
        const { name, value } = event.target;
        setFormulario({
            ...formulario,
            [ name ]: value
        });
    };

    const handleButtonClick = () => {
        fetch(`${url}/api/invitado/email/${correo}`, {
            method: 'get'
        })
            .then((res) => res.json())
            .then((res) => {
                setSuscrito(res?.id ?? false);
            })
            .catch(() => {
            });
    };

    const createInvitado = (res) => {
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellidoPaterno', apellidoPaterno);
        formData.append('apellidoMaterno', apellidoMaterno);
        formData.append('email', correo);
        formData.append('telefono', infoTelefono.nationalNumber);
        formData.append('fechaNacimiento', fechaNacimiento.toISOString());
        formData.append('estado', estados.find((row) => row.id === estado).nombre);
        formData.append('sexo', sexos.find((row) => row.id === sexo).nombre);
        formData.append('cargo', cargo.length > 0 ? cargo : 'No aplica');
        formData.append('modoAsistencia', modoAsistencia);
        formData.append('invitacionActivada', invitacionActivada);
        formData.append('evento_id', id);
        formData.append('invitado_id', res.invitado_id);

        fetch(`${url}/api/check-in-eventos/register`, {
            method: 'post',
            body: formData
        })
            .then((res) => res.json())
            .then((res) => {
                setIsLoading(false);
                setSuscrito(true);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    const createInvitacion = (res) => {
        const fecha = new Date().toISOString();
        const formData = new FormData();
        formData.append('evento_id', id);
        formData.append('invitado_id', res.id);
        formData.append('fecha_invitacion', fecha);
        formData.append('nombre_responsable', 'MC');
        formData.append('fecha_registro', fecha);
        formData.append('requiere_registro', false);
        formData.append('fecha_check_in', null);
        formData.append('latitud', null);
        formData.append('longitd', null);
        formData.append('validacion_geografica_exitosa', false);

        fetch(`${url}/api/check-in-evento`, {
            method: 'post',
            body: formData
        })
            .then((res) => res.json())
            .then((res) => {
                createInvitado(res);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    const createUsuario = () => {
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido_paterno', apellidoPaterno);
        formData.append('apellido_materno', apellidoMaterno);
        formData.append('email', correo);
        formData.append('telefono', infoTelefono.nationalNumber);
        formData.append('fechaNacimiento', fechaNacimiento.toISOString());
        formData.append('sexo', sexos.find((row) => row.id === sexo).nombre);
        formData.append('entidad_federativa', estados.find((row) => row.id === estado).nombre);
        formData.append('cargo_organizacion', cargo.length > 0 ? cargo : 'No aplica');
        formData.append('modo_participacion', modoAsistencia);
        formData.append('activo', true)

        fetch(`${url}/api/invitado`, {
            method: 'post',
            body: formData
        })
            .then((res) => res.json())
            .then((res) => {
                fetch(`${url}/api/invitado/email/${correo}`, {
                    method: 'get'
                })
                    .then((res) => res.json())
                    .then((res) => {
                        createInvitacion(res);
                    })
                    .catch(() => {
                        setIsLoading(false);
                    });
            });
    };

    const handleSubmit = () => {
        setEntregado(true);

        if (
            nombre.length <= 0 ||
            apellidoPaterno.length <= 0 ||
            apellidoMaterno.length <= 0 ||
            telefono.length <= 0 ||
            estado == null ||
            sexo == null ||
            mayorEdad == false
        ) return;

        setIsLoading(true);

        const usuario = {
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            email: correo,
            telefono: infoTelefono.nationalNumber,
            fechaNacimiento: fechaNacimiento.toISOString(),
            estado: estados.find((row) => row.id === estado).nombre,
            sexo: sexos.find((row) => row.id === sexo).nombre,
            cargo: cargo.length > 0 ? cargo : 'No aplica',
            modoAsistencia,
            invitacionActivada
        };

        fetch(`${url}/api/invitado/email/${correo}`, {
            method: 'get'
        })
            .then((res) => res.json())
            .then((res) => {

                if (!res || !res.id)
                    return createUsuario();

                createInvitacion(res);
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    const modal = () => {
        if ( suscrito === null ) {
            return (
                <Container
                    maxWidth={'md'}
                    style={{
                        padding: '20px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        zIndex: 1
                    }}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            backgroundColor: 'white',
                            padding: '1rem',
                            borderRadius: '5px'
                        }}>
                        <Typography
                            variant={'h1'}
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '16px',
                                color: '#666',
                                zIndex: '1',
                            }}
                        >
                            Para continuar, vamos a comprobar si contamos con tus datos. Por favor, introduce tu correo en el siguiente recuadro:
                        </Typography>
                        <TextField
                            fullWidth
                            label="Correo"
                            name="correo"
                            color="primary"
                            value={ correo }
                            onChange={ ({ target: { value } }) => setCorreo( value ) }
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{
                                width: '100%',
                                backgroundColor: 'white',
                            }}
                            onClick={ handleButtonClick }
                        >
                            Comprobar
                        </Button>
                    </Stack>
                </Container>
            )
        } else if ( suscrito === false ) {
            return (
                <Container
                    style={{
                        padding: '0',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        zIndex: 1,
                    }}
                >
                    {
                        isLoading &&
                        <Box style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'absolute', zIndex: '3' }}>
                            <Box style={{ height: 70, width: 70, borderRadius: '50%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress color='primary' />
                            </Box>
                        </Box>
                    }
                    <Stack
                        spacing={2}
                        sx={{
                            backgroundColor: 'white',
                            padding: '1rem',
                            borderRadius: '5px',
                        }}
                    >
                        <h2 style={{ fontFamily: 'helvetica', color: '#222', fontSize: 30 }}>Regístrate</h2>
                        <div style={{ width: '80px', margin: '1rem 1rem 1rem 0', height: 3, backgroundColor: 'orange' }}></div>

                        <TextField
                            label="Nombre"
                            name="nombre"
                            id="nombre"
                            value={ nombre }
                            onChange={ handleChangeFormulario }
                        />
                        {
                            entregado && nombre.length <= 0
                                ?   <FormHelperText style={{ color: '#d32f2f', marginTop: 3, marginLeft: 10 }}>Este campo es obligatorio</FormHelperText>
                                :   null
                        }

                        <TextField
                            fullWidth
                            label="Apellido paterno"
                            name="apellidoPaterno"
                            id="apellido-paterno"
                            value={ apellidoPaterno }
                            onChange={ handleChangeFormulario }
                        />
                        {
                            entregado && apellidoPaterno.length <= 0
                                ?   <FormHelperText style={{ color: '#d32f2f', marginTop: 3, marginLeft: 10 }}>Este campo es obligatorio</FormHelperText>
                                :   null
                        }

                        <TextField
                            fullWidth
                            label="Apellido materno"
                            name="apellidoMaterno"
                            id="apellido-materno"
                            value={ apellidoMaterno }
                            onChange={ handleChangeFormulario }
                        />
                        {
                            entregado && apellidoMaterno.length <= 0
                                ?   <FormHelperText style={{ color: '#d32f2f', marginTop: 3, marginLeft: 10 }}>Este campo es obligatorio</FormHelperText>
                                :   null
                        }

                        <TextField
                            label="Correo"
                            name="correo"
                            id="correo"
                            value={ correo }
                            onChange={ (e) => setCorreo(e.target.value) }
                        />
                        {
                            entregado && correo.length <= 0
                                ?   <FormHelperText style={{ color: '#d32f2f', marginTop: 3, marginLeft: 10 }}>Este campo es obligatorio</FormHelperText>
                                :   null
                        }

                        <MuiTelInput
                            fullWidth
                            label="Teléfono"
                            name="telefono"
                            id="telefono"
                            defaultCountry="MX"
                            value={ telefono }
                            onChange={ (value, info) => setFormulario({ ...formulario, telefono: value, infoTelefono: info }) }
                        />
                        {
                            entregado && telefono.length <= 0
                                ?   <FormHelperText style={{ color: '#d32f2f', marginTop: 3, marginLeft: 10 }}>Este campo es obligatorio</FormHelperText>
                                :   null
                        }

                        <CustomSelect
                            label="Estado"
                            name="estado"
                            value={ estado }
                            onChange={ handleChangeFormulario }
                            list={ estados }
                        />
                        {
                            entregado && estado.length <= 0
                                ?   <FormHelperText style={{ color: '#d32f2f', marginTop: 3, marginLeft: 10 }}>Este campo es obligatorio</FormHelperText>
                                :   null
                        }

                        <CustomDatePicker
                            label="Fecha de nacimiento"
                            name="fechaNacimiento"
                            inputFormat="DD/MM/YYYY"
                            color="secondary"
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

                                    return setFormulario({ ...formulario, fechaNacimiento: value });
                                }
                            }
                        />
                        {
                            entregado && mayorEdad === false
                                ?   <FormHelperText style={{ color: '#d32f2f', marginTop: 3, marginLeft: 10 }}>Debes cumplir la mayoría de edad para participar</FormHelperText>
                                :   null
                        }
                        {
                            entregado && fechaNacimiento === null
                                ?   <FormHelperText style={{ color: '#d32f2f', marginTop: 3, marginLeft: 10 }}>Este campo es obligatorio</FormHelperText>
                                :   null
                        }

                        <CustomSelect
                            label="Sexo"
                            name="sexo"
                            value={ sexo }
                            onChange={ handleChangeFormulario }
                            list={ sexos }
                        />
                        {
                            entregado && sexo.length <= 0
                                ?   <FormHelperText style={{ color: '#d32f2f', marginTop: 3, marginLeft: 10 }}>Este campo es obligatorio</FormHelperText>
                                :   null
                        }

                        <TextField
                            label="Cargo u organización a la que perteneces (opcional)"
                            name="cargo"
                            id="cargo"
                            value={ cargo }
                            onChange={ handleChangeFormulario }
                        />

                        <CustomRadio
                            label="¿En qué forma participarás?"
                            list={ listaRadio }
                            value={ modoAsistencia }
                            name="modoAsistencia"
                            onChange={ handleChangeFormulario }
                        />

                        <FormGroup>
                            <FormControlLabel
                                name="invitacionActivada"
                                control={ <Checkbox checked={ invitacionActivada } /> }
                                label="Deseo mantenerme informad@ de otros eventos"
                                onChange={ () => setFormulario({ ...formulario, invitacionActivada: !invitacionActivada }) }
                            />
                        </FormGroup>

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                width: '100%',
                            }}
                            onClick={ handleSubmit }
                        >
                            Apúntame ya
                        </Button>

                        <Typography style={{ fontSize: 20, margin: '1rem 0 1rem 0' }}>Aviso de privacidad</Typography>
                        <div style={{ width: '80px', margin: '0rem 0rem 0rem 0', height: 3, backgroundColor: 'orange' }}></div>

                        {
                            avisoPrivacidad
                                ?   <p style={{ textAlign: 'justify', fontSize: 12 }}>
                                    { avisoPrivacidad }
                                </p>
                                :   <Typography style={{ textAlign: 'justify', fontSize: 12 }}>
                                    Movimiento Ciudadano, será el responsable del uso y protección de los datos personales recabados, los cuales serán protegidos de acuerdo a la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados, y serán utilizados únicamente como muestra fehaciente de la realización de la Actividad de Educación y Capacitación Política, de acuerdo al artículo 173, numeral 1, párrafo a) inciso III, del Reglamento de Fiscalización del INE. No se realizarán transferencias de datos personales, salvo aquéllas que sean necesarias para atender requerimientos de información de una autoridad competente, que estén debidamente fundados y Motivados. Si desea mayor información sobre los términos y condiciones en que éstos serán tratados, puede consultar el aviso de privacidad integral en: <a href="https://transparencia.movimientociudadano.mx/protecciondedatospersonales#avisos-de-privacidad">https://transparencia.movimientociudadano.mx/protecciondedatospersonales#avisos-de-privacidad</a>
                                </Typography>

                        }
                    </Stack>
                </Container>
            )
        } else {
            return (
                <Container
                    maxWidth={'md'}
                    style={{
                        padding: '20px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        zIndex: 1,
                    }}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            backgroundColor: 'white',
                            padding: '1rem',
                            borderRadius: '5px',
                        }}
                    >
                        <Typography style={{ color: '#222', fontSize: 50, textAlign: 'center', fontWeight: 'bolder' }}>Gracias por registrarte</Typography>
                    </Stack>
                </Container>
            )
        }
    }

    return (
        <Grid
            container
            spacing={{
                xs: 2,
                md: 6
            }}
            style={{
                position: 'relative'
            }}
        >
            <Grid
                xs={12}
                md={8}
                item
            >
                <Stack
                    spacing={2}
                    sx={{
                        backgroundColor: 'white',
                        padding: '1rem',
                        borderRadius: '5px'
                    }}
                >

                    {
                        nombreEvento
                            ?   <h2
                                style={{
                                    fontSize: 50,
                                    fontWeight: 'bolder',
                                    color: '#1A0829',
                                    lineHeight: '3.5rem'
                                }}
                            >
                                { nombreEvento }
                            </h2>
                            :   <Skeleton />
                    }

                    {
                        descripcionEvento
                            ?   <>
                                <p
                                    style={{
                                        textAlign: 'justify'
                                    }}
                                >
                                    { descripcionEvento }
                                </p>
                                <div
                                    style={{ width: '80px', margin: '1rem 1rem 0rem 0', height: 3, backgroundColor: 'orange' }}
                                ></div>
                            </>
                            :   <Skeleton />
                    }

                    <h2 style={{ fontSize: 24, fontWeight: 'bolder', color: '#1A0829' }}>Cuándo y dónde</h2>
                    <Box>
                        <Grid
                            container
                            spacing={{ }}
                            style={{ position: 'relative' }}
                        >
                            <Grid
                                xs={12}
                                md={6}
                                item
                            >
                                <Box
                                    style={{ position: 'relative', display: 'flex' }}
                                >
                                    <Box
                                        style={{
                                            minWidth: 40,
                                            height: 40,
                                            backgroundColor: '#eee',
                                            borderRadius: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <EventIcon color="secondary"/>
                                    </Box>
                                    <Box style={{ marginLeft: '1rem' }}>
                                        <Typography style={{ fontWeight: 'bolder', fontSize: 16, color: '#1A0829' }}>Fecha y hora</Typography>
                                        <Typography style={{ fontSize: 14, color: '#1A0829' }}>{ new Date(fechaEvento).toLocaleDateString('es-ES', { weekday: 'short' }) + ", " + new Date(fechaEvento).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ", " + new Date(fechaEvento).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) }</Typography>
                                        <Typography style={{ fontSize: 14, color: '#1A0829' }}>Hora México centro</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                                item
                            >
                                <Box
                                    style={{ position: 'relative', display: 'flex' }}
                                >
                                    <Box
                                        style={{
                                            minWidth: 40,
                                            height: 40,
                                            backgroundColor: '#eee',
                                            borderRadius: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <FmdGoodIcon color="secondary"/>
                                    </Box>
                                    <Box style={{ marginLeft: '1rem' }}>
                                        <Typography style={{ fontWeight: 'bolder', fontSize: 16, color: '#1A0829' }}>Lugar</Typography>
                                        <Typography style={{ fontSize: 14, color: '#1A0829' }}>{ direccionEvento }</Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            {
                                mapa === true
                                    ? (
                                        <CustomMap
                                            latitudCenter={ parseFloat(latitudPuntoInteres) }
                                            longitudCenter={ parseFloat(longitudPuntoInteres) }
                                            style={{
                                                width: '100%',
                                                height: '400px',
                                                marginTop: '2rem'
                                            }}
                                            content={
                                                <Marker
                                                    position={{ lat: parseFloat(latitudPuntoInteres), lng: parseFloat(longitudPuntoInteres) }}
                                                />
                                            }
                                        />
                                    )
                                    : <></>
                            }

                        </Grid>
                    </Box>
                </Stack>
            </Grid>
            <Grid
                xs={12}
                md={4}
                item
                style={{ position: 'relative', }}
            >

                <Box className='bg-white' style={{ position: 'sticky', top: '5rem', width: '100%', borderRadius: 10, border: '.3px solid #eee', padding: '1rem' }}>
                    <Typography style={{ margin: '0 0 1rem 15px ' }}>Aún puedes apuntarte</Typography>
                    <EventosLandingModal
                        fullWidth
                        tituloBoton="me quiero apuntar"
                        variant="contained"
                        color="secondary"
                        contenido={ modal() }
                    />
                </Box>

            </Grid>
        </Grid>
    );
};

const VisualizarEvento = (props) => {

    const user = useMemo(() => {
        const localStorageData = localStorage.getItem('userData');
        return JSON.parse(localStorageData)?.user;
    }, []);

    const { id } = props;
    const [ nombreEvento, setNombreEvento ] = useState(null);
    const [ descripcionEvento, setDescripcionEvento ] = useState(null);
    const [ fechaEvento, setFechaEvento ] = useState(null);
    const [ numeroAsistentes, setNumeroAsistentes ] = useState(null);
    const [ imagenEvento, setImagenEvento ] = useState(null);
    const [ direccionEvento, setDireccionEvento ] = useState(null);
    const [ latPuntoInteres, setLatPuntoInteres ] = useState(null);
    const [ lngPuntoInteres, setLngPuntoInteres ] = useState(null);
    const [ mapa, setMapa ] = useState(false);
    const [ avisoPrivacidad, setAvisoPrivacidad ] = useState({});

    const getEventoData = async () => {
        const unparsed = await fetch(`${url}/api/evento/${id}`, { method: 'get' });
        const datos = await unparsed.json();

        if ( Object.keys(datos).length === 0)
            location.replace(route("eventos.page"));

        const {
            nombre,
            descripcion,
            fechaEvento,
            imagen,
            latitud,
            longitud,
            numeroAsistentes: asistentes,
            direccion,
            avisoPrivacidad
        } = datos;

        setFechaEvento( fechaEvento );
        setNombreEvento( nombre );
        setDescripcionEvento( descripcion );
        setDireccionEvento( direccion );
        setImagenEvento( imagen );
        setLatPuntoInteres( latitud );
        setLngPuntoInteres( longitud );
        setNumeroAsistentes( asistentes );
        setMapa( true );
        setAvisoPrivacidad( avisoPrivacidad?.descripcion ?? null );
    };

    useEffect(() => {
        getEventoData();
    }, []);

    const contenedorTitulo = () => (
        <>
            <Typography
                variant={'h1'}
                style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'calc(40px + (119 - 80) * ((100vw - 375px)/(1920 - 375)))',
                    lineHeight: 'calc(40px + (145 - 80) * ((100vw - 375px)/(1920 - 375)))',
                    fontWeight: '700',
                    marginTop: '10px',
                    color: 'white',
                    WebkitTextStroke: 'calc(1.7px + (2.5 - 1.7) * ((100vw - 375px)/(1920 - 375))) #fff',
                    letterSpacing: 'calc(0.8px + (47.6 - 0.8) * ((100vw - 375px)/(1920 - 375)))',
                    zIndex: '1',
                    textTransform: 'uppercase',
                    textAlign: 'center'
                }}
            >
                Evento
            </Typography>
            <Typography
                variant={'h1'}
                style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'calc(20px + (119 - 80) * ((100vw - 375px)/(1920 - 375)))',
                    lineHeight: 'calc(40px + (145 - 80) * ((100vw - 375px)/(1920 - 375)))',
                    fontWeight: '700',
                    marginTop: '10px',
                    color: 'transparent',
                    WebkitTextStroke: 'calc(.7px + (2.5 - 1.7) * ((100vw - 375px)/(1920 - 375))) #fff',
                    letterSpacing: 'calc(0.8px + (47.6 - 0.8) * ((100vw - 375px)/(1920 - 375)))',
                    zIndex: '1',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                }}
            >
                { nombreEvento }
            </Typography>
        </>
    );

    const contenedorFecha = () => (
        <Box className='absolute bottom-4 w-full p-4 bg-[rgba(0,0,0,0.5)] z-20'>
            <Box className='flex items-center justify-start p-2'>
                <AlarmIcon style={{ color: 'white' }}/>
                <Typography
                    variant={'h1'}
                    style={{
                        marginLeft: '2rem',
                        fontFamily: 'Poppins, sans-serif',
                        letterSpacing: '2px',
                        fontSize: '14px',
                        color: 'white',
                        zIndex: '1',
                        textAlign: 'center',
                    }}
                >
                    {
                        new Date(fechaEvento)
                            .toLocaleTimeString('es-ES',
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute:'2-digit'
                                }
                            ) + ' horas'
                    }
                </Typography>
            </Box>
        </Box>
    );

    return (
        <CustomLayout user={ user }>
            <Box className='w-full bg-gray-200 z-10'>
                <EventosLandingEncabezado imagenEvento={ imagenEvento }/>
                <Box className='flex flex-col justify-center items-center relative h-screen'
                     style={{
                         backgroundImage: `linear-gradient(to right, rgba(241,39,17,.5) .1%, rgba(245,175,25,.5))`,
                     }}
                >

                    { nombreEvento ? contenedorTitulo() : null }

                    { fechaEvento ? contenedorFecha() : null }

                </Box>
                <Box className='max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 py-4'>
                    <TrailAppear>
                        <EventosLandingInformacion
                            id={ id }
                            nombreEvento={ nombreEvento }
                            fechaEvento={ fechaEvento }
                            descripcionEvento={ descripcionEvento }
                            direccionEvento={ direccionEvento }
                            latitudPuntoInteres={ latPuntoInteres }
                            longitudPuntoInteres={ lngPuntoInteres }
                            mapa={ mapa }
                            avisoPrivacidad={ avisoPrivacidad }
                        />
                    </TrailAppear>
                </Box>
            </Box>
        </CustomLayout>
    )
}

export default VisualizarEvento;
