import React from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';

function MiCandidatura(props) {
    const {
        isDemo = false,
        auth:{user}
    } = props;

  return (
    <CustomLayout visible={ true } user={ user } >
                <header className='bg-gradient-to-r from-slate-800 from-1% via-orange-500 via-40% to-pink-500 to-99% grid grid-cols-7 gap-2 w-full px-20 py-10 mt-10'>
            <div className='col-span-5 text-4xl text-white font-bold border-l-4 border-white pl-20 pt-16 t-n' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                MI CAMINO
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
            <h1 className='font-extrabold my-10 text-2xl'  style={{ fontFamily: 'Montserrat', letterSpacing: '1px', fontweigh:'800' }}> LISTADO DE REQUISITOS Y EXPLICACIONES</h1>
            <section className='grid grid-cols-4 border-4 shadow-xl rounded-xl mt-10' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                <h1 className='font-bold text-2xl text-center mt-10 text-orange-500'>
                    NIVEL 0 / REQUISITOS CIUDADANOS
                </h1>
                <div className='col-span-2 pl-10'>
                    <div class="flex mt-10">
                        <p class="font-bold text-md pb-5">Estado: Completado</p>
                        <p class="font-bold text-md pl-3 text-orange-500">100%</p>
                    </div>
                    <p className='text-sm text-justify'>
                    Servirá para acreditar el trabajo y la presencia en comunidad de las personas interesadas en participar en el camino del héroe ciudadan@.                    </p>
                    <p className='font-bold text-md py-5'>Fecha limite: 30/09/2023</p>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 items-center rounded-xl py-3 px-6 text-white text-xl shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route('carta.compromiso.page')) }}>Ver más</button>
                </div>
            </section>
            <section className='grid grid-cols-4 border-4 shadow-xl rounded-xl mt-10' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                <h1 className='font-bold text-2xl text-center mt-10 text-orange-500'>
                    CARTA COMPROMISO
                </h1>
                <div className='col-span-2 pl-10'>
                    <div class="flex mt-10">
                        <p class="font-bold text-md pb-5">Estado: Completado</p>
                        <p class="font-bold text-md pl-3 text-orange-500">100%</p>
                    </div>
                    <p className='text-sm text-justify'>
                    Aquí se presentan las propuestas, principios y valores de Movimiento Ciudadano con los que las y los participantes deberán estar de acuerdo.                    </p>
                    <p className='font-bold text-md py-5'>Fecha limite: 30/09/2023</p>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 items-center rounded-xl py-3 px-6 text-white text-xl shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route('carta.compromiso.page')) }}>Ver más</button>
                </div>
            </section>
            <section className='grid grid-cols-4 border-4 shadow-xl rounded-xl my-10' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                <h1 className='font-bold text-2xl text-center mt-10 text-orange-500'>
                    CAPACITACIÓN BÁSICA
                </h1>
                <div className='col-span-2 pl-10'>
                    <div class="flex mt-10">
                        <p class="font-bold text-md pb-5">Estado: Completado</p>
                        <p class="font-bold text-md pl-3 text-orange-500">100%</p>
                    </div>
                    <p className='text-sm text-justify'> Las personas participantes deberán acceder a estos cursos / documentos y acreditar las evaluaciones correspondientes </p>
                    <p className='font-bold text-md py-5'>Fecha limite: 30/09/2023</p>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 items-center rounded-xl py-3 px-6 text-white text-xl shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route('capacitacion.page')) }}>Ver más</button>
                </div>
            </section>
            <section className='grid grid-cols-4 border-4 shadow-xl rounded-xl my-10' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                <h1 className='font-bold text-2xl text-center mt-10 text-orange-500'>
                    TU CAUSA
                </h1>
                <div className='col-span-2 pl-10'>
                    <div class="flex mt-10">
                        <p class="font-bold text-md pb-5">Estado: Completado</p>
                        <p class="font-bold text-md pl-3 text-orange-500">0%</p>
                    </div>
                    <p className='text-sm'>
                    Son cursos, documentos y talleres que ayudarán a que las y los participantes creen sus propuestas de trabajo para defender sus causas.                    </p>
                    <p className='font-bold text-md py-5'>Fecha limite: 30/09/2023</p>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 items-center rounded-xl py-3 px-6 text-white text-xl shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route('causa.page')) }}>Ver más</button>
                </div>
            </section>
            <section className='grid grid-cols-4 border-4 shadow-xl rounded-xl my-10' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                <h1 className='font-bold text-2xl text-center mt-10 text-orange-500'>
                    CREA TU EQUIPO
                </h1>
                <div className='col-span-2 pl-10'>
                    <div class="flex mt-10">
                        <p class="font-bold text-md pb-5">Estado: Completado</p>
                        <p class="font-bold text-md pl-3 text-orange-500">0%</p>
                    </div>
                    <p className='text-sm text-justify'> Cada persona deberá formar y registrar un equipo que le apoye a desarrollar su causa y, eventualmente, pudiera apoyar como parte de su equipo electoral y de defensa del voto con base en los requisitos que se soliciten. </p>
                    <p className='font-bold text-md py-5'>Fecha limite: 30/09/2023</p>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 items-center rounded-xl py-3 px-6 text-white text-xl shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route('crea.equipo.page')) }}>Ver más</button>
                </div>
            </section>
            <section className='grid grid-cols-4 border-4 shadow-xl rounded-xl my-10' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                <h1 className='font-bold text-2xl text-center mt-10 text-orange-500'>
                    FICHA TERRITORIAL
                </h1>
                <div className='col-span-2 pl-10'>
                    <div class="flex mt-10">
                        <p class="font-bold text-md pb-5">Estado: Completado</p>
                        <p class="font-bold text-md pl-3 text-orange-500">0%</p>
                    </div>
                    <p className='text-sm'>
                    Podrás consultar la información territorial más relevante de tu comunidad e interactuar con el Centro de Inteligencia para crear inteligencia colectiva.                    </p>
                    <p className='font-bold text-md py-5'>Fecha limite: 30/09/2023</p>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 items-center rounded-xl py-3 px-6 text-white text-xl shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route('ficha.territorial.page')) }}>Ver más</button>
                </div>
            </section>
            <section className='grid grid-cols-4 border-4 shadow-xl rounded-xl my-10' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                <h1 className='font-bold text-2xl text-center mt-10 text-orange-500'>
                    AGENDA CIUDADANA
                </h1>
                <div className='col-span-2 pl-10'>
                    <div class="flex mt-10">
                        <p class="font-bold text-md pb-5">Estado: Completado</p>
                        <p class="font-bold text-md pl-3 text-orange-500">0%</p>
                    </div>
                    <p className='text-sm'>
                    Conocerás las propuestas realizadas desde Movimiento Ciudadano y la sociedad civil sobre diversos temas.                    </p>
                    <p className='font-bold text-md py-5'>Fecha limite: 30/09/2023</p>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 items-center rounded-xl py-3 px-6 text-white text-xl shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route('agenda.ciudadana.page')) }}>Ver más</button>
                </div>
            </section>
            <section className='grid grid-cols-4 border-4 shadow-xl rounded-xl my-10' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                <h1 className='font-bold text-2xl text-center mt-10 text-orange-500'>
                    ESTRATEGIA POLITICA
                </h1>
                <div className='col-span-2 pl-10'>
                    <div class="flex mt-10">
                        <p class="font-bold text-md pb-5">Estado: Completado</p>
                        <p class="font-bold text-md pl-3 text-orange-500">0%</p>
                    </div>
                    <p className='text-sm'>
                    Se definirá cuál será la estrategia política de las personas participantes para llevar su proyecto y sus propuestas a su comunidad.                    </p>
                    <p className='font-bold text-md py-5'>Fecha limite: 30/09/2023</p>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 items-center rounded-xl py-3 px-6 text-white text-xl shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route(' ')) }}>Ver más</button>
                </div>
            </section>
            {/* <section className='grid grid-cols-4 border-4 shadow-xl rounded-xl my-10' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                <h1 className='font-bold text-2xl text-center mt-10 text-orange-500'>
                    AGENDA DE TRABAJO
                </h1>
                <div className='col-span-2 pl-10'>
                    <div class="flex mt-10">
                        <p class="font-bold text-md pb-5">Estado: Completado</p>
                        <p class="font-bold text-md pl-3 text-orange-500">0%</p>
                    </div>
                    <p className='text-sm'>
                    Presentación del cronograma de actividades relacionadas con el proyecto de la persona participante.                    </p>
                    <p className='font-bold text-md py-5'>Fecha limite: 30/09/2023</p>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 items-center rounded-xl py-3 px-6 text-white text-xl shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route(' ')) }}>Ver más</button>
                </div>
            </section> */}
            {/* <section className='grid grid-cols-4 border-4 shadow-xl rounded-xl my-10' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                <h1 className='font-bold text-2xl text-center mt-10 text-orange-500'>
                    FICHA Y EQUIPO ELECTORAL
                </h1>
                <div className='col-span-2 pl-10'>
                    <div class="flex mt-10">
                        <p class="font-bold text-md pb-5">Estado: Completado</p>
                        <p class="font-bold text-md pl-3 text-orange-500">0%</p>
                    </div>
                    <p className='text-sm'>
                    Construcción y registro de la información y el equipo que apoyaría a la persona participante rumbo a los procesos de dos mil veinticuatro.                    </p>
                    <p className='font-bold text-md py-5'>Fecha limite: 30/09/2023</p>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 items-center rounded-xl py-3 px-6 text-white text-xl shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route(' ')) }}>Ver más</button>
                </div>
            </section> */}
            {/* <section className='grid grid-cols-4 border-4 shadow-xl rounded-xl my-10' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                <h1 className='font-bold text-2xl text-center mt-10 text-orange-500'>
                     PERFIL DEL CIUDADANO
                </h1>
                <div className='col-span-2 pl-10'>
                    <div class="flex mt-10">
                        <p class="font-bold text-md pb-5">Estado: Completado</p>
                        <p class="font-bold text-md pl-3 text-orange-500">0%</p>
                    </div>
                    <p className='text-sm'>
                    Identificación del perfil de la ciudadanía en la comunidad donde desean trabajar.                    </p>
                    <p className='font-bold text-md py-5'>Fecha limite: 30/09/2023</p>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 items-center rounded-xl py-3 px-6 text-white text-xl shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route('perfil.candidato.page')) }}>Ver más</button>
                </div>
            </section> */}
        </body>
    </CustomLayout>
  );
}

export default MiCandidatura;
