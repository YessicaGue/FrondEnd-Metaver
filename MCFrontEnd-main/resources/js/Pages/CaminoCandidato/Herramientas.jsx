import React from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';

function Herramientas() {
  return (
    <CustomLayout visible={ true } >
        <header className='bg-gradient-to-r from-slate-800 via-orange-500 to-pink-500 grid grid-cols-7 gap-2 w-full px-20 py-10 mt-10'>
            <div className='col-span-5 text-4xl text-white font-bold border-l-4 border-white pl-20 py-10 t-n' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
            Camino del héroe ciudadan@
            <h1 className='font-extrabold text-4xl mt-1 pb-5 text-white'> 
                Herramientas
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
            <div className='lg:max-w-6xl md:max-w-5xl m-auto w-full h-full my-10 px-20'>
                <iframe className='min-h-[600px] sm:min-h-[300px] md:min-h-[600px]' src="https://player.vimeo.com/video/854533370?h=2ed7d7660c" width='100%' height='100%' frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div className='grid grid-cols-4 gap-3 w-full flex justify-center'>
                <a href='https://public.ciudadanosenmovimiento.org/vocesdelfuturo' target='_blank' rel='noopener noreferrer' className='h-full w-full'>
                <section className='h-full flex flex-col justify-between justify-center rounded-lg bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-white to-white shadow-xl px-12 py-10 overflow-hidden relative transform hover:shadow-xl hover:translate-y-[-20px] opacity-80 hover:opacity-100 transition-all'>
                    <div className='text-justify font-bold'>
                        <h1 className='text-2xl text-orange-500 font-bold text-center pb-10'>Voces del Futuro</h1>
                        <p className='text-md'>Plataforma que permitirá recabar firmas de apoyo para cada proyecto. <br /> Las peticiones se podrán compartir a través de redes sociales la plataforma para que más personas se sumen a la causa.</p>
                    </div>
                </section>
                </a>
                <section className='flex flex-col justify-between justify-center rounded-lg bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-white to-white shadow-xl px-12 py-10 overflow-hidden relative transform hover:shadow-xl hover:translate-y-[-20px] opacity-80 hover:opacity-100 transition-all'
                    onClick={() => { location.replace(route('perfil.page')) }}>

                    <div className='text-justify pb-1 font-bold'>
                        <h1 className='text-xl text-orange-500 font-bold text-center pb-4'>Fanpage / Página para seguidores</h1>
                        <p className='text-md'>Una página para seguidores en el metaverso naranja al llegar a la etapa de “Tu Causa”. <br /> La intención de esta página es que puedan compartir las actividades que realizan y el trabajo en sus comunidades.</p>
                    </div>
                </section>
                <a href='https://dashboard.ciudadanosenmovimiento.org/eventos' target='_blank' rel='noopener noreferrer' className='h-full w-full block'>
                <section className='h-full flex flex-col justify-between justify-center rounded-lg bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-white to-white shadow-xl px-12 py-10 overflow-hidden relative transform hover:shadow-xl hover:translate-y-[-20px] opacity-80 hover:opacity-100 transition-all'>
                    <div className='text-justify font-bold'>
                        <h1 className='text-2xl text-orange-500 text-center pb-10'>Eventos</h1>
                        <p className='text-md'> Área para crear eventos y consultar cuántas personas se han inscrito en ellos. <br />  También es un apartado para que cada participante se registre y participe en los eventos públicos disponibles.</p>
                    </div>
                </section>
                </a>

                <a href='cartas-evidencias' target='_blank' rel='noopener noreferrer' className='h-full w-full'>
                <section className='h-full flex flex-col justify-between justify-center rounded-lg bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-white to-white shadow-xl px-12 py-10 overflow-hidden relative transform hover:shadow-3xl hover:translate-y-[-20px] opacity-80 hover:opacity-100 transition-all'>
                    <div className='text-justify font-bold'>
                        <h1 className='text-xl text-orange-500 font-bold text-center pb-4'>Cartas de recomendación / evidencias</h1>
                        <p className='text-md'> Apartado para cargar cartas de apoyo de parte de la comunidad, evidencias de trabajo comunitario y más.</p>
                    </div>
                </section>
                </a>
            </div>
            <div className='w-full flex justify-center'>
                <button className='bg-gradient-to-r from-red-600 to-orange-400 ml-5 text-white text-xl rounded-xl font-bold px-7 py-3 mt-40 flex justify-center hover:bg-orange-600'
                    onClick={() => { location.replace(route('perfil.candidato.page')) }}
                    // onClick={() => window.history.back()}
                    >  &#8592; Volver
                </button>
            </div>
        </body>
        
    </CustomLayout>
  );
}

export default Herramientas;