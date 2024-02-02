import { Head } from '@inertiajs/react';
import React from 'react';

const Error404 = (props) => {
    return (
        <div className='h-screen flex flex-col gap-8 items-center justify-center'>
            <Head title='Página no encontrada' />
            <h1 
                className='text-7xl text-mc-primary font-extrabold text-center'
                style={{ fontFamily: 'Poppins, sans-serif' }}
            >
                419
            </h1>

            <p className='text-center'>
                Parece que tu sesión ha expirado. Por favor, intenta acceder nuevamente.
            </p>

            <a
                className='text-mc-secondary font-black text-xl text-center'
                href={route('/')}
            >
                O puedes regresar al inicio, dando clic aquí
            </a>
        </div>
    );
};

export default Error404;