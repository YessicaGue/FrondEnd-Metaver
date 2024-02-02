import React from 'react';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';

const CustomTarjetaPost = (props) => {
    const { id, titulo, descripcion, fotoPublicacion, fechaCreacion, fechaInicio, fechaFin, contenido, url, onModalOpen, post, setPost, setIsUpdate, editable } = props;

    return (
        <div
            onClick={() => window.open(route('publicacion.page', { url }), '_blank')}
            className=" bg-slate-100 rounded-xl flex flex-col transform hover:scale-105 transition-all shadow hover:shadow-xl cursor-pointer relative">
            <div className='w-full h-full pt-10 pb-2 pl-4 pr-2'>
            {/* <h1 className='font-black uppercase text-mc-primary'>titulo de la tarjeta</h1>
                <h1>texto dentro de la tarjeta </h1> */}
                <h1 className='font-black uppercase text-black'>{ titulo }</h1>
                <h1 style={{color: '#606060'}}>{ descripcion }</h1>
            </div>
            <div className='absolute top-0 right-0 overflow-hidden'>
                {
                    editable
                    ?   <Button
                            variant='text'
                            color='primary'
                            className='opacity-30 hover:opacity-100 transition-all'
                            onClick={ (evento) => {
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
                                });
                                onModalOpen();
                            }}
                        >
                            <EditIcon fontSize="small" sx={{ margin: 0, padding: 0 }} />
                        </Button>
                    :   null
                }
            </div>
            <div
                className='absolute w-12 h-12 bg-gray-300 z-30 rounded-full top-[0%] translate-y-[-30%] left-[35%]'
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