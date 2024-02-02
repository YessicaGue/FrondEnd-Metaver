import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';

const dateParser = (datestring) => {
    const date = new Date(datestring);
    const today = new Date();
    return `
        ${
            date.toLocaleTimeString('es-ES', { weekday: 'long' })
                .substring(0,3)
        },
        ${
            date.toLocaleDateString('es-ES', { day: 'numeric' })
        }
        ${
            date.toLocaleTimeString('es-ES', { month: 'long' })
                .substring(0,3)
        }.
        ${
            date.toLocaleDateString('es-ES', { year: 'numeric' }) != today.toLocaleDateString('es-ES', { year: 'numeric' })
                ? date.toLocaleDateString('es-ES', { year: 'numeric' })
                : ''
        } a las
        ${ 
            date.toLocaleTimeString('es-ES', { hour: '2-digit', minute:'2-digit' })
        } horas
    `;
};

const CustomEventos = (props) => {
    const { id, nombre, fechaEvento } = props;

    return (
        <div
            className=" bg-slate-100 rounded-xl ml-12 flex flex-col transform hover:scale-105 transition-all shadow hover:shadow-xl cursor-pointer relative"
            onClick={ () => window.open(route('evento.page', id), '_blank') }
        >
            <div className='w-full h-full py-4 pl-10 pr-4'>
                <h1 className='font-black uppercase text-blue-600'>{ dateParser(fechaEvento) }</h1>
                <h1>{ nombre }</h1>
            </div>
            <div className="absolute w-12 h-12 bg-blue-600 z-30 rounded-full top-1/2 transform -translate-y-1/2 left-[-1.5rem] flex items-center justify-center">
                <FontAwesomeIcon icon={faCalendar} className="w-8 h-8 text-white" />
            </div>
        </div>
    );
};

export default CustomEventos;