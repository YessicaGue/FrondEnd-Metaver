import React from 'react';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';

const CustomTarjetaMediaPerfil = (props) => {
    const { id, caption, mediaUrl, username, media } = props;

    return (
        <div className="bg-slate-100 rounded-xl ml-6 flex flex-col-reverse transform hover:scale-105 transition-all shadow cursor-pointer hover:shadow-xl overflow-hidden">
            <div className='py-4 px-4'>
                <h1 className='font-black uppercase text-black'>@{ username }</h1>
                <h1>{ caption }</h1>
            </div>
            <div
                className='aspect-square bg-gray-300'
                style={{ 
                    backgroundImage: `url( ${ mediaUrl } )`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            </div>
        </div>
    );
};

export default CustomTarjetaMediaPerfil;