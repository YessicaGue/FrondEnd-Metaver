import React, {useEffect, useState} from 'react';
import {Head} from '@inertiajs/react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    Link,
    Paper,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import Swal from 'sweetalert2';
import {CustomSelect} from '@/Components/Customized/CustomComponents/CustomSelect';
import {estados} from '@/data/estados';
import '@/../assets/fonts/CompactaSHOP-Light.woff';
import '@/../assets/fonts/Montserrat-Black.woff';
import '../style.css';
import {distritos} from '@/data/distritos';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faLinkedin,
    faYoutube,
    faFacebook,
    faInstagram,
    faTwitter,
    faTiktok,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
// import logoMC from './logo_mc.png';
import ImageLocal from '../../../../assets/imagen-eventos.png';
import EditIcon from '@mui/icons-material/Edit';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import CustomTarjetaApoyo from '@/Pages/CaminoCandidato/CustomTarjetaApoyo';
import {OpenInNewOutlined, WhatsApp as WhatsAppIcon} from '@mui/icons-material';
import CustomLayout from '@/Layouts/CustomLayout';
import axios from 'axios';
import TableFirmasPrecandidatura from "@/Pages/CaminoCandidato/TableFirmasPrecandidatura";
import Grid2 from "@mui/material/Unstable_Grid2";
import RegistrarFirmaPrecandidato from "@/Pages/CaminoCandidato/ApoyoPrecandidatura/RegistrarFirmaPrecandidato";
import InfoPrecandidato from "@/Pages/CaminoCandidato/ApoyoPrecandidatura/InfoPrecandidato";
import {
    OverlayCard,
    OverlayMenu,
    readFileAsArrayBuffer
} from "@/Pages/CaminoCandidato/ApoyoPrecandidatura/UtilsApoyoPrecandidatura";
import ApoyoRedesPrecandidato from "@/Pages/CaminoCandidato/ApoyoPrecandidatura/ApoyoRedesPrecandidato";


const ApoyarCandidato = (props) => {

    const sm = useMediaQuery('(max-width: 899px)');

    const [perfilCandidato, setPerfilCandidato] = useState(props.precandidatura?.perfil?.guid ?? '');
    const user = props.auth?.user ?? {};
    const perfil = user?.perfil_data ?? {};
    const precandidatura = props.precandidatura?.[0] ?? props.precandidatura;
    const isDemo = precandidatura?.demo ?? false;
    const perfilPrecandidatura = precandidatura.perfil;

    const isOwner = (!isDemo && perfil?.id == perfilPrecandidatura.id) ?? false;
    const tipoPrecandidatura = precandidatura.tipoPrecandidatura;
    const perfilCatalogoRedesSociales = precandidatura.perfilCatalogoRedesSociales;

    const [urlFacebook, setUrlFacebook] = useState('');
    const [urlInstagram, setUrlInstagram] = useState('');
    const [urlTwitter, setUrlTwitter] = useState('');
    const [urlTiktok, setUrlTiktok] = useState('');
    const [urlWhatsapp, setUrlWhatsapp] = useState('');
    const [urlLinkedin, setUrlLinkedin] = useState('');
    const [urlYoutube, setUrlYoutube] = useState('');

    const [openingModal, setOpeningModal] = useState(false);
    const [typeModal, setTypeModal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [nombre, setNombre] = useState("");
    const [numero, setNumero] = useState("");
    const [email, setEmail] = useState("");
    const [clave, setClave] = useState("");
    const [seccion, setSeccion] = useState("");
    const [estado, setEstado] = useState("");
    const [distrito, setDistrito] = useState("");

    const [submitted, setSubmitted] = useState(false);
    const [errorNombre, setErrorNombre] = useState(true);
    const [errorNumero, setErrorNumero] = useState(true);
    const [errorEmail, setErrorEmail] = useState(true);
    const [errorClave, setErrorClave] = useState(true);
    const [errorSeccion, setErrorSeccion] = useState(true);
    const [errorEstado, setErrorEstado] = useState(true);
    const [errorDistrito, setErrorDistrito] = useState(true);

    const [avisoAceptado, setAvisoAceptado] = useState(false);
    const [informacionAdicionalAceptado, setInformacionAdicionalAceptado] = useState(false);

    const [nombreCandidato, setNombreCandidato] = useState(precandidatura?.perfil?.alias ?? '');
    const [descripcionCandidato, setDescripcionCandidato] = useState(precandidatura?.perfil?.descripcion ?? '');
    const [imagenCandidato, setImagenCandidato] = useState(
        precandidatura?.fotoPerfil
            ? precandidatura.fotoPerfil
            : null
    );
    const [imagenCandidatoBlob, setImagenCandidatoBlob] = useState(null);

    const [titulo, setTitulo] = useState("");
    const [descripcionTarjeta, setDescripcionTarjeta] = useState("");
    const [imagenEvento, setImagenEvento] = useState("");
    const [imagenEventoBlob, setImagenEventoBlob] = useState(null);
    const [tarjetas, setTarjetas] = useState([]);

    useEffect(() => {
        perfilCatalogoRedesSociales?.forEach(item => {
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

    //tipos Modales
    const tiposModal = new Set([2, 4, 5, 6, 7, 8, 9]);

    useEffect(() => {
        const publicaciones = async () => {
            let response;

            try {
                response = await axios.get(route('get.publicaciones', {id: perfilPrecandidatura.id}));
            } catch (err) {
                console.error(err)
            }

            const result = response.data.response;

            const publicaciones = result
                ?.filter((publicacion) => publicacion.catalogoPublicacion.id == 1)
                ?.sort((publicacion, siguientePublicacion) =>
                    new Date(siguientePublicacion.fechaCreacion) -
                    new Date(publicacion.fechaCreacion)
                )
                ?.map((publicacion) => ({
                    id: publicacion.id,
                    titulo: publicacion.titulo,
                    descripcionTarjeta: publicacion.descripcion,
                    imagenEvento: publicacion.imagenPublicacion,
                    guid: publicacion.guid,
                }))
                ?.sort((publicacion, siguientePublicacion) =>
                    siguientePublicacion.id - publicacion.id
                )
                ?.slice(0, 3) ?? [];

            setTarjetas(publicaciones);
        };

        publicaciones();
    }, []);

    const handleModalClose = () => {
        setNombre("");
        setNumero("");
        setEmail("");
        setClave("");
        setSeccion("");
        setEstado("");
        setDistrito("");
        setAvisoAceptado(false);
        setInformacionAdicionalAceptado(false);

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

    const handleOpenModal = (type) => {
        setTypeModal(type);
        setOpeningModal(true);
    };

    const handlePictureUpload = async (event) => {
        let file;

        try {
            file = await readFileAsArrayBuffer(event);
        } catch (error) {
            return Swal.fire({
                title: 'Lo sentimos',
                text: 'La imagen que elegiste no pudo ser procesada. Por favor, inténtalo de nuevo o elige otra imagen',
                icon: 'info',
                confirmButtonText: 'Aceptar',
            });
        }

        const base64Image = btoa(
            new Uint8Array(file).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
            )
        );

        const imageDataUrl = `data:image/jpeg;base64,${base64Image}`;

        return {
            file,
            imageDataUrl,
        };
    };

    const handleSubmit = async () => {
        setSubmitted(true);

        if (tiposModal.has(typeModal) && (errorNombre || errorSeccion || errorClave || errorNumero || errorEmail)) {
            return Swal.fire({
                title: `Por favor, verifica los campos obligatorios marcados con un asterisco (*) y asegúrate de que cumplan con las características requeridas`,
                icon: 'info',
                confirmButtonText: 'Aceptar',
            });
        }

        if (typeModal === 1 && (errorNombre || errorDistrito || errorSeccion || errorClave || errorNumero || errorEmail)) {
            return Swal.fire({
                title: `Por favor, verifica los campos obligatorios marcados con un asterisco (*) y asegúrate de que cumplan con las características requeridas`,
                icon: 'info',
                confirmButtonText: 'Aceptar',
            });
        }

        if (typeModal === 3 && (errorNombre || errorEstado || errorClave || errorNumero || errorEmail)) {
            return Swal.fire({
                title: `Por favor, verifica los campos obligatorios marcados con un asterisco (*) y asegúrate de que cumplan con las características requeridas`,
                icon: 'info',
                confirmButtonText: 'Aceptar',
            });
        }

        if (typeModal === 1 && (errorNombre || errorDistrito || errorSeccion || errorClave || errorNumero || errorEmail)) {
            return Swal.fire({
                title: `Por favor, verifica los campos obligatorios marcados con un asterisco (*) y asegúrate de que cumplan con las características requeridas`,
                icon: 'info',
                confirmButtonText: 'Aceptar',
            });
        }

        if (typeModal === 3 && (errorNombre || errorEstado || errorClave || errorNumero || errorEmail)) {
            return Swal.fire({
                title: `Por favor, verifica los campos obligatorios marcados con un asterisco (*) y asegúrate de que cumplan con las características requeridas`,
                icon: 'info',
                confirmButtonText: 'Aceptar',
            });
        }

        if (!avisoAceptado) {
            return Swal.fire({
                title: `Debes aceptar el aviso de privacidad`,
                icon: 'info',
                confirmButtonText: 'Aceptar',
            });
        }

        setIsLoading(true);

        const body = {
            nombre,
            numero,
            email,
            clave,
            seccion,
            estado,
            distrito,
            avisoAceptado,
            informacionAdicionalAceptado,
            tipoPrecandidatura,
            perfilPrecandidatura,
        };

        try {
            await axios.post(route("post.apoyar-precandidatura"), body);
        } catch (error) {
            setIsLoading(false);

            return Swal.fire({
                title: `Datos no enviados. Por favor, intenta de nuevo más tarde`,
                icon: 'info',
                confirmButtonText: 'Aceptar',
            });
        } finally {
            setIsLoading(false);
        }

        await Swal.fire({
            title: `Datos enviados correctamente`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
        });

        setOpeningModal(false);
        setIsLoading(false);
    };

    const handleGuardarTarjeta = async () => {
        if (titulo.length <= 0 || descripcionTarjeta.length <= 0) {
            return Swal.fire({
                title: `El título y la descripción son campos obligatorios`,
                icon: 'info',
            });
        }

        const formData = new FormData();
        formData.append('file', new Blob([imagenEventoBlob]));

        let responseRutaImagen;

        try {
            responseRutaImagen = await axios.post(route('post.publicacion.portada.imagen'), formData);
        } catch {
            await Swal.fire({
                title: `La imagen seleccionada no pudo ser enviada. Por favor, intenta corregirla en edición posterior`,
                icon: 'info',
            });
        }

        const body = {
            titulo,
            descripcionTarjeta,
            imagenEvento: responseRutaImagen?.data?.response ?? '',
        };

        try {
            await axios.post(route('post.apoyo-candidatura.evento'), body);
        } catch (error) {
            return Swal.fire({
                title: `El evento no ha podido ser publicado. Por favor, inténtalo de nuevo más tarde`,
                icon: 'info',
            });
        }

        await Swal.fire({
            title: `El evento fue publicado exitosamente`,
            icon: 'success',
        });

        setTarjetas([...tarjetas, {titulo, descripcionTarjeta, imagenEvento}]);
        setTitulo("");
        setDescripcionTarjeta("");
        setImagenEvento("");

        handleModalClose();
    };

    return (
        <div
            className={`min-h-screen ${openingModal ? ' overflow-hidden' : ''}`}
        >
            <CustomLayout
                user={user}
                demoTag={false}
                showTopBar
            >
                <Head title="Apoyar Precandidatura"/>

                <InfoPrecandidato
                    {...props}
                    sm={sm}
                    tipoPrecandidatura={tipoPrecandidatura}
                    nombreCandidato={nombreCandidato}
                />

                <div
                    className={`w-full flex justify-end ${sm ? 'my-5 pl-3' : 'my-3'} pr-3`}
                >
                    <a
                        href={`https://api.whatsapp.com/send?text=${location.href}`}
                        target={'_blank'}
                        className={`${sm ? 'w-full' : 'w-[150px]'}`}
                    >
                        <Paper
                            elevation={3}
                            className={'flex flex-col justify-center items-center ' +
                                `hover:bg-green-100 py-2 px-3 ${sm ? 'w-full' : ''}`}
                        >
                            <p className='w-full text-center font-semibold'>
                                Compartir
                            </p>

                            <WhatsAppIcon className={'text-green-500'}/>
                        </Paper>
                    </a>
                </div>

                <div className='w-full z-10'>
                    <div className='mx-auto px-0 py-0 h-full flex flex-col'>
                        <div className='bg-orange-500 grid lg:grid-cols-2 gap-10 md:grid-cols-1 sm:grid-cols-1'>
                            <div className='relative'>
                                <img
                                    className='w-full min-h-[350px] max-h-[800px] object-cover object-top'
                                    src={imagenCandidato ?? ImageLocal}
                                    alt='Descripción de la imagen'
                                />
                            </div>

                            <div>
                                {
                                    isOwner
                                        ? <div className='relative'>
                                            <div className='absolute top-4 right-10'>
                                                <Button className='opacity-40 hover:opacity-100'
                                                        onClick={() => window.open(route("perfil.settings.page"), '_blank')}>
                                                    <EditIcon className='text-white rounded p-1 bg-purple-700'/>
                                                </Button>
                                            </div>
                                        </div>
                                        : null
                                }

                                <div
                                    className='bg-orange-500 text-white font-bold items-center flex px-2 lg:px-10 w-full h-full'>
                                    <div className='bg-orange-500 mb-10 w-full'>
                                        <h1 className='text-white text-5xl uppercase font-bold font-[Poppins]'> sobre </h1>
                                        <h1 className='text-white text-5xl lg:text-6xl uppercase tracking-widest font-bold font-[Poppins]'>
                                            {nombreCandidato}
                                        </h1>
                                        <p className='text-justify pr-10 pl-2'>
                                            {descripcionCandidato}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section>
                            {
                                isOwner
                                    ? <div
                                        className='max-w-xs mx-4 mt-4 flex items-center justify-center bg-purple-400 rounded-xl opacity-60 hover:opacity-100'>
                                        <button
                                            className='w-full text-white font-bold text-xl flex items-center justify-center'
                                            sx={{padding: 0, minWidth: 0}} onClick={() => handleOpenModal(11)}>
                                            <AiOutlinePlusCircle className="w-8 h-8 m-2"/>
                                            Agregar nuevo evento
                                        </button>
                                    </div>
                                    : null
                            }

                            <Grid2
                                container
                                spacing={sm ? 0 : 3}
                                className={`!my-10 ${sm ? '' : '!mx-3'} justify-between`}
                            >
                                {
                                    tarjetas.slice(0).reverse().map((tarjeta, index) => (
                                        <Grid2
                                            key={index}
                                            item xs={12} sm={12} md={4} xl={3}
                                            className={`wysiwyg flex flex-col ${sm ? 'mb-10' : ''}`}
                                        >
                                            <CustomTarjetaApoyo
                                                titulo={tarjeta.titulo}
                                                descripcionTarjeta={tarjeta.descripcionTarjeta}
                                                imagen={tarjeta.imagenEvento}
                                                isOwner={isOwner}
                                            />
                                        </Grid2>
                                    ))
                                }
                            </Grid2>
                        </section>

                        <div className={'px-3'}>
                            <button
                                className={'mt-10 w-full mx-auto h-[120px] px-5 bg-orange-500 text-white rounded-2xl shadow-md \n' +
                                    'overflow-hidden relative transform hover:shadow-xl hover:translate-y-[-5px] \n' +
                                    'transition-all'}
                            >
                                <OverlayCard
                                    className='bg-orange-500'
                                    title={`Quiero respaldar la candidatura de ${tipoPrecandidatura.nombre}`}
                                    description="Quiero respaldar la candidatura de este participante"
                                    textoBoton={`Quiero respaldar la candidatura de ${tipoPrecandidatura.nombre}`}
                                    onClick={() => handleOpenModal(tipoPrecandidatura.id)}
                                />
                            </button>
                        </div>

                        {
                            isOwner ?
                                <Container
                                    maxWidth={null}
                                    className={'w-full mt-20'}
                                >
                                    <Accordion
                                        className={'w-full'}
                                        defaultExpanded={false}
                                    >
                                        <AccordionSummary>
                                            <div className='w-full flex justify-between items-center'>
                                                <div className={'w-full justify-between flex items-center'}>
                                                    <div
                                                        className={'text-xl lg:text-xl font-bold font-[Poppins]'}
                                                    >
                                                        Detalles de firmas <span className={'font-light text-lg'}>(Haga click aquí para ver)</span>
                                                    </div>

                                                    <div>
                                                        <a
                                                            href={`firmas/${nombreCandidato.toLowerCase().replace(/\s/g, '')}`}
                                                            target={'_blank'}
                                                        >
                                                            <Button
                                                                type={'button'}
                                                                variant={'outlined'}
                                                            >
                                                                Ver Detalles Firmas&nbsp;<br/><OpenInNewOutlined/>
                                                            </Button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionSummary>

                                        <AccordionDetails>
                                            <TableFirmasPrecandidatura
                                                {...props}
                                            />
                                        </AccordionDetails>
                                    </Accordion>
                                </Container>
                                : null
                        }

                        <div
                            className={'w-full flex justify-between mt-20 gap-2 mb-10 px-3 ' +
                                `${sm ? 'text-sm' : 'text-xl'}`}
                        >
                            <div className="justify-start flex w-full">
                                <Link
                                    href={(route('perfil.page', {id: perfilCandidato}))}
                                    className="text-orange-500 hover:text-orange-500 font-bold"
                                >
                                    <button
                                        className="bg-orange-500 text-white rounded-xl font-bold px-6 py-3 shadow-lg opacity-90 hover:opacity-100 tracking-wide font-[Poppins]"
                                    >
                                        Ir a perfil de Metaverso
                                    </button>
                                </Link>
                            </div>

                            <div className='flex justify-end w-full'>
                                <button
                                    className="bg-orange-500 text-white rounded-xl font-bold px-6 py-3 shadow-lg opacity-90 hover:opacity-100 tracking-wide font-[Poppins]"
                                    onClick={() => handleOpenModal(12)}>
                                    Compartir código QR
                                </button>
                            </div>
                        </div>

                        <section className='bg-neutral-200 mt-6'>
                            <div className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1'>
                                <div className='mx-auto my-10 px-5'>
                                    <h1 className='font-bold text-4xl font-[Poppins]'>Síguenos en</h1>
                                    <h1 className='uppercase font-bold text-5xl tracking-widest font-[Poppins]'>nuestras
                                        redes</h1>
                                </div>

                                <ApoyoRedesPrecandidato
                                    urlFacebook={urlFacebook}
                                    urlInstagram={urlInstagram}
                                    urlTwitter={urlTwitter}
                                    urlTiktok={urlTiktok}
                                    urlLinkedin={urlLinkedin}
                                    urlWhatsapp={urlWhatsapp}
                                    urlYoutube={urlYoutube}
                                />
                            </div>
                        </section>
                    </div>
                </div>

                {
                    openingModal && typeModal === 11
                        ? <OverlayMenu className='overlay appear max-md:px-0 px-4'>
                            <div
                                className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl min-h-[50vh] max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'>
                                <div className="top-2 right-2 absolute flex items-center">
                                    <button
                                        onClick={handleModalClose}
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

                                <div className='pt-[3rem] h-full flex gap-4 flex-col'>
                                    <Container
                                        className='p-[20px] ml-auto mr-auto'
                                        maxWidth={'lg'}
                                    >
                                        <div className='subtitles w-full text-center'>
                                            Movimiento Ciudadano
                                        </div>

                                        <div className='titles w-full text-center break-words text-mc text-black'>
                                            <span
                                                className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                                Agregar nuevo evento
                                            </span>
                                        </div>
                                    </Container>

                                    <div className='flex flex-col gap-4'>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            className="w-full text-gray-500 py-2 my-2"
                                            value={titulo}
                                            onChange={(event) => setTitulo(event.target.value)}
                                            label="Titulo"
                                        />
                                        <TextField
                                            fullWidth
                                            type="text"
                                            className="w-full text-gray-500 py-2 my-4"
                                            value={descripcionTarjeta}
                                            onChange={(event) => setDescripcionTarjeta(event.target.value)}
                                            label="Descripción"
                                            color="primary"
                                        />

                                    </div>

                                    <div
                                        className='h-full flex gap-4 flex-col md:border-l-[0.3px] md:border-solid md:border-[#eee] md:pl-4'>
                                        <Button color="primary" component="label">
                                            Elegir foto de publicación

                                            <input
                                                type="file"
                                                hidden
                                                onChange={async (event) => {
                                                    const {file, imageDataUrl} = await handlePictureUpload(event);
                                                    setImagenEventoBlob(file);
                                                    setImagenEvento(imageDataUrl);
                                                }}
                                            />
                                        </Button>

                                        <div
                                            className='w-full flex items-center justify-center shrink-0 flex-grow rounded-full overflow-hidden'>
                                            <img src={imagenEvento} alt="" className='max-h-36'/>
                                        </div>
                                    </div>

                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={handleGuardarTarjeta}
                                        disabled={isLoading}
                                    >
                                        {
                                            isLoading
                                                ? <CircularProgress size={24} color="inherit"/>
                                                : "Enviar"
                                        }
                                    </Button>
                                </div>
                            </div>
                        </OverlayMenu>
                        : null
                }

                {
                    openingModal && typeModal === 3
                        ? <OverlayMenu className='overlay appear max-md:px-0 px-4'>
                            <div
                                className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl min-h-[50vh] max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'>
                                <div className="top-2 right-2 absolute flex items-center">
                                    <button
                                        onClick={handleModalClose}
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

                                <div className='pt-[3rem] h-full flex gap-4 flex-col'>
                                    <Container
                                        className='p-[20px] ml-auto mr-auto'
                                        maxWidth={'lg'}
                                    >
                                        <div className='subtitles w-full text-center'>
                                            Movimiento Ciudadano - Temas de interés
                                        </div>

                                        <div className='titles w-full text-center break-words text-mc text-black'>
                                            <span
                                                className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                                Mis datos
                                            </span>
                                        </div>
                                    </Container>

                                    <div className='flex flex-col gap-4'>
                                        <TextField
                                            fullWidth
                                            label="Nombre completo de la persona que respalda la precandidatura"
                                            color="primary"
                                            value={nombre}
                                            onChange={(event) => {
                                                const value = event.target.value.toUpperCase();
                                                setNombre(value);
                                                const esValido = value.length > 5
                                                setErrorNombre(!esValido);
                                            }
                                            }
                                            error={submitted && errorNombre}
                                            helperText={submitted && errorNombre ? 'Campo Obligatorio o no válida, Nombre Completo' : ''}
                                        />
                                        <>
                                            <CustomSelect
                                                required
                                                label="Entidad federativa *"
                                                name="estado"
                                                value={estado}
                                                list={estados}
                                                onChange={(event) => {
                                                    const entidadSelect = event.target.value;
                                                    setEstado(entidadSelect);
                                                    const esValido = entidadSelect.length > 0
                                                    setErrorEstado(esValido)
                                                }
                                                }
                                            />
                                            {
                                                submitted && errorEstado ?
                                                    <p className={"text-red-600"}>Selecciona Entidad Federativa</p> : null
                                            }
                                        </>
                                    </div>

                                    <div className='flex flex-col gap-4'>
                                        <TextField
                                            fullWidth
                                            id="clave"
                                            name="clave"
                                            label="Clave de elector de la Credencial para votar"
                                            value={clave}
                                            onChange={(event) => {
                                                const claveValue = event.target.value.toUpperCase();
                                                setClave(claveValue);
                                                const esValido = claveValue.length >= 10
                                                setErrorClave(!esValido);
                                            }}
                                            error={submitted && errorClave}
                                            helperText={submitted && errorClave ? 'Campo Obligatorio o no válida' : ''}
                                        />

                                        <TextField
                                            label="Teléfono"
                                            value={numero}
                                            onChange={(event) => {
                                                const regexTelefonoMexico = /^[0-9]{10}$/;
                                                const telefonoValue = event.target.value;
                                                setNumero(telefonoValue);
                                                const fomatoValido = regexTelefonoMexico.test(telefonoValue)
                                                const esValido = fomatoValido && !/(\d)\1{9}/.test(telefonoValue);
                                                setErrorNumero(!esValido);
                                            }
                                            }
                                            error={submitted && errorNumero}
                                            helperText={submitted && errorNumero ? 'Campo Obligatorio o no válida (10 digitos númericos)' : ''}
                                            fullWidth
                                        />

                                        <TextField
                                            fullWidth
                                            label="Correo electrónico"
                                            color="primary"
                                            value={email}
                                            onChange={(event) => {
                                                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                                                const emailValue = event.target.value;
                                                setEmail(emailValue);
                                                const esValido = emailRegex.test(emailValue);
                                                setErrorEmail(!esValido)
                                            }}
                                            error={submitted && errorEmail}
                                            helperText={submitted && errorEmail ? 'Campo Obligatorio o no válida Ejemplo: example@correo.com' : ''}
                                        />
                                    </div>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={informacionAdicionalAceptado}
                                                onChange={() => setInformacionAdicionalAceptado((valor) => !valor)}
                                            />
                                        }
                                        label={
                                            <div className="flex-col sm:flex-row items-start">
                                                <Typography
                                                    variant="body1"
                                                    display="inline"
                                                >
                                                    Acepta envío de información
                                                </Typography>
                                            </div>
                                        }
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={avisoAceptado}
                                                onChange={() => setAvisoAceptado((valor) => !valor)}
                                            />
                                        }
                                        label={
                                            <div className="flex-col sm:flex-row items-start my-0">
                                                <Typography
                                                    variant="body1"
                                                    display="inline"
                                                >
                                                    Acepto

                                                    {' '}

                                                    <span className='font-bold'>
                                                            aviso de Privacidad
                                                        </span>
                                                </Typography>

                                                {' '}

                                                <Link
                                                    href="https://transparencia.movimientociudadano.mx/protecciondedatospersonales"
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    Ver
                                                </Link>
                                            </div>
                                        }
                                    />

                                    <p className='text-xs text-justify'>
                                        <h1 className='font-bold'>COMISIÓN NACIONAL DE CONVENCIONES Y PROCESOS INTERNOS</h1>
                                        <h2 className='font-bold'>Sistema de Personas Ciudadanas que Respaldan las Precandidaturas Aviso de privacidad simplificado</h2>
                                        Movimiento Ciudadano, con domicilio en Louisiana No 113, Colonia Nápoles, Alcaldía Benito Juárez, C.P. 03810, Ciudad de México, es responsable del tratamiento de los datos personales que nos proporcione, los cuales serán protegidos conforme a lo dispuesto por la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados y demás normatividad que resulte aplicable.

                                        <br />    Los datos recabados en el formato de respaldo de la precandidatura, los utilizaremos para las siguientes finalidades: 
                                        <br />    · Verificar y confirmar su identidad, así como la autenticidad de la información que nos proporciona.
                                        <br />    · Integrar expedientes y bases de datos necesarias para registrar, concentrar y consultar a las y los ciudadanos que respaldan las precandidaturas en Movimiento Ciudadano.
                                        <br />    ·Tener un medio de comunicación con las personas que respaldan las precandidaturas de Movimiento Ciudadano para proporcionarles información de nuestras actividades y propuestas.
                                        <br />    Adicionalmente, se utilizarán única y exclusivamente para fines estadísticos e informes, la información no estará asociada con la persona titular de los datos personales, por tanto, no será posible asociarlo con ella y en consecuencia no será posible identificarle. Se informa además que, los datos personales recabados no serán transferidos por Movimiento Ciudadano a menos que una autoridad o institución competente lo solicite, ésta debe estar debidamente fundada y motivada. Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos datos personales de identificación y contacto. Si desea mayor información sobre los términos y condiciones en que éstos serán tratados, puede consultar el aviso de privacidad integral del Sistema de Personas Ciudadanas que Respaldan las Precandidaturas en

                                        <br/> <a
                                        href="https://transparencia.movimientociudadano.mx/protecciondedatospersonales"
                                        target="_blank" rel="noopener noreferrer"
                                        className='font-bold'>https://transparencia.movimientociudadano.mx/protecciondedatospersonales</a>
                                    </p>

                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                    >
                                        {
                                            isLoading
                                                ? <CircularProgress size={24} color="inherit"/>
                                                : "Enviar"
                                        }
                                    </Button>
                                </div>
                            </div>
                        </OverlayMenu>
                        : null
                }

                {
                    openingModal && (tiposModal.has(typeModal))
                        ?
                        <RegistrarFirmaPrecandidato
                            {...props}
                            handleModalClose={handleModalClose}
                            typeModal={typeModal}
                            setOpeningModal={setOpeningModal}
                        />
                        : null
                }

                {
                    openingModal && typeModal === 1
                        ?
                        <OverlayMenu className='overlay appear max-md:px-0 px-4'>
                            <div
                                className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl min-h-[50vh] max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'>
                                <div className="top-2 right-2 absolute flex items-center">
                                    <button
                                        onClick={handleModalClose}
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

                                <div className='pt-[3rem] h-full flex gap-4 flex-col'>
                                    <Container
                                        className='p-[20px] ml-auto mr-auto'
                                        maxWidth={'lg'}
                                    >
                                        <div className='subtitles w-full text-center'>
                                            Movimiento Ciudadano - Únete al equipo
                                        </div>

                                        <div className='titles w-full text-center break-words text-mc text-black'>
                                            <span
                                                className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                            Mis datos
                                            </span>
                                        </div>
                                    </Container>

                                    <div className='flex flex-col gap-4'>
                                        <TextField
                                            fullWidth
                                            label="Nombre completo de la persona que respalda la precandidatura"
                                            color="primary"
                                            value={nombre}
                                            onChange={(event) => {
                                                const value = event.target.value.toUpperCase();
                                                setNombre(value);
                                                const esValido = value.length > 5
                                                setErrorNombre(!esValido);
                                            }
                                            }
                                            error={submitted && errorNombre}
                                            helperText={submitted && errorNombre ? 'Campo Obligatorio o no válida, Nombre Completo' : ''}
                                        />
                                        <>
                                            <CustomSelect
                                                fullWidth
                                                required
                                                id="distritos"
                                                name="distritos"
                                                label="Distrito electoral"
                                                value={distrito}
                                                list={distritos}
                                                onChange={(event) => {
                                                    const distritoSelect = event.target.value;
                                                    setDistrito(distritoSelect);
                                                    const esValido = distritoSelect.length > 0;
                                                    setErrorDistrito(esValido)
                                                }
                                                }
                                            />
                                            {
                                                submitted && errorDistrito ?
                                                    <p className={"text-red-600"}>Selecciona un Distrito
                                                        Electoral</p> : null
                                            }
                                        </>
                                        <TextField
                                            fullWidth
                                            id="Sección"
                                            name="Sección"
                                            label="Sección electoral"
                                            value={seccion}
                                            onChange={(event) => {
                                                const seccionValue = event.target.value;
                                                setSeccion(seccionValue);
                                                const esValido = seccionValue.length > 0;
                                                setErrorSeccion(!esValido);
                                            }
                                            }
                                            error={submitted && errorSeccion}
                                            helperText={submitted && errorSeccion ? 'Campo Obligatorio o no válida' : ''}
                                        />
                                    </div>

                                    <div className='flex flex-col gap-4'>
                                        <TextField
                                            fullWidth
                                            id="clave"
                                            name="clave"
                                            label="Clave de elector de la Credencial para votar"
                                            value={clave}
                                            onChange={(event) => {
                                                const claveValue = event.target.value.toUpperCase();
                                                setClave(claveValue);
                                                const esValido = claveValue.length >= 10
                                                setErrorClave(!esValido);
                                            }}
                                            error={submitted && errorClave}
                                            helperText={submitted && errorClave ? 'Campo Obligatorio o no válida' : ''}
                                        />

                                        <TextField
                                            label="Teléfono"
                                            value={numero}
                                            onChange={(event) => {
                                                const regexTelefonoMexico = /^[0-9]{10}$/;
                                                const telefonoValue = event.target.value;
                                                setNumero(telefonoValue);
                                                const fomatoValido = regexTelefonoMexico.test(telefonoValue)
                                                const esValido = fomatoValido && !/(\d)\1{9}/.test(telefonoValue);
                                                setErrorNumero(!esValido);
                                            }
                                            }
                                            error={submitted && errorNumero}
                                            helperText={submitted && errorNumero ? 'Campo Obligatorio o no válida (10 digitos númericos)' : ''}
                                            fullWidth
                                        />

                                        <TextField
                                            fullWidth
                                            label="Correo electrónico"
                                            color="primary"
                                            value={email}
                                            onChange={(event) => {
                                                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                                                const emailValue = event.target.value;
                                                setEmail(emailValue);
                                                const esValido = emailRegex.test(emailValue);
                                                setErrorEmail(!esValido)
                                            }}
                                            error={submitted && errorEmail}
                                            helperText={submitted && errorEmail ? 'Campo Obligatorio o no válida Ejemplo: example@correo.com' : ''}
                                        />
                                    </div>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={informacionAdicionalAceptado}
                                                onChange={() => setInformacionAdicionalAceptado((valor) => !valor)}
                                            />
                                        }
                                        label={
                                            <div className="flex-col sm:flex-row items-start">
                                                <Typography
                                                    variant="body1"
                                                    display="inline"
                                                >
                                                    Acepta envío de información
                                                </Typography>
                                            </div>
                                        }
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={avisoAceptado}
                                                onChange={() => setAvisoAceptado((valor) => !valor)}
                                            />
                                        }
                                        label={
                                            <div className="flex-col sm:flex-row items-start my-0">
                                                <Typography
                                                    variant="body1"
                                                    display="inline"
                                                >
                                                    Acepto

                                                    {' '}

                                                    <span className='font-bold'>
                                                            aviso de Privacidad
                                                        </span>
                                                </Typography>

                                                {' '}

                                                <Link
                                                    href="https://transparencia.movimientociudadano.mx/protecciondedatospersonales"
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    Ver
                                                </Link>
                                            </div>
                                        }
                                    />

                                    <p className='text-xs text-justify'>
                                        <h1 className='font-bold'>COMISIÓN NACIONAL DE CONVENCIONES Y PROCESOS INTERNOS</h1>
                                        <h2 className='font-bold'>Sistema de Personas Ciudadanas que Respaldan las Precandidaturas Aviso de privacidad simplificado</h2>
                                        Movimiento Ciudadano, con domicilio en Louisiana No 113, Colonia Nápoles, Alcaldía Benito Juárez, C.P. 03810, Ciudad de México, es responsable del tratamiento de los datos personales que nos proporcione, los cuales serán protegidos conforme a lo dispuesto por la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados y demás normatividad que resulte aplicable.

                                            <br />    Los datos recabados en el formato de respaldo de la precandidatura, los utilizaremos para las siguientes finalidades: 
                                            <br />    · Verificar y confirmar su identidad, así como la autenticidad de la información que nos proporciona.
                                            <br />    · Integrar expedientes y bases de datos necesarias para registrar, concentrar y consultar a las y los ciudadanos que respaldan las precandidaturas en Movimiento Ciudadano.
                                            <br />    · Tener un medio de comunicación con las personas que respaldan las precandidaturas de Movimiento Ciudadano para proporcionarles información de nuestras actividades y propuestas.
                                            <br />    Adicionalmente, se utilizarán única y exclusivamente para fines estadísticos e informes, la información no estará asociada con la persona titular de los datos personales, por tanto, no será posible asociarlo con ella y en consecuencia no será posible identificarle. Se informa además que, los datos personales recabados no serán transferidos por Movimiento Ciudadano a menos que una autoridad o institución competente lo solicite, ésta debe estar debidamente fundada y motivada. Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos datos personales de identificación y contacto. Si desea mayor información sobre los términos y condiciones en que éstos serán tratados, puede consultar el aviso de privacidad integral del Sistema de Personas Ciudadanas que Respaldan las Precandidaturas en

                                        <br/> <a
                                        href="https://transparencia.movimientociudadano.mx/protecciondedatospersonales"
                                        target="_blank" rel="noopener noreferrer"
                                        className='font-bold'>https://transparencia.movimientociudadano.mx/protecciondedatospersonales</a>
                                    </p>

                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                    >
                                        {
                                            isLoading
                                                ? <CircularProgress size={24} color="inherit"/>
                                                : "Enviar"
                                        }
                                    </Button>
                                </div>
                            </div>
                        </OverlayMenu>
                        : null
                }
                {
                    openingModal && typeModal === 1
                        ? <OverlayMenu className='overlay appear max-md:px-0 px-4'>
                            <div
                                className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl min-h-[50vh] max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'>
                                <div className="top-2 right-2 absolute flex items-center">
                                    <button
                                        onClick={handleModalClose}
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

                                <div className='pt-[3rem] h-full flex gap-4 flex-col'>
                                    <Container
                                        className='p-[20px] ml-auto mr-auto'
                                        maxWidth={'lg'}
                                    >
                                        <div className='subtitles w-full text-center'>
                                            Movimiento Ciudadano - Únete al equipo
                                        </div>

                                        <div className='titles w-full text-center break-words text-mc text-black'>
                                            <span
                                                className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                            Mis datos
                                            </span>
                                        </div>
                                    </Container>

                                    <div className='flex flex-col gap-4'>
                                        <TextField
                                            fullWidth
                                            label="Nombre completo de la persona que respalda la precandidatura"
                                            color="primary"
                                            value={ nombre }
                                            onChange={(event) => {
                                                const value = event.target.value.toUpperCase();
                                                setNombre(value);
                                                const esValido = value.length>5
                                                setErrorNombre(!esValido);
                                            }
                                            }
                                            error={submitted && errorNombre}
                                            helperText={submitted && errorNombre ? 'Campo Obligatorio o no válida, Nombre Completo': ''}
                                        />
                                        <>
                                            <CustomSelect
                                                fullWidth
                                                required
                                                id="distritos"
                                                name="distritos"
                                                label="Distrito electoral"
                                                value={ distrito }
                                                list={ distritos }
                                                onChange={(event) => {
                                                    const distritoSelect = event.target.value;
                                                    setDistrito(distritoSelect);
                                                    const esValido = distritoSelect.length>0;
                                                    setErrorDistrito(esValido)
                                                }
                                                }
                                            />
                                            {
                                                submitted && errorDistrito ? <p className={"text-red-600"}>Selecciona un Distrito Electoral</p>: null
                                            }
                                        </>
                                        <TextField
                                            fullWidth
                                            id="Sección"
                                            name="Sección"
                                            label="Sección electoral"
                                            value={ seccion }
                                            onChange={(event) =>
                                            {
                                                const seccionValue = event.target.value;
                                                setSeccion(seccionValue);
                                                const esValido = seccionValue.length>0;
                                                setErrorSeccion(!esValido);
                                            }
                                            }
                                            error={submitted && errorSeccion}
                                            helperText={submitted && errorSeccion ? 'Campo Obligatorio o no válida': ''}
                                        />
                                    </div>

                                    <div className='flex flex-col gap-4'>
                                        <TextField
                                            fullWidth
                                            id="clave"
                                            name="clave"
                                            label="Clave de elector de la Credencial para votar"
                                            value={ clave }
                                            onChange={(event) => {
                                                const claveValue = event.target.value.toUpperCase();
                                                setClave(claveValue);
                                                const esValido = claveValue.length>=10
                                                setErrorClave(!esValido);
                                            }}
                                            error={submitted && errorClave}
                                            helperText={submitted && errorClave ? 'Campo Obligatorio o no válida': ''}
                                        />

                                        <TextField
                                            label="Teléfono"
                                            value={ numero }
                                            onChange={(event) => {
                                                const regexTelefonoMexico = /^[0-9]{10}$/;
                                                const telefonoValue = event.target.value;
                                                setNumero(telefonoValue);
                                                const fomatoValido = regexTelefonoMexico.test(telefonoValue)
                                                const esValido = fomatoValido && !/(\d)\1{9}/.test(telefonoValue);
                                                setErrorNumero(!esValido);
                                            }
                                            }
                                            error={submitted && errorNumero}
                                            helperText={submitted && errorNumero ? 'Campo Obligatorio o no válida (10 digitos númericos)': ''}
                                            fullWidth
                                        />

                                        <TextField
                                            fullWidth
                                            label="Correo electrónico"
                                            color="primary"
                                            value={ email }
                                            onChange={(event) => {
                                                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                                                const emailValue =  event.target.value;
                                                setEmail(emailValue);
                                                const esValido = emailRegex.test(emailValue);
                                                setErrorEmail(!esValido)
                                            }}
                                            error={submitted && errorEmail}
                                            helperText={submitted && errorEmail ? 'Campo Obligatorio o no válida Ejemplo: example@correo.com': ''}
                                        />
                                    </div>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={informacionAdicionalAceptado}
                                                onChange={() => setInformacionAdicionalAceptado((valor) => !valor)}
                                            />
                                        }
                                        label={
                                            <div className="flex-col sm:flex-row items-start">
                                                <Typography
                                                    variant="body1"
                                                    display="inline"
                                                >
                                                    Acepta envío de información
                                                </Typography>
                                            </div>
                                        }
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={avisoAceptado}
                                                onChange={() => setAvisoAceptado((valor) => !valor)}
                                            />
                                        }
                                        label={
                                            <div className="flex-col sm:flex-row items-start my-0">
                                                <Typography
                                                    variant="body1"
                                                    display="inline"
                                                >
                                                    Acepto

                                                    {' '}

                                                    <span className='font-bold'>
                                                            aviso de Privacidad
                                                        </span>
                                                </Typography>

                                                {' '}

                                                <Link
                                                    href="https://transparencia.movimientociudadano.mx/protecciondedatospersonales"
                                                    target="_blank"
                                                    rel="noopener"
                                                >
                                                    Ver
                                                </Link>
                                            </div>
                                        }
                                    />

                                    <p className='text-xs text-justify'>
                                        <h1 className='font-bold'>COMISIÓN NACIONAL DE CONVENCIONES Y PROCESOS INTERNOS</h1>
                                        <h2 className='font-bold'>Sistema de Personas Ciudadanas que Respaldan las Precandidaturas Aviso de privacidad simplificado</h2>
                                        Movimiento Ciudadano, con domicilio en Louisiana No 113, Colonia Nápoles, Alcaldía Benito Juárez, C.P. 03810, Ciudad de México, es responsable del tratamiento de los datos personales que nos proporcione, los cuales serán protegidos conforme a lo dispuesto por la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados y demás normatividad que resulte aplicable.

                                        <br />    Los datos recabados en el formato de respaldo de la precandidatura, los utilizaremos para las siguientes finalidades: 
                                        <br />    · Verificar y confirmar su identidad, así como la autenticidad de la información que nos proporciona.
                                        <br />    · Integrar expedientes y bases de datos necesarias para registrar, concentrar y consultar a las y los ciudadanos que respaldan las precandidaturas en Movimiento Ciudadano.
                                        <br />    · Tener un medio de comunicación con las personas que respaldan las precandidaturas de Movimiento Ciudadano para proporcionarles información de nuestras actividades y propuestas.
                                        <br />    Adicionalmente, se utilizarán única y exclusivamente para fines estadísticos e informes, la información no estará asociada con la persona titular de los datos personales, por tanto, no será posible asociarlo con ella y en consecuencia no será posible identificarle. Se informa además que, los datos personales recabados no serán transferidos por Movimiento Ciudadano a menos que una autoridad o institución competente lo solicite, ésta debe estar debidamente fundada y motivada. Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos datos personales de identificación y contacto. Si desea mayor información sobre los términos y condiciones en que éstos serán tratados, puede consultar el aviso de privacidad integral del Sistema de Personas Ciudadanas que Respaldan las Precandidaturas en

                                        <br/> <a
                                        href="https://transparencia.movimientociudadano.mx/protecciondedatospersonales"
                                        target="_blank" rel="noopener noreferrer"
                                        className='font-bold'>https://transparencia.movimientociudadano.mx/protecciondedatospersonales</a>
                                    </p>

                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                    >
                                        {
                                            isLoading
                                                ? <CircularProgress size={24} color="inherit"/>
                                                : "Enviar"
                                        }
                                    </Button>
                                </div>
                            </div>
                        </OverlayMenu>
                        : null
                }

                {
                    openingModal && typeModal === 12
                        ?
                        <OverlayMenu className='overlay appear max-md:px-0 px-4'>
                            <div
                                className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl min-h-[50vh] max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'>
                                <div className="top-2 right-2 absolute flex items-center">
                                    <button
                                        onClick={handleModalClose}
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

                                <div className='pt-[3rem] h-full flex gap-4 flex-col'>
                                    <Container
                                        className='p-[20px] ml-auto mr-auto'
                                        maxWidth={'lg'}
                                    >
                                        <div className='subtitles w-full text-center'>
                                            Movimiento Ciudadano
                                        </div>

                                        <div className='titles w-full text-center break-words text-mc text-black'>
                                            <span
                                                className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                                Comparte tu código QR
                                            </span>
                                        </div>
                                    </Container>

                                    <div className='w-full'>
                                        <img className='max-w-md shadow-lg p-4 m-auto'
                                             src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${location.href}`}
                                             alt=""/>
                                    </div>
                                </div>
                            </div>
                        </OverlayMenu>
                        : null
                }
            </CustomLayout>
        </div>
    );
};

export default ApoyarCandidato;