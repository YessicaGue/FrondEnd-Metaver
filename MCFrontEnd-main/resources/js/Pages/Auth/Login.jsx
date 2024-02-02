import {useState, useEffect} from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/react';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { HeadsetMicOutlined } from '@mui/icons-material';

export default function Login({status, canResetPassword}) {
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = async (e) => {
        e.preventDefault();

        post(route('post.iniciar.sesion'));
    };

    return (
        <GuestLayout>
            <ParticlesLinks />
            <Head title="Inicio de sesión"/>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit} className='relative'>
                <div>
                    <InputLabel forInput="email" value="Email"/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block focus:mc-secondary w-full border-secondary"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2"/>
                </div>

                <div className="mt-4 relative">
                    <InputLabel forInput="password" value="Contraseña"/>

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

                    <InputError message={errors.password} className="mt-2"/>
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange}/>
                        <span className="ml-2 text-sm text-gray-600">
                            Recuérdame
                        </span>
                    </label>
                </div>

                <div className="flex flex-col items-center justify-end mt-4 gap-4">
                    <PrimaryButton className="ml-4" processing={processing}>
                        { processing ? 'Verificando' : 'Iniciar sesión' }
                    </PrimaryButton>

                    {
                        !processing
                        ?   <Link
                                href={route("registro")}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                ¿Aún no estás registrado?
                            </Link>
                        :   null
                    }

                    {/* {
                        canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        )
                    } */}

                    <a
                        href='https://dashboard.ciudadanosenmovimiento.org/soporte'
                        className="underline font-semibold mt-4 text-2xl text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Soporte
                        <HeadsetMicOutlined
                            className={'ml-2'}
                        />
                    </a>
                </div>
            </form>
        </GuestLayout>
    );
}
