import { useState } from 'react';
import dayjs from 'dayjs';

const postInit = {
    id: null,
    titulo: '',
    fechaInicio: dayjs(new Date()),
    fechaFin: dayjs(new Date()),
    descripcion: '',
    contenido: '',
    urlMovimientoSocial: '',
    imagenPublicacion: ''
};

const usePost = () => {
    const [post, setPost] = useState(postInit);

    return {
        postInit,
        post,
        setPost
    };
};

export default usePost;