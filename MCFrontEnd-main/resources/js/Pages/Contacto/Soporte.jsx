import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {ContactoFooter} from "./ContactoFooter";
import Guest from "@/Layouts/GuestLayout";
import {appColors} from "@/utils/AppColors";
import ApplicationLogo from "@/Components/ApplicationLogo";
import {Box, Button, Container, Grid, useMediaQuery} from "@mui/material";
import qrContacto from "@/../assets/images/qr-whatsapp-soporte.png";

const SoporteView = (props) => {

    const sm = useMediaQuery('(max-width:899px)');

    return (
        <div
            className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0"
            style={{
                backgroundColor: appColors.primary,
            }}
        >
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 text-gray-500"/>
                </Link>
            </div>

            <Head title="Soporte"/>

            <div className='bg-white w-full max-w-7xl rounded-lg !p-0 mt-4 flex-grow'>
                <div className="wrapper w-full overflow-hidden text-4xl mb-10 !mt-6 font-bold text-center text-mc-primary">
                    <h2>
                        Soporte
                    </h2>
                </div>
                <div className='w-full flex justify-center !mt-4'>
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 flex flex-col">
                        <div className='w-full flex flex-col justify-center items-center'>
                            <img className='h-[500px] object-contain rounded-xl' src={qrContacto} alt='QR contacto'/>
                            <h4 className='text-center font-semibold text-xl mt-2'>
                                Contáctanos por WhatsApp
                            </h4>
                        </div>
                        
                        <div className='w-full h-full flex flex-col justify-center items-center' >
                            <a className='mb-[30px]' href="https://surveys.hotjar.com/c37267ce-621e-464e-8f71-c91a2647dcae" target='_blank'>
                                <button className='m-auto h-[180px] w-[280px] p-0 rounded-2xl text-white font-bold bg-purple-400 text-xl'>
                                    Califica tu experiencia
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <ContactoFooter/>
        </div>
    );
}

export default SoporteView;
