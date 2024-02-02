import React, {useState, useEffect} from 'react';
import {Typography, Button, Card} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';
import CustomTarjetaPost from '@/Components/Customized/CustomComponents/CustomTarjetaPost';
import CustomRedireccionPaginas from '@/Components/Customized/CustomComponents/CustomRedireccionPaginas';
import fallback_url from './imagen-componentes.png';
import Swal from 'sweetalert2';
import CustomTarjetaMediaPerfil from '@/Components/Customized/CustomComponents/CustomTarjetaMediaPerfil';
import CustomUsuarios from '@/Components/Customized/CustomComponents/CustomUsuarios';
import axios from 'axios';
import {LazyLoadImage} from "react-lazy-load-image-component";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CuerpoPerfil = (props) => {
    const {
        listaPublicaciones,
        mediaPerfiles,
        post,
        setPost,
        user,
        isUpdate,
        setIsUpdate,
        onModalOpen,
        onEditModalOpen,
        editable,
        nombre,
        puesto,
        fotoPerfil,
        perfil,
        profile,
        seguidores,
        perfiles,
        usuarios,
        selectedProfileId,
        selectedOption,
        perfilesEnCirculo,
        perfilesGrupales,
        onComunidadRedesSocialesModalOpen,
    } = props;


    const [liderazgoPublicaciones, setLiderazgoPublicaciones] = useState([]);
    const [circuloPublicaciones, setCirculoPublicaciones] = useState([]);
    const [comunidadPublicaciones, setComunidadPublicaciones] = useState([]);
    const [publicaciones, setPublicaciones] = useState([]);
    const [selectedProfilename, setSelectedProfilename] = useState('');

    useEffect(() => {
        //console.log('Props Cuerpo Perfil: ', props);
    }, []);

    useEffect(() => {
        if (!listaPublicaciones)
            return;
        setLiderazgoPublicaciones(listaPublicaciones.filter(publicacion => publicacion.catalogoPublicacion?.id === 1));
        setCirculoPublicaciones(listaPublicaciones.filter(publicacion => publicacion.catalogoPublicacion?.id === 2));
        setComunidadPublicaciones([]
            .concat(listaPublicaciones.filter(publicacion => publicacion.catalogoPublicacion?.id === 3))
            .concat(mediaPerfiles.instagram.media.map((row, index, self) => ({
                ...row,
                username: mediaPerfiles.instagram.perfil.username,
                outterPost: true
            })).slice(0, 3))
        );
    }, [listaPublicaciones, mediaPerfiles]);

    const publicacionesGrupales = () => {
        try {
            const perfilGrupalId = parseInt(selectedOption, 10);
            const selectedProfile = perfiles.find((p1) => p1.id === perfilGrupalId);

            if (selectedProfile) {
                setSelectedProfilename(selectedProfile.nombre);
            } else {
                toast.info('No hay publicaciones para mostrar en este momento');
            }

            axios.get(route("get.publicaciones.grupales", {id: perfilGrupalId}))
                .then((response) => {
                    setPublicaciones(response.data?.response ?? []);
                })
                .catch((error) => {
                    setPublicaciones([]);
                    toast.error(`Ha ocurrido un error al obtener los datos, ${error.response?.data?.message}`);
                });
        } catch (error) {
            console.error('error en publicaciones', error);
            setPublicaciones([]);
        }
    };

    useEffect(() => {
        publicacionesGrupales();
    }, []);

    const [imageData, setImageData] = useState(null);

    return (
        <div
            className='max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 pt-[calc(25px+2vw+2vh)] pb-[calc(25px+5vw+5vh)]'
        >


            <div className='grid gap-4 grid-cols-3 max-lg:grid-cols-1 w-full'>
                <TrailAppear>
                    <div className="w-full min-h-[500px] bg-white shadow-xl mt-2 relative">
                        <div
                            className='w-full rounded-lg py-3 absolute top-[-.5rem]'
                            style={{backgroundColor: '#6b897d'}}
                        >
                            <Typography
                                variant='h3'
                                fontWeight='800'
                                className='text-white text-center'
                                style={{
                                    fontSize: 'calc(12px + .5vw)',
                                    lineHeight: 'calc(12px + .5vw)'
                                }}
                            >
                                Mi liderazgo
                            </Typography>
                        </div>

                        <div className='absolute top-0 right-2'>
                            {
                                editable
                                    ? <div className='float-right'>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            className='opacity-30 hover:opacity-100 transition-all'
                                            onClick={() => onModalOpen('liderazgo')}
                                            sx={{minWidth: '0px !important', padding: '.12rem !important'}}
                                        >
                                            <AddCircleRoundedIcon fontSize="small"/>
                                        </Button>
                                    </div>
                                    : null
                            }
                        </div>

                        <div className='w-full h-full pt-16 pb-4 pr-6 wysiwyg gap-6 flex flex-col'>
                            {
                                liderazgoPublicaciones.map(publicacion => (
                                    <CustomTarjetaPost
                                        key={JSON.stringify(publicacion)}
                                        id={publicacion.id}
                                        titulo={publicacion.titulo}
                                        contenido={publicacion.contenido}
                                        descripcion={publicacion.descripcion}
                                        fechaCreacion={publicacion.fechaCreacion}
                                        fechaInicio={publicacion.fechaInicio}
                                        fechaFin={publicacion.fechaFin}
                                        fotoPublicacion={publicacion.imagenPublicacion ? `https://dashboard.ciudadanosenmovimiento.org/api/publicacion/imagen/${publicacion.imagenPublicacion}` : fallback_url}
                                        url={publicacion.url}
                                        post={post}
                                        setPost={setPost}
                                        setIsUpdate={setIsUpdate}
                                        onModalOpen={onEditModalOpen}
                                        editable={editable}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    <div className="w-full min-h-[500px] bg-white shadow-xl mt-2 relative">
                        <div
                            className='w-full rounded-lg py-3 absolute top-[-.5rem]'
                            style={{backgroundColor: '#6b897d'}}
                        >
                            <Typography
                                variant='h3'
                                fontWeight='800'
                                className='text-white text-center'
                                style={{
                                    fontSize: 'calc(12px + .5vw)',
                                    lineHeight: 'calc(12px + .5vw)'
                                }}
                            >
                                Mi círculo
                            </Typography>
                        </div>

                        <div className='absolute top-0 right-2'>
                            {
                                editable
                                    ? <div className='flex gap-2'>
                                        {/* <Button
                                            className='opacity-70 hover:opacity-100 transition-all'
                                            // onClick={ onComunidadRedesSocialesModalOpen }
                                            sx={{ minWidth: 0, padding: 0 }}
                                        >
                                            <SettingsIcon className='rounded p-1 bg-orange-600 text-white' />
                                        </Button> */}
                                        <Button
                                            className='opacity-70 hover:opacity-100 transition-all'
                                            onClick={() => onModalOpen('circulo')}
                                            sx={{minWidth: 0, padding: 0}}
                                        >
                                            <AddCircleRoundedIcon className='rounded p-1 bg-orange-600 text-white'/>
                                        </Button>
                                    </div>
                                    : null
                            }
                        </div>

                        <div className='w-full h-full pt-16 pb-4 pr-6 wysiwyg gap-6 flex flex-col'>
                            {
                                perfilesEnCirculo.map((perfil, index) => (
                                    <div key={index}>
                                        <div
                                            className="flex-wrap  grid-cols-5 bg-slate-100 rounded-xl ml-12 mb-4 flex flex-col relative max-sm:order-last max-sm:justify-center md:flex-col">
                                            <div className='w-full h-full py-4 pl-24 pr-4 col-span-3'>
                                                <h1 className='font-black uppercase text-blackn'>{perfil.usuario?.name}</h1>
                                                <h1 style={{color: '#606060'}}>{perfil.usuario?.puesto}</h1>
                                            </div>
                                            {/*<div className='w-full my-4 text-center text-white justify-end'>*/}
                                            {/*    <button className='font-bold items-center bg-orange-400 py-1 px-4 rounded-lg'>*/}
                                            {/*        <h1> {usuarios.seguidores.length} <br/> seguidores </h1>*/}
                                            {/*    </button>*/}
                                            {/*</div>*/}

                                            <a
                                                href={`/perfil?id=${perfil.perfilSeguido?.guid}`}
                                                target={'_blank'}
                                                className="ml-auto bg-orange-400 font-bold text-white px-6 my-4 rounded -mr-4 transition-all duration-100 ease-in-out transform hover:w-20"
                                                style={{
                                                    clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%, 15% 50%)'
                                                }}
                                            >
                                                Visitar
                                            </a>

                                            <Card
                                                className='absolute w-20 h-20 bg-gray-300 z-30 top-[50%] translate-y-[-50%] left-[-0.5rem]'
                                            >
                                                <LazyLoadImage
                                                    src={`https://dashboard.ciudadanosenmovimiento.org/api/perfil/user/profile-image/${perfil.usuarioId}`}
                                                    alt="Imagen de perfil"
                                                    className='w-full h-full object-cover'
                                                    placeholderSrc={'https://public.ciudadanosenmovimiento.org/build/assets/test-9668d5a3.png'}
                                                    wrapperClassName={'w-full h-full object-cover'}
                                                />
                                            </Card>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="w-full min-h-[500px] bg-white shadow-xl mt-2 relative">
                        <div
                            className='w-full rounded-lg py-3 absolute top-[-.5rem]'
                            style={{backgroundColor: '#6b897d'}}
                        >
                            <Typography
                                variant='h3'
                                fontWeight='800'
                                className='text-white text-center'
                                style={{
                                    fontSize: 'calc(12px + .5vw)',
                                    lineHeight: 'calc(12px + .5vw)'
                                }}
                            >
                                Conóceme
                            </Typography>
                        </div>

                        <div className='absolute top-0 right-2'>
                            {
                                editable
                                    ? <div className='flex gap-2'>
                                        <Button
                                            className='opacity-70 hover:opacity-100 transition-all'
                                            onClick={onComunidadRedesSocialesModalOpen}
                                            sx={{minWidth: 0, padding: 0}}
                                        >
                                            <SettingsIcon className='rounded p-1 bg-orange-600 text-white'/>
                                        </Button>
                                        <Button
                                            className='opacity-70 hover:opacity-100 transition-all'
                                            onClick={() => onModalOpen('comunidad')}
                                            sx={{minWidth: 0, padding: 0}}
                                        >
                                            <AddCircleRoundedIcon className='rounded p-1 bg-orange-600 text-white'/>
                                        </Button>
                                    </div>
                                    : null
                            }
                        </div>

                        <div className='w-full h-full pt-16 pb-4 pr-6 wysiwyg gap-6 flex flex-col'>
                            {
                                comunidadPublicaciones.map(publicacion => {
                                    if (publicacion.outterPost && publicacion.outterPost === true)
                                        return (
                                            <CustomTarjetaMediaPerfil
                                                key={JSON.stringify(publicacion)}
                                                id={publicacion.id}
                                                caption={publicacion.caption}
                                                mediaUrl={publicacion.media_url}
                                                username={publicacion.username}
                                                media="instagram"
                                            />
                                        )
                                    else {
                                        return (
                                            <CustomTarjetaPost
                                                key={JSON.stringify(publicacion)}
                                                id={publicacion.id}
                                                titulo={publicacion.titulo}
                                                contenido={publicacion.contenido}
                                                descripcion={publicacion.descripcion}
                                                fechaCreacion={publicacion.fechaCreacion}
                                                fechaInicio={publicacion.fechaInicio}
                                                fechaFin={publicacion.fechaFin}
                                                fotoPublicacion={publicacion.imagenPublicacion ? `https://dashboard.ciudadanosenmovimiento.org/api/publicacion/imagen/${publicacion.imagenPublicacion}` : fallback_url}
                                                url={publicacion.url}
                                                post={post}
                                                setPost={setPost}
                                                setIsUpdate={setIsUpdate}
                                                onModalOpen={onEditModalOpen}
                                                editable={editable}
                                            />
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </TrailAppear>
            </div>

            <div className="flex border-b mt-5">
                <div className='bg-fuchsia-600 text-white font-bold p-2 px-6 rounded-lg mr-2'>
                    <p>{selectedProfilename}</p>
                </div>
            </div>

            <div className="w-full h-full py-10 pr-6 wysiwyg gap-6 flex flex-col bg-white shadow-xl">
                {
                    publicaciones.map(publicacion => (
                        <CustomTarjetaPost
                            className="py-10 m-40"
                            key={JSON.stringify(publicacion)}
                            id={publicacion.id}
                            titulo={publicacion.titulo}
                            contenido={publicacion.contenido}
                            descripcion={publicacion.descripcion}
                            fechaCreacion={publicacion.fechaCreacion}
                            fotoPublicacion={publicacion.imagenPublicacion ? `https://dashboard.ciudadanosenmovimiento.org/api/publicacion/grupal/imagen/${publicacion.imagenPublicacion}` : fallback_url}
                            url={publicacion.url}
                        />
                    ))
                }
            </div>

            <CustomRedireccionPaginas/>
        </div>
    );
};

export default CuerpoPerfil;

