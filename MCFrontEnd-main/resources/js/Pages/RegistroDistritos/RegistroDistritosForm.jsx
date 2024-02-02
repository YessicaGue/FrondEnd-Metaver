import React, {useEffect, useState} from "react";
import {Head} from "@inertiajs/react";
import {
    Box,
    Button,
    ButtonGroup, Card, Checkbox,
    Container,
    Divider, Grid,
    IconButton, MenuItem,
    Paper, Select,
    TextField,
    Toolbar,
    Typography, useMediaQuery
} from "@mui/material";

import ImageStock from "@/../assets/images/stock/registro_rural.png";
import LogoMC from "../../../assets/images/logo-mc-naranja.svg";
import {estados} from "@/data/estados";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ToastContainerCustom from "@/utils/ToastContainerCustom";
import Swal from "sweetalert2";

const RegistroDistritosForm = (props) => {

    const BASE_URL = props['urlApi'];

    const sm = useMediaQuery('(max-width:899px)');

    const generos = [
        'Masculino',
        'Femenino',
        'LGTTBIQ+',
    ]

    const [loading, setLoading] = useState(false);

    const [loadingDistritos, setLoadingDistritos] = useState(false);
    const [distritos, setDistritos] = useState([]);
    const [distrito, setDistrito] = useState(null);
    const [estado, setEstado] = useState(null);

    const getDistritos = () => {
        setLoadingDistritos(true);
        axios.get(`${BASE_URL}/api/registrodistritos/distritos`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(response => {
                setDistritos(response.data['response']);
                toast.success('Distritos cargados correctamente');
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoadingDistritos(false);
            });
    }

    useEffect(() => {
        getDistritos();
    }, []);

    const [nombre, setNombre] = useState(''); // Required
    const [apellidoPaterno, setApellidoPaterno] = useState(''); // Required
    const [apellidoMaterno, setApellidoMaterno] = useState(''); // Optional
    const [telefono, setTelefono] = useState(''); // Required
    const [edad, setEdad] = useState(18); // Required
    const [genero, setGenero] = useState(generos[0]); // Required

    const [claveINE, setClaveINE] = useState(''); // Optional
    const [urlFoto, setUrlFoto] = useState(''); // Optional

    const [datosVinculantes, setDatosVinculantes] = useState(''); // Required
    const [curriculum, setCurriculum] = useState(''); // Required
    const [actividadesRendimientoPolitico, setActividadesRendimientoPolitico] = useState(''); // Optional

    const [nombrePropone, setNombrePropone] = useState(''); // Required
    const [telefonoPropone, setTelefonoPropone] = useState(''); // Required
    const [correoPropone, setCorreoPropone] = useState(''); // Required

    const [avisoPrivacidad, setAvisoPrivacidad] = useState(false); // Required

    const validateForm = () => {
        if (nombre === '') return false;
        if (apellidoPaterno === '') return false;
        if (telefono === '') return false;
        if (edad === null || edad < 18) return false;
        if (genero === '') return false;
        if (datosVinculantes === '') return false;
        if (curriculum === '') return false;
        if (nombrePropone === '') return false;
        if (telefonoPropone === '') return false;
        if (correoPropone === '') return false;
        if (distrito === null) return false;
        if (avisoPrivacidad === false) return false;
        return true;
    }

    const crearPeticion = () => {
        const data = {
            nombre,
            apellido_paterno: apellidoPaterno,
            apellido_materno: apellidoMaterno,
            telefono,
            edad,
            genero,
            ine: claveINE === '' ? null : claveINE,
            url_foto: urlFoto === '' ? null : urlFoto,
            registro_distrito_id: distrito?.['id'],
            datos_vinculantes: datosVinculantes,
            curriculum_vitae: curriculum,
            actividades_rendimiento_politico: actividadesRendimientoPolitico === '' ? null : actividadesRendimientoPolitico,
            nombre_propone: nombrePropone,
            telefono_propone: telefonoPropone,
            email_propone: correoPropone,
            activo: true,
        }

        setLoading(true);

        axios.post(`${BASE_URL}/api/registrodistritos/registro/persona`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then(async response => {
                console.log(response);
                toast.success('Registro exitoso');
                await Swal.fire({
                    title: 'Registro exitoso',
                    text: 'Se ha registrado correctamente, en breve nos pondremos en contacto contigo',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Refresh page
                        window.location.reload();
                    }
                });
            })
            .catch(async error => {
                console.log(error);
                await Swal.fire({
                    title: 'Error',
                    text: error.response.data['message'] + '\n' + error.response.data['error'],
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Box
            className={'w-full h-screen m-0 flex flex-col justify-start items-center'}
        >
            <Head title="Registro Distritos | Formulario"/>

            <ToastContainerCustom/>

            <Toolbar
                className={'w-full'}
                style={{
                    height: 'auto',
                    minHeight: sm ? 'auto' : '70px',
                }}
            >
                <IconButton
                    onClick={() => window.location.href = '/vocesdelfuturo'}
                >
                    <img
                        className="block w-auto fill-current text-gray-800 h-[50px] cursor-pointer"
                        src={LogoMC}
                        alt="Logo Voces del Futuro"
                    />
                </IconButton>

                <Typography
                    variant="h6"
                    component="div"
                    className={'h-full flex items-center'}
                    style={{
                        color: "#000000",
                        fontFamily: 'Hubot-Sans',
                        fontWeight: "700",
                        marginLeft: "20px",
                        marginTop: "5px",
                        letterSpacing: "0.1em",
                    }}
                >
                    REGISTRO PARA DISTRITOS
                </Typography>

                <div
                    className={'flex-grow'}
                />

                <Typography
                    variant="h6"
                    component="div"
                    className={'h-full flex items-center text-mc-primary'}
                    style={{
                        fontFamily: 'Mona-Sans',
                        fontWeight: "300",
                        marginLeft: "20px",
                        marginTop: "5px",
                        letterSpacing: "0.05em",
                    }}
                >
                    by LAB MC
                </Typography>
            </Toolbar>

            <img
                className={'w-screen h-[50%] object-cover'}
                src={ImageStock}
                alt="Logo"
                style={{
                    objectPosition: '0% 20%'
                }}
            />

            <Container
                maxWidth={'lg'}
            >
                <Paper
                    elevation={5}
                    className={'p-4 min-h-[150px]'}
                    style={{
                        marginTop: '-100px',
                    }}
                >
                    <Box
                        className={'w-full px-[20px] pt-[30px] m-0 flex flex-col items-start justify-center'}
                    >
                        <Typography
                            variant="h3"
                            component="div"
                            className={'flex items-start !font-semibold tracking-wide'}
                            style={{
                                fontFamily: 'Hubot-Sans',
                                fontStretch: 'normal',
                            }}
                        >
                            Registro para Distritos
                        </Typography>

                        <Typography
                            variant="body1"
                            component="div"
                            className={'flex items-start !font-normal tracking-wide'}
                            style={{
                                fontFamily: 'Hubot-Sans',
                                fontStretch: 'normal',
                            }}
                        >
                            A continuación, podrás registrarte, por favor llena el siguiente formulario.
                        </Typography>

                        <Divider
                            className={'w-full !mt-[20px] !mb-[50px] bg-slate-500'}
                        />
                    </Box>

                    <Box
                        className={'w-full px-[20px] pt-[0px] pb-[100px] m-0 flex flex-col items-start justify-center'}
                    >
                        <a
                            href={'/invitado?codigo=RUTA2024MC'}
                            target={'_blank'}
                            className={'w-full'}
                        >
                            <div
                                variant="contained"
                                className={'w-full bg-mc-primary hover:bg-mc-gradient2_2 text-white rounded-lg mb-1'}
                                style={{
                                    width: '100%',
                                    height: '60px',
                                    fontFamily: 'Hubot-Sans',
                                    fontStretch: 'normal',
                                    fontWeight: '600',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                ÚNETE AL METAVERSO
                            </div>
                        </a>

                        <Typography
                            variant="body1"
                            component="div"
                            className={'flex items-start !font-normal tracking-wide !mb-[50px]'}
                            style={{
                                fontFamily: 'Hubot-Sans',
                                fontStretch: 'normal',
                            }}
                        >
                            Únete al Metaverso para recibir capacitaciones y beneficios exclusivos.
                        </Typography>

                        <Typography
                            variant="h6"
                            style={{
                                fontFamily: 'Hubot-Sans',
                                fontStretch: 'normal',
                                marginBottom: '20px',
                                fontWeight: '600',
                            }}
                        >
                            1- Ingrese los datos de quien se registra
                        </Typography>

                        <TextField
                            id="nombre"
                            required
                            label="Nombre(s)"
                            variant="outlined"
                            fullWidth
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />

                        <TextField
                            id="apellidoPaterno"
                            required
                            label="Apellido Paterno"
                            variant="outlined"
                            className={'!mt-[20px]'}
                            fullWidth
                            value={apellidoPaterno}
                            onChange={(e) => setApellidoPaterno(e.target.value)}
                        />

                        <TextField
                            id="apellidoMaterno"
                            label="Apellido Materno"
                            variant="outlined"
                            className={'!mt-[20px]'}
                            fullWidth
                            value={apellidoMaterno}
                            onChange={(e) => setApellidoMaterno(e.target.value)}
                        />

                        <TextField
                            id="telefono"
                            required
                            label="Teléfono"
                            variant="outlined"
                            fullWidth
                            type={'tel'}
                            className={'!mt-[20px]'}
                            value={telefono}
                            onChange={(e) => {
                                let dataTmp = e.target.value;
                                dataTmp = dataTmp.replace(/[^0-9]/g, '');
                                setTelefono(dataTmp);
                            }}
                        />

                        <TextField
                            id="edad"
                            required
                            label="Edad"
                            variant="outlined"
                            fullWidth
                            className={'!mt-[20px]'}
                            value={edad}
                            type={'number'}
                            InputProps={{
                                inputProps: {
                                    min: 18,
                                    max: 100,
                                }
                            }}
                            onChange={(e) => setEdad(e.target.value)}
                        />

                        <Typography
                            variant="body1"
                            style={{
                                fontFamily: 'Hubot-Sans',
                                fontStretch: 'normal',
                                marginTop: '30px',
                                fontWeight: '400',
                            }}
                        >
                            Género
                        </Typography>

                        <ButtonGroup
                            variant="contained"
                            aria-label="contained primary button group"
                            className={'!mt-[5px] w-full'}
                        >
                            {
                                generos.map((generoTmp, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            onClick={() => setGenero(generoTmp)}
                                            style={{
                                                width: 'calc(100% / 3)',
                                                height: '60px',
                                                backgroundColor: genero === generoTmp ? '#657084' : 'white',
                                                color: genero === generoTmp ? 'white' : 'black',
                                            }}
                                        >
                                            {generoTmp}
                                        </Button>
                                    )
                                })
                            }
                        </ButtonGroup>

                        <Divider
                            className={'w-full !mt-[30px] bg-slate-400'}
                        />

                        <Typography
                            variant="h6"
                            style={{
                                fontFamily: 'Hubot-Sans',
                                fontStretch: 'normal',
                                marginBottom: '20px',
                                marginTop: '30px',
                                fontWeight: '600',
                            }}
                        >
                            2- Datos distritales
                        </Typography>

                        <Typography
                            variant="body1"
                            style={{
                                fontFamily: 'Hubot-Sans',
                                fontStretch: 'normal',
                                marginTop: '30px',
                                fontWeight: '400',
                            }}
                        >
                            Seleccione un estado
                        </Typography>

                        {
                            (estados?.length > 0 && !loadingDistritos) ?
                                <Select
                                    id="estado"
                                    required
                                    variant="outlined"
                                    fullWidth
                                    className={'!mt-[10px]'}
                                    value={estado?.['id']}
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        const edoTmp = distritos.find(x => x?.['id'] === e.target.value)
                                        console.log(edoTmp);
                                        setEstado(edoTmp);
                                        setDistrito(null);
                                    }}
                                >
                                    {
                                        estados.map((distritoTmp, index) => {
                                            return (
                                                <MenuItem
                                                    key={index}
                                                    value={distritoTmp?.['id']}
                                                >
                                                    {distritoTmp?.['nombre']}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                : loadingDistritos ?
                                    <Typography
                                        variant="body1"
                                        style={{
                                            fontFamily: 'Hubot-Sans',
                                        }}
                                    >
                                        Cargando...
                                    </Typography>
                                    :
                                    <Typography
                                        variant="body1"
                                        style={{
                                            fontFamily: 'Hubot-Sans',
                                        }}
                                    >
                                        No hay estados disponibles
                                    </Typography>
                        }

                        <Typography
                            variant="body1"
                            style={{
                                fontFamily: 'Hubot-Sans',
                                fontStretch: 'normal',
                                marginTop: '30px',
                                fontWeight: '400',
                            }}
                        >
                            Seleccione un distrito
                        </Typography>

                        {
                            (estado !== null && estado?.['distritos_urbanos_rurales']?.length > 0) &&
                            <Select
                                id="distrito"
                                required
                                variant="outlined"
                                fullWidth
                                className={'!mt-[10px]'}
                                value={distrito?.['id']}
                                onChange={(e) => {
                                    const distritoTmp = estado?.['distritos_urbanos_rurales'].find(distritoTmp => distritoTmp?.['id'] === e.target.value)
                                    console.log(distritoTmp);
                                    setDistrito(distritoTmp);
                                }}
                            >
                                {
                                    estado?.['distritos_urbanos_rurales'].map((distritoTmp, index) => {
                                        return (
                                            <MenuItem
                                                key={index}
                                                value={distritoTmp['id']}
                                            >
                                                {distritoTmp['nombre']}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        }

                        {
                            distrito !== null &&
                            <Typography
                                variant="body1"
                                style={{
                                    fontFamily: 'Hubot-Sans',
                                    fontStretch: 'normal',
                                    marginBottom: '20px',
                                    marginTop: '30px',
                                    fontWeight: '600',
                                    width: '100%',
                                    textAlign: 'center',
                                }}
                            >
                                {
                                    'Distrito '
                                }
                                <span
                                    className={'text-blue-900 font-bold tracking-wider'}
                                    style={{
                                        color: distrito?.['tipo_distrito']['nombre'].toLowerCase() === 'urbano' ? '#1E3A8A' : '#0f7423',
                                    }}
                                >
                                    {distrito?.['tipo_distrito']['nombre']}
                                </span>
                            </Typography>
                        }

                        <Divider
                            className={'w-full !mt-[30px] bg-slate-400'}
                        />

                        <Typography
                            variant="h6"
                            style={{
                                fontFamily: 'Hubot-Sans',
                                fontStretch: 'normal',
                                marginBottom: '20px',
                                marginTop: '30px',
                                fontWeight: '600',
                            }}
                        >
                            3- Datos adicionales
                        </Typography>

                        <TextField
                            id="datosVinculantes"
                            required
                            label="Datos que vinculen a la persona con el sector"
                            variant="outlined"
                            className={'!mt-[20px]'}
                            fullWidth
                            multiline={true}
                            rows={5}
                            value={datosVinculantes}
                            onChange={(e) => setDatosVinculantes(e.target.value)}
                        />

                        <TextField
                            id="curriculum"
                            required
                            label="Currículum General"
                            variant="outlined"
                            className={'!mt-[20px]'}
                            fullWidth
                            multiline={true}
                            rows={5}
                            value={curriculum}
                            onChange={(e) => setCurriculum(e.target.value)}
                        />

                        <TextField
                            id="actividadesRendimientoPolitico"
                            label="Actividades y rendimiento político-electoral (si aplica)"
                            variant="outlined"
                            className={'!mt-[20px]'}
                            fullWidth
                            multiline={true}
                            rows={5}
                            value={actividadesRendimientoPolitico}
                            onChange={(e) => setActividadesRendimientoPolitico(e.target.value)}
                        />

                        <Divider
                            className={'w-full !mt-[30px] bg-slate-400'}
                        />

                        <Typography
                            variant="h6"
                            style={{
                                fontFamily: 'Hubot-Sans',
                                fontStretch: 'normal',
                                marginBottom: '20px',
                                marginTop: '30px',
                                fontWeight: '600',
                            }}
                        >
                            4- Datos de quien propone
                        </Typography>

                        <TextField
                            id="nombrePropone"
                            required
                            label="Persona que propone"
                            variant="outlined"
                            fullWidth
                            value={nombrePropone}
                            onChange={(e) => setNombrePropone(e.target.value)}
                        />

                        <TextField
                            id="telefonoPropone"
                            required
                            label="Teléfono de quien propone"
                            variant="outlined"
                            className={'!mt-[20px]'}
                            type={'tel'}
                            fullWidth
                            value={telefonoPropone}
                            onChange={(e) => {
                                let dataTmp = e.target.value;
                                dataTmp = dataTmp.replace(/[^0-9]/g, '');
                                setTelefonoPropone(dataTmp);
                            }}
                        />

                        <TextField
                            id="emailPropone"
                            required
                            label="Correo electrónico de quien propone"
                            variant="outlined"
                            className={'!mt-[20px]'}
                            fullWidth
                            value={correoPropone}
                            onChange={(e) => setCorreoPropone(e.target.value)}
                        />

                        <Divider
                            className={'w-full !my-[50px] bg-slate-400'}
                        />

                        <Typography
                            variant="h6"
                            style={{
                                fontFamily: 'Hubot-Sans',
                                fontStretch: 'normal',
                                marginBottom: '20px',
                                fontWeight: '600',
                            }}
                        >
                            5- Aviso de privacidad
                        </Typography>

                        <Grid
                            container
                        >
                            <Grid
                                item
                            >
                                <Checkbox
                                    checked={avisoPrivacidad}
                                    onChange={(e) => setAvisoPrivacidad(e.target.checked)}
                                    inputProps={{'aria-label': 'controlled'}}
                                />
                            </Grid>

                            <Grid
                                item xs={12} sm={12} md={6}
                                className={'flex items-center !font-normal tracking-wide'}
                            >
                                <Typography
                                    variant="body1"
                                    component="div"
                                    className={'flex items-start !font-normal tracking-wide'}
                                    style={{
                                        fontFamily: 'Hubot-Sans',
                                        fontStretch: 'normal',
                                    }}
                                >
                                    Para continuar, debes aceptar el &nbsp;
                                </Typography>

                                <a
                                    href={'https://transparencia.movimientociudadano.mx/protecciondedatospersonales#avisos-de-privacidad'}
                                    target={'_blank'}
                                    className={'!ml-[5px] !font-bold tracking-wide !underline text-blue-900'}
                                >
                                    Aviso de privacidad
                                </a>
                            </Grid>
                        </Grid>

                        <div
                            className={'w-full !mt-[5px] !mb-[50px] text-xs text-left'}
                        >
                            Movimiento Ciudadano, es el responsable del tratamiento de los datos personales que nos
                            proporcione, los cuales serán protegidos conforme
                            a la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados y demás
                            normatividad que resulte aplicable.
                            Los datos recabados, los utilizaremos para las siguientes finalidades:
                            • Muestra fehaciente de la realización de actividades de Movimiento Ciudadano
                            • Posterior invitación a eventos de Movimiento Ciudadano mediante el dato de contacto
                            proporcionado.
                            • Entrega de reconocimientos de participación
                            • Encuestas
                            • Envío de información.

                            No se realizarán transferencias de datos personales, salvo aquéllas que sean
                            necesarias
                            para atender requerimientos de información de una autoridad competente, que estén
                            debidamente fundados y motivados. Si desea mayor información sobre los términos y
                            condiciones en que éstos serán tratados, puede consultar el aviso de privacidad
                            integral en
                            https://transparencia.movimientociudadano.mx/protecciondedatospersonales#avisos-de-privacidad
                        </div>

                        <Button
                            variant="contained"
                            color="primary"
                            className={'!mt-[20px] w-full h-[60px]'}
                            disabled={!validateForm() || loading === true}
                            onClick={() => {
                                crearPeticion();
                            }}
                        >
                            Enviar registro
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default RegistroDistritosForm;
