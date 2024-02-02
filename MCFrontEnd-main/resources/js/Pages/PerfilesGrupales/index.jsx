import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Button, CircularProgress, TextField, Container, InputAdornment } from '@mui/material';
import { Head, Link } from '@inertiajs/react';
import CustomLayout from '@/Layouts/CustomLayout';
import EncabezadoPerfil from '@/Pages/PerfilesGrupales/EncabezadoPerfil';
import CuerpoPerfil from '@/Pages/PerfilesGrupales/CuerpoPerfil';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';
import CustomTinyMCE from '@/Components/Customized/CustomComponents/CustomTinyMCE';
import usePost from '@/Pages/Perfiles/Hooks/usePost';
import NumberedCircle from '@/Components/Customized/CustomComponents/NumberedCircle';
import { CustomDatePicker } from '@/Components/Customized/CustomComponents/CustomDatePicker';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Instagram as InstagramIcon, Twitter as TwitterIcon, WhatsApp as WhatsAppIcon, LinkedIn as LinkedInIcon  } from '@mui/icons-material';
import Swal from 'sweetalert2';
import axios from 'axios';
import dayjs from 'dayjs';

const OverlayMenu = (props) => {
    const {children, className, onClick } = props;

    return (
        <div onClick={ onClick } className={`fixed z-50 h-screen w-full flex justify-center items-center top-0 ${className} bg-[rgba(0,0,0,0.5)]`}>
            { children }
        </div>
    );
};

const index = (props) => {
    const { auth: { user } } = props;
    const { perfilGrupal } = props;
    const profile = user?.perfil_data ?? {};
    const profileTag = user?.perfil_grupal_tagged_in ?? "";

    const [nombre, setNombre] = useState(perfilGrupal?.perfilGrupal?.alias ?? 'Nombre en construcción');
    const [frase, setFrase] = useState(perfilGrupal?.perfilGrupal?.frase ?? '');

    //VideoURL videos
    const [urlVideoPrincipal, setUrlVideoPrincipal] = useState(perfilGrupal?.perfilGrupal?.urlVideoPrincipal ?? '');
    const [error, setError]=useState({
        error:false,
        message:""
    })

    // Datos del usuario
    const [nameFormularioEditar, setNameFormularioEditar] = useState(perfilGrupal?.perfilGrupal?.alias ?? 'Nombre en construcción');
    const [fraseFormularioEditar, setFraseFormularioEditar] = useState(perfilGrupal?.perfilGrupal?.frase ?? '');

    const [seguidores, setSeguidores] = useState(perfilGrupal?.seguidores ?? []);
    const [eventos, setEventos] = useState(perfilGrupal?.eventos ?? []);

    const [following, setFollowing] = useState(null);

    const [openingModal, setOpeningModal] = useState(false);
    const [typeModal, setTypeModal] = useState(0);
    const [loadingEditor, setLoadingEditor] = useState(true);
    const [loadingPublicaciones, setLoadingPublicaciones] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const [listaPublicaciones, setListaPublicaciones] = useState([]);
    const [catalogoPublicacionPerfilGrupal, setCatalogoPublicacionPerfilGrupal] = useState(null);

    const { post, setPost, postInit } = usePost();
    const { id, titulo, fechaInicio, fechaFin, descripcion, contenido, urlMovimientoSocial, imagenPublicacion } = post;
    const [imagenPortadaPublicacion, setImagenPortadaPublicacion] = useState(null);

    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        const publicaciones = async () => {
            const response = await axios.get(route('get.publicaciones.grupal', perfilGrupal.perfilGrupal.id));
            setListaPublicaciones(response.data.response);
            setLoadingPublicaciones(false);
        };

        publicaciones();
    }, []);

    /** IG media */
    const [mediaPerfiles, setMediaPerfiles] = useState({
        instagram: { perfil: {}, media: [] }
    });
    const [isLoadingInstagram, setIsLoadingInstagram] = useState(true);

    const agregarIgPublicacion = useCallback((nuevaPublicacion) => {
        setMediaPerfiles((perfilesExistentes) => {
            const { instagram } = perfilesExistentes;
            const { media } = instagram;
            return { ...perfilesExistentes, instagram: { ...instagram, media: [ ...media, nuevaPublicacion ] } };
        });
    }, [setMediaPerfiles]);

    useEffect(() => {
        const fetchInstagramData = async () => {
            const response = await axios.get(route('get.token', { perfil: perfilGrupal.perfilGrupal.id, tokentype: 3 }));

            if (response.status !== 200 || !response.data.success)
                return setIsLoadingInstagram(false);

            let instagramToken = null;
            try {
                instagramToken = JSON.parse(response.data.response.stringifiedToken);
            } catch (error) {}

            if (!instagramToken)
                return setIsLoadingInstagram(false);

            try {
                const instagramShortLivedToken = instagramToken?.shortLivedToken;
                const instagramLongLivedToken = instagramToken?.longLivedToken;

                const userId = instagramShortLivedToken.user_id;
                const accessToken = instagramLongLivedToken.access_token

                const profileDataRequestResponse = await axios.get(`https://graph.instagram.com/${userId}?access_token=${accessToken}&fields=account_type,username,media_count`);
                setMediaPerfiles((perfilesExistentes) => {
                    const { instagram } = perfilesExistentes;
                    return { ...perfilesExistentes, instagram: { ...instagram, perfil: profileDataRequestResponse.data } };
                });

                const mediaIdListRequestResponse = await axios.get(`https://graph.instagram.com/${userId}/media?access_token=${accessToken}&fields=id,timestamp`);

                mediaIdListRequestResponse.data.data.forEach(async ({id}) => {
                    const mediaDataRequestResponse = await axios.get(`https://graph.instagram.com/${id}?access_token=${accessToken}&fields=media_url,media_type,caption`);
                    agregarIgPublicacion(mediaDataRequestResponse.data);
                });
            } finally {
                setIsLoadingInstagram(false);
            }
        };

        fetchInstagramData();
    }, []);

    useEffect(() => {
        const followage = async () => {
            const body = { seguidoId: perfilGrupal.perfilGrupal.id };

            const formData = new FormData();
            formData.append('data', JSON.stringify(body));

            const response = await axios.post(route('post.perfil.grupal.followage'), formData);
            setFollowing(response.data.response);
        };

        followage();
    }, []);

    const handleEditorInit = () => {
        setLoadingEditor(false);
    };

    const handleModalOpen = (state) => {
        setTypeModal(1);
        setPost(postInit);
        setIsUpdate(false);
        switch (state) {
            case 'social': setCatalogoPublicacionPerfilGrupal(1); break;
            case 'trabajo': setCatalogoPublicacionPerfilGrupal(2); break;
            case 'reciente': setCatalogoPublicacionPerfilGrupal(3); break;
            case 'eventos': setCatalogoPublicacionPerfilGrupal(4); break;
            case 'cursos': setCatalogoPublicacionPerfilGrupal(5); break;
            case 'newsletter': setCatalogoPublicacionPerfilGrupal(6); break;
        }
        setOpeningModal((previousState) => !previousState);
    };

    const handleModalClose = () => {
        setTimeout(() => {
            setTimeout(() => {
                setTypeModal(0);
                setOpeningModal((previousState) => !previousState);
            }, 350);
            document
                .querySelector('.overlay')
                .classList
                .add('disappear');
        }, 50);

        document
            .querySelector('.overlay')
            .classList
            .remove('appear');
    };

    const handleSubmitMovimientoSocial = async () => {
        setIsLoading(true);
        const publicacion = {
            titulo,
            descripcion:titulo,
            contenido: '<p>'+titulo+'<p>',
            fechaInicio: fechaInicio.toISOString(),
            fechaFin: fechaFin.toISOString(),
            urlMovimientoSocial: post.urlMovimientoSocial,
            catalogoPublicacionPerfilGrupalId: catalogoPublicacionPerfilGrupal
        };

        try {
            const response = isUpdate
            ? await axios.put(route('put.publicacion.grupal', { id }), { data: JSON.stringify(publicacion) })
            : await axios.post(route('post.publicacion.grupal'), { data: JSON.stringify(publicacion) })

            setIsLoading(false);

            if (response.status !== 200 || !response.data.success)
                return Swal.fire({
                    title: `La publicación no ha podido ser ${ isUpdate ? 'actualizada' : 'creada' }. Por favor, inténtalo más tarde.`,
                    text: response.data["message"],
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });

            await Swal.fire({
                title: `Publicación ${ isUpdate ? 'actualizada' : 'creada' }`,
                text: response.data["message"],
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });
            handleModalClose();
        } catch (err) {
            if (err?.response?.status === 419)
                    await Swal.fire({
                    text: `Tu sesión ha expirado. Por favor, vuelve a iniciar sesión`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });
        } finally {
            window.location.reload();
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', new Blob([imagenPortadaPublicacion]));

        let responseRutaImagen = '';

        try {
            responseRutaImagen = await axios.post(route('post.publicacion.portada.imagen'), formData);
        } catch (err) {

        }

        setIsLoading(true)
        const publicacion = {
            titulo,
            descripcion,
            contenido,
            fechaInicio: fechaInicio.toISOString(),
            fechaFin: fechaFin.toISOString(),
            catalogoPublicacionPerfilGrupalId: catalogoPublicacionPerfilGrupal,
            imagenPublicacion: responseRutaImagen?.data?.response ?? ''
        };

        try {
            const response = isUpdate
            ? await axios.put(route('put.publicacion.grupal', { id }), { data: JSON.stringify(publicacion) })
            : await axios.post(route('post.publicacion.grupal'), { data: JSON.stringify(publicacion) })
            setIsLoading(false);
            if (response.status !== 200 || !response.data.success)
                return Swal.fire({
                    title: `La publicación no ha podido ser ${ isUpdate ? 'actualizada' : 'creada' }. Por favor, inténtalo más tarde.`,
                    text: response.data["message"],
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });

            await Swal.fire({
                title: `Publicación ${ isUpdate ? 'actualizada' : 'creada' }`,
                text: response.data["message"],
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });

            handleModalClose();
        } catch (err) {
            if (err?.response?.status === 419)
                await Swal.fire({
                    text: `Tu sesión ha expirado. Por favor, vuelve a iniciar sesión`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });
        } finally {

            window.location.reload();
        }
    };

    const handleUrlVideo = async () => {
        setIsLoading(true);

        const datosUrlVideo = {
            urlVideoPrincipal : urlVideoPrincipal
        };

        try {
            const response = await axios.put(route('put.editar.urlvideo'), { data: JSON.stringify(datosUrlVideo) })

            setIsLoading(false);

            if (response.status !== 200 || !response.data.success)
                return Swal.fire({
                    title: `La publicación no ha podido ser actualizada. Por favor, inténtalo más tarde.`,
                    text: response.data["message"],
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });

            await Swal.fire({
                title: `Publicación actualizada`,
                text: response.data["message"],
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });

            handleModalClose();
        } catch (err) {
            if (err?.response?.status === 419)
                await Swal.fire({
                    text: `Tu sesión ha expirado. Por favor, vuelve a iniciar sesión`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });
        } finally {

            window.location.reload();
        }
    };

    const handleDatosPerfilGrupal = async () => {
        setIsLoading(true);

        const datosPerfil = {
            alias : nameFormularioEditar,
            frase: fraseFormularioEditar,
            url : nameFormularioEditar,
        };

        try {
            const response = await axios.put(route('put.perfil.grupal.editar'), { data: JSON.stringify(datosPerfil) });
            const responseRrss = await handleRedesSocialesGrupal();
            setIsLoading(false);

            if ((response.status !== 200 || !response.data.success) && responseRrss)
                return Swal.fire({
                    title: `La publicación no ha podido ser actualizada. Por favor, inténtalo más tarde.`,
                    text: response.data["message"],
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });

            await Swal.fire({
                title: `Publicación actualizada`,
                text: response.data["message"],
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });

            handleModalClose();
        } catch (err) {
            console.error(err)
            if (err?.response?.status === 419)
                await Swal.fire({
                    text: `Tu sesión ha expirado. Por favor, vuelve a iniciar sesión`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });
        } finally {

            window.location.reload();
        }
    };

    //INICIO PRUEBA RRSS
    const [urlFacebook, setUrlFacebook] = useState('');
    const [urlInstagram, setUrlInstagram] = useState('');
    const [urlTwitter, setUrlTwitter] = useState('');
    const [urlTiktok, setUrlTiktok] = useState('');
    const [urlWhatsapp, setUrlWhatsapp] = useState('');
    const [urlLinkedin,setUrlLinkedin] = useState('');

    useEffect(() => {
        perfilGrupal?.perfilGrupalCatalogoRedesSociales?.forEach(item => {
          switch (item.catalogoRedesSocialesId) {
            case 1: // Facebook
              setUrlFacebook(item.url);
              break;
            case 2: // Instagram
              setUrlInstagram(item.url);
              break;
            case 3: // Twitter
              setUrlTwitter(item.url);
              break;
            case 4: // Tiktok
              setUrlTiktok(item.url);
              break;
            case 5: // Whatsapp
              setUrlWhatsapp(item.url);
              break;
            case 6: // LinkedIn
              setUrlLinkedin(item.url);
              break;
            default:
              // Si tienes más tipos de redes sociales, puedes manejarlos aquí
              break;
          }
        });
    }, []);

    const redesSociales = {
        urlFacebook: 1,
        urlInstagram: 2,
        urlTwitter: 3,
        urlTiktok: 4,
        urlWhatsapp: 5,
        urlLinkedin: 6
    };

    const handleRedesSocialesGrupal = async () => {
        setIsUpdate(true);
        const datosRedesSociales = [];
        const redesSocialesEstados = { urlFacebook, urlInstagram, urlTwitter, urlTiktok,
                                        urlWhatsapp, urlLinkedin };
        Object.entries(redesSocialesEstados).forEach(([key, value]) => {
            //if (value) {
                datosRedesSociales.push({
                catalogoRedesSocialesId: redesSociales[key],
                url: value !== undefined ? value: null
                });
            //}
        });
        try{
            const formData = new FormData();
            formData.append('data', JSON.stringify(datosRedesSociales));
            console.log(formData);
            const response = await axios.post(route('post.rrss.perfil.grupal'), formData);
            console.log({response});
            if (response.status !== 200 || !response.data.success)
                return false;
            return true;
        }catch(err) {
            return false;
        }
    }
    //FIN PRUEBA



    const handleVideoUrlChange = (event) => {
        const { value } = event.target;
        const regex = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
        const match = value.match(regex);
        // Expresión regular para extraer la URL del atributo src del elemento iframe
        //const regexSrc = /src="([^"]+)"/;
        //const match = value.match(regexSrc);

        //let urlVideoPrincipal = '';
        //if (match && match[1]) {
        //   urlVideoPrincipal = match[1];
        //}
        if (match && match[1]) {
            const videoId = match[1];
            const playlistParamIndex = value.indexOf('&list=');

            if (playlistParamIndex === -1) {
              setUrlVideoPrincipal(`https://www.youtube.com/embed/${videoId}`);
            }else{
                setUrlVideoPrincipal(`https://www.youtube.com/embed/${videoId}?playlist=${videoId}`)
            }
        }else{
        setUrlVideoPrincipal('');
        }
    };

    return (
        <CustomLayout
            visible={ true }
            openingModal={ openingModal }
            user={ user }
        >
            <ParticlesLinks color="#FF8300" />
            <Head title={nombre} />

            <Box className='w-full relative z-30'>
                <EncabezadoPerfil
                    onFormularioEditarModalOpen={() => {
                        setTypeModal(2);
                        setOpeningModal((previousState) => !previousState)
                    }}
                    onFotoEditarModalOpen={() => {
                        setTypeModal(3);
                        setOpeningModal((previousState) => !previousState)
                    }}
                    onFotoPortadaEditarModalOpen={() => {
                        setTypeModal(7);
                        setOpeningModal((previousState) => !previousState)
                    }}
                    onFollowersModalOpen={() => {
                        setTypeModal(8);
                        setOpeningModal((previousState) => !previousState)
                    }}
                    nombre={ nombre }
                    frase={ frase }
                    seguidores={ seguidores }
                    eventos={ eventos }
                    editable={ perfilGrupal.perfilGrupal.guid == profileTag}
                    followed={ following }
                    profile={ profile }
                    perfilGrupal={ perfilGrupal }
                    profileTag={ profileTag }
                    urlFacebook = {urlFacebook}
                    urlInstagram = {urlInstagram}
                    urlTwitter = {urlTwitter}
                    urlTiktok = {urlTiktok}
                    urlWhatsapp = {urlWhatsapp}
                    urlLinkedin = {urlLinkedin}
                />
            </Box>

            <Box className='w-full relative z-30'>
                {
                    !loadingPublicaciones
                    ?   <CuerpoPerfil
                            onEditModalOpen={() => {
                                setTypeModal(1);
                                setOpeningModal((previousState) => !previousState)
                            }}
                            onModalOpen={ handleModalOpen }
                            listaPublicaciones={ listaPublicaciones }
                            mediaPerfiles = { mediaPerfiles }
                            post={ post }
                            setPost={ setPost }
                            isUpdate={ isUpdate }
                            setIsUpdate={ setIsUpdate }
                            urlVideoPrincipal = {urlVideoPrincipal}
                            perfilGrupal={ perfilGrupal }
                            onUrlVideoPrincipalEditarModalOpen={() => {
                                setTypeModal(4);
                                setOpeningModal((previousState) => !previousState)
                            }}
                            onMovimientoSocialModalOpen={
                                ()=>{
                                    setTypeModal(5);
                                    setCatalogoPublicacionPerfilGrupal(1);
                                    setIsUpdate(false);
                                    setPost({
                                        id: null,
                                        titulo: '',
                                        fechaInicio: dayjs(new Date()),
                                        fechaFin: dayjs(new Date()),
                                        descripcion: '',
                                        urlMovimientoSocial: ''
                                    });
                                    setOpeningModal((previousState)=>!previousState)
                                }
                            }
                            onEditarMovimientoSocialModalOpen= {
                                ()=>{
                                    setTypeModal(5);
                                    setCatalogoPublicacionPerfilGrupal(1);
                                    setOpeningModal((previousState)=>!previousState)
                                }
                            }
                            onRecienteRedesSocialesModalOpen = {() => {
                                setTypeModal(6);
                                setOpeningModal((previousState) => !previousState);
                            }}
                            editable={ perfilGrupal.perfilGrupal.guid == profileTag }
                        />
                    :   null
                }
            </Box>

            {
                openingModal && typeModal === 1
                ?   <OverlayMenu
                        className='overlay appear max-md:px-0 px-4'
                        onClick={ handleModalClose }
                    >
                        <div
                            className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="top-2 right-2 absolute flex items-center">
                                <button
                                    onClick={ handleModalClose }
                                    className="inline-flex fixed top-4 right-4 items-center justify-center p-0 rounded-md max-md:text-gray-600 text-white transition duration-150 ease-in-out"
                                >
                                    <svg className="h-9 w-9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className='inline-flex'
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className='h-full flex gap-4 flex-col'>
                                <Container
                                    className='p-[20px] ml-auto mr-auto'
                                    maxWidth={'lg'}
                                >
                                    <div className='subtitles w-full text-center'>
                                        Movimiento Ciudadano
                                    </div>

                                    <div className='titles w-full text-center break-words text-mc text-black'>
                                        <span className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                            ¿Qué quieres { isUpdate ? 'actualizar' : 'compartir' }?
                                        </span>
                                    </div>

                                </Container>
                                <NumberedCircle number={1}/>
                                <div className='grid grid-cols-2 gap-4 max-md:grid-cols-1'>
                                    <div className='h-full flex gap-4 flex-col'>
                                        <TextField
                                            label="Título de la publicación"
                                            name="titulo"
                                            color="primary"
                                            value={ titulo }
                                            onChange={(event) => {
                                                setPost({
                                                    ...post,
                                                    titulo: event.target.value
                                                });
                                            }}
                                        />
                                        <TextField
                                            label="Agrega una descripción corta de presentación"
                                            name="descripcion"
                                            color="primary"
                                            value={ descripcion }
                                            onChange={(event) => {
                                                setPost({
                                                    ...post,
                                                    descripcion: event.target.value
                                                });
                                            }}
                                        />
                                        <Box className='grid gap-4 max-sm:grid-cols-1 grid-cols-2'>
                                            <Box className='flex flex-col gap-4'>
                                                <CustomDatePicker
                                                    className='tracking-tight'
                                                    label="¿Cuándo quieres que aparezca la publicación?"
                                                    name="fechaInicio"
                                                    inputFormat="DD/MM/YYYY"
                                                    color="primary"
                                                    value={ fechaInicio }
                                                    onChange={(newValue) => {
                                                        setPost({
                                                            ...post,
                                                            fechaInicio: newValue
                                                        });
                                                    }}
                                                />
                                            </Box>
                                            <Box className='flex flex-col gap-4'>
                                                <CustomDatePicker
                                                    className='tracking-tight'
                                                    label="¿Y cuándo debería dejar de aparecer la publicación?"
                                                    name="fechaFin"
                                                    inputFormat="DD/MM/YYYY"
                                                    color="primary"
                                                    value={ fechaFin }
                                                    onChange={(newValue) => {
                                                        setPost({
                                                            ...post,
                                                            fechaFin: newValue
                                                        });
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </div>

                                    <div className='h-full flex gap-4 flex-col md:border-l-[0.3px] md:border-solid md:border-[#eee] md:pl-4'>
                                        <div className='w-full flex items-center justify-center shrink-0 flex-grow rounded-full overflow-hidden'>
                                            <img src={ imagenPublicacion } alt="" className='max-h-36'/>
                                        </div>
                                        <Button variant="contained" color="primary" component="label" fullWidth>
                                            Elegir foto de publicación

                                            <input
                                                type="file"
                                                hidden
                                                onChange={async (event) => {
                                                    const file = await (() => {
                                                        return new Promise((resolve, reject) => {
                                                            const fileReader = new FileReader();
                                                            fileReader.onload = event => resolve(event.target.result);
                                                            fileReader.onerror = error => reject(error);
                                                            fileReader.readAsArrayBuffer(event.target.files[0]);
                                                        });
                                                    })();

                                                    const base64Image = btoa(
                                                        new Uint8Array(file).reduce(
                                                            (data, byte) => data + String.fromCharCode(byte),
                                                            ''
                                                        )
                                                    );

                                                    const imageDataUrl = `data:image/jpeg;base64,${base64Image}`;
                                                    setPost({ ...post, imagenPublicacion: imageDataUrl });
                                                    setImagenPortadaPublicacion(file);
                                                }}
                                            />
                                        </Button>
                                    </div>
                                </div>
                                <NumberedCircle number={2}/>
                                <CustomTinyMCE
                                    value={ contenido }
                                    onEditorChange={(newValue) => {
                                        setPost({
                                            ...post,
                                            contenido: newValue
                                        });
                                    }}
                                    onInit={ handleEditorInit }
                                    onUpload={(blobInfo, progress) => new Promise(async (resolve, reject) => {
                                        const formData = new FormData();
                                        formData.append('file', blobInfo.blob());

                                        try {
                                            const response = await axios.post(route('post.publicacion.grupal.imagen'), formData);

                                            if (response.status !== 200 || !response.data.success)
                                                return reject('Hubo un error. Por favor, vuelve a intentarlo más tarde');

                                            const rutaResponse = await axios.get(route('get.publicacion.grupal.imagen', response.data.response.directorio));

                                            resolve(rutaResponse.data);
                                        } catch (err) {
                                            if (err?.response?.status === 419)
                                                reject('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión');
                                        }
                                    })}
                                    className='rounded-none'
                                />
                                {
                                    loadingEditor &&
                                    <div className='absolute w-full h-full flex justify-center items-center bg-white'>
                                        <CircularProgress color='primary'/>
                                    </div>
                                }
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={ handleSubmit }
                                >
                                    {
                                        isLoading ? (<CircularProgress size={24} color="inherit" />)
                                        : (isUpdate ? 'Actualizar' : 'Publicar' )
                                    }
                                </Button>
                            </div>
                        </div>

                    </OverlayMenu>
                :   null
            }

            {
                openingModal && typeModal === 2
                ?   <OverlayMenu
                        className='overlay appear max-md:px-0 px-4'
                        onClick={ handleModalClose }
                    >
                        <div
                            className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="top-2 right-2 absolute flex items-center">
                                <button
                                    onClick={ handleModalClose }
                                    className="inline-flex fixed top-4 right-4 items-center justify-center p-0 rounded-md max-md:text-gray-600 text-white transition duration-150 ease-in-out"
                                >
                                    <svg className="h-9 w-9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className='inline-flex'
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className='h-full flex gap-4 flex-col'>

                                <Container
                                    className='p-[20px] ml-auto mr-auto'
                                    maxWidth={'lg'}
                                >
                                    <div className='subtitles w-full text-center'>
                                        Movimiento Ciudadano
                                    </div>

                                    <div className='titles w-full text-center break-words text-mc text-black'>
                                        <span className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                            Elige qué vas a cambiar
                                        </span>
                                    </div>
                                </Container>

                                <div className='flex flex-col gap-4'>
                                    <NumberedCircle number={1}/>
                                    <TextField
                                        label="Nombre"
                                        color="primary"
                                        value={ nameFormularioEditar }
                                        onChange={(event) => setNameFormularioEditar(event.target.value)}
                                    />
                                    <TextField
                                        label="Frase"
                                        color="primary"
                                        value={ fraseFormularioEditar }
                                        onChange={(event) => setFraseFormularioEditar(event.target.value)}
                                    />
                                    <TextField
                                            label="Facebook"
                                            color="primary"
                                            value={urlFacebook }
                                            placeholder = "Ejemplo: https://www.facebook.com/profile.php?id=ejemplo"
                                            onChange={(event) => setUrlFacebook(event.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <FacebookIcon sx={{ color: '#1877F2' }}/>
                                                  </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <TextField
                                            label="Instagram"
                                            color="primary"
                                            placeholder="Ejemplo: https://www.instagram.com/ejemplo/"
                                            value={ urlInstagram }
                                            onChange={(event) => setUrlInstagram(event.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <InstagramIcon sx={{ color: '#C13584' }} />
                                                  </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <TextField
                                            label="Twitter"
                                            color="primary"
                                            placeholder="Ejemplo: https://twitter.com/ejemplo"
                                            value={ urlTwitter }
                                            onChange={(event) => setUrlTwitter(event.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <TwitterIcon sx={{ color: '#1DA1F2' }} />
                                                  </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <TextField
                                            label="Tiktok"
                                            color="primary"
                                            placeholder="Ejemplo: https://www.tiktok.com/@ejemplo?_t=8eHssNtnWOk&_r=1"
                                            value={ urlTiktok }
                                            onChange={(event) => setUrlTiktok(event.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    {/* <TiktokIcon sx={{ color: '#69c9d0' }} /> */}
                                                  </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <TextField
                                            label="Whatsapp"
                                            color="primary"
                                            placeholder="Ingrese el número de teléfono"
                                            value={urlWhatsapp && urlWhatsapp.replace('https://wa.me/', '') }
                                            onChange={
                                                (event) => {
                                                    const numeroTelefono = event.target.value;
                                                    const hasHttps = numeroTelefono.includes('https://wa.me/');
                                                    if (!hasHttps) {
                                                      setUrlWhatsapp(`https://wa.me/${numeroTelefono}`);
                                                    } else {
                                                      setUrlWhatsapp(numeroTelefono);
                                                    }
                                                  }
                                            }
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <WhatsAppIcon  sx={{ color: 'green' }}/>
                                                  </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <TextField
                                            label="LinkedIn"
                                            color="primary"
                                            placeholder="Ejemplo: www.linkedin.com/in/ejemplo-b50070197"
                                            value={ urlLinkedin }
                                            onChange={(event) => setUrlLinkedin(
                                                event.target.value.trim() === '' ? '' :
                                                event.target.value.trim().startsWith('https://') ?
                                                event.target.value.trim() : 'https://' + event.target.value.trim())
                                            }
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <LinkedInIcon sx={{ color: '#0e76a8' }}/>
                                                  </InputAdornment>
                                                ),
                                            }}
                                        />
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={ handleDatosPerfilGrupal }
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        "Actualizar"
                                    )}
                                    </Button>
                                </div>

                            </div>

                        </div>

                    </OverlayMenu>
                :   null
            }

            {
                openingModal && typeModal === 3
                ?   <OverlayMenu
                        className='overlay appear max-md:px-0 px-4'
                        onClick={ handleModalClose }
                    >
                        <div
                            className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="top-2 right-2 absolute flex items-center">
                                <button
                                    onClick={ handleModalClose }
                                    className="inline-flex fixed top-4 right-4 items-center justify-center p-0 rounded-md max-md:text-gray-600 text-white transition duration-150 ease-in-out"
                                >
                                    <svg className="h-9 w-9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className='inline-flex'
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className='h-full flex gap-4 flex-col'>

                                <Container
                                    className='p-[20px] ml-auto mr-auto'
                                    maxWidth={'lg'}
                                >
                                    <div className='subtitles w-full text-center'>
                                        Movimiento Ciudadano
                                    </div>

                                    <div className='titles w-full text-center break-words text-mc text-black'>
                                        <span className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                            Elige tu nueva foto de perfil
                                        </span>
                                    </div>
                                </Container>

                                <Button variant="contained" color="primary" component="label">
                                    Elegir foto

                                    <input
                                        type="file"
                                        hidden
                                        onChange={async (event) => {

                                            const file = await (() => {
                                                return new Promise((resolve, reject) => {
                                                    const fileReader = new FileReader();
                                                    fileReader.onload = event => resolve(new Blob([event.target.result]));
                                                    fileReader.onerror = error => reject(error);
                                                    fileReader.readAsArrayBuffer(event.target.files[0]);
                                                });
                                            })();

                                            const formData = new FormData();
                                            formData.append('file', file);

                                            try {
                                                const response = await axios.post(route('post.perfil.grupal.foto'), formData);

                                                if (response.status !== 200)
                                                    return Swal.fire({
                                                        text: `La foto de perfil no ha podido ser actualizada. Por favor, inténtalo más tarde.`,
                                                        icon: 'info',
                                                        confirmButtonText: 'Aceptar',
                                                    });

                                                await Swal.fire({
                                                    text: `Foto de perfil actualizada`,
                                                    icon: 'success',
                                                    confirmButtonText: 'Aceptar',
                                                });
                                            } catch (err) {
                                                console.error(err)
                                                if (err?.response?.status === 419)
                                                    await Swal.fire({
                                                        text: `Tu sesión ha expirado. Por favor, vuelve a iniciar sesión`,
                                                        icon: 'info',
                                                        confirmButtonText: 'Aceptar',
                                                    });

                                                await Swal.fire({
                                                    text: `Error: ${JSON.stringify(err)}`,
                                                    icon: 'info',
                                                    confirmButtonText: 'Aceptar',
                                                });
                                            } finally {

                                                window.location.reload();
                                            }

                                        }}
                                    />
                                </Button>

                            </div>

                        </div>

                    </OverlayMenu>
                :   null
            }

{
                openingModal && typeModal === 4
                ?   <OverlayMenu
                        className='overlay appear max-md:px-0 px-4'
                        onClick={ handleModalClose }
                    >
                        <div
                            className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="top-2 right-2 absolute flex items-center">
                                <button
                                    onClick={ handleModalClose }
                                    className="inline-flex fixed top-4 right-4 items-center justify-center p-0 rounded-md max-md:text-gray-600 text-white transition duration-150 ease-in-out"
                                >
                                    <svg className="h-9 w-9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className='inline-flex'
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className='h-full flex gap-4 flex-col'>

                                <Container
                                    className='p-[20px] ml-auto mr-auto'
                                    maxWidth={'lg'}
                                >
                                    <div className='subtitles w-full text-center'>
                                        Movimiento Ciudadano
                                    </div>

                                    <div className='titles w-full text-center break-words text-mc text-black'>
                                        <span className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                            Ingrese el enlace del video
                                        </span>
                                    </div>
                                </Container>
                                <TextField
                                    type="text"
                                    label="Enlace del video"
                                    variant="outlined"
                                    helperText="Ingrese un enlace válido del video"
                                    fullWidth
                                    value={urlVideoPrincipal}
                                    onChange={handleVideoUrlChange}
                                />
                                 <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={ handleUrlVideo }
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        "Actualizar"
                                    )}
                                    </Button>
                            </div>

                        </div>

                    </OverlayMenu>
                :   null
            }

            {
                openingModal && typeModal === 5
                ?   <OverlayMenu
                        className='overlay appear max-md:px-0 px-4'
                        onClick={ handleModalClose }
                    >
                        <div
                            className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="top-2 right-2 absolute flex items-center">
                                <button
                                    onClick={ handleModalClose }
                                    className="inline-flex fixed top-4 right-4 items-center justify-center p-0 rounded-md max-md:text-gray-600 text-white transition duration-150 ease-in-out"
                                >
                                    <svg className="h-9 w-9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className='inline-flex'
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className='h-full flex gap-4 flex-col'>
                                <Container
                                    className='p-[20px] ml-auto mr-auto'
                                    maxWidth={'lg'}
                                >
                                    <div className='subtitles w-full text-center'>
                                        Movimiento Ciudadano
                                    </div>

                                    <div className='titles w-full text-center break-words text-mc text-black'>
                                        <span className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                            ¿Qué quieres { isUpdate ? 'actualizar' : 'compartir' }?
                                        </span>
                                    </div>

                                </Container>
                                <NumberedCircle number={1}/>
                                <TextField
                                    label="Título de la publicación"
                                    name="titulo"
                                    color="primary"
                                    value={ titulo }
                                    onChange={(event) => {
                                        setPost({
                                            ...post,
                                            titulo: event.target.value
                                        });
                                    }}
                                />
                                <Box className='grid gap-4 max-sm:grid-cols-1 grid-cols-2'>
                                    <Box className='flex flex-col gap-4'>
                                        <CustomDatePicker
                                            className='tracking-tight'
                                            label="¿Cuándo quieres que aparezca la publicación?"
                                            name="fechaInicio"
                                            inputFormat="DD/MM/YYYY"
                                            color="primary"
                                            value={ fechaInicio }
                                            onChange={(newValue) => {
                                                setPost({
                                                    ...post,
                                                    fechaInicio: newValue
                                                });
                                            }}
                                        />
                                    </Box>
                                    <Box className='flex flex-col gap-4'>
                                        <CustomDatePicker
                                            className='tracking-tight'
                                            label="¿Y cuándo debería dejar de aparecer la publicación?"
                                            name="fechaFin"
                                            inputFormat="DD/MM/YYYY"
                                            color="primary"
                                            value={ fechaFin }
                                            onChange={(newValue) => {
                                                setPost({
                                                    ...post,
                                                    fechaFin: newValue
                                                });
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <NumberedCircle number={2}/>
                                <TextField
                                    label="Agrega URL movimiento social"
                                    name="urlMovimientoSocial"
                                    color="primary"
                                    value={ urlMovimientoSocial }
                                    onChange={(event) => {
                                        setPost({
                                            ...post,
                                            urlMovimientoSocial: event.target.value
                                     });
                                    }}
                                />
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={ handleSubmitMovimientoSocial }
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                    disabled={isLoading}
                                >
                                    {
                                        isLoading ? (<CircularProgress size={24} color="inherit" />)
                                        : (isUpdate ? 'Actualizar' : 'Publicar' )
                                    }
                                </Button>
                            </div>
                        </div>

                    </OverlayMenu>
                :   null
            }

            {
                openingModal && typeModal === 6
                ?   <OverlayMenu
                        className='overlay appear max-md:px-0 px-4'
                        onClick={ handleModalClose }
                    >
                        <div
                            className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="top-2 right-2 absolute flex items-center">
                                <button
                                    onClick={ handleModalClose }
                                    className="inline-flex fixed top-4 right-4 items-center justify-center p-0 rounded-md max-md:text-gray-600 text-white transition duration-150 ease-in-out"
                                >
                                    <svg className="h-9 w-9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className='inline-flex'
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className='h-full flex gap-4 flex-col'>
                                <Container
                                    className='p-[20px] ml-auto mr-auto'
                                    maxWidth={'lg'}
                                >
                                    <div className='subtitles w-full text-center'>
                                        Movimiento Ciudadano
                                    </div>

                                    <div className='titles w-full text-center break-words text-mc text-black'>
                                        <span className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                            Conecta con tus redes sociales
                                        </span>
                                    </div>

                                </Container>
                                <div className='flex flex-col justify-between gap-4'>
                                    <div className='tracking-widest break-words text-xs max-md:mt-8'>
                                        <span className='font-black'>ⓘ</span> Ya puedes conectar tus publicaciones de redes sociales:
                                    </div>
                                    <a href="https://api.instagram.com/oauth/authorize?client_id=211161591267567&redirect_uri=https://public.ciudadanosenmovimiento.org/instagram/auth&scope=user_profile,user_media&response_type=code">
                                        <Button
                                            variant='contained'
                                            style={{
                                                background: `radial-gradient(
                                                    circle farthest-corner at 28% 100%,
                                                    #fcdf8f 0%,
                                                    #fbd377 10%,
                                                    #fa8e37 22%,
                                                    #f73344 35%,
                                                    transparent 65%
                                                ), linear-gradient(145deg, #3051f1 10%, #c92bb7 70%)`,
                                                position: 'relative',
                                                width: '100%'
                                            }}
                                        >

                                            <span
                                                className='z-10 tracking-wide font-semibold'
                                                style={{
                                                    fontFamily: 'Poppins, sans-serif',
                                                    background: `radial-gradient(
                                                        circle farthest-corner at 28% 100%,
                                                        #fcdf8f 0%,
                                                        #fbd377 10%,
                                                        #fa8e37 22%,
                                                        #f73344 35%,
                                                        transparent 65%
                                                    ), linear-gradient(145deg, #3051f1 10%, #c92bb7 70%)`,
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                }}
                                            >
                                                Conectar con Instagram
                                            </span>
                                            <div className='absolute top-[2px] right-[2px] bottom-[2px] left-[2px] bg-white rounded-sm'>
                                            </div>
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </OverlayMenu>
                :   null
            }

            {
                openingModal && typeModal === 7
                ?   <OverlayMenu
                        className='overlay appear max-md:px-0 px-4'
                        onClick={ handleModalClose }
                    >
                        <div
                            className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'
                            onClick={(e) => e.stopPropagation()}
                        >

                            <div className="top-2 right-2 absolute flex items-center">
                                <button
                                    onClick={ handleModalClose }
                                    className="inline-flex fixed top-4 right-4 items-center justify-center p-0 rounded-md max-md:text-gray-600 text-white transition duration-150 ease-in-out"
                                >
                                    <svg className="h-9 w-9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className='inline-flex'
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className='h-full flex gap-4 flex-col'>

                                <Container
                                    className='p-[20px] ml-auto mr-auto'
                                    maxWidth={'lg'}
                                >
                                    <div className='subtitles w-full text-center'>
                                        Movimiento Ciudadano
                                    </div>

                                    <div className='titles w-full text-center break-words text-mc text-black'>
                                        <span className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                            Elige tu nueva foto de portada
                                        </span>
                                    </div>
                                </Container>

                                <Button variant="contained" color="primary" component="label">
                                    Elegir foto

                                    <input
                                        type="file"
                                        hidden
                                        onChange={async (event) => {
                                            const file = await (() => {
                                                return new Promise((resolve, reject) => {
                                                    const fileReader = new FileReader();
                                                    fileReader.onload = event => resolve(new Blob([event.target.result]));
                                                    fileReader.onerror = error => reject(error);
                                                    fileReader.readAsArrayBuffer(event.target.files[0]);
                                                });
                                            })();

                                            const formData = new FormData();
                                            formData.append('file', file);

                                            try {
                                                const response = await axios.post(route('post.perfil.grupal.foto.portada'), formData);

                                                if (response.status !== 200)
                                                    return Swal.fire({
                                                        text: `La foto de perfil no ha podido ser actualizada. Por favor, inténtalo más tarde.`,
                                                        icon: 'info',
                                                        confirmButtonText: 'Aceptar',
                                                    });

                                                await Swal.fire({
                                                    text: `Foto de perfil actualizada`,
                                                    icon: 'success',
                                                    confirmButtonText: 'Aceptar',
                                                });
                                            } catch (err) {
                                                if (err?.response?.status === 419)
                                                    await Swal.fire({
                                                        text: `Tu sesión ha expirado. Por favor, vuelve a iniciar sesión`,
                                                        icon: 'info',
                                                        confirmButtonText: 'Aceptar',
                                                    });

                                                await Swal.fire({
                                                    text: `Error: ${JSON.stringify(err)}`,
                                                    icon: 'info',
                                                    confirmButtonText: 'Aceptar',
                                                });
                                            } finally {

                                                window.location.reload();
                                            }

                                        }}
                                    />
                                </Button>

                            </div>

                        </div>

                    </OverlayMenu>
                :   null
            }

            {
                openingModal && typeModal === 8
                ?   <OverlayMenu
                        className='overlay appear max-md:px-0 px-4'
                        onClick={ handleModalClose }
                    >
                        <div
                            className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="top-2 right-2 absolute flex items-center">
                                <button
                                    onClick={ handleModalClose }
                                    className="inline-flex fixed top-4 right-4 items-center justify-center p-0 rounded-md max-md:text-gray-600 text-white transition duration-150 ease-in-out"
                                >
                                    <svg className="h-9 w-9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className='inline-flex'
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className='h-full w-full flex gap-4 flex-col items-center'>
                                <Container
                                    className='p-[20px] ml-auto mr-auto'
                                    maxWidth={'lg'}
                                >
                                    <div className='subtitles w-full text-center'>
                                        Movimiento Ciudadano
                                    </div>

                                    <div className='titles w-full text-center break-words text-mc text-black'>
                                        <span className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                            Seguidores
                                        </span>
                                    </div>
                                </Container>

                                <span className='ml-auto font-[Poppins] text-xs underline'>
                                    {'>'} Siguiendo
                                </span>

                                <section className='overflow-auto border-t border-[#eee] border-solid w-full flex p-4 flex-col gap-4'>
                                    {
                                        seguidores.length > 0
                                        ?   seguidores.map(seguidor => (
                                                <article className='flex w-full justify-between items-center'>
                                                    <div className='flex gap-4'>
                                                        <div className='rounded-full aspect-square h-11 bg-slate-500'>
                                                        </div>

                                                        <div className='flex flex-col items-center'>
                                                            <h1 className='font-[Poppins] font-bold'>
                                                                { seguidor?.alias ?? '' }

                                                                {
                                                                    seguidor.grupal
                                                                    ?   <span className='text-white font-normal tracking-wide uppercase text-xs p-1 ml-1 bg-[#888] rounded-xl'>
                                                                            {" "}Perfil grupal
                                                                        </span>
                                                                    :   null
                                                                }
                                                            </h1>
                                                        </div>
                                                    </div>

                                                    <div>

                                                    </div>
                                                </article>
                                            ))
                                        :   <div>
                                                Aún no has generado seguidores
                                            </div>
                                    }
                                </section>
                            </div>
                        </div>
                    </OverlayMenu>
                :   null
            }
        </CustomLayout>
    );
};

export default index;
