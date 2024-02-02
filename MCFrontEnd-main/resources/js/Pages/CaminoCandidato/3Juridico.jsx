import React from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';

function Juridico(props) {
    const {
        isDemo = false,
        auth: { user }
    } = props;

  return (
    <CustomLayout user={ user } visible={ true } >
            <header className='bg-gradient-to-r from-slate-800 via-orange-500 to-pink-500 grid lg:grid-cols-7 md:grid-cols-1 gap-2 w-full px-20 py-10 mt-10'>
                <div className='lg:col-span-5 md:col-span-1 lg:text-4xl md:text-4xl sm:text-3xl text-white font-bold lg:pl-20 md:pl-10 sm:pl-10 pt-10 t-n' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                    Camino del héroe ciudadan@
                    <h1 className='font-extrabold lg:text-4xl sm:text-3xl mt-1 pb-5 text-white'>
                    Jurídico
                    </h1>
                </div>
                <div className='lg:cols-span-2 md-cols-span-2 sm:cols-span-1 justify-center flex'>
                    <div className='sm:mx-2 md:mx-2'>
                        <button className='justify-end'>
                            <a className='max-sm:h-30 shadow-lg md:h-40 relative rounded-2xl overflow-hidden flex items-center px-4 text-white font-bold lg:text-2xl sm:text-sm md:text-md justify-center'>
                                Mi Perfil Multiverso
                            </a>
                        </button>
                    </div>
                    <div className='justify-end '>
                        <button className='justify-end' onClick={() => { location.replace(route('perfil.candidato.page')) }}>
                            <a className='max-sm:h-30 shadow-lg md:h-40 relative rounded-2xl overflow-hidden flex items-center  px-4  text-white font-bold lg:text-2xl sm:text-sm md:text-md justify-center'>
                                Mi Perfil de Héroe Ciudadan@
                            </a>
                        </button>
                    </div>
                </div>
            </header>
            <body className='max-w-10xl mx-auto px-2 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>
            <section className='grid lg:grid-cols-3 sm:grid-cols-1 pb-20' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
            <div className='bg-gray-200 mx-10 mt-20 p-10 shadow-xl relative h-full'>
                <h1>Texto</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam, perspiciatis consequatur culpa rerum vel doloribus officia dicta quas, eveniet iusto sint adipisci inventore ratione impedit facere hic, repellendus veritatis blanditiis?</p>
                <p>Facere autem nulla ex exercitationem rem, eveniet cupiditate porro sequi.</p>
                </div>
               <div className='col-span-2 my-10 mb-20 lg:max-w-6xl md:max-w-5xl m-auto w-full h-full'>
			   		<div className='lg:max-w-6xl md:max-w-5xl m-auto w-full h-full my-10 my-10 pl-10'>
                        <iframe className='min-h-[400px] sm:min-h-[300px] md:min-h-[400px]' src="https://www.youtube.com/embed/Cd_S6YQtBqk" width='100%' height='100%' frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            </section>
            <div className='justify-start pl-10'>
                {/* <button className='bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold px-6 py-3 mt-10 flex justify-center mb-10' onClick={() => { location.replace(route('causa.page')) }}>
                    Continuar Camino del Héroe Ciudadan@
                </button> */}
                <button className='max-w-xs bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold w-full m-auto h-full py-2 mt-10 justify-center hover:bg-orange-600'
                    onClick={() => { location.replace(route('crea.equipo.page')) }}
                    // onClick={() => window.history.back()}
                    >  &#8592; Volver
                </button>
            </div>
        </body>
    </CustomLayout>
  );
}

export default Juridico;
