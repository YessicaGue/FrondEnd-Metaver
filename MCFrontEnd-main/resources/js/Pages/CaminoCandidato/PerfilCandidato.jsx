import React, {useEffect, useState} from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';
import CustomEventos from '@/Components/Customized/CustomComponents/CustomEventos';
import CustomTabActividades from './CustomTabActividades';
import { Typography, Button } from '@mui/material';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';
import {Box} from '@mui/material';
import fallback_url from './imagen-componentes.png';
import fallback from './imagen-eventos.png';
import { FaTrophy } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faLaptopFile } from '@fortawesome/free-solid-svg-icons';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import GraficaBarras from './GraficaBarras';
import GraficaPastel from './GraficaPastel';
import { toast, ToastContainer } from 'react-toastify';



const PerfilCandidato = (props) => {
        const {
            fotoPerfil,
            detalleCandidato,
            isDemo = false,
            auth:{user}
        } = props;
    const [persona,setPersona] = useState(detalleCandidato?.persona??null);
    const [promedioAvance,setPromedioAvance] = useState(detalleCandidato?.promedioAvance??'Sin Información');
    const [candidatoPerfil,setCandidatoPerfil] = useState(detalleCandidato?.candidatoPerfil??[]);
    const [camino,setCamino] = useState(candidatoPerfil[0]?.camino?.nombre??'Aún no te inscribes a un camino');
    const [avancesCamino,setAvancesCamino] = useState(candidatoPerfil[0]?.etapasAvance??[]);
    const [avanceEtapaRegistro, setAvanceEtapaRegistro] = useState(detalleCandidato?.detalleEtapaRegistro??[]);
    /*Nombre puesto*/
    const[nombre, setNombre] = useState(persona?.nombre??'');
    const[apellidoPaterno, setApellidoPaterno] = useState(persona?.apellidoPaterno??'');
    const[apellidoMaterno, setApellidoMaterno] = useState(persona?.apellidoMaterno??'');
    const [cargoPostulacion, setCargoPostulacion] = useState(candidatoPerfil?.cargoPostulacion??'No hay información Cargo');
    /*Información camino*/
    const [todasLasEtapasRegistroCompletadas, setTodasLasEtapasRegistroCompletadas] = useState(detalleCandidato?.todasLasEtapasRegistroCompletadas);
    const [todasLasEtapasAvanceCompletadas, setTodasLasEtapasAvanceCompletadas] = useState(detalleCandidato?.todasLasEtapasAvanceCompletadas);
    const [tieneCaminoAsignado, setTieneCaminoAsignado] = useState(detalleCandidato?.todasLasEtapasAvanceCompletadas);
    const [detalleEtapaRegistroFlecha, setDetalleEtapaRegistroFlecha] = useState(
avanceEtapaRegistro
            ?avanceEtapaRegistro.filter((item) => item.indiceOrden===1 || item.indiceOrden === 3)
            : []);
    console.log(avanceEtapaRegistro);
    console.log(detalleEtapaRegistroFlecha);
    const combinedArray = [
        ...detalleEtapaRegistroFlecha,
        ...avancesCamino,
    ];
    console.log(combinedArray);

  return (
    <CustomLayout visible={ true } user={user} >
            <div className='bg-black w-full pt-10 pb-16 pl-40 pr-10 mt-16 relatiive shadow-xl'>
                <div className='text-4xl font-bold border-l-4 border-white text-white pl-10 py-10 t-n' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                <Box className='w-full mt-1 pl-2 relative'>
                    <Typography fontWeight='700' className='max-md:text-centerl text-white' style={{
                        fontSize: '2.10rem',
                        fontFamily: 'Poppins, sans-serif',
                        color: 'transparent',
                        WebkitTextStroke: 'calc(2px + (1.5 - 1.7) * ((50vw - 375px)/(1920 - 375))) rgb(255, 255, 255)',
                        lineHeight: 'calc(36px + 1vw)'
                    }}>{camino}</Typography>
                </Box>
                </div>

            </div>
            <div className='max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>

            <div className='justify-end flex gap-10 text-white font-bold text-xl mt-10'>
            <ParticlesLinks color="#FF8300" />
                <button className='bg-gradient-to-bl from-red-600 via-orange-300 to-orange-600 rounded-lg border-4 flex flex-col items-center text-center p-4 px-10'
                    onClick={() => {
                        location.replace(route('camino.insignias.page'));
                    }}
                    >
                    <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faAward} className="text-4xl mb-2" />
                    </div>
                    <div className="mt-2">Insignias</div>
                </button>
                <button
                    className='bg-gradient-to-bl from-red-600 via-orange-300 to-orange-600 rounded-lg border-4 flex flex-col items-center text-center p-4'
                    onClick={() => { location.replace(route('camino.comunicacion.page')) }}>
                    <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faUsers} className="text-4xl mb-2" />
                    </div>
                    <div className="mt-2">Comunicación</div>
                </button>
                <button
                    className='bg-gradient-to-bl from-red-600 via-orange-300 to-orange-600 rounded-lg border-4 flex flex-col items-center text-center p-4'
                    onClick={() => { location.replace(route('herramientas.page')) }}>
                    <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faLaptopFile} className="text-4xl mb-2" />
                    </div>
                    <div className="mt-2">Herramientas</div>
                </button>
            </div>
            <div className='grid gap-4 grid-cols-2 mt-20 max-lg:grid-cols-1 w-full'>
                <TrailAppear>
                    <div className="w-full min-h-[300px] bg-white shadow-xl mt-2 relative">
                        <div className='w-full rounded-lg py-1 absolute top-[-.5rem]' style={{ backgroundColor: '#6b897d' }}>
                           <p className='text-white font-bold pl-5 text-lg'>Insignias</p>
                        </div>
                        <div className="w-full grid grid-cols-4 pt-40 text-center">
                            <p>1</p>
                            <p>1</p>
                            <p>1</p>
                            <p>1</p>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-3 min-h-[300px] bg-white shadow-xl relative">
                        <section className='col-span-2 p-2'>
                            <Box className='w-full mt-1 pl-2 relative'>
                                <Typography fontWeight='700' className='max-md:text-centerl' style={{
                                    fontSize: '1.70rem',
                                    fontFamily: 'Poppins, sans-serif',
                                    color: 'transparent',
                                    WebkitTextStroke: 'calc(2px + (1.5 - 1.7) * ((50vw - 375px)/(1920 - 375))) rgb(255 131 0)',
                                    lineHeight: 'calc(36px + 1vw)'
                                }}>{persona!=null?(nombre+' '+apellidoPaterno+' '+apellidoMaterno):'No hay infomación capturada'}
                                </Typography>
                            </Box>
                            <p className='text-orange-500 font-extrabold pl-2 text-lg'>{cargoPostulacion}</p>
                        </section>
                        <section className='p-2'>
                            <Box
                                className='max-sm:h-60 shadow-lg h-full p-5 relative rounded-2xl overflow-hidden flex items-center bg-mc-primary'
                                style={{
                                    backgroundImage: `url(${fotoPerfil ?? fallback_url}), url(${fallback_url})`,
                                    backgroundPosition: 'center',
                                    // backgroundSize: 'cover'
                                }}
                            >
                            </Box>
                        </section>
                    </div>
                </TrailAppear>
            </div>
            <div className="w-full mt-20 min-h-[200px] bg-white shadow-xl mt-2 relative">
                <div className='w-full rounded-lg py-1 absolute top-[-.5rem]' style={{ backgroundColor: '#6b897d' }}>
                    <p className='text-white font-bold pl-5 text-lg'>Avance</p>
                    {/* <p className='text-white font-bold pl-5 text-lg justify-end' >Capacitación</p> */}
                </div>
                <div className='w-full relative justify-end flex pr-20 top-[-.2rem]' >
                    <button className='text-white font-bold px-5 text-lg bg-gradient-to-bl from-red-600 via-orange-300 to-orange-600 rounded-lg' onClick={() => { location.replace(route('candidatura.page')) }}>Etapas</button>
                </div>
                {/*<p className='text-md font-bold p-10 pl-5 pb-5'>Avance: 69% </p>*/}

                {/*<div className='grid grid-cols-10 relative flex-wrap px-5 text-sm pr-20 pb-10 text-white font-bold'>*/}
                {/*    <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-orange-300 to-orange-400 border-r-2 border-white py-4 text-center flex items-center justify-center rounded-l-2xl'>Requisitos de elegibilidad</div>*/}
                {/*    <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-orange-300 to-orange-400 border-r-2 border-white py-4 text-center flex items-center justify-center'>Carta compromiso</div>*/}
                {/*    <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-orange-300 to-orange-400 border-r-2 border-white py-4 text-center flex items-center justify-center'>Mi camino</div>*/}
                {/*    <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-orange-300 to-orange-400 border-r-2 border-white py-4 text-center flex items-center justify-center'>Capacitación básica</div>*/}
                {/*    <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-orange-300 to-orange-400 border-r-2 border-white py-4 text-center flex items-center justify-center'>Tu causa</div>*/}
                {/*    <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-orange-500 to-orange-400 border-r-2 border-white py-4 text-center flex items-center justify-center'>Crea tu equipo</div>*/}
                {/*    <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-orange-500 to-orange-400 border-r-2 border-white py-4 text-center flex items-center justify-center'>Ficha territorial</div>*/}
                {/*    <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-orange-500 to-orange-400 border-r-2 border-white py-4 text-center flex items-center justify-center'>Agenda Ciudadana</div>*/}
                {/*    <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-orange-500 to-orange-400 border-r-2 border-white py-4 text-center flex items-center justify-center'>Estrategia política I</div>*/}
                {/*    <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-300 via-gray-400 to-gray-500 border-r-2 border-white py-4 text-center flex items-center justify-center'>JURADO</div>*/}
                <p className='text-md font-bold p-10 pl-5 pb-5'>Avance: {avancesCamino.length>0 && avanceEtapaRegistro.length>0?promedioAvance:'No hay información'} %</p>
                <div className='grid grid-cols-10 relative flex-wrap px-5 text-sm pr-20 pb-10 text-white fond-bold'>
                    {detalleEtapaRegistroFlecha.length > 0 && avancesCamino.length > 0 &&(
                        <>
                            {combinedArray.map((item,index)=>(
                                <div
                                    key={index}
                                    className={`bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 to-orange-400 border-r-2 border-white py-4 text-center flex items-center justify-center${
                                        index===0?' rounded-l-2xl ':''
                                    }${
                                        (item.porcentaje === 100 || (item.avance && item.avance.porcentajeAvance === 100)?' via-orange-300':' via-orange-500')
                                        //item.avance?' via-orange-300':' via-orange-500'
                                    }`}
                                >
                                    {item.etapa ? item.etapa.nombre : item.nombre}
                                </div>
                            ))}
                            <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-300 via-gray-400 to-gray-500 border-r-2 border-white py-4 text-center flex items-center justify-center'>JURADO</div>
                            <div style={{ position: 'absolute', top: -16, right: '0px', left: '93%',
                            // width: 10,
                            // height: 10,
                            borderTop: '60px solid transparent',
                            borderBottom: '60px solid transparent',
                            borderLeft: '80px solid #9CA3AF',
                            }}></div>
                        </>
                    )}
                </div>
            </div>
            <div className='grid gap-4 grid-cols-7 mt-20 max-lg:grid-cols-1 w-full'>
                <div className="col-span-2 w-full min-h-[200px] bg-white shadow-xl mt-2 relative">
                    <div className='w-full rounded-lg py-1 absolute top-[-.5rem]' style={{ backgroundColor: '#6b897d' }}>
                        <p className='text-white font-bold pl-5 text-lg'>Mis estadisticas</p>
                    </div>
                    <section className='grid grid-cols-2 pt-10'>
                        <div className="w-full min-h-[400px] mt-2 relative">
                        <div className="relative flex flex-col justify-center items-center pb-10">
                            <GraficaBarras />
                        </div>
                            <p className='pl-5 text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <div className="w-full min-h-[400px] relative pt-5">
                            <p className='pl-5 pb-10 text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <div className="relative flex flex-col m-auto justify-center items-center">
                                <GraficaPastel />
                            </div>
                        </div>
                    </section>
                </div>
                <div className='col-span-3'>
                    <div className="w-full min-h-[400px] bg-white shadow-xl mt-2  relative">
                        <div className='w-full rounded-lg py-1 absolute top-[-.5rem]' style={{ backgroundColor: '#6b897d' }}>
                            <p className='text-white font-bold pl-5 text-lg'>Actividades</p>
                        </div>
                        <div className='pt-10'>
                            <CustomTabActividades />
                        </div>
                    </div>
                </div>
                <div className="col-span-2 w-full min-h-[200px] bg-white shadow-xl mt-2 relative">
                    <div className='w-full rounded-lg py-1 absolute top-[-.5rem]' style={{ backgroundColor: '#6b897d' }}>
                        <p className='text-white font-bold pl-5 text-lg'>Proximos eventos</p>

                        <button
                            className='bg-mc-secondary rounded-lg font-[Poppins] text-white absolute top-1/2 translate-y-[-50%] right-0 p-1 font-semibold'
                            onClick={async () => {
                                try {
                                    const response = await axios.get(route('eject.to.dashboard'));

                                    if (response.status != 201) {
                                        Swal.fire({
                                            icon: 'info',
                                            title: '¡Enhorabuena!',
                                            text: 'Parece que tienes nuevos permisos. Ahora mismo esta sesión se cerrará y serás redirigido. Recuerda tener tus credenciales a la mano para iniciar sesión',
                                        });
                                    }

                                    toast("Cargando", {
                                        position: toast.POSITION.TOP_CENTER
                                    })

                                    // location.href = "https://dashboard.ciudadanosenmovimiento.org/eventos";
                                    location.href = "http://127.0.0.1:8000/eventos";
                                } catch (err) {

                                }
                            }}
                        >
                            Crear evento
                        </button>
                    </div>

                    <div className='w-full h-full pt-16 pb-4 pr-6 wysiwyg gap-6 flex flex-col'>
                        <CustomEventos/>
                        <CustomEventos/>
                    </div>
                </div>
            </div>
            <div className="w-full mt-20 min-h-[200px] bg-white shadow-xl mt-2 relative">
                <div className='w-full rounded-lg py-1 absolute top-[-.5rem]' style={{ backgroundColor: '#6b897d' }}>
                    <p className='text-white font-bold pl-5 text-lg'>Ficha Territorial</p>
                </div>
            </div>
            <div className='w-full flex justify-end'>
                <button className='bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold px-6 py-2 mt-10 flex justify-center px-12 py-3' onClick={() => { location.replace(route('capacitacion.page')) }}>
                    Continuar Camino del Héroe Ciudadan@
                </button>
            </div>
        </div>
        <ToastContainer />
    </CustomLayout>
  );
}

export default PerfilCandidato;
