import React, {useState} from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';
import carta from './CartasDeBienvenidaCaminos/CartaCaminoElectrico.pdf';
import Swal from "sweetalert2";

function CaminoElectrico(props) {
    const {
        isDemo = false,
        auth: { user }
    } = props;
    const [camino,setCamino] = useState(5);
    const actualizarCamino = async () =>{
        try {
            // const json ={
            //     camino
            // }
            const response = await axios.put(route('put.actualizar.camino',parseInt(camino)))
            console.log(response);
            if(response.status===200) {
                await Swal.fire('¡Felicidades!', 'Ya pertenceces a un camino', 'success')
                location.replace(route('perfil.candidato.page'))
            }
            else{
                console.error(response);
                await Swal.fire({
                    icon: 'error',
                    title: 'Error en la carga',
                    text: 'Hubo un problema al enviar, Por favor, inténta de nuevo.'
                });
            }
        }catch(error){
            console.error('Error', error.response);
            let msg = error?.response?.data?.message?.message?.message??'Error al guardar'
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: msg
            })
        }
    }
  return (
    <CustomLayout visible={ true } user={ user }>
        <header className='bg-gradient-to-r from-slate-800 via-orange-500 to-pink-500 w-full px-20 py-10 mt-10'>
            <div className='text-4xl text-white text-center font-bold border-l-4 border-white pl-20 py-10 t-n' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
            Camino Electrico
            </div>
        </header>
        <body className='max-w-10xl mx-auto px-2 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>

            <div className='grid gap-10 grid-cols-2 mt-20 max-lg:grid-cols-1 w-full'>
                <div className="w-full min-h-[600px] mt-2 relative">
                    {/* <p className='text-orange-500 font-bold text-2xl text-center flex justify-center'> </p> */}
                    <iframe className='mx-auto' src={ carta } width="100%" height="100%"></iframe>

                </div>
                <div className="w-full min-h-[700px] mt-2 relative">
                    <div className='w-full h-full'>
                    <iframe className='min-h-[80px] sm:min-h-[80px] md:min-h-[700px] lg:min-h-[700px] xl:max-h-[1100px]' src="https://player.vimeo.com/video/853862887?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" allowFullScreen width='100%' height='100%'></iframe><script src="https://player.vimeo.com/api/player.js"></script>
                    </div>
                </div>

            </div>
            <div className='grid grid-cols-1 gap-5 mt-10 flex justify-between'>
                <div className='flex w-full justify-end'>
                    {/* <button className='bg-gradient-to-r from-red-600 to-orange-400 w-full min-w-xl text-white text-xl rounded-xl font-bold flex justify-center py-3 px-5'>
                        Conoce más
                    </button> */}
                    </div>
                    <div className='flex w-full justify-start'>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 w-full min-w-xl text-white text-xl rounded-xl font-bold flex justify-center py-3 px-5'
                            onClick={() => {
                                location.replace(route('formulario2.page', {camino: camino}))
                            }
                            }
                    >
                        Inscríbete
                    </button>
                </div>
            </div>
            <div className='flex justify-center mt-14'>
            <button className='max-w-xs bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold w-full m-auto h-full py-2 mt-10 justify-center hover:bg-orange-600'
                onClick={() => { location.replace(route('iniciocc.page')) }}
                >  &#8592; Volver
            </button>
            </div>
        </body>
    </CustomLayout>
  );
}

export default CaminoElectrico;
