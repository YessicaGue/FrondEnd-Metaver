import React from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';
import carta from './CartaCreaTuEquipoCHC.pdf';

function Equipo(props) {
    const {
        isDemo = false,
        auth:{user}
    } = props;
  return (
    <CustomLayout visible={ true } user={ user } >
        <header className='bg-gradient-to-r from-slate-800 via-orange-500 to-pink-500 grid grid-cols-7 gap-2 w-full px-20 py-10 mt-10'>
            <div className='col-span-5 text-4xl text-white font-bold border-l-4 border-white pl-20 py-10 t-n' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
            Camino del héroe ciudadan@
            <h1 className='font-extrabold text-4xl mt-1 pb-5 text-white'>
                Crea tu equipo
            </h1>
            </div>
            <button className='justify-end'>
                <a className='max-sm:h-30 shadow-lg md:h-40 relative rounded-2xl overflow-hidden flex items-center text-white font-bold text-2xl justify-center'>
                    Mi Perfil Metaverso
                </a>
            </button>
            <button className='justify-end' onClick={() => { location.replace(route('perfil.candidato.page')) }}>
                <a className='max-sm:h-30 shadow-lg md:h-40 relative rounded-2xl overflow-hidden flex items-center text-white font-bold text-2xl justify-center'>
                Mi Perfil de Héroe Ciudadan@
                </a>
            </button>
        </header>
        <body className='max-w-10xl mx-auto px-2 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>

            <div className='w-full mx-auto'>
                <iframe className='min-h-[600px] sm:min-h-[200px] md:min-h-[600px]' src="https://player.vimeo.com/video/854533304?h=0fdb8d3290" width='100%' height='100%'></iframe>
            </div>
            <h1 className='max-w-6xl mx-auto w-full text-xl font-bold pt-10'>Tu equipo</h1>
            <div className='grid grid-cols-2 gap-6 max-w-6xl mx-auto w-full py-10'>
                <button className='bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl py-4 text-white text-xl shadow-xl font-bold' onClick={() => { location.replace(route('5estrategia.politica.page')) }}>
                Estrategia Política
                </button>
                <button className='bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl py-4 text-white text-xl shadow-xl font-bold' onClick={() => { location.replace(route('6estrategia.territorial.page')) }}>
                Estrategia de Tierra
                </button>
                <button className='bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl py-4 text-white text-xl shadow-xl font-bold' onClick={() => { location.replace(route('7analisis.territorial.page')) }}>
                Análisis Territorial
                </button>
                <button className='bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl py-4 text-white text-xl shadow-xl font-bold' onClick={() => { location.replace(route('9redes.sociales.page')) }}>
                Estrategias de Aire
                </button>
                <button className='bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl py-4 text-white text-xl shadow-xl font-bold' onClick={() => { location.replace(route('10causa.social.page')) }}>
                Causa Social (Innovación Social) - Diseño proyecto*
                </button>
                <button className='bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl py-4 text-white text-xl shadow-xl font-bold' onClick={() => { location.replace(route('11asamblea.ciudadana.page')) }}>
                Debate
                </button>
            </div>
            <h1 className='max-w-6xl mx-auto w-full text-xl font-bold pt-10'>Cursos recomendados</h1>
            <div className='grid grid-cols-2 gap-6 max-w-6xl mx-auto w-full py-10'>

            <button className='bg-gradient-to-r from-white to-gray-200 rounded-xl py-4 border-2 border-black text-xl shadow-xl font-bold'
                onClick={() => { location.replace(route('1cordinador.page')) }}>
                Coordinador de Campaña
                </button>
                <button className='bg-gradient-to-r from-white to-gray-200 rounded-xl py-4 border-2 border-black text-xl shadow-xl font-bold'
                onClick={() => { location.replace(route('2agenda.page')) }}>
                Agenda
                </button>
                <button className='bg-gradient-to-r from-white to-gray-200 rounded-xl py-4 border-2 border-black text-xl shadow-xl font-bold'
                onClick={() => { location.replace(route('3juridico.page')) }}>
                Jurídico
                </button>
                <button className='bg-gradient-to-r from-white to-gray-200 rounded-xl py-4 border-2 border-black text-xl shadow-xl font-bold'
                onClick={() => { location.replace(route('4presupuesto.page')) }}>
                Presupuesto / Finanzas
                </button>
                <button className='bg-gradient-to-r from-white to-gray-200 rounded-xl py-4 border-2 border-black text-xl shadow-xl font-bold'
                onClick={() => { location.replace(route('8estrategia.aire.page')) }}>
                Estrategia de Aire
                </button>
                <button className='bg-gradient-to-r from-white to-gray-200 rounded-xl py-4 border-2 border-black text-xl shadow-xl font-bold'
                onClick={() => { location.replace(route('12RG.page')) }}>
                Representante General
                </button>
                <button className='bg-gradient-to-r from-white to-gray-200 rounded-xl py-4 border-2 border-black text-xl shadow-xl font-bold'
                onClick={() => { location.replace(route('13RC.page')) }}>
                Representante de Casilla
                </button>
                <button className='bg-gradient-to-r from-white to-gray-200 rounded-xl py-4 border-2 border-black text-xl shadow-xl font-bold'
                onClick={() => { location.replace(route('14activista.page')) }}>
                Activista(s)
                </button>
            </div>
            <div className='w-full flex justify-center'>
                <button className='max-w-xs bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold w-full m-auto h-full py-2 mt-10 justify-center hover:bg-orange-600'>
                    <a href={ carta }
                        className="w-full h-full py-3"
                        target='_blank' rel='noopener noreferrer'
                        > Leer carta Crea tu Equipo
                    </a>
                </button>
            </div>
            <div className='w-full flex justify-center gap-6'>
                <button className='max-w-xs bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold w-full h-full py-2 mt-10 justify-center hover:bg-orange-600'
                    onClick={() => { location.replace(route('candidatura.page')) }}
                    // onClick={() => window.history.back()}
                    >  &#8592; Volver
                </button>
                <button className='bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold px-6 py-2 mt-10 flex justify-center' onClick={() => { location.replace(route('ficha.territorial.page')) }}>
                Continuar Camino del Héroe Ciudadan@
                </button>
            </div>
        </body>
    </CustomLayout>
  );
}

export default Equipo;
