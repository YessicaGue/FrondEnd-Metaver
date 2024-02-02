import React, {useState} from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';
import fallback_url from './imagen-componentes.png';
import manual from './manual.pdf';
import Swal from "sweetalert2";


const CaminoCandidato = (props) => {
    const {
        fotoPerfil,
        estatusEtapa,
        isDemo = false,
        auth: {user}
    } = props;
    const[haRealizadoEtapa,setHaRealizadoEtapa]=useState(estatusEtapa?.haRealizadoEtapa??false);
    //console.log(haRealizadoEtapa);

  return (
    <CustomLayout visible={ true }  user={ user } >
            <div className='bg-gradient-to-r from-slate-800 from-1% via-orange-500 via-40% to-pink-500 to-99% grid grid-cols-7 w-full px-20 py-10 mt-10'>
                <div className='col-span-6 text-4xl text-white font-bold py-10 t-n xs:pl-1 sm:pl-1 md:pl-5 lg:pl-40' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                    BIENVENID@ AL CAMINO DEL <br /> HÉROE CIUDADAN@
                </div>
                <section className='justify-end' onClick={() => { location.replace(route('perfil.candidato.page')) }}>
                    <div className='max-sm:h-30 shadow-lg md:h-40 relative rounded-2xl overflow-hidden flex items-center '
                        style={{
                            backgroundImage: `url(${fotoPerfil ?? fallback_url}), url(${fallback_url})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                        }}
                    >
                    </div>
                </section>
            </div>
            <div className='max-w-10xl m-auto px-4 xs:px-6 sm:px-10 lg:px-20 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>
            {/* <body className='max-w-10xl mx-auto px-2 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'> */}

            <div className='w-full h-full my-10 min-h-[600px] sm:max-h-[10px] xs:max-h-[5px] md:min-h-[600px]'>
            <iframe className='min-h-[80px] sm:min-h-[80px] md:min-h-[700px] lg:min-h-[700px] xl:max-h-[1100px]' src="https://player.vimeo.com/video/856564721?h=7ac1c436ec" width='100%' height='100%' frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe><script src="https://player.vimeo.com/api/player.js"></script>
            </div>

            <div className='grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 mb-20 gap-2 mt-20'>
               {/*  <div className='grid col-span-2 mt-20 bg-white pb-16 mt-2 relative text-orange-400 font-bold'>
                    <div className='w-full h-full min-h-[180px] mt-7'>
                        <iframe className='min-h-[90px] sm:min-h-[100px] md:min-h-[90px]' src="https://www.youtube.com/embed/Cd_S6YQtBqk" allowFullScreen width='100%' height='100%'></iframe>
                    </div>
                </div> */}
                <div className='grid col-span-2 mt-20 bg-white pb-8 '>
                    <span className='text-orange-500 font-bold text-xl text-center flex justify-center'>Manual plataforma</span>
                    <iframe className='min-h-[200px] sm:min-h-[100px] md:min-h-[400px]'  src={manual} width='100%' height='100%'></iframe>
                </div>
                <div className='flex flex-col justify-center items-center pt-20'>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 w-full text-white font-bold text-2xl rounded-2xl p-3 px-7 shadow-xl relative'
                            onClick={() => { location.replace(route('formulario.page')) }}>
                        {
                            haRealizadoEtapa?(
                                    <span>Se capturo la informacion faltante</span>
                                ):
                                (
                                    <span>Termina de llenar tus datos</span>
                                )
                        }
                    </button>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <button className={'bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold px-6 py-2 mt-10 flex justify-center'
                }
                        onClick={() =>
                        {
                             if(!isDemo && !haRealizadoEtapa)
                                 return(Swal.fire({
                                 text: `Da click en el boton TERMINA DE LLENAR TUS DATOS, Captura la información necesaria para Continuar`,
                                 icon: 'info',
                                 confirmButtonText: 'Aceptar',
                                 }))
                            location.replace(route('heroe.ciudadano.page'))
                        }}
                >
                    Continuar Camino del Héroe Ciudadan@
                </button>
            </div>
        </div>
    </CustomLayout>
  );
}

export default CaminoCandidato;
