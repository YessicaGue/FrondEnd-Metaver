import React, {useState, useEffect} from "react";
import TableFirmasPrecandidatura from "@/Pages/CaminoCandidato/TableFirmasPrecandidatura";
import HeaderGradient from "@/Components/HeaderGradient";
import {Head} from "@inertiajs/react";

const ScreenFirmas = (props) => {
    return (
        <div
            className={'flex flex-col justify-start items-start min-h-screen'}
        >
            <Head title={`Firmas ${props['precandidatura']['perfil']['alias']}`}/>

            {
                props['isOwner'] ?
                    <>
                        <HeaderGradient
                            title={''}
                            subtitle={`Firmas de precandidaturas ${props['precandidatura']['perfil']['alias']}`}
                            description={'En esta sección podrás ver el detalle de tus firmas'}
                        />

                        <TableFirmasPrecandidatura
                            {...props}
                        />
                    </>
                    :
                    <div
                        className={'flex flex-col justify-center items-center min-h-screen p-5 w-full'}
                    >
                        <div
                            className={'flex flex-col justify-center items-center'}
                        >
                            <div
                                className={'text-2xl font-semibold'}
                            >
                                No tienes permisos para ver esta sección
                            </div>

                            <div
                                className={'text-lg font-semibold'}
                            >
                                Si crees que esto es un error, contacta al administrador
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ScreenFirmas;
