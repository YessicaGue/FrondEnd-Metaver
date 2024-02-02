import React from 'react';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

const CustomEvidenciasPost = (props) => {
    const {
        id,
        titulo,
        descripcion,
        fechaAlta,
        onModalOpen,
        post,
        setPost,
        setIsUpdate,
        estatus,
        editable,
        grupalType = false,
        cartaEvidencia
    } = props;

    return (
        <div
            // onClick={() => !grupalType ? window.open(route('publicacion.page', { url }), '_blank') : window.open(route('publicacion.grupal.page', { url }), '_blank')}
            className=" bg-slate-100 rounded-xl flex flex-col transform hover:scale-105 transition-all shadow hover:shadow-xl cursor-pointer relative">
            <div className='w-full h-full grid grid-cols-6 py-3 pl-1 text-center'>
                <h1 className='font-black uppercase text-black'>{ id }</h1>
                {/* <h1 className='font-black uppercase text-black text-start'>ID</h1> */}
                <h1 style={{color: '#606060'}}>{ titulo }</h1>
                <h1 style={{color: '#606060'}}>{ descripcion }</h1>
                <h1 style={{color: '#606060'}}>{ fechaAlta }</h1>
                <h1 style={{color: '#606060'}}>{ estatus }</h1>
                 {/* <h1 style={{color: '#606060'}}></h1> */} 
                
            </div>
            <div className='absolute top-2 right-16 overflow-hidden'>
                <div className='flex gap-2'>
                    
                        <Button
                                variant='text'
                                color='primary'
                                className='opacity-80 hover:opacity-100 transition-all'
                                // sx={{ minWidth: '0px !important', padding: '.25rem !important' }}
                                onClick={(evento) => {
                                    evento.stopPropagation();
                                    setIsUpdate(true);
                                    // setPost({
                                    //     ...post,
                                    //     id,
                                    //     titulo,
                                    //     descripcion,
                                    //     fechaAlta: dayjs(new Date(fechaAlta)),
                                        
                                    // });
                                    onModalOpen();
                                }}
                            >
                                <EditIcon />
                            </Button>
                    
                    
                        <Button
                            variant='text'
                            color='primary'
                            className='opacity-80 hover:opacity-100 transition-all'
                            // sx={{ minWidth: '0px !important', padding: '.25rem !important' }}
                            onClick={async (evento) => {
                                evento.stopPropagation();

                                const swalResponse = await Swal.fire({
                                    text: 'Estás por eliminar este documento, ¿Deseas continuar?',
                                    icon: 'question',
                                    showCancelButton: true,
                                    cancelButtonText: 'Cancelar',
                                    showConfirmButton: true,
                                    confirmButtonText: 'Continuar'
                                });

                                if (swalResponse.isConfirmed === false)
                                    return;

                                try {
                                    const response = grupalType ? await axios.delete(route('delete.publicacion.grupal', id)) : await axios.delete(route('delete.publicacion', id));

                                    if (response.status !== 200 || !response.data.success)
                                        return await Swal.fire({
                                            text: `La publicación no ha podido ser eliminada. Por favor, inténtalo más tarde.`,
                                            icon: 'info',
                                            confirmButtonText: 'Aceptar',
                                        });
                        
                                    await Swal.fire({
                                        text: `Publicación eliminada`,
                                        icon: 'success',
                                        confirmButtonText: 'Aceptar',
                                    });
                        
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

                            }}
                        >
                            <DeleteIcon/>
                        </Button>
                </div>
            </div>
        </div>
    );
};

export default CustomEvidenciasPost;