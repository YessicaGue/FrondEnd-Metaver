import React from 'react';
import './styles.css';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';
import {generateGradiant} from "@/utils/AppGradientes";
import {appColors} from "@/utils/AppColors";
import { Head } from '@inertiajs/react';


class Juegos extends React.Component {
  render() {
    return (
      <>
            <Head title='Juegos' />
          <div className='w-full relative bg-gradient-to-b from-mc-primary to-mc-gradient3_2'>

          <ParticlesLinks color="#ffffff" />

          <TrailAppear>
              <div className="w-full max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 py-12 pt-28 text-white h-[300px]">
                  <h1 className='ml-8 font-black text-6xl' style={{
                      fontFamily: 'Poppins, sans-serif',
                      color: 'transparent',
                      WebkitTextStroke: '2px #ffffff'
                  }}> ¡HORA DE JUGAR!</h1>
              </div>
          </TrailAppear>
          </div>


          <div className='w-full z-10'>
                <div className='w-full'>
                    <div className='max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 py-8 h-full flex flex-col'>
                        <TrailAppear>
                            <div className='w-full pb-8'>
                                <div className='ml-auto mr-auto'>
                                    <div className='text font-semibold w-full text-center break-words text-gray-400 tracking-wider' style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Qué tal si dejamos atrás el aburrimiento y nos sumergimos en una emocionante partida.
                                    </div>
                                </div>
                            </div>
                        </TrailAppear>
                    </div>
                </div>
            </div>

        <div className='grid grid-cols-2 gap-4 h-full w-full max-md:grid-cols-1 max-lg:grid-cols-1 px-4 mb-20 cursor-pointer'> 
          <div className='w-full bgrosa h-20 py-20 rounded-xl text-white' onClick={() => { location.replace(route('juegos.memory.game')) }}> RETA A TU MEMORIA! </div>
          <div className='bgazul w-30 h-20 mx-10 py-20 rounded-xl text-white' onClick={() => { location.replace(route('juegos.airplane.game')) }}> JUGUEMOS! </div>
        </div>

        <div className='w-full text-white py-2 bg-[#101010]'>
            <div className='max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 h-full flex flex-col'>
                <div className='pt-6'>
                    <h1 className='text-xl font-bold'>Dirección:</h1>
                    <p>Lousiana Nápoles, 23923</p>
                </div>
                <div className='pt-4'>
                    <h1 className='text-xl font-bold'>Teléfono:</h1>
                    <p>222 333 4567</p>
                </div>
                <div className='pt-4'>
                    <h1 className='text-xl font-bold'>Contacto:</h1>
                    <p>labmc@movimientociudadano.mx</p>
                </div>
            </div>
        </div>
        
      </>
  
    )}
}

export default Juegos;
