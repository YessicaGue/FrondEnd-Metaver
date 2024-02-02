import React, {useState} from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';
import carta from './CartasDeBienvenidaCaminos/CartaCaminoTornasol.pdf';
import Swal from "sweetalert2";

function CaminoTornasol(props) {
    const {
        isDemo = false,
        auth: { user }
    } = props;
    const [camino,setCamino] = useState(9);
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
    <CustomLayout user={ user } visible={ true } >
        <header className='bg-gradient-to-r from-slate-800 via-orange-500 to-pink-500 w-full px-20 py-10 mt-10'>
            <div className='text-4xl text-white text-center font-bold border-l-4 border-white pl-20 py-10 t-n' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
            Camino Tornasol
            </div>
        </header>
        <body className='max-w-10xl mx-auto px-2 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>

            <div className='grid gap-10 grid-cols-2 mt-20 max-lg:grid-cols-1 w-full'>
                <div className="w-full max-h-[700px] mt-2 overflow-y-auto relative">
                <iframe className='mx-auto' src={ carta } width="100%" height="100%"></iframe>
                {/* <div class="max-h-60 overflow-y-auto"> */}

                    {/* <p className='text-orange-500 font-bold text-2xl text-center flex justify-center'> </p> */}
                    {/* <iframe className='mx-auto' src={ infografia } width="100%" height="500px"></iframe> */}
{/*                     <p className='text-justify p-2'>
                        <h1 className='font-bold'>CARTA BIENVENIDA CAMINO TORNASOL </h1><br />
                        <p className='justify-end flex'>Ciudad de México, 06 de agosto de 2023 </p> <br />
                        <p className='font-bold'>Estimada persona participante</p> <br />

                        ¡Bienvenid@ al Camino Tornasol!<br />

                        <br />El Camino Tornasol es el camino para las personas que tienen dos o más características de los 8 caminos existentes, que esté interesada en participar dentro de Movimiento Ciudadano. El camino es tuyo para transitarlo de la manera más responsable y enriquecedora posible.

                        <br /> <br /> Este camino tiene como embajador@ a ______ quien tiene una amplia experiencia dentro de Movimiento Ciudadano y será una guía e inspiración para ti a lo largo de este proceso. Al comenzar tu camino, tendrás la posibilidad de participar en diferentes eventos, foros, cursos y actividades para ganar insignias ciudadanas que te permitirán ir avanzando hasta convertirte en héroe ciudadan@.

                        <br /> <br /> Cada paso dentro del camino tornasol tiene una actividad obligatoria que realizar dentro de la plataforma. Se deberá completar la actividad y adicionalmente juntar una cantidad determinada de insignias por nivel para poder avanzar al siguiente paso.

                        <br /> <br /><p class="pl-24">◦ Realizar publicaciones
                        <br />◦ Asistencia a eventos
                        <br />◦Tomar los cursos de capacitación (Fundamentos e Historia de Movimiento Ciudadano)
                        <br />◦ Asistir o ayudar en la organización de una actividad de las 8 acciones (Movimiento Escucha, La Quincena, Picnic Naranja, Pinta el Futuro, Escuela Naranja, Barrio Naranja, Mercadito Naranja, Casas Naranjas). </p>

                        <br /> <br />Tu jurado más importante es la ciudadanía, por lo que las evidencias de trabajo social y comunitario, así como firmas o cartas de apoyo serán algunos de los elementos esenciales para acreditar el respaldo social con el que cuentas, y uno de los criterios más importantes para poder seguir avanzando.

                        <br /> <br />Una vez que cumplas con las actividades en los tiempos previstos irás avanzando en el “Camino del héroe ciudadan@”. Quienes completen el camino contarán con elementos que les permitirán ser considerados en el proceso de selección de precandidaturas en octubre.

                        <br /> <br />Para finalizar, te damos la bienvenida al Camino Tornasol, estamos seguros de que tu esfuerzo y compromiso te permitirán llegar a la meta. Nos emociona pensar lo que lograrás en estos meses.

                        <br /> <br />Te invitamos a comenzar con las actividades ¡hoy mismo!

                        <br /> <br />Atentamente.
                        <br /> <br />Movimiento Ciudadano
                    </p> */}
                </div>
                <div className="w-full min-h-[700px] mt-2 relative">
                    <div className='w-full h-full'>
                    <iframe className='min-h-[80px] sm:min-h-[80px] md:min-h-[700px] lg:min-h-[700px] xl:max-h-[1100px]' src="https://player.vimeo.com/video/853838000?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" allowFullScreen width='100%' height='100%'></iframe><script src="https://player.vimeo.com/api/player.js"></script>
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

export default CaminoTornasol;
