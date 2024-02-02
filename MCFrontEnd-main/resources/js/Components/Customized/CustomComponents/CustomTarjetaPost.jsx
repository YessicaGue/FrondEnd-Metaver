import React from 'react';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

const CustomTarjetaPost = (props) => {
    const {
        id,
        titulo,
        descripcion,
        fotoPublicacion,
        fechaInicio,
        fechaFin,
        contenido,
        url,
        onModalOpen,
        post,
        setPost,
        setIsUpdate,
        editable,
        grupalType = false,
    } = props;

    return (
        <div
            onClick={() => !grupalType ? window.open(route('publicacion.page', { url }), '_blank') : window.open(route('publicacion.grupal.page', { url }), '_blank')}
            className=" bg-slate-100 rounded-xl ml-12 flex flex-col transform hover:scale-105 transition-all shadow hover:shadow-xl cursor-pointer relative">
            <div className='w-full h-full py-4 pl-10 pr-4'>
                <h1 className='font-black uppercase text-black'>{ titulo }</h1>
                <h1 style={{color: '#606060'}}>{ descripcion }</h1>
            </div>
            <div className='absolute top-0 right-0 overflow-hidden'>
                <div className='flex gap-2'>
                    {
                        editable
                        ?   <Button
                                variant='text'
                                color='primary'
                                className='opacity-30 hover:opacity-100 transition-all'
                                sx={{ minWidth: '0px !important', padding: '.25rem !important' }}
                                onClick={(evento) => {
                                    evento.stopPropagation();
                                    setIsUpdate(true);
                                    setPost({
                                        ...post,
                                        id,
                                        titulo,
                                        descripcion,
                                        fechaInicio: dayjs(new Date(fechaInicio)),
                                        fechaFin: dayjs(new Date(fechaFin)),
                                        contenido,
                                        imagenPublicacion: fotoPublicacion
                                    });
                                    onModalOpen();
                                }}
                            >
                                <EditIcon fontSize="small" sx={{ margin: 0, padding: 0 }} />
                            </Button>
                        :   null
                    }

                    {
                        editable
                        ?   <Button
                                variant='text'
                                color='primary'
                                className='opacity-30 hover:opacity-100 transition-all'
                                sx={{ minWidth: '0px !important', padding: '.25rem !important' }}
                                onClick={async (evento) => {
                                    evento.stopPropagation();

                                    const swalResponse = await Swal.fire({
                                        text: 'Estás por eliminar esta publicación, ¿Deseas continuar?',
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
                                <DeleteIcon fontSize="small" sx={{ margin: 0, padding: 0 }} />
                            </Button>
                        :   null
                    }
                </div>
            </div>
            <div
                className='absolute w-12 h-12 bg-gray-300 z-30 rounded-full top-[50%] translate-y-[-50%] left-[-1.5rem]'
                style={{ 
                    backgroundImage: `url( ${ fotoPublicacion } )`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            </div>
        </div>
    );
};

export default CustomTarjetaPost;