import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <ParticlesLinks />
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                ¿Olvidaste tu contraseña? No hay problema.
                Simplemente háganos saber su dirección de correo electrónico y le
                enviaremos un enlace de restablecimiento de contraseña que le permitirá elegir una nueva.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Enviar email
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}