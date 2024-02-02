import React from 'react';
import ParticlesLinks from '@/Components/Customized/ParticlesComponents/ParticlesLinks';
import CustomLayout from '@/Layouts/CustomLayout';
import { Head } from '@inertiajs/react';
import { 
    Facebook as FacebookIcon,
    Instagram as InstagramIcon,
    WhatsApp as WhatsAppIcon,
    LinkedIn as LinkedInIcon
} from '@mui/icons-material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { SvgIcon } from '@mui/material';

const LogoNaranja = () => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 74.7 44.999'>
        <g id='logo-mc' transform='translate(-397.697 -210.334)'>
            <g id='Group_2' data-name='Group 2' transform='translate(397.697 210.334)'>
                <g id='Group_1' data-name='Group 1' transform='translate(0 0)'>
                    <path
                        id='Path_1'
                        data-name='Path 1'
                        d='M430.162,230.867a18.745,18.745,0,0,1,3.011-1.516c.541-.224,1.076-.449,1.609-.671.55-.244,1.094-.494,1.621-.793a12.667,12.667,0,0,0,1.528-.986,9.045,9.045,0,0,0,.7-.595c.109-.106.226-.2.331-.318l.312-.341a7.574,7.574,0,0,0,1.658-3.194c.069-.285.11-.571.163-.853.027-.292.061-.6.075-.872v-.791c-.012-.264-.027-.525-.049-.781-.026-.306-.062-.7-.1-1,0,0-.079-.3-.323-.319-.2-.037-.918.495-1.334.825.03.2.066.384.078.606s.018.466.019.7-.016.477-.024.718c-.027.216-.052.433-.078.651-.049.221-.086.449-.144.669l-.1.327-.05.164-.066.157-.131.317c-.051.1-.108.2-.16.306a5.6,5.6,0,0,1-.359.593c-.064.1-.144.186-.215.281a2.816,2.816,0,0,1-.228.273c-.021.024-.044.046-.067.07a11.35,11.35,0,0,1-.631-3.62c.225-2.085,3.131-3.694,3.5-3.651s.512.8.512.8,1.236-2.364.377-2.944a2.237,2.237,0,0,0-1.384-.179c-.149-.436-.31-.858-.491-1.262a7.4,7.4,0,0,0-1.391-2.195,2.565,2.565,0,0,0-.6-.446c-.067-.031-.126-.059-.205-.087a1.934,1.934,0,0,0-.282-.066l-.065,0-.031,0h-.017c-.131-.006-.051,0-.086,0-.068,0-.14.009-.2.019a2.948,2.948,0,0,0-1.151.49,11.892,11.892,0,0,0-1.429,1.172c-.038.035-.076.069-.112.1a3.291,3.291,0,0,0-.436.4l-.173.151c-.531.381-1.044-.044-1.312-.346a10.889,10.889,0,0,0-2.329-2.484c-.5-.106-1.164.794-.891,1.479a.636.636,0,0,0,.121.109c.077.054.038-.529.3-.476s.3.939.534,1.125a.708.708,0,0,1-.9-.044l-.206-.186c-.1-.093-.205.315.052.532a2.186,2.186,0,0,0,.847.533c.245.088,1.034.371,1.875.763,1.36.87,2.068.2,2.068.2.048-.028.093-.056.139-.087.389-.262.747-.575,1.153-.91a11.162,11.162,0,0,1,1.333-.986,1.808,1.808,0,0,1,.675-.265.171.171,0,0,1,.03,0l.019,0,.064.008c.013.009-.02.011-.026,0a.182.182,0,0,0,.036.021,1.379,1.379,0,0,1,.254.221,6.369,6.369,0,0,1,1.01,1.825c.111.281.242.685.336.991-.239.067-.392.116-.392.116a.894.894,0,0,0-1.037-.646,10.736,10.736,0,0,0-2.456,1.446,3.873,3.873,0,0,1-2.3.648,1.642,1.642,0,0,0,.86.952,6.578,6.578,0,0,0-1.73,2.456h0a17.828,17.828,0,0,0-1.365,4.318,6.14,6.14,0,0,1-1.078-.2,22.034,22.034,0,0,1-2.585-.969,3.287,3.287,0,0,1-1.418-5.213s2.025-2.223-1.843-4.066a18.083,18.083,0,0,0-6.533-1.586c-3.639-.155-13.539-.4-19.153-1.178,0,0,7.118,6.667,9.511,8.787a3.939,3.939,0,0,0,2.7,1.018,32.642,32.642,0,0,0,5.8-.79,8.563,8.563,0,0,1-3.855,1.8s2.114,4.221,5.067,5.918a3.373,3.373,0,0,0,2,.367,14.769,14.769,0,0,0,3.977-1.205s-.911,1.367-3.79,2.11a19.5,19.5,0,0,0,7.174,3.319,2.555,2.555,0,0,0,1.276,2.446,4.2,4.2,0,0,1,.448-1.965A5.887,5.887,0,0,1,430.162,230.867Z'
                        transform='translate(-397.697 -210.334)'
                        fill='#ff8300'
                    />
                </g>
            </g>
        </g>
    </svg>
);

const SocialLinks = (props) => (
    <ul
        className={
            'list-none flex gap-4 ' +
            'max-md:ml-[50%] max-md:translate-x-[-50%] max-md:w-full max-md:justify-evenly max-md:mt-6 max-md:mb-2'
        }
    >
        <li>
            <a href=''>
                <FacebookIcon/>
            </a>
        </li>

        <li>
            <a href=''>
                <InstagramIcon/>
            </a>
        </li>

        <li>
            <a href=''>
                <SvgIcon
                    data-name='Twitter-x'
                    sx={{
                        fontSize: 22,
                    }}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='1em'
                        viewBox='0 0 512 512'
                    >
                        <path
                            d='M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z'
                        />
                    </svg>
                </SvgIcon>
            </a>
        </li>

        <li>
            <a href=''>
                <SvgIcon
                    data-name='Tiktok' 
                    sx={{
                        fontSize: 19,
                    }}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='1em'
                        viewBox='0 0 448 512'
                    >
                        <path
                            d='M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z'
                        />
                    </svg>
                </SvgIcon>
            </a>
        </li>

        <li>
            <a href=''>
                <WhatsAppIcon/>
            </a>
        </li>

        <li>
            <a href=''>
                <LinkedInIcon/>
            </a>
        </li>
    </ul>
);

const ActividadLinks = (props) => (
    <div
        className={
            'grid grid-cols-4 gap-2 h-full w-full' +
            'max-md:grid-cols-2'
        }
    >
        <button className='bg-transparent rounded-lg transform hover:scale-95 transition-all flex flex-col relative cursor-pointer'>
            <span className='h-full w-5/6 bg-green-400 rounded-s-lg absolute left-[-12px] top-0'></span>
            <span className='h-1/2 w-full skew-x-[20deg] bg-green-400 rounded-t-lg'></span>
            <span className='h-1/2 w-full -skew-x-[20deg] bg-green-400 rounded-b-lg'></span>
        </button>

        <button className='bg-transparent rounded-lg transform hover:scale-95 transition-all flex flex-col relative cursor-pointer'>
            <span className='h-1/2 w-full skew-x-[20deg] bg-green-400 rounded-t-lg'></span>
            <span className='h-1/2 w-full -skew-x-[20deg] bg-green-400 rounded-b-lg'></span>
        </button>

        <button className='bg-transparent rounded-lg transform hover:scale-95 transition-all flex flex-col relative cursor-pointer'>
            <span className='h-1/2 w-full skew-x-[20deg] bg-green-400 rounded-t-lg'></span>
            <span className='h-1/2 w-full -skew-x-[20deg] bg-green-400 rounded-b-lg'></span>
        </button>

        <button className='bg-transparent rounded-lg transform hover:scale-95 transition-all flex flex-col relative cursor-pointer'>
            <span className='h-1/2 w-full skew-x-[20deg] bg-green-400 rounded-t-lg rounded-e-xl'></span>
            <span className='h-1/2 w-full -skew-x-[20deg] bg-green-400 rounded-b-lg rounded-e-xl'></span>
            <span className='h-full w-5/6 bg-green-400 rounded-e-lg absolute right-[-12px] top-0'></span>
        </button>
    </div>
);

const SeguidoresButton = (props) => (
    <button
        className='p-1'
        onClick={ props.onClick }
    >
        <div className='hover:scale-95 transition-all relative text-center rounded-lg group overflow-hidden hover:bg-[rgba(255,255,255,0.8)] hover:shadow-lg'>
            <h1 className='text-black text-center font-[Poppins] text-[calc(26px+1vw)] leading-[calc(26px+1vw)] font-bold tracking-wider'>
                10
            </h1>

            <h3 className='text-center font-semibold font-[Poppins] text-[#606060] text-[calc(12px+0.5vw)] tracking-[[calc(12px+0.5vw)]'>
                seguidores
            </h3>
        </div>
    </button>
);

const EventosButton = (props) => (
    <button
        className='p-1'
        onClick={ props.onClick }
    >
        <div className='hover:scale-95 transition-all relative text-center rounded-lg group overflow-hidden hover:bg-[rgba(255,255,255,0.8)] hover:shadow-lg'>
            <h1 className='text-black text-center font-[Poppins] text-[calc(26px+1vw)] leading-[calc(26px+1vw)] font-bold tracking-wider'>
                10
            </h1>

            <h3 className='text-center font-semibold font-[Poppins] text-[#606060] text-[calc(12px+0.5vw)] tracking-[[calc(12px+0.5vw)]'>
                eventos
            </h3>
        </div>
    </button>
);

const InteresesLinks = (props) => (
    <div className='absolute bg-[rgba(0,0,0,0.5)] bottom-1 left-1 right-1 h-20 rounded-lg p-1 px-4'>
        <div
            className={
                'grid grid-cols-3 gap-1 h-full w-full' +
                'max-md:grid-cols-2'
            }
        >
            <button className='bg-transparent rounded-lg transform hover:scale-95 transition-all flex flex-col relative cursor-pointer'>
                <span className='h-full w-5/6 bg-green-400 rounded-s-md absolute left-[-12px] top-0'></span>
                <span className='h-1/2 w-full skew-x-[20deg] bg-green-400 rounded-t-md'></span>
                <span className='h-1/2 w-full -skew-x-[20deg] bg-green-400 rounded-b-md'></span>
            </button>

            <button className='bg-transparent rounded-lg transform hover:scale-95 transition-all flex flex-col relative cursor-pointer'>
                <span className='h-1/2 w-full skew-x-[20deg] bg-green-400 rounded-t-md'></span>
                <span className='h-1/2 w-full -skew-x-[20deg] bg-green-400 rounded-b-md'></span>
            </button>

            <button className='bg-transparent rounded-lg transform hover:scale-95 transition-all flex flex-col relative cursor-pointer'>
                <span className='h-1/2 w-full skew-x-[20deg] bg-green-400 rounded-t-md rounded-e-xl'></span>
                <span className='h-1/2 w-full -skew-x-[20deg] bg-green-400 rounded-b-md rounded-e-xl'></span>
                <span className='h-full w-5/6 bg-green-400 rounded-e-md absolute right-[-12px] top-0'></span>
            </button>
        </div>
    </div>
);

/**
 * 
 * Main component
 */
const indexnew = (props) => {
    const {
        auth: { user },
        perfil,
        isPublic = true,
    } = props;

    const usuario = perfil?.usuario;
    const seguidores = perfil?.seguidores;

    return (
        <CustomLayout
            user={ user }
            visible={ true }
        >
            <ParticlesLinks color='#FF8300'/>

            <Head title={ usuario?.name ?? 'Demo' } />

            <section className='w-full relative z-30 bg-white shadow-md'>
                <div 
                    className={
                        'max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 pt-[calc(25px+5vw+5vh)] pb-4 relative ' + 
                        'grid grid-cols-7 gap-20 ' +
                        'max-md:grid-cols-1 max-md:gap-4'
                    }
                >
                    <div className='absolute right-0 top-0 w-[1024px] h-full opacity-10 overflow-hidden -z-10'>
                        <div className='absolute w-full right-[-300px] top-[130px]'>
                            <LogoNaranja/>
                        </div>
                    </div>

                    <aside className='col-span-4 flex flex-col gap-2 justify-evenly relative'>
                        <a href='' className='absolute top-0 right-0 w-max aspect-square bg-mc-secondary rounded-md px-1 hover:scale-95 transform transition-all'>
                            <EditOutlinedIcon className='text-white' fontSize='small'/>
                        </a>

                        <h1
                            className={
                                'font-bold font-[Poppins] text-transparent text-[calc(30px+1vw)] leading-[calc(30px+1vw)] overflow-hidden text-ellipsis line-clamp-3 pb-2 ' +
                                'max-md:text-center'
                            }
                            style={{
                                WebkitTextStroke: 'calc(2px + (1.5 - 1.7) * ((50vw - 375px)/(1920 - 375))) rgb(255 131 0)',
                            }}
                        >
                            Jessica María Guadalupe Ortega de la Cruz
                        </h1>
                        
                        <h3
                            className={
                                'font-bold font-[Poppins] text-[calc(18px+0.5vw)] leading-[calc(18px+0.5vw)] overflow-hidden text-ellipsis line-clamp-3 ' +
                                'max-md:text-center'
                            }
                        >
                            Diputada Federal
                        </h3>

                        <div className=''>
                            <SocialLinks />
                        </div>

                        <div className='bg-slate-300 rounded-lg overflow-hidden p-2 px-5 mt-4 h-28'>
                            <ActividadLinks />
                        </div>

                        <a
                            href=''
                            className={
                                'rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-[Poppins] font-bold text-xl hover:shadow-md transform hover:scale-95 transition-all text-center ' +
                                'w-max px-12 py-4 ' +
                                'max-lg:w-full max-md:text-lg'
                            }
                        >
                            Inicia tu camino del héroe ciudadano
                        </a>
                    </aside>

                    <aside 
                        className={
                            'col-span-3 relative grid grid-cols-3 gap-4 lg:gap-10 ' +
                            'max-md:order-first max-md:grid-cols-1 max-md:col-span-4'
                        }
                    >
                        <section
                            className={
                                'h-max m-auto flex flex-col gap-8 border-l border-solid border-mc-primary max-lg:border-none lg:pl-4 ' +
                                'max-lg:flex-row max-lg:order-last max-lg:col-span-3'
                            }
                        >
                            <SeguidoresButton />

                            <EventosButton />
                        </section>

                        <section className='max-lg:col-span-3 col-span-2 flex flex-col gap-2'>
                            <a href='' className='rounded-lg bg-slate-500 text-white font-[Poppins] font-bold text-sm hover:shadow-md transform hover:scale-95 transition-all w-full p-2'>
                               Directorio
                            </a>

                            <div className='rounded-lg md:aspect-square max-md:h-60 bg-mc-primary relative'>
                                <div>

                                </div>

                                <InteresesLinks />
                            </div>
                        </section>
                    </aside>
                </div>
            </section>
        </CustomLayout>
    );
};

export default indexnew;