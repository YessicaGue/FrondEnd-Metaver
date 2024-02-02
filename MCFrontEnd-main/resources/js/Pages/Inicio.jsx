import React, { useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import { Head } from '@inertiajs/react';
import CustomLayout from '@/Layouts/CustomLayout';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';
import ApplicationLogoSinLetras from '@/Components/ApplicationLogoSinLetras';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';

const Inicio = (props) => {
    const { auth: { user } } = props;

    return (
        <CustomLayout
            user={user}
            showTopBar
            visible={false}
        >
            <Head title="Ciudadanos en Movimiento" />

            <Box className='min-h-screen w-full shrink-0 relative flex justify-center items-center bg-gradient-to-b from-mc-primary to-mc-gradient3_2 overflow-hidden'>
                <ParticlesLinks />
                <TrailAppear>
                    <ApplicationLogoSinLetras className='w-96 flex justify-center items-center object-cover' />
                </TrailAppear>
            </Box>

        </CustomLayout>
    );
};

export default Inicio;
