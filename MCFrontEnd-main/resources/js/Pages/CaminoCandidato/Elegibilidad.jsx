import React, {useEffect, useState} from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';
import carta from './CartaProgresistaCHC.pdf';
import Modal from '@/Pages/CaminoCandidato/Modal';
import Swal from "sweetalert2";
import axios from "axios";

const Elegibilidad=(props)=> {
    const {
        datosExamen,
        isDemo = false,
        auth:{user},
        estatusEtapa
    } = props
    /*Examen*/
    const[reference,setReference]=useState(datosExamen?.reference??'');
    const [examen,setExamen]=useState(datosExamen?.preguntas??[])
    const [modalOpen, setModalOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const currentQuestionData = examen[currentQuestion];
    const [selectedOption, setSelectedOption] = useState(0);
    const [score, setScore] = useState(0);
    const isLastQuestion = currentQuestion === examen.length - 1;
    const [selectedAswers,setSelectedAswers] = useState([]);
    const [haSeleccionadoRespuesta,setHaSeleccionadoRespuesta] = useState(false);
    /*Fin Examen*/
    /**/
    const [aproboExamen,setAproboExamen] = useState(estatusEtapa?.aproboExamen??false);
    const [existeEnCandidatosCHC,setExisteEnCandidatosCHC] = useState(estatusEtapa?.existeEnCandidatosCHC??false);
    const [haRealizadoEtapa,setHaRealizadoEtapa] = useState(estatusEtapa?.haRealizadoEtapa??false);
    const [realizoExamen,setRealizoExamen] = useState(estatusEtapa?.realizoExamen??false);
    const [realizoEtapaAnterior,setRealizoEtapaAnterior] = useState(estatusEtapa?.realizoEtapaAnterior??false);
    /**/
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (selectedAswers.length === examen.length) {
            handleSendAnswers();
        }
    }, [selectedAswers]);
    const handleSendAnswers= async ()=>{
        setIsLoading(true);
        const data ={
            "detalleExamenesCandidatosViewModel":selectedAswers,
            "examenesCandidatosViewModel":{
                "examenCHCId":reference,
                "activo":true
            }
        }
        try{
            //console.log('EnviandoRespuesta',data);
            const response = await axios.post(route('post.registro.examen'),data);
            console.log(response);
            const respuestasCorrectas = response.data?.response?.response?.todasLasRepuestasCorrectas;
            if(response.status===200){
                if(!respuestasCorrectas){
                    await Swal.fire('Lo Siento','No aprobaste el cuestionario. Podras volver a Intentarlo.','error')
                    window.location.reload();
                }else{
                    await Swal.fire('¡Felicidades!', 'Has aprobado el Cuestionario', 'success')
                    location.replace(route('elegibilidad.page'));
                }
            }else{
                console.error(response);
                await Swal.fire({
                    icon: 'error',
                    title: 'Error en la carga',
                    text: 'Hubo un problema al enviar, Por favor, inténta de nuevo.'
                });
                window.location.reload();
            }
        }catch(error){
            let msg= error.response?.data?.message?.message?.errors?.request[0]??'Error al guardar informacion';
            console.error('Error', error.response);
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: msg
            })
            window.location.reload();
        } finally {
            setIsLoading(false);
        }
    }
    const handleOptionChange = (event) => {
        const {value:optionId,checked}=event.target
        setSelectedOption(optionId===selectedOption?null:optionId);
        const questionId = currentQuestionData.id;
        setHaSeleccionadoRespuesta(true);
    }
    const handleNextQuestion = () => {
        // Verificamos si la respuesta seleccionada es correcta
        if(!isDemo && !haSeleccionadoRespuesta){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, selecciona una respuesta antes de avanzar.',
            });
            return;
        }
        const selectedAnswer={
            //question:currentQuestionData.id,
            examenCandidatoId:reference,
            respuestaExamenCHCId:parseInt(selectedOption),
            activo:true,
        }
        setSelectedAswers(prevAnswer=>[
            ...prevAnswer,selectedAnswer
        ]);
        if(isLastQuestion){
            setSelectedOption(null);
            setHaSeleccionadoRespuesta(false);
            //handleSendAnswers();
            //window.location.replace(route('iniciocc.page'));
        }else{
            setCurrentQuestion(currentQuestion+1)
            setSelectedOption(null);
            setHaSeleccionadoRespuesta(false)
        }
    }
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setSelectedOption(null);
    };
    return (
        <CustomLayout visible={ true } user={ user } >
            <header className='bg-gradient-to-r from-slate-800 from-1% via-orange-500 via-40% to-pink-500 to-99% w-full px-20 py-10 mt-10'>
                <div className='text-4xl text-white font-bold border-l-4 border-white pl-20 pt-10 t-n' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                    Camino del héroe ciudadan@
                    <h1 className='font-extrabold text-4xl mt-1 pb-5 text-white'>
                        Valores y Principios
                    </h1>
                </div>
            </header>
            <body className='max-w-10xl mx-auto px-2 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>
            <section className='grid grid-cols-3 mt-10' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>

                <div className='col-span-2 lg:max-w-7xl md:max-w-5xl m-auto w-full h-full my-10 px-10'>
                    <iframe className='min-h-[500px] sm:min-h-[400px] md:min-h-[500px]' src="https://player.vimeo.com/video/854530618?h=c3f4ad4103"  width='100%' height='100%' frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                </div>

                <div className='max-w-2xl flex flex-col gap-8 pr-10 pt-40'>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 items-center rounded-lg py-3 text-white font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }}>
                        <a
                            href={ carta }
                            download="CartaProgresistaCHC.pdf"
                            className="w-full h-full py-3"
                            target='_blank' rel='noopener noreferrer'
                        >
                            Carta Progresista
                        </a>
                    </button>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 items-center rounded-lg text-white shadow-xl font-bold py-3 opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }}>
                        <a href='https://transparencia.movimientociudadano.mx/cdmx/sites/default/files/carta_identidad_mexico_compressed.pdf' target='_blank' rel='noopener noreferrer' className='py-3 w-full h-full'>Carta de Identidad </a>
                    </button>
                    {/* <button className='bg-gradient-to-r from-red-600 to-orange-400 items-center rounded-lg py-3 text-white shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }}>
                        <a href='https://capacitacion.ciudadanosenmovimiento.org/course/view.php?id=9' target='_blank' rel='noopener noreferrer' className='py-3 px-20'>Curso Carta de Identidad </a>
                    </button> */}
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 items-center rounded-lg py-3 text-white shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }}>
                        <a href='https://archivo.movimientociudadano.mx/documentos-basicos' target='_blank' rel='noopener noreferrer' className='py-3 w-full h-full'>Documentos básicos </a>
                    </button>

                    <button className='bg-gradient-to-r from-red-600 to-orange-400 items-center rounded-lg py-3 text-white shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }}>Cuestionario</button>

                </div>
            </section>
            <div className='w-full flex justify-center gap-6 ml-10 mt-20'>
                <button className='max-w-xs bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold w-full h-full py-3 mt-10 justify-center hover:bg-orange-600'
                        onClick={() => { location.replace(route('carta.compromiso.page')) }}
                    // onClick={() => window.history.back()}
                    //onClick={volver}
                >  &#8592; Volver
                </button>
                <button className='bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold px-6 py-2 mt-10 py-3'
                        onClick={() => {
                            if(isDemo || (aproboExamen && haRealizadoEtapa)){
                                location.replace(route('iniciocc.page'))
                            }else {
                                openModal()
                            }
                        }}>
                    Continuar Camino del Héroe Ciudadan@
                </button>
            </div>
            <Modal isOpen={modalOpen} onClose={closeModal}>
                { currentQuestionData && (
                    <h1 className="text-xl font-bold mb-4">{currentQuestionData.question}</h1>
                )
                }
                {currentQuestionData &&(
                    <div>
                        {currentQuestionData.options.map((option) => (
                                <div key={option.id} className="mb-2">
                                    <label>
                                        <input
                                            type="radio"
                                            name="answer"
                                            value={option.id}
                                            //checked={selectedOption === option.id}
                                            onChange={handleOptionChange}
                                        />
                                        <span className="ml-2">{option.text}</span>
                                    </label>
                                </div>
                            )
                        )
                        }
                    </div>
                )}
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-400 text-white rounded-md hover:bg-orange-600"
                        onClick={handleNextQuestion}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Enviando respuestas' : (isLastQuestion ? 'Terminar' : 'Siguiente Pregunta')}
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={()=>{
                            closeModal();
                        }}
                    >
                        Cerrar
                    </button>
                </div>
            </Modal>
            </body>
        </CustomLayout>
    );
}

export default Elegibilidad;
