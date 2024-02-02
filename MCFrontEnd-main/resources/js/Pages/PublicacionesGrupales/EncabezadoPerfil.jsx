import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';
import CustomTarjetasInfo from '@/Components/Customized/CustomComponents/CustomTarjetasInfo';
import fallback_url from '../PerfilesGrupales/imagen-componentes.png';
import fallback_url2 from '../PerfilesGrupales/test.png';
import fallback_url3 from '../PerfilesGrupales/test.png';
export const LogoNaranja = () => {

}

const EncabezadoPerfil = (props) => {
    const {
        nombre,
        frase,
        seguidores,
        eventos,
        validaciones,
        fotoPerfil,
        onFormularioEditarModalOpen,
        onFotoEditarModalOpen,
        editable,
        followed,
        following,
        perfil,
        profile,
        user,
        perfilGrupal
    } = props;

    const [imageData, setImageData] = useState(null);

    const getProfileImage = async () => {
        try {
            const response = await axios.get(route('get.perfil.grupal.foto', perfilGrupal.perfilGrupal.id ), {
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

    useEffect(() => {
        getProfileImage();
    }, []);

    const handleFollowButton = () => {
        const body = {
            seguidoId: perfil.id,
            seguidorId: profile.id
        };

        const formData = new FormData();
        formData.append('data', JSON.stringify(body));

        axios.post(route('post.perfil.follow'), formData)
            .then(async (response) => {
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
            });
    };

    return (
        <div className='w-full relative z-30 h-auto'>
            <div className=''>
                <div>
                    <div>
                        <div
                            className='absolute top-0 left-0 w-full h-full'
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${fallback_url2})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover'
                            }}
                        ></div>
                    </div>
                    <div className='max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 pt-20 pb-6'>
                        <div className='grid grid-cols-4 gap-4 md:[&>*:last-child]:col-span-3 md:translate-y-10 max-md:grid-cols-1'>
                            <div>
                                <div className={`max-md:h-64 shadow-lg relative rounded-2xl overflow-hidden flex items-center bg-mc-primary md:bottom-[-5%] md:aspect-square`}
                                    style={{
                                        backgroundImage: `url(${fotoPerfil ?? fallback_url3}), url(${fallback_url3})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundColor: 'rgba(0, 0, 0, 0.45)'
                                    }}
                                    >
                                    <img
                                        src={imageData ?? fallback_url}
                                        alt="Imagen de perfil"
                                        className={'w-full h-full md:max-h-72 object-cover object-center'}
                                    />
                                    <div className='absolute top-0 right-0'>
                                        {
                                            editable
                                            ?   <Button className='opacity-80 hover:opacity-100 transition-all' onClick={ onFotoEditarModalOpen } sx={{ padding: 0, minWidth: 0 }}>
                                                    <EditIcon className='rounded p-1 bg-purple-900'/>
                                                </Button>
                                            :   null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex flex-col gap-1 py-1'>
                                <div className='w-full max-w-4xl pl-4 mx-auto relative' style={{ containerType: 'inline-size' }}>
                                    <h1 className='max-md:text-center max-md:text-3xl font-black text-5xl tracking-wide whitespace-nowrap overflow-hidden text-ellipsis py-2'
                                        style={{
                                            fontFamily: 'Poppins, sans-serif',
                                            color: 'transparent',
                                            WebkitTextStroke: 'calc(1px + (1.5 - 1.7) * ((50vw - 375px)/(1920 - 375))) rgb(255 255 255)',
                                          }} >{nombre}
                                    </h1>
                                    <div className='absolute top-0 right-0'>
                                        {
                                            editable
                                            ?   <Button className='opacity-80 hover:opacity-100 transition-all' onClick={ onFormularioEditarModalOpen } sx={{ padding: 0, minWidth: 0 }}>
                                                    <EditIcon className='rounded p-1 bg-purple-900'/>
                                                </Button>
                                            :   null
                                        }
                                    </div>
                                </div>
                                
                                <div className='w-full relative'>
                                    <h1 className='text-white ml-4 max-md:text-center max-md:text-sm font-medium tracking-wider text-xl'
                                        style={{
                                            fontFamily: 'Poppins, sans-serif',
                                        }} > 
                                        { frase }
                                    </h1>
                                </div>
                                <div className='w-full rounded-md pl-4 pb-10 max-md:mt-2'>

                                    <CustomTarjetasInfo
                                        seguidores={ seguidores }
                                        eventos={ eventos }
                                        followable={ perfil?.id != profile?.id }
                                        followed={ following }
                                    /> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EncabezadoPerfil;