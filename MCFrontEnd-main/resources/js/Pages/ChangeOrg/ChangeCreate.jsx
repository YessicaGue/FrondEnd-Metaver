import React, {useEffect, useState} from 'react';
import {Head} from "@inertiajs/react";
import ChangeHeader from "@/Pages/ChangeOrg/ChangeHeader";
import {Box, Button, ButtonGroup, Card, Divider, Grid, TextField, Typography} from "@mui/material";

import BgCrear1 from '@/../assets/images/change_org/bg-crear-1_up.png';
import {CustomDatePicker} from "@/Pages/Eventos/CustomDatePicker";
import UserFilesView from "@/Pages/ChangeOrg/UserFilesView";
import {appColors} from "@/utils/AppColors";
import Grid2 from "@mui/material/Unstable_Grid2";
import {LocationCityOutlined, Public, PublicOutlined, VerifiedOutlined} from "@mui/icons-material";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangeCreate = (props) => {

    const BASE_URL = props['urlApi'];

    const [listaTipos, setListaTipos] = useState([]);
    const [listaCausas, setListaCausas] = useState([]);

    const [loading, setLoading] = useState(false);

    const getTipos = () => {
        axios.get(`${BASE_URL}/api/change/petitions/types`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(response => {
                setListaTipos(response.data['tipos']);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const getCausas = () => {
        axios.get(`${BASE_URL}/api/change/petitions/causes`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(response => {
                setListaCausas(response.data['causas']);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        console.log('Props: ')
        console.log(props);
        getTipos();
        getCausas();
    }, []);

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [autor, setAutor] = useState('');

    const [imagen, setImagen] = useState('');

    const [fechaLimite, setFechaLimite] = useState(null);
    const [fechaLimiteTimestamp, setFechaLimiteTimestamp] = useState('');

    const [tipo, setTipo] = useState(null);
    const [causa, setCausa] = useState(null);

    const [ayuda, setAyuda] = useState(false);

    const validateForm = () => {
        if (titulo === '') {
            return false;
        }
        if (descripcion === '') {
            return false;
        }
        if (autor === '') {
            return false;
        }
        if (fechaLimite === null) {
            return false;
        }
        if (tipo === null) {
            return false;
        }
        if (causa === null) {
            return false;
        }
        return true;
    }

    const crearPeticion = () => {
        setLoading(true);
        toast(`🦄 Creando petición...`);

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('autor', autor);
        formData.append('fecha_limite', fechaLimiteTimestamp);
        formData.append('tipo_peticion', tipo?.id ?? 0);
        formData.append('causa_peticion', causa?.id ?? 0);
        formData.append('ayuda', ayuda ? "True" : "False");
        formData.append('imagen_url', imagen);

        axios.post(`${BASE_URL}/api/change/petition`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        })
            .then(response => {
                console.log(response);
                toast.success(`${response.data['message']}!`);
                setLoading(false);
                window.open('/vocesdelfuturo', '_self')
            })
            .catch(error => {
                console.log(error);
                toast.error(`Error al crear petición!: ${error['response']['data']['error']}`);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Box
            className={'w-full h-screen m-0 flex flex-col'}
        >
            <Head title="Voces del Futuro | Crear"/>

            <ChangeHeader/>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                draggable
                pauseOnHover
                pauseOnFocusLoss
                hideProgressBar={false}
                theme={'light'}
                style={{
                    zIndex: 99999999,
                }}
            />

            <img
                src={BgCrear1}
                alt="Voces del Futuro"
                className={'w-full h-[500px] object-cover'}
            />

            <Box
                className={'w-full px-[20px] pt-[30px] m-0 flex flex-col items-start justify-center'}
            >
                <Typography
                    variant="h3"
                    component="div"
                    className={'flex items-start !font-normal tracking-wide'}
                    style={{
                        fontFamily: 'Hubot-Sans',
                        fontStretch: 'normal',
                    }}
                >
                    Crear petición
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
                    A continuación, podrás crear una petición para que la comunidad pueda apoyarte.
                </Typography>

                <Divider
                    className={'w-full !mt-[20px] !mb-[50px] bg-slate-500'}
                />
            </Box>

            <Box
                className={'w-full px-[20px] pt-[0px] pb-[100px] m-0 flex flex-col items-start justify-center'}
            >
                <Typography
                    variant="h6"
                    style={{
                        fontFamily: 'Hubot-Sans',
                        fontStretch: 'normal',
                        marginBottom: '20px',
                        fontWeight: '600',
                    }}
                >
                    1- Seleccione el tipo de petición
                </Typography>

                <Grid2
                    container
                    spacing={2}
                    className={'w-full !mb-[50px] flex justify-evenly'}
                >
                    {
                        listaTipos?.length > 0 ?
                            listaTipos.map((item, index) => {
                                return (
                                    <Grid2
                                        key={index}
                                        item
                                        className={'w-[350px] h-[120px]'}
                                    >
                                        <Card
                                            elevation={3}
                                            className={'w-full h-full rounded-lg tracking-wide flex flex-col items-center justify-center cursor-pointer'}
                                            style={{
                                                fontFamily: 'Hubot-Sans',
                                                fontStretch: 'normal',
                                                fontWeight: '600',
                                                backgroundColor: tipo?.id === item.id ? appColors.secondary : '#FFFFFF',
                                                color: tipo?.id === item.id ? '#FFFFFF' : '#000000',
                                            }}
                                            onClick={() => {
                                                setTipo(item);
                                            }}
                                        >
                                            <LocationCityOutlined/>
                                            {item.nombre}
                                        </Card>
                                    </Grid2>
                                )
                            })
                            :
                            <Typography
                                variant="body1"
                                style={{
                                    fontFamily: 'Hubot-Sans',
                                    fontStretch: 'normal',
                                }}
                            >
                                No hay tipos de petición disponibles
                            </Typography>
                    }
                </Grid2>

                <Typography
                    variant="h6"
                    style={{
                        fontFamily: 'Hubot-Sans',
                        fontStretch: 'normal',
                        marginBottom: '20px',
                        fontWeight: '600',
                    }}
                >
                    2- Seleccione la causa de la petición
                </Typography>

                <Grid2
                    container
                    spacing={2}
                    className={'w-full !mb-[30px] flex justify-evenly'}
                >
                    {
                        listaCausas?.length > 0 ?
                            listaCausas.map((item, index) => {
                                return (
                                    <Grid2
                                        key={index}
                                        item
                                        className={'w-[350px] h-[120px]'}
                                    >
                                        <Card
                                            elevation={3}
                                            className={'w-full h-full rounded-lg tracking-wide flex flex-col items-center justify-center cursor-pointer'}
                                            style={{
                                                fontFamily: 'Hubot-Sans',
                                                fontStretch: 'normal',
                                                fontWeight: '600',
                                                backgroundColor: causa?.id === item.id ? '#074A3B' : '#FFFFFF',
                                                color: causa?.id === item.id ? '#FFFFFF' : '#000000',
                                            }}
                                            onClick={() => {
                                                setCausa(item);
                                            }}
                                        >
                                            <VerifiedOutlined/>
                                            {item.nombre}
                                        </Card>
                                    </Grid2>
                                )
                            })
                            :
                            <Typography
                                variant="body1"
                                style={{
                                    fontFamily: 'Hubot-Sans',
                                    fontStretch: 'normal',
                                }}
                            >
                                No hay causas disponibles en este momento
                            </Typography>
                    }
                </Grid2>

                <Divider
                    className={'w-full !my-[30px] bg-slate-400'}
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
                    3- A continuación ingrese los datos de la petición
                </Typography>

                <TextField
                    id="titulo"
                    label="Título"
                    variant="outlined"
                    fullWidth
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />

                <TextField
                    id="autor"
                    label="Autor"
                    variant="outlined"
                    className={'!mt-[20px]'}
                    fullWidth
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                />

                <TextField
                    id="descripcion"
                    label="Descripción"
                    variant="outlined"
                    className={'!mt-[20px]'}
                    fullWidth
                    multiline={true}
                    rows={3}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />

                <CustomDatePicker
                    label="Fecha límite"
                    inputVariant="outlined"
                    inputFormat="DD/MM/YYYY"
                    value={fechaLimite}
                    onChange={(e) => {
                        setFechaLimite(e);
                        setFechaLimiteTimestamp(e.unix());
                    }}
                    className={'!mt-[20px] !w-full'}
                    slotProps={{
                        textField: {
                            helperText: `Fecha límite para firmar la petición: ${fechaLimiteTimestamp ? fechaLimiteTimestamp : ''}`,
                        }
                    }}
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
                    4- Seleccione/suba una imagen para su petición, o bien pegue una URL de una imagen.
                </Typography>

                <TextField
                    id="imagen"
                    label="Imagen"
                    variant="outlined"
                    fullWidth
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                />

                <UserFilesView
                    urlImage={imagen}
                    setUrlImage={setImagen}
                    {...props}
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
                    5- Si considera que necesitará ayuda para difundir su petición, por favor seleccione la opción
                    "Sí" en el siguiente campo.
                </Typography>

                <ButtonGroup
                    variant="contained"
                    aria-label="contained primary button group"
                    className={'!mt-[20px] w-full'}
                >
                    <Button
                        onClick={() => setAyuda(true)}
                        style={{
                            width: '50%',
                            height: '60px',
                            backgroundColor: ayuda ? 'forestgreen' : '#FFFFFF',
                            color: ayuda ? '#FFFFFF' : '#000000',
                        }}
                    >
                        Sí
                    </Button>

                    <Button
                        onClick={() => setAyuda(false)}
                        style={{
                            width: '50%',
                            height: '60px',
                            backgroundColor: !ayuda ? 'indianred' : '#FFFFFF',
                            color: !ayuda ? '#FFFFFF' : '#000000',
                        }}
                    >
                        No
                    </Button>
                </ButtonGroup>

                <Divider
                    className={'w-full !my-[50px] bg-slate-400'}
                />

                <Button
                    variant="contained"
                    color="primary"
                    className={'!mt-[20px] w-full h-[60px]'}
                    disabled={!validateForm() || loading === true}
                    onClick={() => {
                        crearPeticion()
                    }}
                >
                    Crear petición
                </Button>
            </Box>
        </Box>
    );
}

export default ChangeCreate;
