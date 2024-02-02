import React, {useEffect, useState} from 'react';
import {Button, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import { Instagram as InstagramIcon, Twitter as TwitterIcon, WhatsApp as WhatsAppIcon, LinkedIn as LinkedInIcon  } from '@mui/icons-material';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';
import fallback_url from './imagen-componentes.png';
import Swal from 'sweetalert2';
import CustomUsuarios from '@/Components/Customized/CustomComponents/CustomUsuarios';
import { LoginMoodle } from '@/utils/Moodle';
import { IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

export const LogoNaranja = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.7 44.999">
            <g id="logo-mc" transform="translate(-397.697 -210.334)">
                <g id="Group_2" data-name="Group 2" transform="translate(397.697 210.334)">
                    <g id="Group_1" data-name="Group 1" transform="translate(0 0)">
                        <path
                            id="Path_1"
                            data-name="Path 1"
                            d="M430.162,230.867a18.745,18.745,0,0,1,3.011-1.516c.541-.224,1.076-.449,1.609-.671.55-.244,1.094-.494,1.621-.793a12.667,12.667,0,0,0,1.528-.986,9.045,9.045,0,0,0,.7-.595c.109-.106.226-.2.331-.318l.312-.341a7.574,7.574,0,0,0,1.658-3.194c.069-.285.11-.571.163-.853.027-.292.061-.6.075-.872v-.791c-.012-.264-.027-.525-.049-.781-.026-.306-.062-.7-.1-1,0,0-.079-.3-.323-.319-.2-.037-.918.495-1.334.825.03.2.066.384.078.606s.018.466.019.7-.016.477-.024.718c-.027.216-.052.433-.078.651-.049.221-.086.449-.144.669l-.1.327-.05.164-.066.157-.131.317c-.051.1-.108.2-.16.306a5.6,5.6,0,0,1-.359.593c-.064.1-.144.186-.215.281a2.816,2.816,0,0,1-.228.273c-.021.024-.044.046-.067.07a11.35,11.35,0,0,1-.631-3.62c.225-2.085,3.131-3.694,3.5-3.651s.512.8.512.8,1.236-2.364.377-2.944a2.237,2.237,0,0,0-1.384-.179c-.149-.436-.31-.858-.491-1.262a7.4,7.4,0,0,0-1.391-2.195,2.565,2.565,0,0,0-.6-.446c-.067-.031-.126-.059-.205-.087a1.934,1.934,0,0,0-.282-.066l-.065,0-.031,0h-.017c-.131-.006-.051,0-.086,0-.068,0-.14.009-.2.019a2.948,2.948,0,0,0-1.151.49,11.892,11.892,0,0,0-1.429,1.172c-.038.035-.076.069-.112.1a3.291,3.291,0,0,0-.436.4l-.173.151c-.531.381-1.044-.044-1.312-.346a10.889,10.889,0,0,0-2.329-2.484c-.5-.106-1.164.794-.891,1.479a.636.636,0,0,0,.121.109c.077.054.038-.529.3-.476s.3.939.534,1.125a.708.708,0,0,1-.9-.044l-.206-.186c-.1-.093-.205.315.052.532a2.186,2.186,0,0,0,.847.533c.245.088,1.034.371,1.875.763,1.36.87,2.068.2,2.068.2.048-.028.093-.056.139-.087.389-.262.747-.575,1.153-.91a11.162,11.162,0,0,1,1.333-.986,1.808,1.808,0,0,1,.675-.265.171.171,0,0,1,.03,0l.019,0,.064.008c.013.009-.02.011-.026,0a.182.182,0,0,0,.036.021,1.379,1.379,0,0,1,.254.221,6.369,6.369,0,0,1,1.01,1.825c.111.281.242.685.336.991-.239.067-.392.116-.392.116a.894.894,0,0,0-1.037-.646,10.736,10.736,0,0,0-2.456,1.446,3.873,3.873,0,0,1-2.3.648,1.642,1.642,0,0,0,.86.952,6.578,6.578,0,0,0-1.73,2.456h0a17.828,17.828,0,0,0-1.365,4.318,6.14,6.14,0,0,1-1.078-.2,22.034,22.034,0,0,1-2.585-.969,3.287,3.287,0,0,1-1.418-5.213s2.025-2.223-1.843-4.066a18.083,18.083,0,0,0-6.533-1.586c-3.639-.155-13.539-.4-19.153-1.178,0,0,7.118,6.667,9.511,8.787a3.939,3.939,0,0,0,2.7,1.018,32.642,32.642,0,0,0,5.8-.79,8.563,8.563,0,0,1-3.855,1.8s2.114,4.221,5.067,5.918a3.373,3.373,0,0,0,2,.367,14.769,14.769,0,0,0,3.977-1.205s-.911,1.367-3.79,2.11a19.5,19.5,0,0,0,7.174,3.319,2.555,2.555,0,0,0,1.276,2.446,4.2,4.2,0,0,1,.448-1.965A5.887,5.887,0,0,1,430.162,230.867Z"
                            transform="translate(-397.697 -210.334)"
                            fill="#ff8300"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

const EncabezadoPerfil = (props) => {
    const user = props.auth?.user ?? {};
    // const perfil = user?.perfil_data ?? {};
    const precandidatura = props.precandidatura?.[0] ?? props.precandidatura;
    const {
        onFormularioEditarModalOpen,
        onFotoEditarModalOpen,
        editable,
        followable,
        followed,
        perfil,
        usuario,
        urlFacebook,
        urlInstagram,
        urlTwitter,
        urlTiktok,
        urlWhatsapp,
        urlLinkedin,
        wip,
        estaInscritoCHC,
        registroDatosFaltantesCHC,
        esInicioEtapaRegistro,
        esUltimaEtapaRegistro,
        etapaActualRegistro,
        etapaActualCamino,
        etapasCompletasRegistro,
        onFollowersModalOpen,
        isVisible,
    } = props;

    const {
        name: nombre,
        puesto,
    } = usuario;

    const {
        seguidores,
        siguiendo,
        eventos,
        fotoPerfil,
    } = perfil;

    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        const getProfileImage = async () => {
            try {
                const response = await axios.get(route('get.perfil.foto', { id: perfil.perfil.id }), {
                    responseType: 'arraybuffer',
                });

                const base64Image = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                );

                const imageDataUrl = `data:image/jpeg;base64,${base64Image}`;
                setImageData(imageDataUrl);
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };

        if (usuario && !wip)
            getProfileImage();
    }, [usuario]);

    const handleFollowButton = () => {
        if (!isVisible) {
            return Swal.fire({
                text: 'Debes iniciar sesión para poder seguir este perfil',
                icon: 'info',
            });
        }

        let addToCircle = false;
        Swal.fire({
            title: 'Agregar a Círculo',
            text: 'Estás a punto de seguir a este perfil, ¿Deseas agregarlo a tu círculo?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, agregar a círculo',
            cancelButtonText: 'No',
            cancelButtonColor: '#d33',
            showCloseButton: true,
        }).then((result)=>{
            if(result.dismiss === Swal.DismissReason.close){
                return;
            }
            if(result.isConfirmed){
                addToCircle = true;
            }
            const body = { seguidoId: perfil.perfil.id , addToCircle: addToCircle };

            const formData = new FormData();
            formData.append('data', JSON.stringify(body));

            axios.post(route('post.perfil.follow'), formData)
                .then(async (response) => {
                    console.log(response);
                    if (response.status !== 200 || !response.data.success)
                        return Swal.fire({
                            title: `Algo salió mal al intentar seguir este perfil. Por favor, inténtalo más tarde.`,
                            icon: 'info',
                            confirmButtonText: 'Aceptar',
                        });

                    await Swal.fire({
                        title: `Ahora ya sigues este perfil`,
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                    });

                    location.reload();
                })
                .catch((err) => {
                    console.log(err)
                });
        });
    };

    return (
        <TrailAppear>
            <div className='bg-white w-full shadow-md pb-8'>
                <div className='max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 pt-[calc(25px+5vw+5vh)] pb-4'>
                    <div className='mb-6 grid grid-cols-4'>
                        <div className='grid col-span-3'></div>
                        <div className='grid col-span-1'>
                            <a
                                href="/lista-perfiles-grupales"
                                className='w-full text-center text-white font-bold px-4 py-2 rounded cursor-pointer hover:transition-transform hover:scale-90 duration-200 cursor-pointer'
                                style={{ backgroundColor: '#6b897d' }}
                                target='_blank'
                            >
                                <IconButton color="inherit">
                                    <AccountCircle />
                                </IconButton>
                                Directorio
                            </a>
                        </div>
                    </div>

                    <div className='grid gap-2 grid-cols-2 w-full max-sm:grid-cols-1'>
                        <div className='max-sm:order-last'>
                            <div className='w-full mt-8 relative'>
                                <Typography
                                    variant='h3'
                                    fontWeight='700'
                                    className='max-sm:text-center'
                                    style={{
                                        fontFamily: 'Poppins, sans-serif',
                                        color: 'transparent',
                                        WebkitTextStroke: 'calc(2px + (1.5 - 1.7) * ((50vw - 375px)/(1920 - 375))) rgb(255 131 0)',
                                        fontSize: 'calc(36px + 1vw)',
                                        lineHeight: 'calc(36px + 1vw)'
                                    }}
                                >
                                    { nombre }
                                </Typography>

                                <div className='absolute top-[-2rem] right-0'>
                                    {
                                        editable
                                        ?   onFormularioEditarModalOpen &&
                                            <Button className='opacity-80 hover:opacity-100' onClick={() => location.replace(route("perfil.settings.page"))} sx={{ padding: 0, minWidth: 0 }}>
                                                <EditIcon className='text-white rounded p-1 bg-purple-900' />
                                            </Button>
                                        :   null
                                    }
                                </div>
                            </div>

                            <div className='mt-4 mb-4'>
                                <Typography
                                    variant='h3'
                                    fontWeight='700'
                                    className='text-black max-sm:text-center'
                                    style={{
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: 'calc(18px + .5vw)',
                                        lineHeight: 'calc(18px + .5vw)'
                                    }}
                                >
                                    { puesto }

                                <div>
                                    <button className='bg-black rounded-lg text-white text-lg px-4 py-1 font-bold mt-4' onClick={() => { location.replace(route("apoyar.candidato.page", { id: perfil.perfil?.alias?.replace(/\s/g, '') ?? '' } )) }}> Apoyo a la Precandidatura</button>
                                </div>

                                    {
                                        isVisible
                                        ?   <a className='ml-40'>
                                                {urlInstagram && <a href={urlInstagram} target="_blank" rel="noopener noreferrer"><InstagramIcon className='mx-1' /></a>}
                                                {urlFacebook && <a href={urlFacebook} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} className='mx-2 pt-1 text-xl'  /></a>}
                                                {urlTwitter && <a href={urlTwitter} target="_blank" rel="noopener noreferrer"><TwitterIcon className='' /></a>}
                                                {urlWhatsapp && <a href={urlWhatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className='' /></a>}
                                                {urlLinkedin && <a href={urlLinkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon className='' /></a>}
                                                {urlTiktok && <a href={urlTiktok} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTiktok} className='' /></a>}
                                            </a>
                                        :   null
                                    }
                                    
                                </Typography>
                            </div>

                            {
                                followable
                                ?   <div className='max-md:mx-auto w-full max-md:flex justify-center items-center'>
                                        <Button
                                            variant={`${!followed ? 'outlined' : 'contained'}`}
                                            color='secondary'
                                            style={{ fontFamily: 'Poppins, sans-serif' }}
                                            onClick={ () => !followed ? handleFollowButton() : null }
                                        >
                                            {
                                                !followed ? 'Seguir' : 'Ya sigues este perfil'
                                            }
                                        </Button>
                                    </div>
                                :   null
                            }

                            {/* <div className='max-md:mx-auto w-full max-md:flex max-sm:justify-center max-sm:items-center'>
                                <Button
                                    variant={`contained`}
                                    color='secondary'
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                    onClick={async () => {
                                        try {
                                            await axios.get(route('eject.to.dashboard'));

                                            // location.href = 'http://127.0.0.1:8000/eventos';
                                        } catch (err) {

                                        }
                                    }}
                                >
                                    Crear usuario dashboard
                                </Button>
                            </div> */}

                            {/*{*/}
                            {/*    editable*/}
                            {/*    ?   <button*/}
                            {/*            className='bg-gradient-to-r from-red-600 to-orange-400 text-white text-xl rounded-xl font-bold px-6 py-2 mt-10'*/}
                            {/*            onClick={() => location.replace(*/}
                            {/*                (etapasCompletasRegistro && etapaActualCamino) ?*/}
                            {/*                    route(etapaActualCamino.nombreUrlRoute) :*/}
                            {/*                    (etapaActualRegistro ? route(etapaActualRegistro.nombreURLRoute):route('iniciocc.page'))*/}
                            {/*            )}*/}
                            {/*        >*/}
                            {/*            {*/}
                            {/*                esInicioEtapaRegistro?'Inicia tu camino al Heroe Ciudadan@':*/}
                            {/*                    (!etapasCompletasRegistro ? 'Continúa tu registro'*/}
                            {/*                        : 'Continúa Camino del Héroe Ciudadan@')*/}
                            {/*            }*/}
                            {/*        </button>*/}
                            {/*    :   null*/}
                            {/*}*/}
                        </div>

                        <div className='grid gap-2 grid-cols-2 max-sm:grid-cols-1 w-full relative h-full'>
                            <span className='w-[1px] h-full bg-mc-primary absolute max-sm:hidden'></span>

                            <div className='absolute right-0 top-1 sm:pt-[10%] max-sm:w-full w-5/6 h-full opacity-25'>
                                <LogoNaranja/>
                            </div>
                            <div className='max-sm:order-last flex max-sm:justify-center sm:flex-col justify-evenly h-full gap-8 w-min m-auto'>
                                {/* <div
                                    className="p-1 max-sm:w-[100px]"
                                    onClick={ onFollowersModalOpen }
                                >
                                    <div className='hover:transition-transform hover:scale-75 duration-300 relative text-center rounded-lg p-2 m-auto cursor-pointer group overflow-hidden hover:bg-[rgba(255,255,255,0.8)] hover:shadow-lg'>
                                        <Typography
                                            variant='h3'
                                            fontWeight='700'
                                            className='text-black text-center'
                                            style={{
                                                fontFamily: 'Poppins, sans-serif',
                                                fontSize: 'calc(26px + 1vw)',
                                                lineHeight: 'calc(26px + 1vw)'
                                            }}
                                        >
                                            { seguidores?.length ?? 0 }
                                        </Typography>

                                        <Typography
                                            variant='h3'
                                            fontWeight='600'
                                            className='text-center'
                                            style={{
                                                color: '#606060',
                                                fontFamily: 'Poppins, sans-serif',
                                                fontSize: 'calc(12px + .5vw)',
                                                lineHeight: 'calc(12px + .5vw)'
                                            }}
                                        >
                                            seguidores
                                        </Typography>

                                    </div>
                                </div> */}

                                {/* <div className="p-1 max-sm:w-[100px]">
                                    <div className='hover:transition-transform hover:scale-75 duration-200 relative rounded-lg p-2 m-auto cursor-pointer group overflow-hidden hover:bg-[rgba(255,255,255,0.8)] hover:shadow-lg'>
                                        <Typography
                                            variant='h3'
                                            fontWeight='700'
                                            className='text-black text-center'
                                            style={{
                                                fontFamily: 'Poppins, sans-serif',
                                                fontSize: 'calc(26px + 1vw)',
                                                lineHeight: 'calc(26px + 1vw)'
                                            }}
                                        >
                                            { eventos?.length ?? 0 }
                                        </Typography>

                                        <Typography
                                            variant='h3'
                                            fontWeight='600'
                                            className='text-mc-primary text-center'
                                            style={{
                                                color: '#606060',
                                                fontFamily: 'Poppins, sans-serif',
                                                fontSize: 'calc(12px + .5vw)',
                                                lineHeight: 'calc(12px + .5vw)'
                                            }}
                                        >
                                            eventos
                                        </Typography>
                                    </div>
                                </div> */}

                                {/* <div className="p-1 max-sm:w-[100px]">
                                    <Typography
                                        variant='h3'
                                        fontWeight='700'
                                        className='text-mc-primary text-center'
                                        style={{
                                            fontFamily: 'Poppins, sans-serif',
                                            fontSize: 'calc(26px + 1vw)',
                                            lineHeight: 'calc(26px + 1vw)'
                                        }}
                                    >
                                        { siguiendo?.length ?? 0 }
                                    </Typography>

                                    <Typography
                                        variant='h3'
                                        fontWeight='600'
                                        className='text-mc-primary text-center'
                                        style={{
                                            fontFamily: 'Poppins, sans-serif',
                                            fontSize: 'calc(12px + .5vw)',
                                            lineHeight: 'calc(12px + .5vw)'
                                        }}
                                    >
                                        siguiendo
                                    </Typography>
                                </div> */}
                            </div>                                
                            <div
                                className='cursor-pointer max-sm:h-64 max-sm:w-full shadow-lg top-[50%] translate-y-[-50%] relative rounded-2xl overflow-hidden flex items-center justify-center bg-mc-primary aspect-square'
                                style={{
                                    backgroundImage: `url(${fotoPerfil ?? fallback_url}), url(${fallback_url})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover'
                                }}
                            >
                                <img
                                    src={imageData ?? fallback_url}
                                    alt="Imagen de perfil"
                                    className={'w-full h-full object-cover object-center aspect-square'}
                                />

                                <div className='absolute top-0 right-0'>
                                {
                                    editable
                                    ?   <Button className='opacity-80 hover:opacity-100 transition-all' onClick={ onFotoEditarModalOpen } sx={{ padding: 0, minWidth: 0 }}>
                                            <EditIcon className='text-white rounded p-1 bg-purple-900' />
                                        </Button>
                                    :   null
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TrailAppear>
    );
};

export default EncabezadoPerfil;
