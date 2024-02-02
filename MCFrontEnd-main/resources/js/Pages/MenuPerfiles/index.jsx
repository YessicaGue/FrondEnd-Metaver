import { Head } from '@inertiajs/react';
import CustomLayout from '@/Layouts/CustomLayout';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const gridArrangement = {
    0: "",
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2",
    5: "grid-cols-3",
    6: "grid-cols-3",
    7: "grid-cols-3",
    8: "grid-cols-4",
    9: "grid-cols-3"
}

const index = (props) => {
    const { auth: { user } } = props;
    const { perfiles_grupales_data: perfilesGrupales } = user;

    const handleChangeSession = async (event) => {
        toast("Cargando", { position: toast.POSITION.TOP_CENTER });
        const guid = event.target.getAttribute('data-tag');

        try {
            await axios.get(route('tag.perfil.grupal', { guid }));
        } catch (err) {
            if (err?.response?.status === 419)
                await Swal.fire({
                    text: `Tu sesión ha expirado. Por favor, vuelve a iniciar sesión`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });
            else
                await Swal.fire({
                    text: `No se pudo cambiar la sesión. Por favor, inténtalo más tarde`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });

            return window.location.reload();
        }

        location.replace(route("perfil.grupal.page", { id: guid }));
    };

    const handleChangeToProfileSession = async () => {
        toast("Cargando", { position: toast.POSITION.TOP_CENTER });
        try {
            await axios.get(route('untag.perfil.grupal'));
        } catch (err) {
            if (err?.response?.status === 419)
                await Swal.fire({
                    text: `Tu sesión ha expirado. Por favor, vuelve a iniciar sesión`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });
            else
                await Swal.fire({
                    text: `No se pudo cambiar la sesión. Por favor, inténtalo más tarde`,
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });

            return window.location.reload();
        }

        location.replace(route("perfil.page", { id: user.perfil_data.guid }));
    }
    
    return (
        <CustomLayout user={user}>
            <Head title="Ciudadanos en Movimiento" />

            <div className='w-full relative bg-gradient-to-b from-mc-primary to-mc-gradient3_2 min-h-screen'>
                <ParticlesLinks />
                
                <div className='max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 py-24 h-full'>
                    <div className='grid grid-cols-2 gap-8 max-md:grid-cols-1 md:max-w-2xl md:mx-auto'>
                        <TrailAppear>
                            <div className='relative aspect-square rounded-lg shadow-lg bg-[rgba(255,255,255,0.1)] border-white border-solid flex flex-col justify-center items-center cursor-pointer' onClick={ handleChangeToProfileSession }>
                                { user.name }
                            </div>
                            <div className={`p-4 relative aspect-square rounded-lg shadow-lg bg-[rgba(255,255,255,0.1)] border-white border-solid grid gap-4 ${ perfilesGrupales.length < 10 ? gridArrangement[perfilesGrupales.length] : 'grid-cols-4' }`}>
                            {
                                perfilesGrupales.map((perfilGrupal) => (
                                    <div key={JSON.stringify(perfilGrupal)} className='bg-[rgba(255,255,255,0.3)] p-4 text-center text-white flex flex-col justify-center items-center cursor-pointer' data-tag={ perfilGrupal.guid } onClick={ handleChangeSession }>
                                        {
                                            perfilGrupal.alias
                                        }
                                    </div>
                                ))
                            }
                            </div>
                        </TrailAppear>
                    </div>
                </div>

            </div>

            <ToastContainer />

        </CustomLayout>
    );
};

export default index;