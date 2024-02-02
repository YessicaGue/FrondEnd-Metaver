import React from 'react';
import { Head } from '@inertiajs/react';
import CustomLayout from '@/Layouts/CustomLayout';
import ParticlesGrowing from '@/Components/Customized/ParticlesComponents/ParticlesGrowing';
import BannerPrincipal from '@/Pages/Eventos/BannerPrincipal';
import SeccionEventos from '@/Pages/Eventos/SeccionEventos';

const index = (props) => {
    const { auth: { user } } = props;

    return (
        <CustomLayout user={ user }>
            <Head title="Eventos" />

            <div className='w-full relative bg-gradient-to-b from-mc-primary to-mc-gradient3_2'>
                <ParticlesGrowing />
                <BannerPrincipal />
            </div>
            
            <SeccionEventos />
        </CustomLayout>
    );
};

export default index;