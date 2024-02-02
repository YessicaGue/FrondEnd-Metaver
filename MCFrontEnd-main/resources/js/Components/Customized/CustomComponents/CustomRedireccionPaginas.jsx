import React from 'react';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FaRegCalendarAlt } from 'react-icons/fa';

// import naranjitaImg from './PerfilesGrupales/naranjita.png';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';


const CustomRedireccionPaginas = (props) => {
    const { } = props;

    
    return (
        <div className="w-full mt-10 py-5 justify-center">         
                <div className="text-center text-xl font-black pb-5">
                    <h1 className="text-orange-500">CONOCE MÁS DE MOVIMIENTO CIUDADANO</h1>
                </div>   
                <div className="grid grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 w-full text-center gap-4 flex-wrap text-orange-500 font-bold text-xl">
                <a href="https://dashboard.ciudadanosenmovimiento.org/eventos" className="block">
                <div className="border-4 border-orange-500 py-10 w-full h-full rounded-lg shadow-md overflow-hidden relative transform hover:shadow-xl hover:translate-y-[-5px] transition-all flex flex-col items-center justify-center">
                    <FaRegCalendarAlt className="text-4xl mb-2" />
                    <span className="text-center">Eventos</span>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold opacity-0 hover:opacity-100 transition-opacity bg-white bg-opacity-90">
                        Bienvenid@ <br /> Conoce más sobre nuestros eventos <br /> Crea tu evento y registra a tus invitados
                    </div>
                </div>
                </a>
                
                <a href="https://capacitacion.ciudadanosenmovimiento.org/" className="block">
                <div className="border-4 border-orange-500 py-10 w-full h-full rounded-lg shadow-md overflow-hidden relative transform hover:shadow-xl hover:translate-y-[-5px] transition-all">
                <FontAwesomeIcon icon={faLaptop} className="text-4xl mb-2"/> <br />
                    Capacitación
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold opacity-0 hover:opacity-100 transition-opacity bg-white bg-opacity-90">
                        Bienvenid@ <br /> Conoce más sobre nuestras capacitaciones <br /> Este es tu espacio para capacitarte
                    </div>
                </div>
                </a>

                <a href="https://nara.ciudadanosenmovimiento.org" className="block">
                <div className="border-4 border-orange-500 py-10 w-full h-full rounded-lg shadow-md overflow-hidden relative transform hover:shadow-xl hover:translate-y-[-5px] transition-all">
                    <FontAwesomeIcon icon={faComments} className="text-4xl mb-2" /> <br />
                    NARA
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold opacity-0 hover:opacity-100 transition-opacity bg-white bg-opacity-90">
                        Bienvenid@ <br /> Conoce más sobre NARA <br /> Ayúdanos a entrenar a Nara, nuestra inteligencia artificial naranja
                    </div>
                </div>
                </a>

                {/* <a href="https://gis.ciudadanosenmovimiento.org/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4IiwianRpIjoiZGMyMTlkNmQ1Mzg2NjliNDZhMmVlZGQ0N2E5NGQzNTM1YmJmYzY5OTI0MDNhMjg5NjgzNjEzOTI4M2M0NWE4YmNmMDIyNTcwM2ZmNTc0YzEiLCJpYXQiOjE2ODgxNzM1NTcuOTczODY0LCJuYmYiOjE2ODgxNzM1NTcuOTczODY5LCJleHAiOjE2ODgyNTk5NTcuODY4NzIzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.b8qiyFhTGFgO-axGDbdGX18zM0v7e3hU39vYwxaMj3f-mPFpC6yZq8r5D7opicPayU7A2kI2nrs-UqYyvo5rUQ0U-b6I_ZHS-dUHHRl8OreKlwwwg6W0InhOGmM-jz9QSqxX5ZNnmbZ7ZN1XO7ioMuoPoyjOtilBay0DoJRlAKKTzYhhVbbOyE37oB3O1u8YYM5tMj7onrZg1FgSRnH7-4xEX7T-QoNwt63czbUPYYf9xsgED10gduV7D7MeS_GgDcaj1RC_Gz0G7qhY06mRvH3XOmE1ay_0t2ekKx4fimziBDw0KuzE6_-uk7Fcd9bRVxFS5DQMV-lmsPDLqpwPVhRRTU4Vvlx-Rg_Mx3TebdCD90h0DC5v9S46ExBRGGMMUGT3-UdSZChRuyvhcUrhm12SAk0LDPJeHbTnzxa4_Ttd_qjKAJ7voQRqrj-zg_b6QPXdegTNIKr5QWNXJPZ-AuaUjRD8HJdNNZvgfABgRM9_GscC7zPKDStHqVtq28MCYlG-q49InIJliWtBCYchAlz2gsvzQotR4fp0JOQXCeAP8t8pXlCT2w3EDAIZuCfHwvq4eVoD2gfyrP3qUqpe2FQhcWDFdCc-zkdX7JTukBRQEFNqG7YXNfle8o0fHjPOUgcAWQIWgZRgkwhlbc2fixhTJ9nkwQ1HfpSWb_prE10" className="block">
                <div className="border-4 border-orange-500 py-10 w-full h-full rounded-lg shadow-md overflow-hidden relative transform hover:shadow-xl hover:translate-y-[-5px] transition-all">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-4xl mb-2" /> <br />
                    GIS
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold opacity-0 hover:opacity-100 transition-opacity bg-white bg-opacity-90">
                        Bienvenid@ <br /> Conoce más sobre nuestro Centro de Inteligencia <br /> Acceso al sistema de consulta GIS, nuestro sistema de información geográfica y estadística.
                    </div>
                    </div>
                </a> */}
            </div>
        </div>
    )
};
    
export default CustomRedireccionPaginas;