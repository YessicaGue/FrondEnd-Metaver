import React, {useState} from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';
import carta from './CartaCompromisoCHC.pdf';
import axios from "axios";
import Swal from "sweetalert2";
import {router} from "@inertiajs/react";
import {data} from "autoprefixer";



function Contrato(props) {
    const {
        estatusEtapa,
        isDemo = false,
        auth:{user}
    }=props
    const [haRealizadoEtapa,setHaRealizadoEtapa]=useState(estatusEtapa?.haRealizadoEtapa??false);
    const [archivo, setArchivo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [etapa1Completada, setEtapa1Completada] = useState(estatusEtapa?.etapa1Completada??false);
    const [etapa2Completada, setEtapa2Completada] = useState(estatusEtapa?.etapa2Completada??false);
    const [haSubidoArchivo, setHaSubidoArchivo] = useState(estatusEtapa?.haSubidoArchivo??false);
    const [documentoAceptado, setDocumentoAceptado] = useState(estatusEtapa?.documentoAceptado??false);
    const [estatusNombre, setEstatusNombre] = useState(estatusEtapa?.estatusNombre??false);
    const [existeEnCandidatoCHC,setExisteEnCandidatoCHC] = useState(estatusEtapa.existeEnCandidatosCHC??false);
    const handleAltaEtapaRegistro = async ()=>{
        // const data={
        //     "activo":true
        // }
        // try{
        //     const response = await axios.post(route('post.tercer.etapa.registro'),data);
        //     if(response.data.success===true && response.data.statusCode===200){
        // return  await Swal.fire({
        //     title: response.data.message,
        //     icon: 'success',
        //     confirmButtonText: 'Aceptar',
        // }
        // );
        // console.log(response);
        //location.replace(route('elegibilidad.page'))
        //     }
        // }catch(error){
        //
        // }
    }
    const handleFileInputChange=(event)=>{
        const selectedFile = event.target.files[0];
        if(selectedFile){
            const maxSizeInKB = 2048;
            const fileSizeInKB = selectedFile.size / 1024;
            if( fileSizeInKB > maxSizeInKB ){
                Swal.fire({
                    icon: 'error',
                    title: 'Tamaño de archivo excedido',
                    text: 'El archivo seleccionado supera el límite de tamaño permitido. ' +
                        'Por favor, elige un archivo más pequeño, ' +
                        'con un tamaño máximo de dos megabytes (2 MB).'
                })
                event.target.value = '';
            }else{
                handleFileUpload(selectedFile);
                event.target.value = '';
            }
        }
    };
    const handleFileUpload = async (selectedFile) => {
        if(selectedFile){
            try{
                setIsLoading(true);
                const formData = new FormData();
                formData.append('pdf',selectedFile);
                const response = await axios.post(route('edit.pdf.contrato'),formData,{
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('response');
                console.log(response);
                if(response.status === 200){
                    await Swal.fire({
                        icon: 'success',
                        title: 'Carga Exitosa',
                        text: 'El archivo se ha cargado y enviado correctamente.'
                    });
                    window.location.reload();
                }else{
                    await Swal.fire({
                        icon: 'error',
                        title: 'Error en la carga',
                        text: 'Hubo un problema al cargar el archivo, Por favor, inténta de nuevo.'
                    });
                }
            }catch(error) {
                let msg = error.response?.data?.message?.message?.message ?? 'Ocurrió un error al enviar el archivo, Por favor, intenta nuevamenta.'
                console.error('Error', msg);
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: msg
                })
            }finally {
                setIsLoading(false);
                setArchivo('');
            }
        }else{
            await Swal.fire({
                icon: 'error',
                title: 'Archivo no seleccionado',
                text: 'Por favor, selecciona un archivo antes de cargarlo.'
            })
        }
    }
    return (
        <CustomLayout visible={ true } user={ user } >
            <div className='bg-gradient-to-r from-slate-800 from-1% via-orange-500 via-40% to-pink-500 to-99% w-full px-20 py-10 mt-2'>
                <div className='text-4xl text-white font-bold border-l-4 border-white pl-10 pt-10 mt-10 t-n' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                    Camino del héroe ciudadan@
                    <h1 className='font-extrabold text-4xl mt-1 pb-5 text-white'>
                        Carta Compromiso
                    </h1>
                </div>

            </div>
            <div className='max-w-10xl px-2 xs:px-6 sm:px-10 lg:px-40 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>
                <div className='w-full h-full my-10'>
                    <iframe className='min-h-[600px] sm:min-h-[300px] md:min-h-[600px]' src="https://player.vimeo.com/video/854523861?h=8a2bc07af7" width='100%' height='100%' frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div className='grid grid-cols-2 flex gap-8 max-w-4xl m-auto justify-center'>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 rounded-2xl py-3 text-white text-xl shadow-xl font-bold opacity-80 hover:opacity-100 transition-all' style={{ fontFamily: 'Montserrat', fontweigh:'500' }}>
                        <a href={ carta }
                            // download="CartaCompromisoCHC.pdf"
                           className="w-full h-full py-3"
                           target='_blank' rel='noopener noreferrer'
                        > Leer Carta Compromiso
                        </a>
                    </button>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 rounded-2xl py-3 px-2 text-white text-xl shadow-xl font-bold opacity-80 hover:opacity-100 transition-all'
                        style={{ fontFamily: 'Montserrat', fontweigh:'500' }}
                        onClick={() => {
                            const inputFile=(document.getElementById('inputFile'));
                            if(inputFile) {
                                inputFile.click();
                            }
                        }}
                        disabled={haSubidoArchivo}
                    >
                        {isLoading?'Cargando..':haSubidoArchivo? 'Estatus Documento: '+estatusNombre:'Subir carta firmada'}
                        <input
                            type = "file"
                            accept = "application/pdf"
                            hidden = {true}
                            id = "inputFile"
                            onChange = {handleFileInputChange}
                        />
                    </button>
                </div>
                <div className='w-full flex justify-center gap-6 ml-10 mt-20'>
                    <button className='max-w-xs bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold w-full h-full py-3 mt-10 justify-center hover:bg-orange-600'
                            onClick={() => { location.replace(route('heroe.ciudadano.page')) }}
                            // onClick={() => window.history.back()}
                        >  &#8592; Volver
                    </button>
                    <button className='bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold px-6 py-2 mt-10 py-3'
                        onClick={() => {
                            if(!isDemo && !haSubidoArchivo) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Atención',
                                    text: 'Por favor, carga tu carta compromiso firmada para continuar.'
                                });
                            }
                            // if(!isDemo && haSubidoArchivo && !documentoAceptado) {
                            //     Swal.fire({
                            //         icon: 'error',
                            //         title: 'Atencion',
                            //         text: 'Documento en Espera de validación por jurado'
                            //     });
                            // }
                            // if(isDemo || (haSubidoArchivo && documentoAceptado && haRealizadoEtapa)){
                            if(isDemo || haSubidoArchivo){
                                location.replace(route('elegibilidad.page'));
                            }
                            }}>
                        Continuar Camino del Héroe Ciudadan@
                    </button>
                </div>
            </div>
        </CustomLayout>
    );
}

export default Contrato;
