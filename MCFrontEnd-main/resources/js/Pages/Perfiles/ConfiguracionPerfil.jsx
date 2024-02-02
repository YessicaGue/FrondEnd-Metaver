import React, { useState } from 'react';
import CustomLayout from '@/Layouts/CustomLayout';
import { Head } from '@inertiajs/react';
import {
    Container,
    InputAdornment,
    SvgIcon,
    TextField,
    Switch,
    Button
} from '@mui/material';
import {
    Facebook as FacebookIcon,
    Instagram as InstagramIcon,
    WhatsApp as WhatsAppIcon,
    LinkedIn as LinkedInIcon
} from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';

const readFileAsArrayBuffer = (event) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = (event) => resolve(event.target.result);
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsArrayBuffer(event.target.files[0]);
    });
};

const ConfiguracionPerfil = (props) => {
    const { auth: { user, perfil } } = props;
    const precandidatura = props.precandidatura?.[0] ?? props.precandidatura;
    const username = user?.username;
    const url = user?.perfil_data?.url;
    const [nombre, setNombre] = useState(user?.name ?? '');
    const [puesto, setPuesto] = useState(user?.puesto ?? '');
    const [descripcion, setDescripcion] = useState(user?.descripcion ?? '');
    const [urlFacebook, setUrlFacebook] = useState(perfil.redesSociales.find((redSocial) => redSocial.redSocial.id == 1)?.url ?? '');
    const [urlInstagram, setUrlInstagram] = useState(perfil.redesSociales.find((redSocial) => redSocial.redSocial.id == 2)?.url ?? '');
    const [urlTwitter, setUrlTwitter] = useState(perfil.redesSociales.find((redSocial) => redSocial.redSocial.id == 3)?.url ?? '');
    const [urlTiktok, setUrlTiktok] = useState(perfil.redesSociales.find((redSocial) => redSocial.redSocial.id == 4)?.url ?? '');
    const [urlWhatsapp, setUrlWhatsapp] = useState(perfil.redesSociales.find((redSocial) => redSocial.redSocial.id == 5)?.url ?? '');
    const [urlLinkedin, setUrlLinkedin] = useState(perfil.redesSociales.find((redSocial) => redSocial.redSocial.id == 6)?.url ?? '');
    const [customUrl, setCustomUrl] = useState(perfil.customUrl ?? '');
    const [esPublico, setEsPublico] = useState(perfil.esPublico ?? true);

    const [charCountDescripcion, setCharCountDescripcion] = useState(perfil?.descripcion?.length ?? 0);
    const [imagenPerfilBlob, setImagenPerfilBlob] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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

        const base = `data:image/jpeg;base64,${base64Image}`;

        return {
            file,
            base,
        };
    };

    const handleSubmitProfilePhoto = async () => {
        const formData = new FormData();
        formData.append('file', new Blob([imagenPerfilBlob]));

        try {
            const response = await axios.post(route('post.perfil.foto'), formData);

            if (response.status !== 200) {
                return Swal.fire({
                    text: `La foto de perfil no ha podido ser actualizada. Por favor, inténtalo más tarde.`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });
            }
        } catch (err) {
            if (err?.response?.status === 419) {
                await Swal.fire({
                    text: `Tu sesión ha expirado. Por favor, vuelve a iniciar sesión`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });

                return location.replace(route("login"));
            }

            await Swal.fire({
                text: `Error: ${JSON.stringify(err)}`,
                icon: 'info',
                confirmButtonText: 'Aceptar',
            });
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true);

        imagenPerfilBlob && handleSubmitProfilePhoto();

        const body = {
            nombre,
            username,
            descripcion,
            puesto,
            urlFacebook,
            urlInstagram,
            urlTwitter,
            urlWhatsapp,
            urlTiktok,
            urlLinkedin,
            customUrl,
            esPublico,
            url,
        };

        try {
            await axios.put(route('put.perfil'), body);

            await Swal.fire({
                text: `Tus datos han sido cambiados exitosamente.`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });

            setIsLoading(false);
        } catch (error) {
            if (error?.response?.status === 419) {
                await Swal.fire({
                    text: `Tu sesión ha expirado. Por favor, vuelve a iniciar sesión`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });
            } else {
                await Swal.fire({
                    text: `No se pudo cambiar la información. Por favor, inténtalo más tarde`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CustomLayout
            visible={ true }
            user={ user }
        >
            <Head title="Editar perfil" />

            <div className='w-full relative z-30'>
                <div className='max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 pt-[calc(25px+5vw+5vh)] pb-4'>
                    <Container
                        className='pb-[20px] ml-auto mr-auto'
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

                    <section className='flex flex-col gap-10 w-full'>
                        <div className='grid grid-cols-[auto_1fr] max-md:grid-cols-1 max-md:gap-3 gap-6 [&>*:nth-child(odd)]:md:text-right [&>*:nth-child(odd)]:md:max-w-[142px] [&>*:nth-child(odd)]:font-bold  md:mt-8'>
                            <h1 className='font-[Poppins] text-2xl text-[#232020] pb-8'>
                                Editar perfil
                            </h1>
                            <span></span>

                            <h1 className='uppercase tracking-wide text-xs'>
                                Datos personales
                            </h1>
                            <span className='h-[1px] bg-[#ddd] my-auto'></span>

                            <label
                                htmlFor=''
                                className='my-auto'
                            >
                                Foto de perfil
                            </label>
                            <div className='flex flex-col gap-2'>
                                {/* <div className='h-20 w-20 bg-slate-900 flex justify-center items-center rounded-lg overflow-hidden'>
                                    <img src={ imagenPerfil } alt="" />
                                </div> */}

                                <Button color="primary" component="label">
                                    <div className='w-full font-[Poppins]'>
                                        Subir foto de perfil
                                    </div>

                                    <input
                                        type="file"
                                        hidden
                                        onChange={async (event) => {
                                            const { file, base } = await handlePictureUpload(event);
                                            setImagenPerfilBlob(file);
                                            setImagenPerfil(base);
                                        }}
                                    />
                                </Button>
                            </div>

                            <label
                                htmlFor=''
                                className='my-auto'
                            >
                                Nombre
                            </label>
                            <TextField
                                color='primary'
                                className='font-[Poppins]'
                                value={ nombre }
                                onChange={(event) => setNombre(event.target.value)}
                            />

                            <label
                                htmlFor=''
                                className='my-auto'
                            >
                                Puesto
                            </label>
                            <TextField
                                color='primary'
                                className='font-[Poppins]'
                                value={ puesto }
                                onChange={(event) => setPuesto(event.target.value)}
                            />

                            <label
                                htmlFor=''
                                className='my-auto'
                            >
                                Acerca de
                            </label>
                             <TextField
                                fullWidth
                                type="text"
                                className="w-full text-gray-500 py-2 my-4"
                                value={ descripcion }
                                onChange = {(event) => setDescripcion(event.target.value)}
                                label="Descripción"
                                color="primary"
                            />
                        </div>

                        <div className='grid grid-cols-[auto_1fr] max-md:grid-cols-1 max-md:gap-3 gap-6 [&>*:nth-child(odd)]:md:text-right [&>*:nth-child(odd)]:md:max-w-[142px] [&>*:nth-child(odd)]:font-bold  md:mt-8'>
                            <h1 className='uppercase tracking-wide text-xs'>
                                RRSS
                            </h1>
                            <span className='h-[1px] bg-[#ddd] my-auto'></span>

                            <label
                                htmlFor=''
                                className='my-auto'
                            >
                                Enlace de Facebook
                            </label>
                            <TextField
                                color="primary"
                                placeholder = "Ejemplo: https://www.facebook.com/profile.php?id=ejemplo"
                                value={ urlFacebook }
                                onChange={(event) => setUrlFacebook(event.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FacebookIcon sx={{ color: '#1877F2' }}/>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <label
                                htmlFor=''
                                className='my-auto'
                            >
                                Enlace de Instagram
                            </label>
                            <TextField
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

                            <label
                                htmlFor=''
                                className='my-auto'
                            >
                                Enlace de X (Twitter)
                            </label>
                            <TextField
                                color="primary"
                                placeholder="Ejemplo: https://twitter.com/ejemplo"
                                value={ urlTwitter }
                                onChange={(event) => setUrlTwitter(event.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="1em"
                                                    viewBox="0 0 512 512"
                                                >
                                                    <path
                                                        d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                                                    />
                                                </svg>
                                            </SvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <label
                                htmlFor=''
                                className='my-auto'
                            >
                                Enlace de TikTok
                            </label>
                            <TextField
                                color="primary"
                                placeholder="Ejemplo: https://www.tiktok.com/@ejemplo?_t=8eHssNtnWOk&_r=1"
                                value={ urlTiktok }
                                onChange={(event) => setUrlTiktok(event.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="1em"
                                                    viewBox="0 0 448 512"
                                                >
                                                    <path
                                                        d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
                                                    />
                                                </svg>
                                            </SvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <label
                                htmlFor=''
                                className='my-auto'
                            >
                                WhatsApp
                            </label>
                            <TextField
                                color="primary"
                                placeholder="Ingrese el número de teléfono"
                                value={ urlWhatsapp && urlWhatsapp.replace('https://wa.me/', '') }
                                onChange={(event) => {
                                    const numeroTelefono = event.target.value;
                                    const hasHttps = numeroTelefono.includes('https://wa.me/');
                                    const valor = hasHttps
                                        ? numeroTelefono
                                        : `https://wa.me/${numeroTelefono}`;

                                    setUrlWhatsapp(valor);
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <WhatsAppIcon sx={{ color: 'green' }}/>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <label
                                htmlFor=''
                                className='my-auto'
                            >
                                Enlace de LinkedIn
                            </label>
                            <TextField
                                color="primary"
                                placeholder="Ejemplo: www.linkedin.com/in/ejemplo-b50070197"
                                value={ urlLinkedin }
                                onChange={(event) => setUrlLinkedin(event.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LinkedInIcon sx={{ color: '#0e76a8' }}/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>

                        <div className='grid grid-cols-[auto_1fr] max-md:grid-cols-1 max-md:gap-3 gap-6 [&>*:nth-child(odd)]:md:text-right [&>*:nth-child(odd)]:md:max-w-[142px] [&>*:nth-child(odd)]:font-bold md:mt-8'>
                            <h1 className='uppercase tracking-wide text-xs'>
                                Configuraciones de perfil
                            </h1>
                            <span className='h-[1px] bg-[#ddd] my-auto'></span>

                            <label
                                htmlFor=''
                                className='my-auto'
                            >
                                URL personalizada
                            </label>
                            <TextField
                                color='primary'
                                placeholder='Ejemplo: juan-perez'
                                className='font-[Poppins]'
                                value={ customUrl }
                                onChange={(event) => setCustomUrl(event.target.value)}
                            />

                            <span></span>
                            <div className='text-xs mt-[-15px]'>
                                <p>* La URL personalizada te permitirá crear una URL de tu perfil mucho más amigable que una URL predefinida</p>

                                <div className='grid grid-cols-4 [&>*:nth-child(even)]:col-span-3 max-md:grid-cols-1 my-2'>
                                    <p className='p-1 md:text-right'>
                                        Una URL predefinida se ve así:
                                    </p>
                                    <span className='my-auto text-[#ff3f65]'>https://public.ciudadanosenmovimiento.org/perfil?id=2e978a66-f1f5-4836-a5a6-a7dd48c8b4b4</span>

                                    <p className='p-1 md:text-right'>
                                        Y una URL personalizada luce así:
                                    </p>
                                    <span className='my-auto text-[#1d5114]'>https://public.ciudadanosenmovimiento.org/perfil/juan-perez</span>
                                </div>

                                <p>* Puedes elegir libremente tu URL personalizada, solo debes tener en cuenta que los espacios serán reemplazados por guiones medios, que las letras mayúsculas serán reemplazadas por letras minúsculas y que los caracteres especiales serán borrados (a excepción de los números).</p>
                            </div>

                            <label
                                htmlFor=''
                                className='my-auto'
                            >
                                Perfil público
                            </label>
                            <div>
                                <Switch
                                    checked={ esPublico }
                                    onChange={() => setEsPublico((value) => !value)}
                                />
                            </div>

                            <span></span>
                            <div className='text-xs mt-[-15px]'>
                                <p>* Si tu perfil es público, cualquier persona dentro y fuera del Multiverso Naranja podrá ver tus publicaciones, incluso quienes no tengan un perfil del Multiverso Naranja.</p>

                                <p>* Si tu perfil no es público, solo las personas que tengan un perfil del Multiverso Naranja podrán ver tus publicaciones.</p>
                            </div>

                            <span className='h-[1px] bg-[#ddd] my-auto'></span>
                            <span className='h-[1px] bg-[#ddd] my-auto'></span>

                            <label
                                htmlFor=''
                                className='my-auto'
                            >
                                Aceptar y guardar
                            </label>
                            <Button
                                variant='contained'
                                color='primary'
                                className='md:w-max'
                                onClick={ handleSubmit }
                                disabled={ isLoading }
                                sx={{
                                    fontFamily: 'Poppins, sans-serif'
                                }}
                            >
                                {
                                    !isLoading ? 'Guardar cambios' : 'Enviando'
                                }
                            </Button>

                            <span className='h-[1px] bg-[#ddd] my-auto'></span>
                            <span className='h-[1px] bg-[#ddd] my-auto'></span>
                        </div>
                    </section>
                </div>
            </div>
        </CustomLayout>
    );
};

export default ConfiguracionPerfil;