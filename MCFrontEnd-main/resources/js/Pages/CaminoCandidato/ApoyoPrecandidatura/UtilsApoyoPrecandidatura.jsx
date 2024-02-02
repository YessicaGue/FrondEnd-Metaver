import React from "react";

export const readFileAsArrayBuffer = (event) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = (event) => resolve(event.target.result);
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsArrayBuffer(event.target.files[0]);
    });
};

export const OverlayCard = (props) => {
    const {textoBoton} = props;

    return (
        <div
            className={'absolute top-2 right-2 bottom-2 left-2 bg-[rgba(255,255,255,0.90)] ' +
                'rounded-lg flex flex-col gap-2 justify-center items-center cursor-pointer px-2'}
            {...props}
        >
            <span className='max-md:text-base text-3xl uppercase tracking-widest text-center font-bold font-[Poppins]'>
                {textoBoton}
            </span>
        </div>
    );
};

export const OverlayMenu = (props) => {
    const {children, className, onClick} = props;

    return (
        <div
            className={`fixed z-50 h-screen w-full flex justify-center items-center top-0 ${className} bg-[rgba(0,0,0,0.5)]`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
