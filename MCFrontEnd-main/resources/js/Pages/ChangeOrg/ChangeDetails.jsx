import React, {useEffect, useState} from 'react';
import {Head} from "@inertiajs/react";
import ChangeHeader from "@/Pages/ChangeOrg/ChangeHeader";
import {Box, Button, CircularProgress, Typography, useMediaQuery} from "@mui/material";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BgCrear1 from "../../../assets/images/change_org/bg-crear-1_up.png";
import {FlagOutlined, LocationCityOutlined, NotListedLocationOutlined, PublicOutlined} from "@mui/icons-material";
import ChangeFirmar from "@/Pages/ChangeOrg/ChangeFirmar";

const ChangeDetails = (props) => {

    const BASE_URL = props['urlApi'];
    const xs = useMediaQuery('(max-width:499px)');
    const sm = useMediaQuery('(max-width:899px)');
    const lg = useMediaQuery('(max-width:1199px)');
    const xl = useMediaQuery('(min-width:1200px)');

    const [peticion, setPeticion] = useState(null);
    const [loading, setLoading] = useState(true);

    const [showFirma, setShowFirma] = useState(false);

    const callGetData = () => {
        setLoading(true);

        // Get id from url Query Params
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('idPeticion');

        axios.get(`${BASE_URL}/api/change/petitions/by/id/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(response => {
                console.log(response);
                toast('🦄 Petición cargada correctamente');
                setPeticion(response.data['peticion']);
            })
            .catch(error => {
                console.log(error);
                toast.error('Error al cargar la petición');
                setPeticion(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        callGetData();
    }, []);

    return (
        <Box
            className={'w-full h-screen m-0 flex flex-col'}
        >
            <Head title="Voces del Futuro | Detalles"/>

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

            {
                loading &&
                <Box
                    className={'w-full h-full flex flex-col items-center justify-center'}
                >
                    <CircularProgress
                        className={'mx-auto'}
                    />

                    <Typography
                        variant="h5"
                        component="div"
                        className={'flex items-center justify-center !my-[50px] !font-normal tracking-wide w-full text-center'}
                        style={{
                            fontFamily: 'Hubot-Sans',
                            fontStretch: 'normal',
                        }}
                    >
                        Cargando la petición, por favor espere...
                    </Typography>
                </Box>
            }

            {
                (!loading && (peticion === null)) &&
                <Box
                    className={'w-full h-full flex flex-col items-center justify-center'}
                >
                    <Typography
                        variant="h5"
                        component="div"
                        className={'flex items-center justify-center !my-[50px] !font-normal tracking-wide w-full text-center'}
                        style={{
                            fontFamily: 'Hubot-Sans',
                            fontStretch: 'normal',
                        }}
                    >
                        No se ha encontrado la petición solicitada, por favor verifique la URL.
                    </Typography>
                </Box>
            }

            {
                (!loading && (peticion !== null)) &&
                <Box
                    className={'w-full p-0 m-0 flex flex-col'}
                >
                    <Typography
                        variant="h2"
                        component="div"
                        className={'flex items-start justify-start !my-[20px] tracking-wider w-full text-start px-[20px]'}
                        style={{
                            fontFamily: 'Mona-Sans',
                            fontStretch: 'normal',
                            fontWeight: '400',
                        }}
                    >
                        {peticion?.['titulo']}
                    </Typography>

                    <Box
                        className={'w-full h-[500px] p-0 mx-0 mb-[50px] flex flex-col relative'}
                    >
                        <Box
                            className={'w-full h-[350px] p-0 m-0 flex flex-col relative rounded-2xl border border-gray-300'}
                            style={{
                                backgroundImage: `url(${peticion['imagen_url']})`,
                            }}
                        >
                            <div
                                className={'w-full h-full bg-white opacity-50 absolute top-0 left-0 z-[2]'}
                                style={{
                                    backdropFilter: 'blur(50px)',
                                    WebkitBackdropFilter: 'blur(50px)',
                                }}
                            />

                            <img
                                src={peticion['imagen_url']}
                                alt="Voces del Futuro"
                                className={'w-full h-full object-contain z-[3]'}
                                style={{
                                    objectPosition: 'center',
                                }}
                            />
                        </Box>

                        <Box
                            className={'w-auto h-[50px] px-[20px] m-0 flex flex-col items-center justify-center absolute top-[20px] right-[20px] z-[5]'}
                            style={{
                                backgroundColor: '#DFF8E577',
                                backdropFilter: 'blur(15px)',
                                WebkitBackdropFilter: 'blur(15px)',
                                borderRadius: '25px',
                                border: '1px solid #0000001E',
                                color: '#000000',
                                fontWeight: '500',
                            }}
                        >
                            {
                                peticion['causa_peticion']['nombre']
                            }
                        </Box>

                        <Box
                            className={'w-[250px] h-[250px] p-[20px] m-0 flex flex-col items-center justify-center absolute top-[250px] left-[20px] z-[4]'}
                            style={{
                                backgroundColor: '#FFFFFF1E',
                                backdropFilter: 'blur(15px)',
                                WebkitBackdropFilter: 'blur(15px)',
                                borderRadius: '25px',
                                border: '1px solid #0000001E',
                            }}
                        >
                            {
                                peticion['voluntarios_inscritos_count'] > 0 ?
                                    <Box
                                        className={'w-full h-full p-0 m-0 flex flex-col items-center justify-center'}
                                    >
                                        <Typography
                                            variant="h3"
                                            component="div"
                                            className={'flex items-start justify-start !my-[20px] tracking-wide'}
                                            style={{
                                                fontFamily: 'Mona-Sans',
                                                fontStretch: 'normal',
                                                fontWeight: '700',
                                            }}
                                        >
                                            {'+' + peticion?.['voluntarios_inscritos_count']}
                                        </Typography>

                                        <Typography
                                            variant="h5"
                                            component="div"
                                            className={'flex items-center justify-center tracking-wide text-center'}
                                            style={{
                                                fontFamily: 'Mona-Sans',
                                                fontStretch: 'normal',
                                                fontWeight: '500',
                                            }}
                                        >
                                            Voluntarios inscritos
                                        </Typography>
                                    </Box>
                                    :
                                    <Typography
                                        variant="h5"
                                        component="div"
                                        className={'flex items-center justify-center tracking-wide text-center'}
                                        style={{
                                            fontFamily: 'Mona-Sans',
                                            fontStretch: 'normal',
                                            fontWeight: '500',
                                        }}
                                    >
                                        Aún no hay voluntarios inscritos, ¡Sé el primero!
                                    </Typography>
                            }
                        </Box>

                        {
                            !xs &&
                            <Button
                                variant="contained"
                                className={'!flex !items-center justify-center !pt-2 !tracking-wider'}
                                style={{
                                    backgroundColor: "#000",
                                    color: "#fff",
                                    height: "50px",
                                    borderRadius: "25px",
                                    fontFamily: 'Mona-Sans',
                                    fontWeight: "500",
                                    position: 'absolute',
                                    top: '400px',
                                    right: '20px',
                                    width: 'calc(100vw - 310px)',
                                }}
                                onClick={() => {
                                    setShowFirma(!showFirma);
                                }}
                            >
                                ¡Firma ahora!
                            </Button>
                        }
                    </Box>

                    {
                        xs &&
                        <Button
                            variant="contained"
                            className={'!flex !items-center justify-center !pt-2 !px[20px] !tracking-wider'}
                            style={{
                                backgroundColor: "#000",
                                color: "#FFF",
                                height: "50px",
                                borderRadius: "25px",
                                fontFamily: 'Mona-Sans',
                                fontWeight: "500",
                            }}
                            onClick={() => {
                                setShowFirma(!showFirma);
                            }}
                        >
                            ¡Firma ahora!
                        </Button>
                    }

                    {
                        showFirma &&
                        <ChangeFirmar
                            {...props}
                            onFirmar={() => {
                                callGetData();
                                toast.success('Se ha firmado la petición con éxito');
                                setShowFirma(false);
                            }}
                        />
                    }

                    <Box
                        className={'w-full h-fit px-[20px] mx-0 mt-[30px] mb-[50px] flex flex-col relative items-center justify-center'}
                    >
                        {
                            peticion['tipo_peticion']['id'] === 1 ?
                                <LocationCityOutlined
                                    className={'!w-[50px] !h-[50px] mb-[1px] text-slate-500'}
                                />
                                :
                                peticion['tipo_peticion']['id'] === 2 ?
                                    <FlagOutlined
                                        className={'!w-[50px] !h-[50px] mb-[10px] text-slate-500'}
                                    />
                                    :
                                    peticion['tipo_peticion']['id'] === 3 ?
                                        <PublicOutlined
                                            className={'!w-[50px] !h-[50px] mb-[10px] text-slate-500'}
                                        />
                                        :
                                        <NotListedLocationOutlined
                                            className={'!w-[50px] !h-[50px] mb-[10px] text-slate-500'}
                                        />
                        }

                        <Typography
                            variant="h6"
                            component="div"
                            className={'flex items-center justify-center !mb-[30px] tracking-wider text-slate-500 text-center'}
                            style={{
                                fontFamily: 'Mona-Sans',
                                fontStretch: 'normal',
                                fontWeight: '600',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {'Peticion\n' + peticion['tipo_peticion']['nombre']}
                        </Typography>

                        <Typography
                            variant="h4"
                            component="div"
                            className={'flex items-start justify-start !my-[20px] tracking-wider w-full text-start'}
                            style={{
                                fontFamily: 'Mona-Sans',
                                fontStretch: 'normal',
                                fontWeight: '400',
                            }}
                        >
                            {peticion?.['descripcion']}
                        </Typography>
                    </Box>
                </Box>
            }
        </Box>
    );
}

export default ChangeDetails;
