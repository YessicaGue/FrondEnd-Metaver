import { useState, useEffect, useCallback } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';
import { HeadsetMicOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2';

export const LogoNaranja = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.7 44.999">
            <path 
                id="Path_1"
                data-name="Path 1"
                d="M430.162,230.867a18.745,18.745,0,0,1,3.011-1.516c.541-.224,1.076-.449,1.609-.671.55-.244,1.094-.494,1.621-.793a12.667,12.667,0,0,0,1.528-.986,9.045,9.045,0,0,0,.7-.595c.109-.106.226-.2.331-.318l.312-.341a7.574,7.574,0,0,0,1.658-3.194c.069-.285.11-.571.163-.853.027-.292.061-.6.075-.872v-.791c-.012-.264-.027-.525-.049-.781-.026-.306-.062-.7-.1-1,0,0-.079-.3-.323-.319-.2-.037-.918.495-1.334.825.03.2.066.384.078.606s.018.466.019.7-.016.477-.024.718c-.027.216-.052.433-.078.651-.049.221-.086.449-.144.669l-.1.327-.05.164-.066.157-.131.317c-.051.1-.108.2-.16.306a5.6,5.6,0,0,1-.359.593c-.064.1-.144.186-.215.281a2.816,2.816,0,0,1-.228.273c-.021.024-.044.046-.067.07a11.35,11.35,0,0,1-.631-3.62c.225-2.085,3.131-3.694,3.5-3.651s.512.8.512.8,1.236-2.364.377-2.944a2.237,2.237,0,0,0-1.384-.179c-.149-.436-.31-.858-.491-1.262a7.4,7.4,0,0,0-1.391-2.195,2.565,2.565,0,0,0-.6-.446c-.067-.031-.126-.059-.205-.087a1.934,1.934,0,0,0-.282-.066l-.065,0-.031,0h-.017c-.131-.006-.051,0-.086,0-.068,0-.14.009-.2.019a2.948,2.948,0,0,0-1.151.49,11.892,11.892,0,0,0-1.429,1.172c-.038.035-.076.069-.112.1a3.291,3.291,0,0,0-.436.4l-.173.151c-.531.381-1.044-.044-1.312-.346a10.889,10.889,0,0,0-2.329-2.484c-.5-.106-1.164.794-.891,1.479a.636.636,0,0,0,.121.109c.077.054.038-.529.3-.476s.3.939.534,1.125a.708.708,0,0,1-.9-.044l-.206-.186c-.1-.093-.205.315.052.532a2.186,2.186,0,0,0,.847.533c.245.088,1.034.371,1.875.763,1.36.87,2.068.2,2.068.2.048-.028.093-.056.139-.087.389-.262.747-.575,1.153-.91a11.162,11.162,0,0,1,1.333-.986,1.808,1.808,0,0,1,.675-.265.171.171,0,0,1,.03,0l.019,0,.064.008c.013.009-.02.011-.026,0a.182.182,0,0,0,.036.021,1.379,1.379,0,0,1,.254.221,6.369,6.369,0,0,1,1.01,1.825c.111.281.242.685.336.991-.239.067-.392.116-.392.116a.894.894,0,0,0-1.037-.646,10.736,10.736,0,0,0-2.456,1.446,3.873,3.873,0,0,1-2.3.648,1.642,1.642,0,0,0,.86.952,6.578,6.578,0,0,0-1.73,2.456h0a17.828,17.828,0,0,0-1.365,4.318,6.14,6.14,0,0,1-1.078-.2,22.034,22.034,0,0,1-2.585-.969,3.287,3.287,0,0,1-1.418-5.213s2.025-2.223-1.843-4.066a18.083,18.083,0,0,0-6.533-1.586c-3.639-.155-13.539-.4-19.153-1.178,0,0,7.118,6.667,9.511,8.787a3.939,3.939,0,0,0,2.7,1.018,32.642,32.642,0,0,0,5.8-.79,8.563,8.563,0,0,1-3.855,1.8s2.114,4.221,5.067,5.918a3.373,3.373,0,0,0,2,.367,14.769,14.769,0,0,0,3.977-1.205s-.911,1.367-3.79,2.11a19.5,19.5,0,0,0,7.174,3.319,2.555,2.555,0,0,0,1.276,2.446,4.2,4.2,0,0,1,.448-1.965A5.887,5.887,0,0,1,430.162,230.867Z"
                transform="translate(-387.697 -199.334)"
                fill="#ffffff"
            />
        </svg>
    );
};

export function RegisterContent() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [isReCaptchaCompleted, setIsReCaptchaCompleted] = useState(false);
    const [isAvisoAccepted, setIsAvisoAccepted] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        captcha_token: '',
        code: null
    });

    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    useEffect(() => {
        const getCodigoInvitacion = async () => {
            (() => {
                return new Promise((resolve, reject) => {
                    try {
                        const codigo = localStorage.getItem('codigoInvitacion');
                        resolve(codigo);
                    } catch (err) {
                        reject(err)
                    }
                });
            })()
            .then((codigo) => {
                setData('code', codigo)
            })
            .catch((err) => console.error(err));
        };

        getCodigoInvitacion();
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        if (!isAvisoAccepted) {
            return Swal.fire({
                icon: 'info',
                text: 'Para continuar debes aceptar el aviso de privacidad',
            });
        }

        setIsProcessing(true);

        post(route('crear.registro.perfil'));
    };

    const handleReCaptchaVerify = async (event) => {
        event?.preventDefault();

        delete errors.captcha_token;

        const token = await executeRecaptcha('login');

        if (!token)
            return errors.captcha_token = "Error al intentar validar. Por favor, inténtalo de nuevo";

        setData('captcha_token', token);

        setIsReCaptchaCompleted(true);
    };

    useEffect(() => {
        if (errors.captcha_token)
            setIsReCaptchaCompleted(false);

        setIsProcessing(false);
    }, [errors]);

    return (
        <GuestLayout>
            <ParticlesLinks />
            <Head title="Registra tu perfil" />

            <form onSubmit={submit} className='relative'>
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />

                    <div className='relative'>

                        <TextInput
                            id="password"
                            type={ passwordVisibility ? "text" : "password" }
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full pr-8"
                            autoComplete="current-password"
                            handleChange={onHandleChange}
                        />

                        <div className='absolute right-0 top-1 bottom-0 px-2 flex items-center justify-center' onClick={ () => setPasswordVisibility((prev) => !prev)}>
                            {
                                passwordVisibility
                                ?   <VisibilityOffIcon color='disabled' fontSize='small'/>
                                :   <VisibilityIcon color='disabled' fontSize='small'/>
                            }
                        </div>

                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirma contraseña" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-6 mb-6">
                    <button
                        className='flex gap-4 items-center w-full overflow-hidden'
                        onClick={ handleReCaptchaVerify }
                    >
                        <div
                            className={ `shadow-sm border ${ isReCaptchaCompleted ? 'border-mc-primary bg-mc-primary' : 'border-gray-300' } rounded-md w-16 h-10 transition-all` }
                        >
                            {
                                isReCaptchaCompleted
                                ?   <TrailAppear>
                                        <LogoNaranja />
                                    </TrailAppear>
                                :   null
                            }
                        </div>

                        <h1 className={`font-black ${ isReCaptchaCompleted ? 'text-mc-primary' : 'text-gray-600' } transition-all`}>
                            No soy un robot
                        </h1>
                    </button>

                    <InputError message={errors.captcha_token} className="mt-2" />
                </div>

                <div className="mt-6 mb-6 flex gap-4 items-center">
                    <span
                        className={ `shadow-sm border ${ isAvisoAccepted ? 'border-mc-primary bg-mc-primary' : 'border-gray-300' } rounded-sm transition-all aspect-square round-sm h-4 cursor-pointer`}
                        onClick={() => setIsAvisoAccepted((value) => !value)}
                    ></span>

                    <h1>
                        Aceptar el <span className='text-mc-primary'>
                            <a
                                target='_blank'
                                href='https://transparencia.movimientociudadano.mx/protecciondedatospersonales'
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                aviso de privacidad
                            </a>
                        </span>
                    </h1>
                </div>

                <div className="flex items-center justify-end mt-4 gap-4 flex-col-reverse">
                    <a
                        href='https://dashboard.ciudadanosenmovimiento.org/soporte'
                        className="underline font-semibold mt-4 text-2xl text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Soporte
                        <HeadsetMicOutlined
                            className={'ml-2'}
                        />
                    </a>

                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        ¿Ya estás registrado?
                    </Link>

                    <Button
                        type='submit'
                        variant={'contained'}
                        className={`w-full ml-4`}
                        disabled={isProcessing}
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        Registrarme
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}

const Register = (props) => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={ props.recaptcha_site_key }>
            <RegisterContent {...props} />
        </GoogleReCaptchaProvider>
    );
};

export default Register;