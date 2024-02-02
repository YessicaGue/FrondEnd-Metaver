import React from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';

function FichaTerritorial(props) {
    const { isDemo = false } = props;
    
  return (
    <CustomLayout visible={ true } >
        <header className='bg-gradient-to-r from-slate-800 via-orange-500 to-pink-500 grid grid-cols-7 gap-2 w-full px-20 py-10 mt-10'>
            <div className='col-span-5 text-4xl text-white font-bold border-l-4 border-white pl-20 py-10 t-n' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
            Camino del héroe ciudadan@
            <h1 className='font-extrabold text-4xl mt-1 pb-5 text-white'> 
            Ficha Territorial
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
                <iframe className='min-h-[600px] sm:min-h-[300px] md:min-h-[600px]' src="https://player.vimeo.com/video/854530844?h=522c3895c9" width='100%' height='100%' frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div className='grid grid-cols-2 gap-10 lg:max-w-4xl md:max-w-4xl m-auto px-0'>
                <button className='bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold mt-10 flex justify-center w-full py-3'> 
                Subir Ficha Territorial
                </button>

                <a href="https://gis.ciudadanosenmovimiento.org/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4IiwianRpIjoiZGMyMTlkNmQ1Mzg2NjliNDZhMmVlZGQ0N2E5NGQzNTM1YmJmYzY5OTI0MDNhMjg5NjgzNjEzOTI4M2M0NWE4YmNmMDIyNTcwM2ZmNTc0YzEiLCJpYXQiOjE2ODgxNzM1NTcuOTczODY0LCJuYmYiOjE2ODgxNzM1NTcuOTczODY5LCJleHAiOjE2ODgyNTk5NTcuODY4NzIzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.b8qiyFhTGFgO-axGDbdGX18zM0v7e3hU39vYwxaMj3f-mPFpC6yZq8r5D7opicPayU7A2kI2nrs-UqYyvo5rUQ0U-b6I_ZHS-dUHHRl8OreKlwwwg6W0InhOGmM-jz9QSqxX5ZNnmbZ7ZN1XO7ioMuoPoyjOtilBay0DoJRlAKKTzYhhVbbOyE37oB3O1u8YYM5tMj7onrZg1FgSRnH7-4xEX7T-QoNwt63czbUPYYf9xsgED10gduV7D7MeS_GgDcaj1RC_Gz0G7qhY06mRvH3XOmE1ay_0t2ekKx4fimziBDw0KuzE6_-uk7Fcd9bRVxFS5DQMV-lmsPDLqpwPVhRRTU4Vvlx-Rg_Mx3TebdCD90h0DC5v9S46ExBRGGMMUGT3-UdSZChRuyvhcUrhm12SAk0LDPJeHbTnzxa4_Ttd_qjKAJ7voQRqrj-zg_b6QPXdegTNIKr5QWNXJPZ-AuaUjRD8HJdNNZvgfABgRM9_GscC7zPKDStHqVtq28MCYlG-q49InIJliWtBCYchAlz2gsvzQotR4fp0JOQXCeAP8t8pXlCT2w3EDAIZuCfHwvq4eVoD2gfyrP3qUqpe2FQhcWDFdCc-zkdX7JTukBRQEFNqG7YXNfle8o0fHjPOUgcAWQIWgZRgkwhlbc2fixhTJ9nkwQ1HfpSWb_prE10" className="block">
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold mt-10 flex justify-center w-full py-3'> 
                    Entrar a Centro de inteligencia
                    </button>
                </a>
                
            </div>
            <div className='w-full flex justify-center gap-6'>
                <button className='max-w-xs bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold w-full h-full py-3 mt-10 justify-center hover:bg-orange-600'
                    onClick={() => { location.replace(route('candidatura.page')) }}
                    // onClick={() => window.history.back()}
                    >  &#8592; Volver
                </button>
                <button className='bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold px-6 py-3 mt-10 flex justify-center' onClick={() => { location.replace(route('agenda.ciudadana.page')) }}> 
                    Continuar Camino del Héroe Ciudadan@
                </button>
            </div>
        </body>
    </CustomLayout>
  );
}

export default FichaTerritorial;