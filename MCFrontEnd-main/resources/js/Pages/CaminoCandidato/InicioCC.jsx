import React, {useState} from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';
import infografia from './camino-infografia.pdf'
import Swal from "sweetalert2";

function InicioCC(props) {
    const {
        isDemo = false,
        auth:{user},
        estatusEtapa
    } = props;
    const [tieneCaminoAsignado,setTieneCaminoAsignado] = useState(estatusEtapa?.tieneCaminoAsignado??false);
  return (
<CustomLayout visible={ true } user={ user } >
        <header className='bg-gradient-to-r from-slate-800 from-1% via-orange-500 via-40% to-pink-500 to-99% w-full px-20 py-10 mt-10'>
            <div className='text-4xl text-white font-bold border-l-4 border-white pl-20 py-10 t-n' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
            Camino del héroe ciudadan@ <br /> Mi camino
            </div>
        </header>
        <body className='max-w-10xl mx-auto px-2 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>

            <div className='grid gap-10 grid-cols-2 mt-20 max-lg:grid-cols-1 w-full'>
                <div className="w-full min-h-[600px] mt-2 relative">
                    {/* <p className='text-orange-500 font-bold text-2xl text-center flex justify-center'>Infografia</p> */}
                    <iframe className='mx-auto' src={ infografia } width="100%" height="100%"></iframe>

                </div>
                <div className="w-full min-h-[700px] mt-2 relative">
                    <div className='w-full h-full'>
                        <iframe className='min-h-[80px] sm:min-h-[80px] md:min-h-[700px] lg:min-h-[700px] xl:max-h-[1100px]' src="https://player.vimeo.com/video/854525004?h=fae7d022aa"  width='100%' height='100%' frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>

            </div>
            <div className='grid grid-cols-2 gap-6 max-w-10xl mx-auto w-full m-auto mx-20 mt-10'>
                    <button className='bg-gradient-to-r from-orange-600 to-orange-400 items-center rounded-lg py-5 text-white shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route('camino.naranja.page')) }}>Camino Naranja</button>
                    <button className='bg-gradient-to-r from-violet-400 via-purple-400 to-violet-600 items-center rounded-lg py-5 text-white shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route('camino.violeta.page')) }}>Camino Violeta</button>
                    <button className='bg-gradient-to-r from-yellow-400 via-yellow-400 to-lime-400 items-center rounded-lg py-5 text-white shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route('camino.fosfo.page')) }}>Camino Fosfo fosfo</button>
                    <button className='bg-gradient-to-r from-gray-200 to-gray-100 items-center rounded-lg py-5 shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route('camino.blanco.page')) }}>Camino Blanco</button>
                    <button className='bg-gradient-to-r from-blue-300 via-emerald-400 to-emerald-400 items-center rounded-lg py-5 text-white shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route('camino.electrico.page')) }}>Camino Eléctrico</button>
                    <button className='bg-gradient-to-r from-cyan-200 to-cyan-400 items-center rounded-lg py-5 text-white shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route('camino.celeste.page')) }}>Camino Celeste</button>
                    <button className='bg-gradient-to-r from-sky-300 via-lime-400 to-lime-400 items-center rounded-lg py-5 text-white shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }} onClick={() => { location.replace(route('camino.limon.page')) }}>Camino Limón</button>
                    <button className='rounded-lg py-5 relative overflow-hidden shadow-xl font-bold opacity-80 hover:opacity-100 transition-all text-white font-[Montserrat]'
                        style={{
                            background: `linear-gradient(
                                90deg,
                                rgba(255, 0, 0, .7) 0%,
                                rgba(255, 154, 0, .7) 10%,
                                rgba(208, 222, 33, .7) 20%,
                                rgba(79, 220, 74, .7) 30%,
                                rgba(63, 218, 216, .7) 40%,
                                rgba(47, 201, 226, .7) 50%,
                                rgba(28, 127, 238, .7) 60%,
                                rgba(95, 21, 242, .7) 70%,
                                rgba(186, 12, 248, .7) 80%,
                                rgba(251, 7, 217, .7) 90%,
                                rgba(255, 0, 0, .7) 100%
                            )`
                        }}
                        onClick={() => location.replace(route('camino.arcoiris.page'))}
                    >
                        Camino Arcoíris
                    </button>
                    <button className='rounded-lg py-5 relative overflow-hidden shadow-xl font-bold opacity-80 hover:opacity-100 transition-all text-white font-[Montserrat]'
                        style={{
                            background: `radial-gradient(
                                at 30% -5%,
                                #73EAEA,
                                #BEB4E4,
                                rgba(255, 255, 255, 0) 30%
                            ),
                            radial-gradient(
                                at 50% 70%,
                                #A3E3D0,
                                rgba(255, 255, 255, 0) 30%
                            ),
                            radial-gradient(
                                at 70% 0%,
                                #BEB4E4,
                                rgba(255, 255, 255, 0) 20%
                            ),
                            linear-gradient(
                                75deg,
                                #73EAEA 5%,
                                rgba(255, 255, 255, 0),
                                #84C1F1, rgba(255, 255, 255, 0),
                                #DEA8E7, rgba(255, 255, 255, 0),
                                #BEB4E4, rgba(255, 255, 255, 0),
                                #A3E3D0 90%
                            ),
                            radial-gradient(
                                at 30% 50%,
                                #73EAEA,
                                rgba(255, 255, 255, 0) 30%
                            ),
                            radial-gradient(
                                at 30% 50%,
                                #80A4F6,
                                rgba(255, 255, 255, 0) 30%
                            ),
                            radial-gradient(
                                at 100% 50%,
                                #73EAEA,
                                #AFCFEA,
                                rgba(255, 255, 255, 0) 50%
                            ),
                            linear-gradient(
                                115deg,
                                #73EAEA 5%,
                                #84C1F1 10%,
                                #BEB4E4,
                                #DEA8E7 20%,
                                #84C1F1,
                                #84C1F1 30%,
                                #BEB4E4,
                                #A7C9E7 40%,
                                #73EAEA, #84C1F1 70%
                            )`
                        }}
                        onClick={() => { location.replace(route('camino.tornasol.page')) }}
                    >
                        Camino Tornasol
                    </button>
                </div>
                <div className='w-full flex justify-center gap-6 ml-10 mt-20'>
                <button className='max-w-xs bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold w-full h-full py-3 mt-10 justify-center hover:bg-orange-600'
                     onClick={() => { location.replace(route('elegibilidad.page')) }}
                    // onClick={() => window.history.back()}
                    >  &#8592; Volver
                </button>
                <button className='bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold px-6 py-2 mt-10 py-3'
                        onClick={() => {
                            if(isDemo || tieneCaminoAsignado) {
                                location.replace(route('perfil.candidato.page'))
                            }else {
                                Swal.fire('¡Atencion!', 'Para poder continuar inscribete a un camino', 'error')
                            }
                        }}>
                    Continuar Camino del Héroe Ciudadan@
                </button>
            </div>
        </body>
    </CustomLayout>
  );
}

export default InicioCC;
