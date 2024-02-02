import React, {useState} from "react";
import {Head} from "@inertiajs/react";
import {Box, Button, Card, TextField} from "@mui/material";
import LogoMC from "@/../assets/images/logo-mc.svg";

const RegistroDistritosPassword = (props) => {

    const [codigo, setCodigo] = useState('');

    const submitCodigo = () => {
        props.setBloqueado(codigo);
    }

    return (
        <Box
            className={'w-full h-screen m-0 flex flex-col justify-center items-center bg-mc-primary'}
        >
            <Head title="Registro Distritos | Password"/>

            <img
                className={'w-[120px] mb-5'}
                src={LogoMC}
                alt="Logo"
            />

            <Card
                elevation={5}
                className={'w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4'}
            >
                <div className={'text-center mb-6'}>
                    <h4 className={'text-lg font-regular font-[Poppins]'}>
                        Por favor ingrese el código de registro que le fue proporcionado,
                        si no tiene uno, por favor contacte al administrador.
                    </h4>
                </div>

                <TextField
                    id="codigo"
                    name="codigo"
                    label="Código"
                    variant="outlined"
                    fullWidth
                    value={codigo}
                    onChange={(e) => {
                        setCodigo(e.target.value);
                    }}
                />

                <Button
                    variant="contained"
                    color={'secondary'}
                    fullWidth
                    style={{
                        marginTop: '1rem',
                    }}
                    onClick={submitCodigo}
                >
                    Enviar código
                </Button>
            </Card>
        </Box>
    );
}

export default RegistroDistritosPassword;
