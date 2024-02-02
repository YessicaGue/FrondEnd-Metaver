import React from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';
// import './infografia.pdf'
import infografia from './MediakitCHC.pdf';

function CaminoComunicacion() {
  return (
    <CustomLayout visible={ true } >
        <header className='bg-gradient-to-r from-slate-800 from-1% via-orange-500 via-40% to-pink-500 to-99% w-full px-20 py-10 mt-10'>
            <div className='text-4xl text-white font-bold border-l-4 border-white pl-20 py-10 t-n' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                Mi camino, Comunicación 
            </div>
        </header>
        <body className='max-w-10xl mx-auto px-2 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>
            <div className='max-w-3xl m-auto text-center bg-white text-xl shadow-xl mt-2 items-center justify-center mb-10'>
                <h1 className='bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-300 text-white font-bold py-2'>Media Kit</h1>
                <p className='py-6'>
                Descarga el mediakit para realizar <br /> publicaciones en redes sociales y comunicar de <br /> una manera más efectiva
                </p>
            </div>
            <div className='grid gap-4 grid-cols-2 mt-5 max-lg:grid-cols-1 w-full'>
                <div className="w-full min-h-[600px] bg-white shadow-xl mt-2 relative">
                    {/* <p className='text-orange-500 font-bold text-2xl text-center flex justify-center'>Infografia</p> */}
                    <iframe className='h-full' src={`${infografia}#view=FitV`}  width="100%" height="100%"></iframe>
                </div>
                <div className="w-full min-h-[600px] bg-white shadow-xl mt-2 relative">
                    <div className='w-full h-full'>
                        <iframe className='min-h-[80px] sm:min-h-[80px] md:min-h-[700px] lg:min-h-[700px] xl:max-h-[1100px]' src="https://player.vimeo.com/video/857608653?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" allowFullScreen width='100%' height='100%'></iframe><script src="https://player.vimeo.com/api/player.js"></script>
                    </div>
                </div>
                    
            </div>
            <div className='grid grid-cols-2 gap-10'>
                <button className='bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold mt-10 flex justify-center px-14 py-3' onClick={() => { location.replace(route('perfil.candidato.page')) }}> 
                    Descargar
                </button>
                <button className='bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold mt-10 flex justify-center px-14 py-3' onClick={() => { location.replace(route('perfil.candidato.page')) }}> 
                    Perfil del Héroe
                </button>
            </div>
            <div className='flex justify-center'>
                <button className='max-w-xs bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold w-full m-auto h-full py-2 mt-10 justify-center hover:bg-orange-600'
                    onClick={() => { location.replace(route('perfil.candidato.page')) }}
                    // onClick={() => window.history.back()}
                    >  &#8592; Volver
                </button>
            </div>
        </body>
    </CustomLayout>
  );
}

export default CaminoComunicacion;