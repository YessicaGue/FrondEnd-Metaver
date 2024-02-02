import React from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';
// import './instrucciones.png'
// import instrucciones from './instrucciones.png';


function Tresdetres() {
  return (
    <CustomLayout visible={ true } >
        <header className='bg-gradient-to-r from-slate-800 via-orange-500 to-pink-500 grid grid-cols-7 gap-2 w-full px-20 py-10 mt-10'>
            <div className='col-span-5 text-4xl text-white font-bold border-l-4 border-white pl-20 pt-10 t-n' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
            Camino del héroe ciudadan@
            <h1 className='font-extrabold text-4xl mt-1 pb-5 text-white'> 
            3 de 3
            </h1>
            </div>
            <button className='justify-end'>
                <a className='max-sm:h-30 shadow-lg md:h-40 relative rounded-2xl overflow-hidden flex items-center text-white font-bold text-2xl justify-center'>
                    Mi Perfil Metaverso
                </a>
            </button>
            <button className='justify-end' onClick={() => { location.replace(route('perfil.candidato.page')) }}>
                <a className='max-sm:h-30 shadow-lg md:h-40 relative rounded-2xl overflow-hidden flex items-center text-white font-bold text-2xl justify-center'>
                    Mi Perfil Candidato
                </a>
            </button>
        </header>
        <body className='max-w-10xl mx-auto px-2 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>
            <div className='w-full h-full my-10 px-20'>
                <iframe className='min-h-[600px] sm:min-h-[300px] md:min-h-[600px]' src="https://www.youtube.com/embed/Cd_S6YQtBqk" allowFullScreen width='100%' height='100%'></iframe>
            </div>
                <div className='w-full flex justify-center'>
                {/* <button className='bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold px-6 py-2 mt-10 flex justify-center px-48 py-3' onClick={() => { location.replace(route('perfil.candidato.page')) }}> 
                Continuar Camino del Héroe Ciudadan@
                </button> */}
                <button className='bg-gradient-to-r from-red-600 to-orange-400 ml-5 text-white text-xl rounded-xl font-bold px-7 py-3 mt-10 flex justify-center bg-black hover:bg-orange-600'
                    onClick={() => { location.replace(route('candidatura.page')) }}
                    // onClick={() => window.history.back()}
                    >  &#8592; Volver
                </button>
            </div>
        </body>
    </CustomLayout>
  );
}

export default Tresdetres;