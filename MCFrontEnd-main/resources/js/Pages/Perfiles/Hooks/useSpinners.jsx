import { useState } from 'react';

const spinnersInit = {
    editarDatosPerfil: false,
    editarFotoPerfil: false,
    agregarPublicacion: false,
    editarPublicacion: false,
}

const useSpinners = () => {
    const [spinners, setSpinners] = useState(spinnersInit);

    return {
        spinners,
        setSpinners,
        spinnersInit
    };
};

export default useSpinners;