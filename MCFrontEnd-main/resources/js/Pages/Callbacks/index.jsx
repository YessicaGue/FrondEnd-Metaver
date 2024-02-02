import React, { useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { Head } from '@inertiajs/react';
import CustomLayout from '@/Layouts/CustomLayout';
import ParticlesGrowing from '@/Components/Customized/ParticlesComponents/ParticlesGrowing';
import ApplicationLogoSinLetras from '@/Components/ApplicationLogoSinLetras';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';

const index = (props) => {
    const { auth: { user }, authorization } = props;

    const profile = user.perfil_data;

    useEffect(() => {
        const returnHandler = () => {
            if (user?.perfil_grupal_tagged_in)
                return route("perfil.grupal.page", { id: user.perfil_grupal_tagged_in });
            
            return route("perfil.page", { id: profile.guid });
        };

        const uploadTokens = async () => {
            if (authorization == null)
                return location.replace(returnHandler());
    
            const params = {
                tokenId: 1,
                token: authorization,
                expiration: authorization.longLivedToken.expires_in,
            };
    
            const formData = new FormData();
            formData.append('data', JSON.stringify(params));
    
            await axios.post(route('post.token.external'), formData);
    
            location.replace(returnHandler());
        };

        uploadTokens();
    }, []);

    return (
        <CustomLayout user={ user }>
            <Head title="Cargando..." />
            <Box className='min-h-screen w-full shrink-0 relative flex justify-center items-center bg-gradient-to-b from-mc-primary to-mc-gradient3_2 overflow-hidden'>
                <ParticlesGrowing />
                <TrailAppear className='w-full absolute h-full'>
                    <ApplicationLogoSinLetras className='w-96 flex justify-center items-center object-cover top-[50%] absolute left-[50%] translate-x-[-50%] translate-y-[-50%]' />
                    <h1 className='absolute left-[50%] translate-x-[-50%] top-[calc(50%+100px)] text-orange-200 text-3xl font-extrabold text-center' style={{ fontFamily: 'Poppins, sans-serif' }}>Espera un momento, por favor...</h1>
                </TrailAppear>
            </Box>
        </CustomLayout>
    );
};

export default index;