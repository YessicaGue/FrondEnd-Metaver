import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Divider,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Typography,
    useMediaQuery
} from "@mui/material";
import {Head} from "@inertiajs/react";
import BgVoces1 from '@/../assets/images/change_org/bg-1.png';
import Grid2 from "@mui/material/Unstable_Grid2";
import ChangeHeader from "@/Pages/ChangeOrg/ChangeHeader";
import {ListaFrases} from "@/Pages/ChangeOrg/Frases";
import {InfoOutlined} from "@mui/icons-material";

const ChangeOrg = (props) => {

    const BASE_URL = props['urlApi'];
    const xs = useMediaQuery('(max-width:499px)');
    const sm = useMediaQuery('(max-width:899px)');
    const lg = useMediaQuery('(max-width:1199px)');
    const xl = useMediaQuery('(min-width:1200px)');

    const [frase, setFrase] = useState(ListaFrases[0]);

    // Select a random frase from the list
    useEffect(() => {
        // Change the frase every 5 seconds
        const interval = setInterval(() => {
            const index = Math.floor(Math.random() * ListaFrases.length);
            setFrase(ListaFrases[index]);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const [listaPeticiones, setListaPeticiones] = useState([]);
    const [listaFiltradaPeticiones, setListaFiltradaPeticiones] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/change/petitions`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(response => {
                console.log(response);
                setListaPeticiones(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const getRows = () => {
        if (xs) {
            return 1;
        } else if (sm) {
            return 2;
        } else if (lg) {
            return 3;
        } else if (xl) {
            return 4;
        }
    }

    // Get max 6 elements from the list randomly
    const [maxItems, setMaxItems] = useState(4);
    const getListaPeticiones = () => {
        if (pauseRefresh) {
            return listaFiltradaPeticiones;
        }

        let lista = [...listaPeticiones];
        let listaRandom = [];

        let max = lista.length > maxItems ? maxItems : lista.length;
        for (let i = 0; i < max; i++) {
            const index = Math.floor(Math.random() * lista.length);
            listaRandom.push(lista[index]);
            lista.splice(index, 1);
        }
        return listaRandom;
    }

    useEffect(() => {
        setMaxItems(getRows() * 2);
    }, [xs, sm, lg]);

    const [pauseRefresh, setPauseRefresh] = useState(false);

    useEffect(() => {
        setListaFiltradaPeticiones(getListaPeticiones());
        if (listaPeticiones.length > 0) {
            const interval = setInterval(() => {
                if (!pauseRefresh) {
                    setListaFiltradaPeticiones(getListaPeticiones());
                }
            }, 12000);

            // Clear interval on re-render to avoid memory leaks
            return () => clearInterval(interval);
        }
    }, [listaPeticiones, maxItems, pauseRefresh]);

    return (
        <Box
            className={'w-full h-screen m-0 flex flex-col'}
        >
            <Head title="Voces del Futuro"/>

            <ChangeHeader/>

            <Box
                className={'w-full p-[20px] m-0 flex'}
            >
                <Grid2
                    container
                    className={'w-full p-0 m-0 flex items-center'}
                    style={{
                        minHeight: "calc(100vh - 70px)",
                    }}
                >
                    <Grid2
                        item xs={12} sm={6} lg={6}
                        className={'flex flex-col items-start justify-evenly'}
                    >
                        <Typography
                            variant="h3"
                            component="div"
                            className={'flex items-center !font-black tracking-wide !mb-[50px]'}
                            style={{
                                fontFamily: 'Mona-Sans'
                            }}
                        >
                            {frase}
                        </Typography>

                        <Button
                            variant="contained"
                            className={'!mb-[100px] !flex !items-center justify-center !pt-2'}
                            style={{
                                backgroundColor: "#DFF8E5",
                                color: "#000000",
                                height: "50px",
                                borderRadius: "25px",
                                fontFamily: 'Mona-Sans',
                                fontWeight: "bold",
                            }}
                            onClick={() => {
                                window.open('/vocesdelfuturo/crear', '_self')
                            }}
                        >
                            Crea tu petición
                        </Button>

                        <Typography
                            variant="subtitle1"
                            component="div"
                            className={'flex items-center !font-normal tracking-wider text-gray-400 text-left max-w-[600px]'}
                            style={{
                                fontFamily: 'Hubot-Sans'
                            }}
                        >
                            En un mundo en constante evolución, la unión de nuestras voces es esencial para impulsar
                            un cambio verdadero y significativo. Cada voz cuenta, y juntos no solo redefinimos
                            el panorama actual, sino que también construimos una visión compartida del futuro.
                            Es nuestra responsabilidad colectiva forjar el mañana que deseamos. Únete, porque
                            tu voz es el eco de un cambio auténtico.
                        </Typography>
                    </Grid2>

                    <Grid2
                        item xs={12} sm={6} lg={6}
                        className={'flex items-center justify-center min-h-[350px]'}
                    >
                        <img
                            className="block w-auto fill-current text-gray-800 object-contain my-[50px] min-h-[300px]"
                            src={BgVoces1}
                            alt="Voces del Futuro"
                        />
                    </Grid2>
                </Grid2>
            </Box>

            <Box
                className={'w-full p-0 m-0 bg-gradient-to-r from-[#1D2A21] to-[#444F48] flex flex-col items-center justify-center'}
                style={{
                    minHeight: '500px',
                }}
            >
                <Typography
                    variant="h2"
                    component="div"
                    className={'flex items-center !font-semibold tracking-wide text-white'}
                    style={{
                        fontFamily: 'Hubot-Sans'
                    }}
                >
                    Tu voz, nuestro eco de cambio.
                </Typography>
            </Box>

            <Box
                className={'w-full px-[20px] py-[100px] m-0 flex flex-col items-start justify-center'}
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
                    Galería
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
                    Aquí encontrarás las peticiones más recientes de nuestra comunidad.
                    Y tú, ¿qué quieres cambiar?
                </Typography>

                <Divider
                    className={'w-full !mt-[20px] !mb-[50px] bg-slate-500'}
                />

                {
                    listaFiltradaPeticiones?.length > 0 ?
                        <ImageList
                            variant="quilted"
                            cols={getRows()}
                            rowHeight={sm ? 300 : 500}
                            gap={8}
                            onMouseEnter={() => {
                                setPauseRefresh(true);
                            }}
                            onMouseLeave={() => {
                                setTimeout(() => {
                                    setPauseRefresh(false);
                                }, 2000);
                            }}
                        >
                            {
                                listaFiltradaPeticiones.map((item, idx) => (
                                    <ImageListItem
                                        key={item['imagen_url'] + idx}
                                    >
                                        <img
                                            src={`${item['imagen_url']}`}
                                            srcSet={`${item['imagen_url']}`}
                                            alt={item.title}
                                            loading="lazy"
                                        />

                                        <ImageListItemBar
                                            title={item['titulo']}
                                            subtitle={item['autor']}
                                            style={{
                                                fontFamily: 'Hubot-Sans',
                                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                backdropFilter: 'blur(5px)',
                                                WebkitBackdropFilter: 'blur(5px)',
                                            }}
                                            actionIcon={
                                                <IconButton
                                                    sx={{color: "rgba(255, 255, 255, 0.54)"}}
                                                    aria-label={`info about ${item['titulo']}`}
                                                    onClick={() => {
                                                        window.open(`/vocesdelfuturo/detalles?idPeticion=${item['id']}`, '_self')
                                                    }}
                                                >
                                                    <InfoOutlined/>
                                                </IconButton>
                                            }
                                        />
                                    </ImageListItem>
                                ))
                            }
                        </ImageList>
                        :
                        <Typography
                            variant="h4"
                            component="div"
                            className={'flex items-center justify-center !my-[50px] !font-normal tracking-wide w-full text-center'}
                            style={{
                                fontFamily: 'Hubot-Sans',
                                fontStretch: 'normal',
                            }}
                        >
                            No hay peticiones disponibles
                        </Typography>
                }
            </Box>
        </Box>
    );
}

export default ChangeOrg;
