import React from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';
//import './instrucciones.png'
import p1 from './picturesforos/p1.jpg';
import p2 from './picturesforos/p2.png';
import p3 from './picturesforos/p3.png';
import p4 from './picturesforos/p4.jpg';
import p5 from './picturesforos/p5.jpg';
import p6 from './picturesforos/p6.jpg';
import p7 from './picturesforos/p7.jpg';
import p8 from './picturesforos/p8.jpg';
import p9 from './picturesforos/p9.png';
import p10 from './picturesforos/p10.jpg';
import p11 from './picturesforos/p11.png';
import p12 from './picturesforos/p12.png';
import p13 from './picturesforos/p13.jpg';
import p14 from './picturesforos/p14.png';
import p15 from './picturesforos/p15.jpg';
import p16 from './picturesforos/p16.jpg';
import p17 from './picturesforos/p17.png';
import p18 from './picturesforos/p18.png';
import p19 from './picturesforos/p19.png';
import p20 from './picturesforos/p20.jpg';


function AgendaCiudadana(props) {
    const {
        isDemo = false,
        auth:{user}
    } = props;

  return (
    <CustomLayout user={user} visible={ true } >
            <div className='bg-gradient-to-r from-slate-800 via-orange-500 to-pink-500 grid grid-cols-7 gap-2 w-full px-20 py-10 mt-10'>
                <div className='col-span-5 text-4xl text-white font-bold border-l-4 border-white pl-10 pt-10 t-n px-20' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                    Camino del héroe ciudadan@
                    <h1 className='font-extrabold text-4xl mt-1 pb-5 text-white'>
                        Agenda Ciudadana
                    </h1>
                </div>
                <button className='justify-end' onClick={() => { location.replace(route("perfil.page", { id: user.perfil_data.guid })) }}>
                    <a className='max-sm:h-30 shadow-lg md:h-40 relative rounded-2xl overflow-hidden flex items-center text-white font-bold text-2xl justify-center'>
                        Mi Perfil Multiverso
                    </a>
                </button>
                <button className='justify-end' onClick={() => { location.replace(route('perfil.candidato.page')) }}>
                    <a className='max-sm:h-30 shadow-lg md:h-40 relative rounded-2xl overflow-hidden flex items-center text-white font-bold text-2xl justify-center'>
                        Mi Perfil de Héroe Ciudadan@
                    </a>
                </button>
            </div>
            <body className='max-w-10xl mx-auto px-2 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>
            <div className='lg:max-w-6xl md:max-w-5xl m-auto w-full h-full mb-10 px-20'>
                <iframe className='min-h-[600px] sm:min-h-[300px] md:min-h-[600px]' src="https://player.vimeo.com/video/858067164?h=8a2bc07af7" width='100%' height='100%' frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div className='flex gap-4 flex-col mt-20 max-lg:grid-cols-1 w-full'>
                <div className="w-full min-h-[300px] bg-white shadow-xl mt-10 relative">
                    <p className='text-center justify-center my-4 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-400'>Foros asociados a tu Camino </p>
                    <div className="grid grid-cols-5 gap-4">
                    <a href="https://www.youtube.com/live/Oxw_D08O-V8?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p4 } alt="Seguridad, justicia y paz" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/ipmjZx4BK8c?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p5 } alt="Medio ambiente y sostenibilidad" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/Qli4_iuAbrU?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p6 } alt="Hacienda publica y reforma fiscal" className="w-full h-auto" />
                        </a>
                    </div>
                </div>
                <div className="w-full min-h-[300px] bg-white shadow-xl mt-2 relative">
                    <p className='text-center justify-center my-4 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-300'>Conoce todos los foros </p>
                    <div className="grid grid-cols-5 gap-4">
                        <a href="https://www.youtube.com/live/p6gZ8uRmbyY?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p1 } alt="Mexico: soberania y globalizacion" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/y9S14O4AD80?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p2 } alt="El futuro sera feminista" className="w-full h-auto" />
                        </a>
                        <a href="" target='_blank' rel='noopener noreferrer'>
                            <img src={ p3 } alt="" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/Oxw_D08O-V8?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p4 } alt="Seguridad, justicia y paz" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/ipmjZx4BK8c?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p5 } alt="Medio ambiente y sostenibilidad" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/Qli4_iuAbrU?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p6 } alt="Hacienda publica y reforma fiscal" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/ujRczP-OD9U?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p7 } alt="Educacion y cultura" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/k6dv0_-h178?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p8 } alt="Salud y bienestar" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/lKmfWDNjKsM?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p9 } alt="El futuro es un nuevo trato verde" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/o1ViQrtrrVM?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p10 } alt="Gobernanza y democracia" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/4SgX9coGsvs?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p11 } alt="El futuro se construye desde lo local" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/cWUNLFaNL6s?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p12 } alt="El futuro es socialdemocrata" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/4eKn3dDkUp4?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p13 } alt="Alimentacion y desarrollo agropecuario" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/ZaoglRQ5inY?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p14 } alt="Igualdad sustantiva" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/eAv_Ptm6LK0?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p15 } alt="Infraestructura para el desarrollo" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/eUn076QsQEo?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p16 } alt="Innovacion, ciencia y tecnologia" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/RAUlBKF6uCo?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p17 } alt="El futuro es un nuevo trato al campo" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/kHMzIz028o4?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p18 } alt="El futuro es un nuevo pacto fiscal" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/cqh1teOVRdE?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p19 } alt="El futuro no tiene fronteras" className="w-full h-auto" />
                        </a>
                        <a href="https://www.youtube.com/live/hetvEuHhV7A?feature=share" target='_blank' rel='noopener noreferrer'>
                            <img src={ p20 } alt="Desarrollo industrial y comercio" className="w-full h-auto" />
                        </a>
                    </div>
                </div>

            </div>
            <div className='w-full flex justify-center gap-6'>
                <button className='max-w-xs bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold w-full h-full py-3 mt-10 justify-center hover:bg-orange-600'
                    onClick={() => { location.replace(route('candidatura.page')) }}
                    // onClick={() => window.history.back()}
                    >  &#8592; Volver
                </button>
                <button className='bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold px-6 py-2 mt-10 flex justify-center px-48 py-3' onClick={() => { location.replace(route('candidatura.page')) }}>
                Continuar Camino del Héroe Ciudadan@
                </button>
            </div>
        </body>
    </CustomLayout>
  );
}

export default AgendaCiudadana;
