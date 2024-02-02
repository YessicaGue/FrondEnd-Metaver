import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {Box, Button, CircularProgress, TextField, Container} from '@mui/material';
import {Head, Link, router} from '@inertiajs/react';
import CustomLayout from '@/Layouts/CustomLayout';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';
import axios from 'axios';
import {appColors} from "@/utils/AppColors";
import ListaPerfilesGrupales from "@/Pages/ListaPerfiles/Grupales/ListaPerfilesGrupales";


const PerfilesGrupales = () => {

    const [listUsers, setListUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios.get(route('perfiles.grupales.page'), {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            }
        })
            .then((response) => {
                console.log(response.data);
                setListUsers(response.data.response.response);
            })
            .catch((error) => {
                console.log(error);
                setListUsers([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <CustomLayout
            visible={true}
        >
            <ParticlesLinks color={appColors.secondary}/>
            <Head title="Perfiles Grupales"/>

            <Box className='w-full relative z-30'>
                {
                    loading ?
                        <Box className={'flex flex-col w-full h-[350px] mt-[100px] justify-center items-center'}>
                            <CircularProgress/>
                            <h6 className={'mt-5'}>
                                Cargando perfiles grupales...
                            </h6>
                        </Box>
                        :
                        listUsers?.length > 0 ?
                            <ListaPerfilesGrupales
                                perfiles={listUsers}
                            />
                            :
                            <Box className={'flex flex-col w-full h-[350px] mt-[100px] justify-center items-center'}>
                                <h6 className={'mt-5'}>
                                    No hay perfiles grupales registrados, intente más tarde.
                                </h6>
                            </Box>
                }
            </Box>
        </CustomLayout>
    );
};

export default PerfilesGrupales;
