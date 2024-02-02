import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import logoMC from "@/Pages/CaminoCandidato/logo_mc.png";
import ScaleText from "react-scale-text";

const InfoPrecandidato = (props) => {
    return (
        <Grid2
            container
            className={'w-full h-full flex flex-col justify-center items-center !mt-[40px]'}
        >
            <Grid2
                item xs={12} sm={12} md={2}
                className={'h-full flex justify-center items-center'}
            >
                <img
                    src={logoMC}
                    alt="Logo MC"
                    className={`h-full w-full object-contain ${props.sm ? 'mb-3 max-h-[70px]' : 'max-h-[100px]'}`}
                />
            </Grid2>

            <Grid2
                item xs={12} sm={12} md={10}
                container
                className={`border-l-4 border-orange-500 ${props.sm ? '!px-2' : ''}`}
            >
                <Grid2
                    item xs={12}
                    className='uppercase tracking-wide text-center font-semibold font-[Poppins]'
                >
                    <ScaleText
                        minFontSize={10}
                        maxFontSize={30}
                        widthOnly
                    >
                        <>
                            Apoyo a la precandidatura a
                            &nbsp;
                            <span
                                className={'text-mc-primary font-semibold'}>{`${props.tipoPrecandidatura.nombre}`}</span>
                            &nbsp;
                            <span className={'text-black'}>de</span>
                        </>
                    </ScaleText>
                </Grid2>

                <Grid2
                    item xs={12}
                    className='uppercase text-orange-500 tracking-widest text-center font-bold font-[Poppins]'
                >
                    <ScaleText
                        minFontSize={10}
                        maxFontSize={80}
                    >
                        {props.nombreCandidato}
                    </ScaleText>
                </Grid2>
            </Grid2>
        </Grid2>
    )
}

export default InfoPrecandidato;
