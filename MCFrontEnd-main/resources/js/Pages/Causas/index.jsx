import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { Head } from '@inertiajs/react';
import CustomLayout from '@/Layouts/CustomLayout';
import ParticlesGrowing from '@/Components/Customized/ParticlesComponents/ParticlesGrowing';
import FormularioCausa from '@/Pages/Causas/FormularioCausa';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';

const index = (props) => {
    const { auth: { user } } = props;

    return (
        <CustomLayout user={ user }>
            <Head title="Regístrate a una causa" />

            <Box className='w-full relative bg-gradient-to-b from-mc-primary to-mc-gradient3_2'>
                <ParticlesGrowing />

                <div className='max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 h-[50vh] pt-[calc(25px+3vw+15vh)]'>
                    <TrailAppear>
                        <Box className='max-md:w-full w-3/4'>
                            <Typography variant='h3' fontWeight='800' className='text-white font-black max-md:text-center' style={{
                                fontSize: 'calc(26px + 1vw)',
                                lineHeight: 'calc(26px + 1vw)'
                            }}>
                                Bienvenid@ al formulario para registrarse a una causa
                            </Typography>
                        </Box>
                        <Box className='w-full mt-4'>
                            <Typography variant='h3' className='text-[#FFF2D9] font-black max-md:text-center' style={{
                                fontSize: 'calc(10px + .5vw)',
                                lineHeight: 'calc(10px + .5vw)'
                            }}>
                                Nos emociona y valoramos mucho la iniciativa del voluntario
                            </Typography>
                        </Box>
                    </TrailAppear>
                </div>

            </Box>
            <FormularioCausa />

        </CustomLayout>
    );
};

export default index;