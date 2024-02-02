import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {Box, Button, CircularProgress, TextField, Container} from '@mui/material';
import {Head, Link, router} from '@inertiajs/react';
import CustomLayout from '@/Layouts/CustomLayout';
import EncabezadoPerfil from '@/Pages/Perfiles/EncabezadoPerfil';
import CuerpoPerfil from '@/Pages/Perfiles/CuerpoPerfil';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';
import CustomTinyMCE from '@/Components/Customized/CustomComponents/CustomTinyMCE';
import usePost from '@/Pages/Perfiles/Hooks/usePost';
import NumberedCircle from '@/Components/Customized/CustomComponents/NumberedCircle';
import {CustomDatePicker} from '@/Components/Customized/CustomComponents/CustomDatePicker';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import axios from 'axios';
// import ListaUsuarios from './ListaUsuarios';
import ListaUsuarios from '@/Pages/ListaPerfiles/ListaUsuarios';
import listaUsuarios from "@/Pages/ListaPerfiles/ListaUsuarios";


const arregloUsuarios = [
    {
        nombre: 'Usuario 1',
        puesto: 'Puesto 1',
        img: 'ruta/de/imagen1.jpg',
    },
    {
        nombre: 'Usuario 2',
        puesto: 'Puesto 2',
        img: 'ruta/de/imagen2.jpg',
    },
    {
        nombre: 'Usuario 3',
        puesto: 'Puesto 3',
        img: 'ruta/de/imagen3.jpg',
    },
];


const index = (props) => {

    // const [nombre, setNombre] = useState(usuario?.name ?? 'Desconocido');
    // const [puesto, setPuesto] = useState(usuario?.puesto ?? '');
    // const [fotoPerfil, setFotoPerfil] = useState(usuario?.fotoPerfil ?? null);


    // const user = useMemo(() => {
    //     const localStorageData = localStorage.getItem('userData');
    //     return JSON.parse(localStorageData)?.user;
    // }, []);

    // const profile = useMemo(() => {
    //     const localStorageData = localStorage.getItem('perfilData');
    //     return JSON.parse(localStorageData);
    // }, []);

    // const [seguidores, setSeguidores] = useState(perfil?.seguidores?.length ?? 0);
    // const [siguiendo, setSiguiendo] = useState(perfil?.siguiendo?.length ?? 0);

    const [listUsers, setListUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    useEffect(() => {
        setLoadingUsers(true);

        axios.get(route('perfiles.page'), {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            }
        })
            .then((response) => {
                console.log(response.data);
                setListUsers(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                setListUsers([]);
            })
            .finally(() => {
                setLoadingUsers(false);
            });
    }, []);

    return (
        <CustomLayout
            visible={true}
        >
            <ParticlesLinks color="#FF8300"/>
            <Head title="Perfiles Usuarios"/>

            <Box className='w-full relative z-30'>
                {
                    loadingUsers ?
                        <Box className={'flex flex-col w-full h-[350px] mt-[100px] justify-center items-center'}>
                            <CircularProgress/>
                            <h6 className={'mt-5'}>
                                Cargando perfiles...
                            </h6>
                        </Box>
                        :
                        listUsers?.length > 0 ?
                            <ListaUsuarios
                                usuarios={listUsers}
                            />
                            :
                            <Box className={'flex flex-col w-full h-[350px] mt-[100px] justify-center items-center'}>
                                <h6 className={'mt-5'}>
                                    No hay perfiles registrados, intente más tarde o inicie sesión para crear uno.
                                </h6>
                            </Box>
                }
            </Box>


        </CustomLayout>
    );
};

export default index;
