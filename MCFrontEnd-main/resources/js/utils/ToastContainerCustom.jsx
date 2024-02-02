import React from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContainerCustom = (
    autoClose = 5000,
    hideProgressBar = false,
    position = 'bottom-right',
    theme = 'light',
) => {
    // toast('🦄 Bienvenido a tu panel de eventos');

    return (
        <ToastContainer
            position={position}
            autoClose={autoClose}
            draggable
            pauseOnHover
            pauseOnFocusLoss
            hideProgressBar={hideProgressBar}
            theme={theme}
            style={{
                zIndex: 99999999,
            }}
        />
    );
}

export default ToastContainerCustom;
