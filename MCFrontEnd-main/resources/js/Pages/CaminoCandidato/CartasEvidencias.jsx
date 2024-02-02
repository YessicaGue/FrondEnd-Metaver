import React, { useState, useEffect } from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import { Box, Button, CircularProgress, TextField, Container, InputAdornment } from '@mui/material';
import NumberedCircle from '@/Components/Customized/CustomComponents/NumberedCircle';
import '../../../assets/fonts/Montserrat-Black.woff';
import './style.css';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CustomEvidenciasPost from '@/Components/Customized/CustomComponents/CustomEvidenciasPost';
import { CustomDatePicker } from '@/Components/Customized/CustomComponents/CustomDatePicker';
import CustomTinyMCE from '@/Components/Customized/CustomComponents/CustomTinyMCE';
import Swal from "sweetalert2";
import usePost from '@/Pages/Perfiles/Hooks/usePost';
import dayjs from 'dayjs';




const OverlayMenu = (props) => {
    const { children, className, onClick } = props;

    return (
        <div onClick={ onClick } className={`fixed z-50 h-screen w-full flex justify-center items-center top-0 ${className} bg-[rgba(0,0,0,0.5)]`}>
            { children }
        </div>
    );
};

function CartasEvidencias(props) {
    const { listaPublicaciones, mediaPerfiles, user, onModalOpen, onEditModalOpen, editable,  nombre, puesto, fotoPerfil, perfil, profile, seguidores, perfiles,usuarios,selectedProfileId, selectedOption, perfilesGrupales,
    cartaEvidencia,
    } = props;
    console.log(cartaEvidencia)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [archivo, setArchivo] = useState('');
    const [nombreArchivoUsuario, setNombreArchivoUsuario] = useState('');
    const [descripcionArchivoUsuario, setDescripcionArchivoUsuario] = useState('');
    // const [haSubidoArchivo, setHaSubidoArchivo] = useState(estatusEtapa?.haSubidoArchivo??false);
    const [openingModal, setOpeningModal] = useState(false);
    const [typeModal, setTypeModal] = useState(0);
    const [loadingEditor, setLoadingEditor] = useState(true);
    // const [documentoAceptado, setDocumentoAceptado] = useState(estatusEtapa?.documentoAceptado??false);
    const [isUpdate, setIsUpdate] = useState(false);


    const handleModalOpen = () => {
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
      };

    // const handleModalClose = () => {
    //     setTimeout(() => {
    //         setTimeout(() => {
    //             setTypeModal(0);
    //             setOpeningModal((previousState) => !previousState);
    //         }, 350);
    //         document
    //             .querySelector('.overlay')
    //             .classList
    //             .add('disappear');
    //     }, 50);

    //     document
    //         .querySelector('.overlay')
    //         .classList
    //         .remove('appear');
    // };

    // const {
    //     estatusEtapa,
    //     isDemo = false,
    //     auth:{user}
    // }=props

    const handleFileInputChange=(event)=>{
        const selectedFile = event.target.files[0];
        if(selectedFile){
            const maxSizeInKB = 2048;
            const fileSizeInKB = selectedFile.size / 1024;
            if( fileSizeInKB > maxSizeInKB ){
                Swal.fire({
                    icon: 'error',
                    title: 'Archivo demasiado grande',
                    text: 'El archivo seleccionado es demasiado grande. Por favor, selecciona un archivo más pequeño.'
                })
                event.target.value = '';
                setArchivo('');
            }
            else{
                // handleFileUpload(selectedFile);
                // event.target.value = '';
                setArchivo(selectedFile);
            }
        }
    };


    const handleSubmit = async () => {
        if (archivo === '')
            {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Selecciona un archivo e inténta de nuevo.'
                });
            }
        try {
            setIsLoading(true);
                const formData = new FormData();
                formData.append('carta_evidencia',archivo);
                formData.append('nombre_archivo_usuario',nombreArchivoUsuario);
                formData.append('descripcion_archivo_usuario',descripcionArchivoUsuario);
                console.log(formData);
                const response = await axios.post(route('post.cartas.evidencias.page'),formData,{
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.status === 200){
                    await Swal.fire({
                        text: `Publicación ${ isUpdate ? 'actualizada' : 'creada' }`,
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    });
                }

                // if (response.status !== 200 || !response.data.success)
                // return Swal.fire({
                //     text: `La publicación no ha podido ser ${ isUpdate ? 'actualizada' : 'creada' }. Por favor, inténtalo más tarde.`,
                //     icon: 'info',
                //     confirmButtonText: 'Aceptar',
                // });



        } catch (err) {
            if (err?.response?.status === 419)
                await Swal.fire({
                    text: `Tu sesión ha expirado. Por favor, vuelve a iniciar sesión`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });
        } finally {

            window.location.reload();
        }
    };

  return (
    <CustomLayout visible={ true } >
            <header className='bg-gradient-to-br from-slate-800 via-orange-500 to-pink-500 border border-t-20 border-r-2 grid lg:grid-cols-7 md:grid-cols-1 gap-2 w-full px-20 py-10 mt-10'>
                <div className='lg:col-span-5 md:col-span-1 lg:text-4xl md:text-4xl sm:text-3xl text-white font-bold lg:pl-20 md:pl-10 sm:pl-10 pt-10 t-n' style={{ fontFamily: 'Montserrat', letterSpacing: '2px', fontweigh:'500' }}>
                    Camino del héroe ciudadan@
                    <h1 className='font-extrabold lg:text-4xl sm:text-3xl mt-1 pb-5 text-white'>
                    Mis Cartas
                    </h1>
                </div>
                <div className='lg:cols-span-2 md-cols-span-2 sm:cols-span-1 justify-center flex'>
                    <div className='sm:mx-2 md:mx-2'>
                        <button className='justify-end'>
                            <a className='max-sm:h-30 shadow-lg md:h-40 relative rounded-2xl overflow-hidden flex items-center px-4 text-white font-bold lg:text-2xl sm:text-sm md:text-md justify-center'>
                                Mi Perfil Multiverso
                            </a>
                        </button>
                    </div>
                    <div className='justify-end '>
                        <button className='justify-end' onClick={() => { location.replace(route('perfil.candidato.page')) }}>
                            <a className='max-sm:h-30 shadow-lg md:h-40 relative rounded-2xl overflow-hidden flex items-center  px-4  text-white font-bold lg:text-2xl sm:text-sm md:text-md justify-center'>
                                Mi Perfil de Héroe Ciudadan@
                            </a>
                        </button>
                    </div>
                </div>
            </header>
            {
                isModalOpen && (
                    <OverlayMenu className='overlay appear max-md:px-0 px-4'>

                        <div className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'>
                            <div className="top-2 right-2 absolute flex items-center">
                                <button
                                    onClick={ handleModalClose }
                                    className="inline-flex fixed top-4 right-4 items-center justify-center p-0 rounded-md max-md:text-gray-600 text-white transition duration-150 ease-in-out"
                                >
                                    <svg className="h-9 w-9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className='inline-flex'
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className='h-full flex gap-4 flex-col'>
                                <Container
                                    className='p-[20px] ml-auto mr-auto'
                                    maxWidth={'lg'}
                                >
                                    <div className='subtitles w-full text-center'>
                                        Movimiento Ciudadano
                                    </div>

                                    <div className='titles w-full text-center break-words text-mc text-black'>
                                        <span className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                            ¿Qué quieres { isUpdate ? 'actualizar' : 'compartir' }?
                                        </span>
                                    </div>

                                </Container>
                                <NumberedCircle number={1}/>
                                <div className='gap-4 max-md:grid-cols-1'>
                                    <div className='h-full flex gap-4 flex-col col-span-2 mb-10'>
                                        <TextField
                                            label="Nombre de la evidencia o documento"
                                            name="titulo"
                                            color="primary"
                                            value={ nombreArchivoUsuario }
                                            onChange={(event) =>
                                            setNombreArchivoUsuario(event.target.value)
                                            }
                                        />
                                        <TextField
                                            label="Agrega una descripción corta"
                                            name="descripcion"
                                            color="primary"
                                            value={ descripcionArchivoUsuario }
                                            onChange={(event) =>
                                            setDescripcionArchivoUsuario(event.target.value)
                                            }
                                        />
                                    </div>
                                    <NumberedCircle number={2}/>
                                    <div className='flex flex-col gap- justify-center items-center my-6'>
                                        <button className='max-w-xs bg-gray-100 text-xl rounded-xl font-bold w-full py-2 border-2 hover:bg-gray-200'
                                            style={{ fontFamily: 'Montserrat', fontweigh:'500' }}
                                            onClick={() => {
                                                const inputFile=(document.getElementById('inputFile'));
                                                if(inputFile) {
                                                    inputFile.click();
                                                }
                                            }}
                                        >
                                           {isLoading?'Cargando..': 'Subir foto/documento' }
                                            <input
                                                type = "file"
                                                accept = "application/pdf,.png,.jpeg,.docx,.doc"
                                                hidden = {true}
                                                id = "inputFile"
                                                onChange = {handleFileInputChange}
                                            />
                                        </button>
                                    </div>
                                </div>
                                {/* {
                                    loadingEditor &&
                                    <div className='absolute w-full h-full flex justify-center items-center bg-white'>
                                        <CircularProgress color='primary'/>
                                    </div>
                                } */}
                                <Button variant='contained' color='primary' onClick={ handleSubmit }>{ isUpdate ? 'Actualizar' : 'Enviar' }</Button>
                            </div>
                        </div>

                    </OverlayMenu>
            )}
            <body className='max-w-10xl mx-auto px-2 xs:px-6 sm:px-10 lg:px-10 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>
            <div className='justify-end flex'>
                <div className="w-full bg-white relative">

                    <div className='absolute top-0 right-2 bg-white'>

                        <div className='float-right'>
                            <button className='max-w-xs bg-gray-100 text-xl rounded-xl font-bold w-full h-full py-2 px-6 border-2 hover:bg-gray-200 '
                                onClick={() => handleModalOpen()}
                                > Agregar nuevo

                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-6 w-full bg-white shadow-sm mt-2 pt-16 flex flex-col">
                <div className='py-1' style={{ backgroundColor: '#6b897d' }}>
                    <p className='text-white text-center  font-bold pl-5 text-lg'>ID</p>
                </div>
                <div className='w-full border-2 py-1' >
                    <p className='font-bold text-center text-lg'>Nombre Carta</p>
                </div>
                <div className='w-full border-2 py-1' >
                    <p className='font-bold text-center text-lg'>Descripcion</p>
                </div>
                <div className='w-full border-2 py-1' >
                    <p className='font-bold text-center pl-5 text-lg'>Fecha Subida</p>
                </div>
                <div className='w-full border-2 py-1' >
                    <p className='font-bold text-center text-lg'>Estatus</p>
                </div>
                <div className='w-full border-2 py-1' >
                    <p className='font-bold text-center text-lg'>Acciones</p>
                </div>

            </div>
            <div className='w-full h-full pt-2 pb-4 wysiwyg gap-2 flex flex-col'>
                {cartaEvidencia.data.documentos.map(documento => (
                    <CustomEvidenciasPost
                    key={documento.id}
                    id={documento.id}
                    titulo={documento.nombreArchivoUsuario}
                    estatus={documento.estatusNombre}
                    descripcion={documento.descripcionArchivoUsuario}
                    // fechaAlta={documento.fechaAlta.format('YYYY-MM-DD')}
                    fechaAlta={new Date(documento.fechaAlta).toISOString().split('T')[0]}
                    onModalOpen={onEditModalOpen}
                    editable={editable}
                    />
                ))}
            </div>

            <div className="w-full mt-20 min-h-[200px] bg-white shadow-xl mt-2 relative">

            </div>
            <div className='justify-center flex'>
                <button className='max-w-xs bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold w-full m-auto h-full py-2 mt-10 justify-center hover:bg-orange-600'
                    onClick={() => { location.replace(route('herramientas.page')) }}
                    // onClick={() => window.history.back()}
                    >  &#8592; Volver
                </button>
            </div>
        </body>
    </CustomLayout>
  );
}

export default CartasEvidencias;
