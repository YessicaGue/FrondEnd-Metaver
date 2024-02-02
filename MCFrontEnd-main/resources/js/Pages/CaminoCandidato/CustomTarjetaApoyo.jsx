import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import imagen from './imagen-eventos.png';
import {Divider} from "@mui/material";


const CustomTarjetaApoyo = ({ titulo, descripcionTarjeta, imagen: imagenEvento = null, isOwner }) => {


    return (
        <div className={'h-full'}>
            <div className='shadow-xl border-2 border-gray-100 py-2 h-full'>

                {
                    isOwner ?
                        <>
                            <div className='justify-end flex px-2'>
                                <button className='opacity-20 hover:opacity-100 ' sx={{ padding: 0, minWidth: 0 }}>
                                    <EditIcon className='text-white rounded p-1 bg-purple-700 mx-1' />
                                </button>
                                <button className='opacity-20 hover:opacity-100' sx={{ padding: 0, minWidth: 0 }}>
                                    <DeleteIcon className='text-white rounded p-1 bg-red-600' />
                                </button>
                            </div>

                            <Divider className={'!mt-2'}/>
                        </>
                        : null
                }

                <p
                    className={`font-bold text-center text-lg uppercase p2-4 tracking-wide ${isOwner ? 'pt-2' : ''}`}
                >
                    {titulo}
                </p>

                <img
                    src={
                        imagenEvento
                            ? 'https://dashboard.ciudadanosenmovimiento.org/api/publicacion/grupal/imagen/' + imagenEvento
                            : imagen
                    }
                    alt=''
                    className='w-full px-2 my-2 flex-1 h-full max-h-[500px] object-cover'
                />

                <p
                    className='text-sm text-center px-5 leading-8'
                >
                    {descripcionTarjeta}
                </p>
            </div>
        </div>

    );
};

export default CustomTarjetaApoyo;
