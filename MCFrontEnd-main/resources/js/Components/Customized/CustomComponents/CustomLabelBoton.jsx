import React from 'react';
import { Button } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon  from '@mui/icons-material/Telegram';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Favorite as HeartIcon } from '@mui/icons-material';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';


const CustomLabelBoton = (props) => {
    const { id, titulo, descripcion, fotoPublicacion, fechaCreacion, fechaInicio, fechaFin, contenido, url, onModalOpen, post, setPost, setIsUpdate, editable, urlMovimientoSocial, onEditarMovimientoSocialModalOpen} = props;
    return (
         <div>
            <div className='w-full h-full pb-4 pr-6 wysiwyg gap-6 flex flex-col'>
                <label className="w-full rounded-xl border-blue-400 border-2 mx-2 flex items-center px-2 py-1">
                    <span className="text-blue-400 flex-grow">{titulo}</span>
                    {
                        editable ?
                        <Button className='opacity-80 hover:opacity-100 transition-all'
                        onClick={ (evento) => {
                                evento.stopPropagation();
                                setIsUpdate(true);
                                setPost({
                                    ...post,
                                    id,
                                    titulo,
                                    descripcion,
                                    fechaInicio: dayjs(new Date(fechaInicio)),
                                    fechaFin: dayjs(new Date(fechaFin)),
                                    urlMovimientoSocial,
                                });
                                onEditarMovimientoSocialModalOpen();
                            }}
                        >
                            <EditIcon className='rounded p-1 bg-purple-900 text-white'/>
                        </Button>:null
                    }
                    <a href={urlMovimientoSocial} target="_blank" rel="noopener noreferrer">
                    <button className="ml-auto bg-orange-400 text-white px-4 py-2 rounded -mr-6 transition-all duration-100 ease-in-out transform hover:w-20" style={{ clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%, 15% 50%)' }}>
                        <span className="visible">unirse</span>
                    </button>
                    </a>
                </label>
            </div>
        </div>
        
      );
      
};

export default CustomLabelBoton;
