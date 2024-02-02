import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest(props) {
    const { chc, children } = props;

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-b from-mc-primary to-mc-gradient3_2 z-20">
            <div>
                <Link href="/">
                    <ApplicationLogo className={`${ chc ? 'w-10 h-10 m-auto mb-4' : 'w-20 h-20' } fill-current text-gray-500`} />

                    {
                        chc
                        ?   <h1
                                className='font-[Poppins] text-3xl font-bold text-orange-100 text-center m-auto'
                            >
                                Registro Camino del Héroe Ciudadano
                            </h1>
                        :   null
                    }
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
