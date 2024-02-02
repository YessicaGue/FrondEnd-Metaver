import React, { useState, useEffect }  from 'react';
import { Box, Typography, Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import { Link } from '@inertiajs/react';
import fallback_url from './imagen-eventos.png';

const dateParser = (datestring) => {
    const date = new Date(datestring);
    const today = new Date();
    return `
        ${
            date.toLocaleTimeString('es-ES', { weekday: 'long' })
                .substring(0,3)
        },
        ${
            date.toLocaleDateString('es-ES', { day: 'numeric' })
        }
        ${
            date.toLocaleTimeString('es-ES', { month: 'long' })
                .substring(0,3)
        }.
        ${
            date.toLocaleDateString('es-ES', { year: 'numeric' }) != today.toLocaleDateString('es-ES', { year: 'numeric' })
                ? date.toLocaleDateString('es-ES', { year: 'numeric' })
                : ''
        }
        ${ 
            date.toLocaleTimeString('es-ES', { hour: '2-digit', minute:'2-digit' })
        } horas
    `;
};

export const CustomCard = (props) => {
    const { id, titulo, contenido, imagenUrl, fechaEvento, alt, onClick } = props;

    return (
        <div className={props.className}>
            <Card className={`w-full h-[390px] relative`}>

                <div className='w-full h-[180px] absolute z-0 overflow-hidden'>
                    <div
                        className='mt-[-50px] w-[150%] h-[150%] max-w-full bg-mc-primary'
                        style={{
                            backgroundImage: `url( ${ imagenUrl } )`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'blur(3px)'
                        }}
                    >
                    </div>
                </div>

                <CardMedia
                    className='h-[180px] absolute'
                    component="img"
                    alt={ alt }
                    image={ imagenUrl || fallback_url }
                    onError={e => e.target.src = fallback_url}
                    style={{ objectFit: "contain" }}
                />

                <CardContent style={{
                    padding: 0,
                    marginTop: 180
                }}>

                    <div className='max-h-[100px] relative'>
                        <div className='absolute bottom-[100%] w-full p-4 bg-[rgba(0,0,0,0.7)]'>
                            <div className='flex items-center justify-start p-0'>
                                <AlarmIcon
                                    className='text-white'
                                    style={{ fontSize: 18 }}
                                />
                                <Typography
                                    variant={'h1'}
                                    style={{
                                        marginLeft: '.9rem',
                                        fontFamily: 'Poppins, sans-serif',
                                        letterSpacing: '0px',
                                        fontSize: '10px',
                                        color: 'white',
                                        zIndex: '1',
                                        textAlign: 'center',
                                    }}
                                >
                                    { dateParser(fechaEvento) }
                                </Typography>
                            </div>
                        </div>

                    </div>

                    <div style={{ padding: '1rem' }}>
                        <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                style={{
                                    lineHeight: 1.2,
                                    fontSize: 18,
                                    letterSpacing: -1,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "3",
                                    WebkitBoxOrient: "vertical",
                                }}
                            >
                                { titulo }
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            { contenido }
                        </Typography>
                    </div>

                </CardContent>

                <CardActions style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: '1rem',
                    position: 'absolute',
                    bottom: '0rem',
                    right: '0rem'
                }}>
                    <Link href={route("evento.page", { id })}>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={ onClick }
                        >
                            Ver más
                        </Button>
                    </Link>
                </CardActions>

            </Card>
        </div>
    );
};

const SeccionEventos = () => {
    const [ listaEventos, setListaEventos ] = useState([]);

    useEffect(() => {
        axios
            .get(route('get.eventos'))
            .then((response) => {
                const datosPublicos = response.data.filter(({ privacidad }) => privacidad === 1);
        
                setListaEventos( datosPublicos );
            })
            .catch((error) => console.error(error))
    }, []);

    return (
        <div className='w-full bg-gray-100 z-10'>
            <div className='max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 py-8'>
                <Typography className='text-[#333333] z-[1] tracking-[-1] pb-2'
                    variant={'h1'}
                    style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '24px',
                        fontWeight: 'bolder',
                    }}
                >
                    Échale un vistazo a los próximos eventos de nuestra comunidad
                </Typography>
                <div className='w-[80px] h-[3px] bg-mc-primary mb-4'></div>
                <div className='grid max-sm:gap-1 max-md:gap-4 gap-8 grid-cols-4 max-md:grid-cols-2 max-lg:grid-cols-3'>
                    {
                        listaEventos.map((evento) => (
                            <CustomCard
                                key={ JSON.stringify(evento) }
                                className='transform hover:translate-y-[-5px] hover:shadow-xl transition duration-300 ease-in-out cursor-pointer'
                                titulo={ evento.nombre }
                                contenido={ evento.descripcion }
                                imagenUrl={ evento.imagen }
                                fechaEvento={ evento.fechaEvento }
                                liga={ '' }
                                alt={ '' }
                                id={ evento.id }
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default SeccionEventos;