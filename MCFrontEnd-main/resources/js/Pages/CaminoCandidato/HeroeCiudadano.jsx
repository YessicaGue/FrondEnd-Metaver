import React, { useState,useEffect} from 'react';
import Modal from '@/Pages/CaminoCandidato/Modal';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';
import carta from './CartaDeBienvenidaCHC.pdf';
import fallback from './camino_candidato.png';
import axios from 'axios';
import Swal from "sweetalert2";

function HeroeCiudadano(props) {
    const {
        estatusEtapa,
        isDemo = false,
        auth:{user}
    }=props
    const[haRealizadoEtapa,setHaRealizadoEtapa]=useState(estatusEtapa?.haRealizadoEtapa??false);
    const[perfilExiste,setPerfilExiste]=useState(estatusEtapa?.perfilExiste??false);
    const[existeEnCaminoCandidatosCHC,setExisteEnCaminoCandidatosCHC]=useState(estatusEtapa?.existeEnCandidatosCHC??false);
//   const id=1;
//   const [questions, setQuestions] = useState([]);
//   useEffect(()=>{
//       getExamen();
//   },[]);
//   const getExamen = async()=>{
//       try{
//             const response = await axios.get(route('get.examen',{id:id}));
//             setQuestions(response.data.response);
//             console.log(questions)
//       }
//       catch(error){
//           console.error('Error fetching examen:',error);
//       }
//   }
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedAswers,setSelectedAswers] = useState({});
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [score, setScore] = useState(0);
//   const currentQuestionData = questions[currentQuestion];
//   const isLastQuestion = currentQuestion === questions.length - 1;
//   const openModal = () => {
//       setModalOpen(true);
//   };

//   const closeModal = () => {
//       setModalOpen(false);
//       setSelectedOption(null);
//   };

//   const handleOptionChange = (event) => {
//       //setSelectedOption(event.target.value);
//       //console.log(setSelectedOption);
//       const questionId = currentQuestionData.id;
//       const optionId = event.target.value;
//       setSelectedAswers((prevAnswer)=>({
//           ...prevAnswer,
//           [questionId]:{
//               ...prevAnswer[questionId],
//               [optionId]:event.target.checked,
//           },
//       }));
//       console.log('question id:'+ questionId)
//       console.log('option id'+ optionId)
//   };

//   const handleNextQuestion = () => {
//         // Verificamos si la respuesta seleccionada es correcta
//         const selectedOptionData = currentQuestionData.options.find((option) => option.id === selectedOption);
//         const questionId = currentQuestionData.id;
//         //Crar el objeto de pregunta con el formato deseado
//         // const questionObject ={
//         //     idExamenCandidato: questionId,
//         //     idRespuestaExamenCHC: selectedOption,
//         //     activo: true,
//         //     fechaAlta: new Date().toISOString()
//         // };
//         //Agregar el objeto al array selectedAswers
//         // const updateAnswers = [...selectedAswers,questionObject];
//         // setSelectedAswers(updateAnswers)

//         if (selectedOptionData && selectedOptionData.isCorrect) {
//           // Incrementar la puntuación si la respuesta es correcta
//           setScore((prevScore) => prevScore + 1);
//         }
//         // Pasamos a la siguiente pregunta o pasar a la otra vista si es la última pregunta
//         if (isLastQuestion) {
//             window.location.replace(route('carta.compromiso.page'));
//         } else {
//             setCurrentQuestion(currentQuestion + 1);
//             setSelectedOption(null);
//         }
//   };

    const handleAltaEtapaRegistro = async ()=>{
        const data={
            "activo":true
        }
        try{
            const response = await axios.post(route('post.segunda.etapa.registro'),data);
            if(response.data.success != true && response.data.statusCode != 200){
                return  await Swal.fire({
                    title: response.data.message,
                    icon: 'error',
                     confirmButtonText: 'Aceptar',
                });
            }
            location.replace(route('carta.compromiso.page'))
        }catch(error){

        }
    }

  return (
    <CustomLayout user={user} visible={ true } >
        <div className=''>
        {/* <div className='max-w-10xl mx-auto px-2 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'> */}
            <header className='bg-gradient-to-r from-slate-800 from-1% via-orange-500 via-40% to-pink-500 to-99% w-full px-20 py-10 mt-10'>
                <div className='text-4xl text-white font-bold border-l-4 border-white pl-20 py-10 t-n' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                    BIENVENID@ AL CAMINO DEL <br /> HÉROE CIUDADAN@
                </div>
            </header>
            <div className='max-w-10xl mx-auto px-2 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>
                <div className='grid gap-2 lg:grid-cols-2 my-20 min-h-[400px] lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 sx:grid-cols-1 w-full'>
                    <div className="w-full h-full mt-2 relative mb-40">
                        <p className='text-orange-500 font-bold text-2xl text-center flex justify-center'>Infografia</p>
                        <span className="absolute top-2 right-2">
                        <a href={fallback}
                            rel="noopener noreferrer"
                            target='_blank'
                            className="text-orange-500 text-sm hover:underline"
                        >Ver y descargar</a>

                        </span>
                            <div className=' w-full h-full relative  overflow-hidden flex items-center mb-10'
                                    style={{
                                        backgroundImage: `url(${fallback}), url(${fallback})`,
                                        backgroundPosition: 'center top 10%',

                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        minHeight: '40vh'
                                    }}
                                >
                                </div>
                            {/* </div> */}

                    </div>
                    <div className="w-full h-full mt-2 relative">
                        <div className="max-w-3xl mx-auto w-full h-full">
                            <p className='text-orange-500 font-bold text-2xl text-center flex justify-center'>Carta de Bienvenida</p>
                            <iframe className='mx-auto w-full h-full'   src={`${carta}#view=FitV`}  width="100%" height="100%" title="PDF Embed"></iframe>
                        </div>
                    </div>

                </div>
                <div className='w-full flex justify-center'>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold px-7 py-3 mt-12 flex justify-center hover:bg-orange-600'
                        onClick={()=> {
                            if(isDemo){
                                location.replace(route('carta.compromiso.page'))
                            }
                            else if(!haRealizadoEtapa) {
                                 handleAltaEtapaRegistro();
                            }else {
                                location.replace(route('carta.compromiso.page'))
                            }
                        }
                        }>
                        Continuar Camino del Héroe Ciudadan@
                    </button>
                </div>
                <div>
                {/* <Modal isOpen={modalOpen} onClose={closeModal}>
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
                                    checked={selectedOption === option.id}
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
                    >
                        {isLastQuestion ? 'Terminar' : 'Siguiente Pregunta'}
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={()=>{
                            closeModal();
                            console.log(selectedAswers);
                        }}
                    >
                        Cerrar Modal
                    </button>
                    </div>
                </Modal> */}
                </div>
            </div>
        </div>
    </CustomLayout>
  );
}
export default HeroeCiudadano;
