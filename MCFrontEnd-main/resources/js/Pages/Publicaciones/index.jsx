import React, { useMemo, useEffect, useState } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { Head } from '@inertiajs/react';
import { convertHtmlToReact } from '@hedgedoc/html-to-react';
import CustomLayout from '@/Layouts/CustomLayout';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';
import EncabezadoPerfil from '@/Pages/Perfiles/EncabezadoPerfil';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';

const index = (props) => {
    const { auth: { user }, publicacion, perfil, usuario } = props;
    const perfilWrapper = {
        perfil
    };
    
    return (
        <CustomLayout
            visible={ true }
            user={ user }
        >
            <ParticlesLinks color="#FF8300" />
            <Head title="Perfil principal" />

            <div className='w-full relative z-30'>
                <EncabezadoPerfil
                    usuario={ usuario }
                    perfil={ perfilWrapper }
                />
            </div>

            <div className='w-full bg-white z-30'>

                <div className='z-30 max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>
                    <div className='flex flex-col gap-4'>
                        <TrailAppear>

                            <h2 className='text-[50px] font-extrabold text-[#1A0829] leading-10'>
                                { publicacion.titulo }
                            </h2>

                            <p className='text-justify'>
                                { publicacion.descripcion }
                            </p>

                            <div className='w-[80px] h-[3px] bg-mc-primary'></div>
                            
                            <div>
                                { convertHtmlToReact(publicacion.contenido) }
                            </div>

                        </TrailAppear>
                    </div>
                </div>

            </div>

        </CustomLayout>
    );
};

export default index;