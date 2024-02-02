import React, { useState, useEffect, useCallback } from 'react';
import { Button, CircularProgress, TextField, Container, InputAdornment } from '@mui/material';
import { Head } from '@inertiajs/react';
import CustomLayout from '@/Layouts/CustomLayout';
import EncabezadoPerfil from '@/Pages/Perfiles/EncabezadoPerfil';
import CuerpoPerfil from '@/Pages/Perfiles/CuerpoPerfil';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';
import CustomTinyMCE from '@/Components/Customized/CustomComponents/CustomTinyMCE';
import usePost from '@/Pages/Perfiles/Hooks/usePost';
import NumberedCircle from '@/Components/Customized/CustomComponents/NumberedCircle';
import { CustomDatePicker } from '@/Components/Customized/CustomComponents/CustomDatePicker';
import FacebookIcon from '@mui/icons-material/Facebook';
import Swal from 'sweetalert2';
import axios from 'axios';
import useSpinners from './Hooks/useSpinners';
import { CustomSelect } from '@/Components/Customized/CustomComponents/CustomSelect';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';
import {
    Instagram as InstagramIcon,
    Twitter as TwitterIcon,
    WhatsApp as WhatsAppIcon,
    LinkedIn as LinkedInIcon,
    Lock as LockIcon
} from '@mui/icons-material';

const OverlayMenu = (props) => {
    const { children, className, onClick } = props;

    return (
        <div onClick={ onClick } className={`fixed z-50 h-screen w-full flex justify-center items-center top-0 ${className} bg-[rgba(0,0,0,0.5)]`}>
            { children }
        </div>
    );
};

const index = (props) => {
    const {
        perfil,
        isVisible = true,
        auth: { user },
        perfil: { usuario, wip, seguidores },
    } = props;

    const profile = user?.perfil_data ?? {};
    const perfilesGrupales = user?.perfiles_grupales_data ?? [];
    const profileTag = user?.perfil_grupal_tagged_in ?? "";

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionId, setSelectedOptionId] = useState('');

    const perfiles = perfilesGrupales.map((perfilGrupal) => ({
        nombre: perfilGrupal.alias,
        value: perfilGrupal.id,
        id: perfilGrupal.id
      }));

    useEffect(() => {
      const storedSelectedOption = localStorage.getItem('selectedOption');
      if (storedSelectedOption) {
        setSelectedOption(storedSelectedOption);
      }
    }, []);

    useEffect(() => {
      if (selectedOption) {
        localStorage.setItem('selectedOption', selectedOption);
      }
    }, [selectedOption]);

    // Datos del usuario
    const [nameFormularioEditar, setNameFormularioEditar] = useState(usuario?.name ?? '');
    const [usernameFormularioEditar, setUsernameFormularioEditar] = useState(usuario?.username ?? '');
    const [areaFormularioEditar, setAreaFormularioEditar] = useState(usuario?.area ?? '');
    const [puestoFormularioEditar, setPuestoFormularioEditar] = useState(usuario?.puesto ?? '');
    const [estadoFormularioEditar, setEstadoFormularioEditar] = useState(usuario?.estado ?? '');
    const [nuevaFotoPerfil, setNuevaFotoPerfil] = useState(null);

    //INICIO PRUEBA RRSS
    const [urlFacebook, setUrlFacebook] = useState('');
    const [urlInstagram, setUrlInstagram] = useState('');
    const [urlTwitter, setUrlTwitter] = useState('');
    const [urlTiktok, setUrlTiktok] = useState('');
    const [urlWhatsapp, setUrlWhatsapp] = useState('');
    const [urlLinkedin,setUrlLinkedin] = useState('');

    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        perfil.perfilCatalogoRedesSociales?.forEach(item => {
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

    const handleRedesSociales = async () => {

        setIsUpdate(true);
        const datosRedesSociales = [];
        const redesSocialesEstados = { urlFacebook, urlInstagram, urlTwitter, urlTiktok,
                                        urlWhatsapp, urlLinkedin };
        Object.entries(redesSocialesEstados).forEach(([key, value]) => {
            //if (value) {
                datosRedesSociales.push({
                catalogoRedesSocialesId: redesSociales[key],
                perfilId: perfil.perfil.id,
                url: value !== undefined ? value: null
                });
            //}
        });
        try{
            const formData = new FormData();
            formData.append('data', JSON.stringify(datosRedesSociales));
            const response = await axios.post(route('post.rrss.perfil'), formData);
            if (response.status !== 200 || !response.data.success)
                return false;
            return true;
        }catch(err) {
            return false;
        }
    }
    //FIN PRUEBA

    const [following, setFollowing] = useState(null);

    const [openingModal, setOpeningModal] = useState(false);
    const [typeModal, setTypeModal] = useState(0);
    const [loadingEditor, setLoadingEditor] = useState(true);
    const [loadingPublicaciones, setLoadingPublicaciones] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);

    const [listaPublicaciones, setListaPublicaciones] = useState([]);
    const [catalogoPublicacion, setCatalogoPublicacion] = useState(null);

    const { post, setPost, postInit } = usePost();
    const { id, titulo, fechaInicio, fechaFin, descripcion, contenido, imagenPublicacion } = post;
    const [imagenPortadaPublicacion, setImagenPortadaPublicacion] = useState(null);

    const [imagenesPublicacion, setImagenesPublicacion] = useState([]);

    //Inicia CHC Inscrito/DatosFaltantes
    const [estaInscritoCHC, setEstaInscritoCHC] = useState(perfil?.caminoCandidatoExists ?? false);
    const [registroDatosFaltantesCHC, setRegistroDatosFaltantesCHC ] = useState(perfil?.registroDatosFaltantesInicial??false);
    const [esInicioEtapaRegistro, setEsInicioEtapaRegistro] = useState(perfil?.esInicioEtapaRegistro ?? false);
    const [esUltimaEtapaRegistro, setEsUltimaEtapaRegistro] = useState(perfil?.esUltimaEtapaRegistro ?? false);
    const [etapaActualRegistro, setEtapaActualRegistro] = useState(perfil?.etapaActualRegistro ?? null);
    const [etapaSiguienteRegistro, setEtapaSiguienteRegistro] = useState(perfil?.etapaSiguienteRegistro ?? null);
    const [etapasCompletasRegistro, setEtapasCompletasRegistro] = useState(perfil?.etapasCompletasRegistro??null);
    const [etapaActualCamino, setEtapaActualCamino ] = useState( perfil?.etapaActualCamino ?? null)
    const [avance, setAvance ] = useState( perfil?.avance ?? null)
    //Fin CHC
    //inicioDatosCirculo
    const [perfilesEncirculo, setperfilesEncirculo] = useState(perfil?.perfilesEnCirculo??[]);
    //FinDatosCirculo

    const { spinners, setSpinners } = useSpinners();
    const {
        editarDatosPerfil,
        editarFotoPerfil,
        agregarPublicacion,
        editarPublicacion
    } = spinners;
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
        if (!isVisible) {
            return;
        }

        const fetchInstagramData = async () => {
            const response = await axios.get(route('get.token', { perfil: perfil.perfil.id, tokentype: 1 }));

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
            const body = { seguidoId: perfil.perfil.id };

            const formData = new FormData();
            formData.append('data', JSON.stringify(body));

            const response = await axios.post(route('post.perfil.followage'), formData);
            setFollowing(response.data.response);
        };

        followage();
    }, []);

    useEffect(() => {
        if (!isVisible) {
            return;
        }

        const publicaciones = async () => {
            try {
                const response = await axios.get(route('get.publicaciones', { id: perfil.perfil.id }));
                setListaPublicaciones(response.data.response);
                setLoadingPublicaciones(false);
            } catch (err) {
                console.log(err)

            }
        };

        publicaciones();
    }, []);

    const handleEditorInit = () => {
        setLoadingEditor(false);
    };

    const handleModalOpen = (state) => {
        setTypeModal(1);
        setPost(postInit);
        setIsUpdate(false);
        switch (state) {
            case 'liderazgo': setCatalogoPublicacion(1); break;
            case 'circulo': setCatalogoPublicacion(2); break;
            case 'comunidad': setCatalogoPublicacion(3); break;
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

    const handleSubmit = async () => {
        if (titulo.trim().length <= 0) {
            return Swal.fire({
                text: "El campo título no puede estar vacío",
                icon: 'info',
                confirmButtonText: 'Aceptar',
            });
        }

        const formData = new FormData();
        formData.append('file', new Blob([imagenPortadaPublicacion]));

        let responseRutaImagen = '';

        try {
            responseRutaImagen = await axios.post(route('post.publicacion.portada.imagen'), formData);
        } catch (err) {

        }

        const publicacion = {
            titulo,
            descripcion,
            contenido,
            fechaInicio: fechaInicio.toISOString(),
            fechaFin: fechaFin.toISOString(),
            catalogoPublicacionId: catalogoPublicacion,
            imagenPublicacion: responseRutaImagen?.data?.response ?? ''
        };

        try {
            const response = isUpdate
            ? await axios.put(route('put.publicacion', { id }), { data: JSON.stringify(publicacion) })
            : await axios.post(route('post.publicacion'), { data: JSON.stringify(publicacion) })

            if (response.status !== 200 || !response.data.success)
                return Swal.fire({
                    text: `La publicación no ha podido ser ${ isUpdate ? 'actualizada' : 'creada' }. Por favor, inténtalo más tarde.`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });

            await Swal.fire({
                text: `Publicación ${ isUpdate ? 'actualizada' : 'creada' }`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });

            handleModalClose();

            window.location.reload();
        } catch (err) {
            if (err?.response?.status === 419)
                await Swal.fire({
                    text: `Tu sesión ha expirado. Por favor, vuelve a iniciar sesión`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });

            console.log(err)
            await Swal.fire({
                text: err?.response?.data?.message ?? "Algo salió mal. Por favor, inténtalo más tarde",
                icon: 'info',
                confirmButtonText: 'Aceptar',
            });
        }
    };

    const handleFormularioEditarSubmit = async () => {
        setIsLoading(true);
        const perfil = {
            name: nameFormularioEditar,
            username: usernameFormularioEditar,
            puesto: puestoFormularioEditar,
            area: areaFormularioEditar,
            estado: estadoFormularioEditar
        };

        if (nameFormularioEditar.length <= 0 || usernameFormularioEditar.length <= 0 || puestoFormularioEditar.length <= 0)
            return Swal.fire({
                text: `Los campos de nombre y puesto son obligatorios para edición`,
                icon: 'info',
                confirmButtonText: 'Aceptar',
            });

        const formData = new FormData();
        formData.append('data', JSON.stringify(perfil));

        try {
            const response = await axios.post(route('post.perfil'), formData);
            const responseRrss = await handleRedesSociales();

            if ((response.status !== 200 || !response.data.success) && responseRrss) {
                Swal.fire({
                    text: `Los datos no han podido ser actualizados. Por favor, inténtalo más tarde.`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });

                return setIsLoading(false);
            }

            await Swal.fire({
                text: `Datos de perfil actualizados`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });

            setIsLoading(false);
            handleModalClose();
            location.reload();
        } catch (err) {
            if (err?.response?.status === 419)
                await Swal.fire({
                    text: `Tu sesión ha expirado. Por favor, vuelve a iniciar sesión`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });

            setIsLoading(false);
        }
    };
    return (
        <CustomLayout
            visible={ true }
            openingModal={ openingModal }
            user={ user }
        >
            <ParticlesLinks color="#FF8300" />
            <Head title={`${usuario.name} (${usuario.username ?? usuario.name})`} />

            <div className='w-full relative z-30'>
                <EncabezadoPerfil
                    onFormularioEditarModalOpen={() => {
                        setTypeModal(2);
                        setOpeningModal((previousState) => !previousState)
                    }}
                    onFotoEditarModalOpen={() => {
                        setTypeModal(3);
                        setOpeningModal((previousState) => !previousState)
                    }}
                    onFollowersModalOpen={() => {
                        setTypeModal(5);
                        setOpeningModal((previousState) => !previousState)
                    }}
                    editable={ user?.id === usuario?.id && !user?.perfil_grupal_tagged_in }
                    followable={ profileTag.length <= 0 ? perfil.perfil.id !== profile?.id : true }
                    perfilesGrupales={ perfilesGrupales }
                    followed={ following }
                    perfil={ perfil }
                    usuario={ usuario }
                    spinners={ spinners }
                    setSpinners={ setSpinners }
                    urlFacebook = {urlFacebook}
                    urlInstagram = {urlInstagram}
                    urlTwitter = {urlTwitter}
                    urlTiktok = {urlTiktok}
                    urlWhatsapp = {urlWhatsapp}
                    urlLinkedin = {urlLinkedin}
                    wip = { wip }
                    estaInscritoCHC = {estaInscritoCHC}
                    registroDatosFaltantesCHC = {registroDatosFaltantesCHC}
                    esInicioEtapaRegistro = {esInicioEtapaRegistro}
                    esUltimaEtapaRegistro = {esUltimaEtapaRegistro}
                    etapaActualRegistro = {etapaActualRegistro}
                    etapaActualCamino = {etapaActualCamino}
                    etapasCompletasRegistro = { etapasCompletasRegistro }
                    isVisible={ isVisible }
                />
            </div>

            {
                isVisible
                ?   <div className='w-full relative z-30'>
                        {
                            !loadingPublicaciones && !isLoadingInstagram
                            ?   <CuerpoPerfil
                                    onEditModalOpen={() => {
                                        setTypeModal(1);
                                        setOpeningModal((previousState) => !previousState)
                                    }}
                                    onComunidadRedesSocialesModalOpen={() => {
                                        setTypeModal(4);
                                        setOpeningModal((previousState) => !previousState)
                                    }}
                                    onModalOpen={ handleModalOpen }
                                    listaPublicaciones={ listaPublicaciones }
                                    mediaPerfiles = { mediaPerfiles }
                                    post={ post }
                                    setPost={ setPost }
                                    isUpdate={ isUpdate }
                                    setIsUpdate={ setIsUpdate }
                                    editable={ user?.id === usuario.id && !user?.perfil_grupal_tagged_in && wip !== true }
                                    user={ usuario }
                                    spinners={ spinners }
                                    setSpinners={ setSpinners }
                                    perfilesGrupales={ perfilesGrupales }
                                    selectedOption={ selectedOption }
                                    selectedProfileId={ selectedOptionId }
                                    perfiles={perfiles}
                                    selectedProfile={selectedOption}
                                    perfilesEnCirculo={perfilesEncirculo}
                                />
                            :   <div className='w-full flex items-center justify-center h-80'>
                                    <CircularProgress color='primary' />
                                </div>
                        }
                    </div>
                :   <TrailAppear>
                        <div className='relative w-full z-30 border-y border-solid border-[#ddd] py-6 bg-white font-[Poppins] text-md text-[#999] text-center flex flex-col gap-1'>
                            <span className='m-auto mb-2'>
                                <LockIcon fontSize="large"/>
                            </span>

                            <h1>
                                Este perfil no es público
                            </h1>

                            <h1>
                                Debes

                                {' '}

                                <a
                                    href="/login"
                                    className='text-mc-primary'
                                >
                                    acceder
                                </a>

                                {' '}

                                para ver información adicional.
                            </h1>
                        </div>
                    </TrailAppear>
            }

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
                                        <div className='grid gap-4 max-sm:grid-cols-1 grid-cols-2'>
                                            <div className='flex flex-col gap-4'>
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
                                            </div>
                                            <div className='flex flex-col gap-4'>
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
                                            </div>
                                        </div>
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
                                            const response = await axios.post(route('post.publicacion.imagen'), formData);

                                            if (response.status !== 200 || !response.data.success)
                                                return reject('Hubo un error. Por favor, vuelve a intentarlo más tarde');

                                            const rutaResponse = await axios.get(route('get.publicacion.imagen', response.data.response.directorio));

                                            setImagenesPublicacion((imagenes) => [ ...imagenes, response.id ]);

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
                                <Button variant='contained' color='primary' onClick={ handleSubmit }>{ isUpdate ? 'Actualizar' : 'Publicar' }</Button>
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

                            <div className='h-full flex gap-4 flex-col md:flex-row md:flex-wrap'>
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

                                <div className='grid grid-cols-1 gap-4 w-full'>
                                    <div className='flex flex-col gap-4'>
                                        <NumberedCircle number={1}/>
                                        <TextField
                                            label="Nombre"
                                            color="primary"
                                            value={ nameFormularioEditar }
                                            onChange={(event) => setNameFormularioEditar(event.target.value)}
                                        />
                                        <TextField
                                            label="Puesto"
                                            color="primary"
                                            value={ puestoFormularioEditar }
                                            onChange={(event) => setPuestoFormularioEditar(event.target.value)}
                                        />
                                        <CustomSelect
                                            label="Mi(s) grupo(s)"
                                            name="perfil"
                                            list={perfiles}
                                            value={selectedOption}
                                            onChange={(event) => {setSelectedOption (event.target.value)}}
                                            helperText={!perfilesGrupales ? 'Selecciona un grupo' : ''}
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
                                        {/* <MuiTelInput
                                            fullWidth
                                            label="Teléfono"
                                            name="telefono"
                                            id="telefono"
                                            defaultCountry="MX"
                                            //value={ telefono }
                                            //onChange={ (value, info) => setFormulario({ ...formulario, telefono: value, infoTelefono: info }) }
                                        /> */}
                                        <Button variant='contained' color='primary' onClick={ handleFormularioEditarSubmit } style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            {
                                                isLoading ? (<CircularProgress size={24} color="inherit" />)
                                                : ('Actualizar')
                                            }
                                        </Button>
                                    </div>
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
                                            Elige tu nueva foto de perfil
                                        </span>
                                    </div>
                                </Container>

                                <Button variant="contained" color="primary" component="label" fullWidth>
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
                                                const response = await axios.post(route('post.perfil.foto'), formData);

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
                                            Conecta con tus redes sociales
                                        </span>
                                    </div>
                                </Container>

                                <div className='flex flex-col gap-4 '>
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

            {/* <div className='bg-red-300'>
            <p>Lista perfiles:</p>
                {publicaciones.map((publicacion) => (
                    <div key={publicacion.id}>
                    <h2>{publicacion.titulo}</h2>
                    <p>{publicacion.contenido}</p>
                    </div>
                ))}
            </div> */}

            {/* <div>
                <p>Lista perfiles:</p>
                <ul>
                {perfilesGrupales.map((perfil) => (
                    <li key={perfil.id}>{perfil.alias}</li>
                ))}
                </ul>
            </div> */}

        </CustomLayout>
    );
};

export default index;
