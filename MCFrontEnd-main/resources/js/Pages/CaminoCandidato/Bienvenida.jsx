import React from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
// import './style.css';

function Bienvenida(props) {
    const {
        auth: { user }
    } = props;

    return (
        <CustomLayout visible={ true } user={user} >
             
            <header className='bg-gradient-to-r from-slate-800 via-orange-500 to-pink-500 grid grid-cols-7 gap-2 w-full px-10 lg:px-20 md:px-10 sm:px-10 xs:px-10 py-10 mt-10'>
                <div className='col-span-5 text-4xl text-white border-l-4 border-white pl-10 lg:pl-20 sm:pl-10 xs:pl-10 t-n font-[Montserrat] font-black' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                    Metaverso naranja
                    <h1 className='font-bold text-4xl mt-1 pb-5 text-white'>
                        Bienvenida
                    </h1>
                </div>
            </header>
            <body>
                <div className='max-w-10xl m-auto px-4 xs:px-6 sm:px-10 lg:px-20 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>
                    <div className='w-full h-full mt-10 lg:min-h-[600px] sm:max-h-[10px] xs:max-h-[5px] md:min-h-[600px] pb-10'>
                        <iframe className='min-h-[80px] sm:min-h-[80px] md:min-h-[700px] lg:min-h-[700px] xl:max-h-[1100px]' src="https://player.vimeo.com/video/866444763?h=7ac1c436ec" width='100%' height='100%' frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe><script src="https://player.vimeo.com/api/player.js"></script>
                    </div>
                    <div className='flex justify-center lg:my-40 md:my-20 sm:my-10'>
                        <button className={'bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold px-6 py-2 flex justify-center'
                        }
                        onClick={() => {
                            location.replace(route('perfil.page', { id: user.perfil_data.guid }))
                        }}>
                            Ir a Mi Perfil
                        </button>
                    </div>
                </div>
            </body>
        </CustomLayout>
  );
}

export default Bienvenida;
