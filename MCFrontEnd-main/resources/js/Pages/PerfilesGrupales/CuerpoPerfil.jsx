import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';
import CustomLabelBoton from '@/Components/Customized/CustomComponents/CustomLabelBoton';
import CustomTarjetaPost from '@/Components/Customized/CustomComponents/CustomTarjetaPost';
import CustomEventos from '@/Components/Customized/CustomComponents/CustomEventos';
import CustomTarjetaPostdos from '@/Components/Customized/CustomComponents/CustomTarjetaPostdos';
import CustomTarjetasInfo from '@/Components/Customized/CustomComponents/CustomTarjetasInfo';
import fallback_url from './imagen-componentes.png';
import CustomTarjetaMediaPerfil from '@/Components/Customized/CustomComponents/CustomTarjetaMediaPerfil';

const CuerpoPerfil = (props) => {
    const {
        listaPublicaciones,
        mediaPerfiles,
        post,
        setPost,
        isUpdate,
        setIsUpdate,
        perfilGrupal,
        onModalOpen,
        onEditModalOpen,
        editable,
        urlVideoPrincipal,
        onUrlVideoPrincipalEditarModalOpen,
        onMovimientoSocialModalOpen,
        onEditarMovimientoSocialModalOpen,
        onRecienteRedesSocialesModalOpen
    } = props;

    const { eventos } = perfilGrupal;

    const [trabajoPublicaciones, setTrabajoPublicaciones] = useState([]);
    const [movimientoSocialPublicaciones, setMovimientoSocialPublicaciones] = useState([]);
    const [recientePublicaciones, setRecientePublicaciones] = useState([]);
    const [newsletterPublicaciones, setNewsLetterPublicaciones] = useState([]);

    useEffect(() => {
        if (!listaPublicaciones)
            return;
        setTrabajoPublicaciones(listaPublicaciones.filter(publicacion => [2].includes(publicacion.catalogoPublicacionPerfilGrupal?.id || 0) ));
        setMovimientoSocialPublicaciones(listaPublicaciones.filter(publicacion => [1].includes(publicacion.catalogoPublicacionPerfilGrupal?.id || 0) ));
        setRecientePublicaciones([]
            .concat(listaPublicaciones.filter(publicacion => [3].includes(publicacion.catalogoPublicacionPerfilGrupal?.id || 0) ))
            .concat(mediaPerfiles.instagram.media.map((row, index, self) => ({...row, username: mediaPerfiles.instagram.perfil.username, outterPost: true})).slice(0, 3))
        );

        setNewsLetterPublicaciones(listaPublicaciones.filter((publicacion) => [6].includes(publicacion.catalogoPublicacionPerfilGrupal?.id || 0)));
    }, [listaPublicaciones, mediaPerfiles]);

    return (
        <div className='max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'>

            <TrailAppear>
                <div className='grid grid-cols-4 gap-4 max-lg:grid-cols-1 w-full'>

                    <div className="w-full min-h-[420px] bg-white shadow-xl relative max-lg:col-span-2 lg:mb-6 pt-16">
                        <div className='w-full rounded-lg py-3 absolute top-[-.5rem]' style={{ backgroundColor: '#6b897d' }}>
                            <p className='font-bold text-white px-4 font-sans-serif' style={{ fontFamily: 'Montserrat'}} >Movimiento social</p>
                        </div>
                        <div className='absolute top-[.2rem] right-6'>
                            {
                                editable
                                ?   <>
                                        <Button
                                            className='opacity-70 hover:opacity-100 transition-all'
                                            onClick={ onMovimientoSocialModalOpen }
                                            sx={{ minWidth: 0, padding: 0 }}
                                        >
                                            <AddCircleRoundedIcon className='rounded p-1 -m-2  bg-orange-600 text-white' />
                                        </Button>
                                    </>
                                :   null
                            }
                        </div>
                        {
                            movimientoSocialPublicaciones.map(publicacion => (
                                <CustomLabelBoton 
                                    key={JSON.stringify(publicacion)}
                                    id={ publicacion.id }
                                    titulo={ publicacion.titulo }
                                    contenido={ publicacion.contenido }
                                    descripcion={ publicacion.descripcion }
                                    fechaCreacion={ publicacion.fechaCreacion }
                                    fechaInicio={ publicacion.fechaInicio }
                                    fechaFin={ publicacion.fechaFin }
                                    fotoPublicacion={ publicacion.imagenPublicacion ? `https://dashboard.ciudadanosenmovimiento.org/api/publicacion/grupal/imagen/${publicacion.imagenPublicacion}` : fallback_url }
                                    url={ publicacion.url }
                                    urlMovimientoSocial={publicacion.urlMovimientoSocial}
                                    post={ post }
                                    setPost={ setPost }
                                    setIsUpdate={ setIsUpdate }
                                    onModalOpen={ onEditModalOpen }
                                    editable={ editable }
                                    onMovimientoSocialModalOpen={onMovimientoSocialModalOpen}
                                    onEditarMovimientoSocialModalOpen={onEditarMovimientoSocialModalOpen}
                                    
                                />
                            ))
                        }
                    </div>
                    
                    <div className="w-full min-h-[500px] shadow-xl bg-white pt-16 pb-4 pr-6 wysiwyg gap-6 flex flex-col relative col-span-2">
                        <div className='w-full rounded-lg py-3 absolute top-[-.5rem]' style={{ backgroundColor: '#6b897d' }}>
                            <p className='font-bold text-white px-4 font-sans-serif' style={{ fontFamily: 'Montserrat'}} >Nuestro trabajo</p>
                        </div>
                        <div className='absolute top-[.2rem] right-4'>
                            {
                                editable
                                ?   <>
                                        <Button
                                            className='opacity-70 hover:opacity-100 transition-all'
                                            onClick={ () => onModalOpen('trabajo') }
                                            sx={{ minWidth: 0, padding: 0 }}
                                        >
                                            <AddCircleRoundedIcon className='rounded p-1 bg-orange-600 text-white' />
                                        </Button>
                                    </>
                                :   null
                            }
                        </div>
                        <div className='w-full h-full wysiwyg gap-6 flex flex-col'>
                                {
                                    trabajoPublicaciones.map(publicacion => (
                                        <CustomTarjetaPost 
                                            key={JSON.stringify(publicacion)}
                                            id={ publicacion.id }
                                            titulo={ publicacion.titulo }
                                            contenido={ publicacion.contenido }
                                            descripcion={ publicacion.descripcion }
                                            fechaCreacion={ publicacion.fechaCreacion }
                                            fechaInicio={ publicacion.fechaInicio }
                                            fechaFin={ publicacion.fechaFin }
                                            fotoPublicacion={ publicacion.imagenPublicacion ? `https://dashboard.ciudadanosenmovimiento.org/api/publicacion/grupal/imagen/${publicacion.imagenPublicacion}` : fallback_url }
                                            url={ publicacion.url }
                                            post={ post }
                                            setPost={ setPost }
                                            setIsUpdate={ setIsUpdate }
                                            onModalOpen={ onEditModalOpen }
                                            editable={ editable }
                                            grupalType={ true }
                                        />
                                    ))
                                }
                            </div>
                    </div>

                    <div className="w-full min-h-[500px] bg-white shadow-xl relative max-lg:col-span-2 lg:mb-[-1.5rem]">
                        <div className='w-full rounded-lg py-3 absolute top-[-.5rem]' style={{ backgroundColor: '#6b897d' }}>
                            <p className='font-bold text-white px-4 font-sans-serif' style={{ fontFamily: 'Montserrat'}} >Lo más reciente</p>
                        </div>
                        <div className='absolute top-[.2rem] right-4'>
                        {
                            editable
                            ?   <div className='flex gap-4'>
                                    <Button
                                        className='opacity-70 hover:opacity-100 transition-all'
                                        onClick={ onRecienteRedesSocialesModalOpen }
                                        sx={{ minWidth: 0, padding: 0 }}
                                    >
                                        <SettingsIcon className='rounded p-1 bg-orange-600 text-white' />
                                    </Button>
                                    <Button
                                        className='opacity-70 hover:opacity-100 transition-all'
                                        onClick={ () => onModalOpen('reciente') }
                                        sx={{ minWidth: 0, padding: 0 }}
                                    >
                                        <AddCircleRoundedIcon className='rounded p-1 bg-orange-600 text-white' />
                                    </Button>
                                </div>
                            :   null
                        }
                        </div>
                        <div className='w-full h-full pt-16 pb-4 pr-6 wysiwyg gap-6 flex flex-col'>
                            {
                                recientePublicaciones.map(publicacion => {
                                    if (publicacion.outterPost && publicacion.outterPost === true)
                                        return (
                                            <CustomTarjetaMediaPerfil 
                                                key={JSON.stringify(publicacion)}
                                                id={ publicacion.id }
                                                caption={ publicacion.caption }
                                                mediaUrl={ publicacion.media_url }
                                                username={ publicacion.username }
                                                media="instagram"
                                            />
                                        )
                                    else {
                                        return (
                                            <CustomTarjetaPost 
                                                key={JSON.stringify(publicacion)}
                                                id={ publicacion.id }
                                                titulo={ publicacion.titulo }
                                                contenido={ publicacion.contenido }
                                                descripcion={ publicacion.descripcion }
                                                fechaCreacion={ publicacion.fechaCreacion }
                                                fechaInicio={ publicacion.fechaInicio }
                                                fechaFin={ publicacion.fechaFin }
                                                fotoPublicacion={ publicacion.imagenPublicacion ? `https://dashboard.ciudadanosenmovimiento.org/api/publicacion/grupal/imagen/${publicacion.imagenPublicacion}` : fallback_url }
                                                url={ publicacion.url }
                                                post={ post }
                                                setPost={ setPost }
                                                setIsUpdate={ setIsUpdate }
                                                onModalOpen={ onEditModalOpen }
                                                editable={ editable }
                                                grupalType={ true }
                                            />
                                        )
                                    }
                                })    
                            }
                        </div>
                    </div>

                    <div className="w-full min-h-[500px] bg-white shadow-xl relative max-lg:col-span-2">
                        <div className='w-full rounded-lg py-3 absolute top-[-.5rem]' style={{ backgroundColor: '#6b897d' }}>
                            <p className='font-bold text-white px-4 font-sans-serif' style={{ fontFamily: 'Montserrat'}} >Proximos eventos</p>
                        </div>
                        <div className='absolute top-[.2rem] right-4'>
                            {
                                editable
                                ?   <>
                                        <Button
                                            className='opacity-70 hover:opacity-100 transition-all'
                                            onClick={ () => onModalOpen('eventos') }
                                            sx={{ minWidth: 0, padding: 0 }}
                                        >
                                            <AddCircleRoundedIcon className='rounded p-1 bg-orange-600 text-white' />
                                        </Button>
                                    </>
                                :   null
                            }
                        </div>
                        <div className='w-full h-full pt-16 pb-4 pr-6 wysiwyg gap-6 flex flex-col'>
                            {
                                eventos?.map(evento => (
                                    <CustomEventos
                                        id={ evento.id }
                                        nombre={ evento.nombre }
                                        fechaEvento={ evento.fechaEvento }
                                    />
                                ))
                            }
                            
                        </div>
                    </div>

                    <div className="w-full min-h-[500px] bg-white shadow-xl relative col-span-2 lg:mt-6">
                        <div className='w-full rounded-lg py-3 absolute top-[-.5rem]' style={{ backgroundColor: '#6b897d' }}>
                            <p className='font-bold text-white px-4 font-sans-serif' style={{ fontFamily: 'Montserrat'}} >Videos</p>
                        </div>
                        <div className='absolute top-[.2rem] right-4'>
                        {
                            editable?
                            <>
                                <Button
                                    className='opacity-80 hover:opacity-100 transition-all'
                                    onClick={ onUrlVideoPrincipalEditarModalOpen }
                                    sx={{ minWidth: 0, padding: 0 }}
                                >
                                    <EditIcon className='rounded p-1 bg-purple-900 text-white'/>
                                </Button>
                            </>
                            :null
                        }
                        </div>
                        <div className='w-full pt-20 gap-6 flex flex-col'>
                            <iframe className=' p-5 min-h-[300px]' src={urlVideoPrincipal} allowFullScreen width='100%' height='100%'></iframe>
                        </div>
                    </div>

                    <div className="w-full min-h-[500px] bg-white shadow-xl relative max-lg:col-span-2 lg:mt-12">
                        <div className='w-full rounded-lg py-3 absolute top-[-.5rem]' style={{ backgroundColor: '#6b897d' }}>
                            <p className='font-bold text-white px-4 font-sans-serif' style={{ fontFamily: 'Montserrat'}} >Próximos cursos</p>
                        </div>
                        <div className='absolute top-[.2rem] right-4'>
                        {
                            editable
                            ?   <>
                                    <Button
                                        className='opacity-70 hover:opacity-100 transition-all'
                                        onClick={ () => onModalOpen('cursos') }
                                        sx={{ minWidth: 0, padding: 0 }}
                                    >
                                        <AddCircleRoundedIcon className='rounded p-1 bg-orange-600 text-white' />
                                    </Button>
                                </>
                            :   null
                        }
                        </div>
                        <div className='w-full h-full pt-16 pb-4 px-6 wysiwyg gap-6 flex flex-col'>
                            {/* <CustomTarjetaPost/> */}
                            {/* <CustomTarjetaPost/> */}
                            {/* <CustomTarjetaPost/> */}
                        </div>
                    </div>

                </div>
            </TrailAppear>


            <div className="w-full min-h-[350px] bg-white shadow-xl mt-10 relative">
                <div className='w-full rounded-lg py-3 absolute top-[-.5rem]' style={{ backgroundColor: '#6b897d' }}>
                    <p className='font-bold text-white px-4 font-sans-serif' style={{ fontFamily: 'Montserrat'}} >Newsletter</p>
                </div>
                <div className='absolute top-[.2rem] right-4'>
                    <div className='flex gap-4'>
                        {
                            editable
                            ?   <>
                                    <Button
                                        className='opacity-70 hover:opacity-100 transition-all'
                                        onClick={ () => onModalOpen('newsletter') }
                                        sx={{ minWidth: 0, padding: 0 }}
                                    >
                                        <AddCircleRoundedIcon className='rounded p-1 bg-orange-600 text-white' />
                                    </Button>
                                    <Button
                                        className='opacity-80 hover:opacity-100 transition-all'
                                        sx={{ minWidth: 0, padding: 0 }}
                                    >
                                        <EditIcon className='rounded p-1 bg-purple-900 text-white'/>
                                    </Button>
                                </>
                            :   null
                        }
                    </div>
                </div>
                <div className='grid grid-cols-2 p-5'>
                    <div className='w-full h-full pt-16 pb-4 pr-6 wysiwyg gap-6 flex flex-col'>
                        {
                            newsletterPublicaciones.map((publicacion) => (
                                <CustomTarjetaPost
                                    key={JSON.stringify(publicacion)}
                                    id={ publicacion.id }
                                    titulo={ publicacion.titulo }
                                    contenido={ publicacion.contenido }
                                    descripcion={ publicacion.descripcion }
                                    fechaCreacion={ publicacion.fechaCreacion }
                                    fechaInicio={ publicacion.fechaInicio }
                                    fechaFin={ publicacion.fechaFin }
                                    fotoPublicacion={ publicacion.imagenPublicacion ? `https://dashboard.ciudadanosenmovimiento.org/api/publicacion/grupal/imagen/${publicacion.imagenPublicacion}` : fallback_url }
                                    url={ publicacion.url }
                                    post={ post }
                                    setPost={ setPost }
                                    setIsUpdate={ setIsUpdate }
                                    onModalOpen={ onEditModalOpen }
                                    editable={ editable }
                                    grupalType={ true }
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CuerpoPerfil;