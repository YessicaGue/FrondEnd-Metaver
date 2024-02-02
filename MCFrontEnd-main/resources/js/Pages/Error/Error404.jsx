import { Head } from '@inertiajs/react';
import React from 'react';

const Error404 = (props) => {
    console.log(props)
    return (
        <div className='h-screen flex flex-col gap-8 items-center justify-center'>
            <Head title='Página no encontrada' />
            <h1 
                className='text-7xl text-mc-primary font-extrabold text-center'
                style={{ fontFamily: 'Poppins, sans-serif' }}
            >
                404
            </h1>

            <p className='text-center'>
                Lo sentimos, esta página no existe
            </p>

            <a
                className='text-mc-secondary font-black text-xl text-center'
                href={route('/')}
            >
                Pero puedes regresar al inicio, dando clic aquí
            </a>
        </div>
    );
};

export default Error404;