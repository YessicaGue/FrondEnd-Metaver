import React, {useState} from "react";
import {Head} from "@inertiajs/react";
import {Box} from "@mui/material";
import RegistroDistritosPassword from "@/Pages/RegistroDistritos/RegistroDistritosPassword";
import ToastContainerCustom from "@/utils/ToastContainerCustom";
import {toast} from "react-toastify";
import RegistroDistritosForm from "@/Pages/RegistroDistritos/RegistroDistritosForm";

const RegistroDistritos = (props) => {
    const [bloqueado, setBloqueado] = useState(true);

    const handleBloqueado = (codigo) => {
        if (codigo === 'RUTA2024MC') {
            toast.success('Código correcto, redireccionando...');
            setBloqueado(false);
        } else {
            toast.error('Código incorrecto, intente de nuevo');
            setBloqueado(true);
        }
    }

    return (
        <Box
            className={'w-full min-h-screen m-0 flex flex-col'}
        >
            <Head title="Registro Distritos"/>

            <ToastContainerCustom />

            {
                bloqueado ?
                    <RegistroDistritosPassword
                        {...props}
                        setBloqueado={handleBloqueado}
                    />
                    :
                    <RegistroDistritosForm
                        {...props}
                    />
            }
        </Box>
    );
}

export default RegistroDistritos;
