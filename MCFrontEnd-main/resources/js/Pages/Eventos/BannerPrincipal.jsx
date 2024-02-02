import React from 'react';
import { Typography } from '@mui/material';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';

const BannerPrincipal = (props) => {
    return (
        <div className='max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 h-screen pt-[calc(25px+5vw+25vh)]'>
            <TrailAppear>

                <div className='max-md:w-full w-3/4'>
                    <Typography
                        variant='h3'
                        fontWeight='800'
                        className='text-white font-black max-md:text-center'
                        style={{
                            fontSize: 'calc(26px + 1vw)',
                            lineHeight: 'calc(26px + 1vw)'
                        }}
                    >
                        Conoce qué eventos prepara la comunidad, para que puedas unirte y participar
                    </Typography>
                </div>

                <div className='w-full mt-4'>
                    <Typography
                        variant='h3'
                        className='text-[#FFF2D9] font-black max-md:text-center'
                        style={{
                            fontSize: 'calc(12px + .5vw)',
                            lineHeight: 'calc(12px + .5vw)'
                        }}
                    >
                        ¡Únete y convive con el nicho!
                    </Typography>
                </div>

            </TrailAppear>
        </div>
    );
};

export default BannerPrincipal;