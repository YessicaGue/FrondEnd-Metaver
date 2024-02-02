import { useState, useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head} from '@inertiajs/react';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const CrearPerfil = (props) => {
    const { auth: { user } } = props;

    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        setProcessing(true);
        try {
            const response = await axios.get(route('perfil.init'));
            window.location.replace(route('perfil.page', { id: response.data.response.guid }));
        } catch (err) {
            setProcessing(false);

            Swal.fire({
                text: 'Hubo un error al intentar crear tu perfil. Por favor, inténtalo más tarde',
                icon: 'info'
            });
        }
    };

    return (
        <GuestLayout>
            <ParticlesLinks />
            <Head title="Crea tu perfil público"/>

            <div className='flex flex-col gap-4 relative'>

                <h1 className='text-center text-xl mb-4' style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Aún no tienes un perfil público, <span className='font-extrabold'>¿Qué te parece si lo creamos por ti?</span>
                </h1>
            
                <Button
                    variant='contained'
                    color='primary'
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    onClick={ handleSubmit }
                    disabled={ processing }
                >
                    Quiero crear mi perfil público
                </Button>

                {
                    !processing
                    ?   <small style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Puedes consultar el <span className='font-extrabold'>Aviso de Privacidad 
                            <a
                                className='text-mc-primary'
                                target='_blank'
                                href='https://transparencia.movimientociudadano.mx/protecciondedatospersonales'
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                {' '} dando clic aquí
                            </a></span>
                        </small>
                    :   null
                }

                {
                    !processing
                    ?   <div className='flex' style={{ fontFamily: 'Poppins, sans-serif' }}>
                            <form action={route("get.cerrar.sesion")} method="get" className='border-t-[.3px] border-solid border-[#eee] pt-2 text-center'>
                                <small>Si aún no deseas crear tu perfil, puedes cerrar sesión y regresar {' '}</small>
                                <button type="submit" className='text-xs text-mc-primary'>dando clic aquí</button>
                            </form>
                        </div>
                    :   null
                }
                
            </div>

        </GuestLayout>
    );
};

export default CrearPerfil;
