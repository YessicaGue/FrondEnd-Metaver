import {useEffect, useState} from 'react';
import { Head } from '@inertiajs/react';
import { Button, TextField } from '@mui/material';
import GuestLayout from '@/Layouts/GuestLayout';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Invitacion = () => {
    const [codigo, setCodigo] = useState('');

    const params = new URLSearchParams(window.location.search);

    useEffect(() => {
        if (params.get('codigo')) {
            setCodigo(params.get('codigo'));
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(route('check.codigo.invitacion'), { codigo });

            if (response.status === 200) {
                toast.success('Código correcto');

                (() => {
                    return new Promise((resolve, reject) => {
                        try {
                            localStorage.setItem('codigoInvitacion', JSON.stringify(response.data.data));
                            resolve();
                        } catch (err) {
                            reject('Hubo un error. Por favor, inténtalo de nuevo más tarde: ' + err);
                        }
                    });
                })()
                .then(() => {
                    location.replace(route('registro'))
                })
                .catch((err) => toast.error(err));

            } else
                toast.info('Código incorrecto. ' + (response.data.message || 'Ha ocurrido un error al comprobar el código'));
        } catch (error) {
            toast.error('Código incorrecto. ' + (error.response.data.message || 'Ha ocurrido un error al comprobar el código'));
        }
    };

    return (
        <GuestLayout>
            <ParticlesLinks />
            <Head title="Ingresa tu código de invitación" />

            <form onSubmit={ handleSubmit }>
                <div className="text-center mb-6">
                    <h4 className="text-lg font-[Poppins]">
                        Por favor ingrese el código de registro que le fue proporcionado.
                    </h4>
                </div>

                <TextField
                    fullWidth
                    label="Código"
                    name="codigo"
                    color="primary"
                    value={ codigo }
                    onChange={(event) => setCodigo(event.target.value)}
                />

                <Button
                    type='submit'
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ marginTop: '1rem', fontFamily: 'Poppins, sans-serif' }}
                >
                    Enviar código
                </Button>
            </form>
            <ToastContainer />
        </GuestLayout>
    );
};

export default Invitacion;
