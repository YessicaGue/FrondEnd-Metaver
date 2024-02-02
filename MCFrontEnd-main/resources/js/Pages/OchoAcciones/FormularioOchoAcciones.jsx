import React from 'react';
import { useFormOchoAcciones } from './Hooks/useFormOchoAcciones';
import { StepperWindow } from './StepperWindow';
import { Container } from '@mui/material';

const FormularioOchoAcciones = () => {
    const { set, icons, handleSubmit, setForm, form } = useFormOchoAcciones();

    return (
        <div className='w-full bg-gray-100 z-10'>
            <div className='max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 py-8'>
                <Container
                    className='p-[20px] ml-auto mr-auto'
                    maxWidth={'lg'}
                >
                    <div className='subtitles w-full text-center'>
                        Movimiento Ciudadano
                    </div>

                    <div className='titles w-full text-center break-words text-mc text-black'>
                        <span className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                            Llena el siguiente formulario
                        </span>
                    </div> 

                </Container>
                <div className='p-6 bg-white shadow-xl'>
                    <StepperWindow
                        set={ set }
                        handleSubmit={ handleSubmit }
                        setForm={ setForm }
                        form={ form }
                        icons={ icons }
                    />
                </div>
            </div>
        </div>
    );
};

export default FormularioOchoAcciones;