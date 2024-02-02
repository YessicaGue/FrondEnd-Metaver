import React, {useEffect, useState} from 'react';
import {Link} from '@inertiajs/react';
import {AppBar, Toolbar, Typography} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ApplicationLogo from "@/Components/ApplicationLogo";
import ApplicationLogoNaranja from '@/Components/ApplicationLogoNaranja';
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {HeadsetMicOutlined} from '@mui/icons-material';
import logolabmc from "@/../assets/images/logo_lab_mc.png";

const OverlayMenu = (props) => {
    const {user, children, className} = props;

    return (
        <div
            className={`fixed z-50 h-screen max-md:w-full max-lg:w-1/2 w-1/3 right-0 flex justify-center items-center top-0 bg-[rgba(0,0,0,0.8)] ${className}`}>
            {children}
        </div>
    );
};

const CustomLayout = ({user, children, openingModal, visible = false, showTopBar = true, demoTag = false}) => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [active, setActive] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 80)
            setActive(true);
        else
            setActive(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);
        return () => window.removeEventListener('scroll', changeBackground);
    }, [window.scrollY]);

    const handleCloseOverlay = () => {
        setTimeout(() => {
            setTimeout(() => {
                setShowingNavigationDropdown((previousState) => !previousState);
            }, 350);
            document
                .querySelector('.overlay')
                .classList
                .add('disappear-to-right');
        }, 50);

        document
            .querySelector('.overlay')
            .classList
            .remove('appear-from-right');
    };

    return (
        <div
            className={'w-full flex flex-col'}
        >
            <ToastContainer
                position={'bottom-right'}
                autoClose={5000}
                draggable
                pauseOnHover
                pauseOnFocusLoss
                hideProgressBar={false}
                theme={'light'}
                style={{
                    zIndex: 99999999,
                }}
            />

            {
                demoTag
                    ?
                    <div
                        className='bg-red-500 text-white flex justify-center items-center h-full w-full sticky top-0 z-20'>
                        Ambiente de Pruebas
                    </div>
                    : null
            }

            <div className={`min-h-screen flex flex-col ${openingModal ? 'overflow-hidden max-h-screen' : ''}`}>
                {
                    showTopBar ?
                        <AppBar
                            elevation={0}
                            sx={{
                                backgroundColor: (active || visible) ? 'white' : 'transparent',
                            }}
                        >
                            <Toolbar>
                                <Link href={route("/")}>
                                    {
                                        active || visible ?
                                            <ApplicationLogoNaranja
                                                className="block max-md:h-6 h-9 w-auto fill-current text-gray-800"
                                            /> :
                                            <ApplicationLogo
                                                className="block max-md:h-6 h-9 w-auto fill-current text-gray-800"
                                            />
                                    }
                                </Link>

                                <div
                                    className="flex flex-col w-fit flex-1 justify-center items-center">
                                    <span
                                        className={`${active || visible ? 'text-mc-primary' : 'text-white'} font-bold tracking-widest uppercase font-[Poppins] max-md:text-[10px]`}>Bienvenid<span
                                        className='font-sans_mona font-black'>@</span>s al Metaverso Naranja</span>
                                    <span
                                        className={`${active || visible ? 'text-mc-primary' : 'text-white'} text-sm tracking-wide uppercase max-md:text-[8px]`}>Beta</span>
                                </div>

                                <button
                                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                    className={
                                        `inline-flex items-center justify-center p-0 rounded-md
                                            ${active || visible
                                            ? 'text-mc-primary'
                                            : 'text-white'
                                        } transition duration-150 ease-in-out`
                                    }
                                >
                                    <svg
                                        className="h-9 w-9"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className='inline-flex'
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M6 6h10M8 12h13M6 18h10"
                                        />
                                    </svg>
                                </button>
                            </Toolbar>
                        </AppBar>
                        : null
                }

                <main className={`min-h-screen ${openingModal ? 'overflow-hidden max-h-screen' : ''}`}>
                    <div className={`h-full flex flex-col ${openingModal ? 'overflow-hidden max-h-screen' : ''}`}>
                        {children}
                    </div>
                </main>

                <div
                    className='w-full grid grid-cols-1 lg:grid-cols-2  relative text-white flex flex-col gap-12 py-12 px-4 lg:px-20 bg-[#101010]'>
                    <div className='w-full h-full flex flex-col'>
                        <div className='w-36 h-26'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.7 44.999">
                                <g id="logo-mc" transform="translate(-397.697 -210.334)">
                                    <g id="Group_2" data-name="Group 2" transform="translate(397.697 210.334)">
                                        <g id="Group_1" data-name="Group 1" transform="translate(0 0)">
                                            <path id="Path_1" data-name="Path 1"
                                                  d="M430.162,230.867a18.745,18.745,0,0,1,3.011-1.516c.541-.224,1.076-.449,1.609-.671.55-.244,1.094-.494,1.621-.793a12.667,12.667,0,0,0,1.528-.986,9.045,9.045,0,0,0,.7-.595c.109-.106.226-.2.331-.318l.312-.341a7.574,7.574,0,0,0,1.658-3.194c.069-.285.11-.571.163-.853.027-.292.061-.6.075-.872v-.791c-.012-.264-.027-.525-.049-.781-.026-.306-.062-.7-.1-1,0,0-.079-.3-.323-.319-.2-.037-.918.495-1.334.825.03.2.066.384.078.606s.018.466.019.7-.016.477-.024.718c-.027.216-.052.433-.078.651-.049.221-.086.449-.144.669l-.1.327-.05.164-.066.157-.131.317c-.051.1-.108.2-.16.306a5.6,5.6,0,0,1-.359.593c-.064.1-.144.186-.215.281a2.816,2.816,0,0,1-.228.273c-.021.024-.044.046-.067.07a11.35,11.35,0,0,1-.631-3.62c.225-2.085,3.131-3.694,3.5-3.651s.512.8.512.8,1.236-2.364.377-2.944a2.237,2.237,0,0,0-1.384-.179c-.149-.436-.31-.858-.491-1.262a7.4,7.4,0,0,0-1.391-2.195,2.565,2.565,0,0,0-.6-.446c-.067-.031-.126-.059-.205-.087a1.934,1.934,0,0,0-.282-.066l-.065,0-.031,0h-.017c-.131-.006-.051,0-.086,0-.068,0-.14.009-.2.019a2.948,2.948,0,0,0-1.151.49,11.892,11.892,0,0,0-1.429,1.172c-.038.035-.076.069-.112.1a3.291,3.291,0,0,0-.436.4l-.173.151c-.531.381-1.044-.044-1.312-.346a10.889,10.889,0,0,0-2.329-2.484c-.5-.106-1.164.794-.891,1.479a.636.636,0,0,0,.121.109c.077.054.038-.529.3-.476s.3.939.534,1.125a.708.708,0,0,1-.9-.044l-.206-.186c-.1-.093-.205.315.052.532a2.186,2.186,0,0,0,.847.533c.245.088,1.034.371,1.875.763,1.36.87,2.068.2,2.068.2.048-.028.093-.056.139-.087.389-.262.747-.575,1.153-.91a11.162,11.162,0,0,1,1.333-.986,1.808,1.808,0,0,1,.675-.265.171.171,0,0,1,.03,0l.019,0,.064.008c.013.009-.02.011-.026,0a.182.182,0,0,0,.036.021,1.379,1.379,0,0,1,.254.221,6.369,6.369,0,0,1,1.01,1.825c.111.281.242.685.336.991-.239.067-.392.116-.392.116a.894.894,0,0,0-1.037-.646,10.736,10.736,0,0,0-2.456,1.446,3.873,3.873,0,0,1-2.3.648,1.642,1.642,0,0,0,.86.952,6.578,6.578,0,0,0-1.73,2.456h0a17.828,17.828,0,0,0-1.365,4.318,6.14,6.14,0,0,1-1.078-.2,22.034,22.034,0,0,1-2.585-.969,3.287,3.287,0,0,1-1.418-5.213s2.025-2.223-1.843-4.066a18.083,18.083,0,0,0-6.533-1.586c-3.639-.155-13.539-.4-19.153-1.178,0,0,7.118,6.667,9.511,8.787a3.939,3.939,0,0,0,2.7,1.018,32.642,32.642,0,0,0,5.8-.79,8.563,8.563,0,0,1-3.855,1.8s2.114,4.221,5.067,5.918a3.373,3.373,0,0,0,2,.367,14.769,14.769,0,0,0,3.977-1.205s-.911,1.367-3.79,2.11a19.5,19.5,0,0,0,7.174,3.319,2.555,2.555,0,0,0,1.276,2.446,4.2,4.2,0,0,1,.448-1.965A5.887,5.887,0,0,1,430.162,230.867Z"
                                                  transform="translate(-397.697 -210.334)" fill="#fff"/>
                                            <path id="Path_2" data-name="Path 2"
                                                  d="M565.325,215.755a18.1,18.1,0,0,0-6.536,1.586c-3.867,1.843-1.841,4.066-1.841,4.066a3.288,3.288,0,0,1-1.419,5.213s-1.015.417-2.476.861a8.456,8.456,0,0,1-1.279,2.029,7.122,7.122,0,0,1-.874.874c-.1.086-.205.168-.305.249l-.168.135a13.31,13.31,0,0,1-1.612,1.041c-.55.312-1.127.575-1.669.818l-1.626.678a18.4,18.4,0,0,0-2.9,1.454c-.018.011-.034.022-.052.034a8.038,8.038,0,0,0-1.051.831c4.417-.018,5.608,2.73,5.608,2.73s1.634-3.787,8.2-2.446a18.123,18.123,0,0,0,7.734-3.319c-2.879-.743-3.79-2.11-3.79-2.11a14.766,14.766,0,0,0,3.977,1.205,3.372,3.372,0,0,0,2-.367c2.953-1.7,5.066-5.918,5.066-5.918a8.561,8.561,0,0,1-3.853-1.8,32.613,32.613,0,0,0,5.795.79,3.937,3.937,0,0,0,2.7-1.018c2.395-2.12,9.511-8.787,9.511-8.787C578.863,215.351,568.964,215.6,565.325,215.755Z"
                                                  transform="translate(-509.776 -213.636)" fill="#fff"/>
                                        </g>
                                    </g>
                                    <g id="Group_3" data-name="Group 3" transform="translate(399.751 238.764)">
                                        <path id="Path_3" data-name="Path 3"
                                              d="M439.847,339.274V344.9a.19.19,0,0,1-.057.14.188.188,0,0,1-.139.058H438.42a.187.187,0,0,1-.138-.058.19.19,0,0,1-.057-.14v-2.651a.079.079,0,0,0-.074-.09.127.127,0,0,0-.123.058l-1.381,2.231a.145.145,0,0,1-.132.066.165.165,0,0,1-.14-.066L435,342.213a.113.113,0,0,0-.115-.058c-.05.006-.074.036-.074.09V344.9a.192.192,0,0,1-.057.14.189.189,0,0,1-.139.058H433.38a.188.188,0,0,1-.139-.058.193.193,0,0,1-.057-.14v-5.624a.192.192,0,0,1,.057-.139.188.188,0,0,1,.139-.058h1.142a.361.361,0,0,1,.171.049.345.345,0,0,1,.13.116l1.577,2.322a.143.143,0,0,0,.115.066.123.123,0,0,0,.107-.066l1.577-2.322a.427.427,0,0,1,.139-.116.357.357,0,0,1,.171-.049h1.142a.2.2,0,0,1,.2.2Z"
                                              transform="translate(-427.406 -338.961)" fill="#fff"/>
                                        <path id="Path_4" data-name="Path 4"
                                              d="M467.572,341.677a3.009,3.009,0,0,1,.246-1.21,3.229,3.229,0,0,1,.664-.993,3.119,3.119,0,0,1,.984-.671,3.063,3.063,0,0,1,2.409,0,3.149,3.149,0,0,1,1.656,1.663,3.1,3.1,0,0,1,0,2.42,3.152,3.152,0,0,1-1.656,1.664,3.063,3.063,0,0,1-2.409,0,3.121,3.121,0,0,1-.984-.671,3.218,3.218,0,0,1-.664-.993A3.009,3.009,0,0,1,467.572,341.677Zm1.623,0a1.555,1.555,0,0,0,.115.593,1.591,1.591,0,0,0,.316.494,1.525,1.525,0,0,0,.471.342,1.351,1.351,0,0,0,1.147,0,1.59,1.59,0,0,0,.8-.836,1.585,1.585,0,0,0,0-1.182,1.5,1.5,0,0,0-.32-.494,1.623,1.623,0,0,0-.475-.337,1.349,1.349,0,0,0-1.147,0,1.571,1.571,0,0,0-.471.337,1.533,1.533,0,0,0-.316.494A1.563,1.563,0,0,0,469.2,341.677Z"
                                              transform="translate(-454.204 -338.557)" fill="#fff"/>
                                        <path id="Path_5" data-name="Path 5"
                                              d="M498.528,344.885l-2.475-5.608a.185.185,0,0,1,0-.164.145.145,0,0,1,.144-.074h1.336a.281.281,0,0,1,.16.054.383.383,0,0,1,.118.127l1.442,3.31a.114.114,0,0,0,.214,0l1.434-3.31a.385.385,0,0,1,.119-.127.278.278,0,0,1,.16-.054h1.361a.141.141,0,0,1,.131.07.136.136,0,0,1,.009.136l-2.5,5.64a.38.38,0,0,1-.119.127.277.277,0,0,1-.16.054h-1.09a.275.275,0,0,1-.16-.054A.375.375,0,0,1,498.528,344.885Z"
                                              transform="translate(-476.383 -338.932)" fill="#fff"/>
                                        <path id="Path_6" data-name="Path 6"
                                              d="M530.866,345.1h-1.232a.184.184,0,0,1-.142-.058.2.2,0,0,1-.053-.14v-5.624a.2.2,0,0,1,.053-.139.183.183,0,0,1,.142-.058h1.232a.186.186,0,0,1,.139.058.19.19,0,0,1,.057.139V344.9a.192.192,0,0,1-.057.14A.188.188,0,0,1,530.866,345.1Z"
                                              transform="translate(-502.417 -338.961)" fill="#fff"/>
                                        <path id="Path_7" data-name="Path 7"
                                              d="M549.472,339.274V344.9a.2.2,0,0,1-.2.2h-1.231a.189.189,0,0,1-.139-.058.192.192,0,0,1-.057-.14v-2.651a.079.079,0,0,0-.074-.09.128.128,0,0,0-.123.058l-1.381,2.231a.143.143,0,0,1-.131.066.167.167,0,0,1-.14-.066l-1.38-2.231a.113.113,0,0,0-.115-.058.079.079,0,0,0-.074.09V344.9a.2.2,0,0,1-.2.2H543a.187.187,0,0,1-.138-.058.19.19,0,0,1-.057-.14v-5.624a.188.188,0,0,1,.057-.139.185.185,0,0,1,.138-.058h1.141a.359.359,0,0,1,.172.049.347.347,0,0,1,.131.116l1.577,2.322a.143.143,0,0,0,.115.066.123.123,0,0,0,.107-.066l1.578-2.322a.417.417,0,0,1,.138-.116.358.358,0,0,1,.171-.049h1.142a.188.188,0,0,1,.139.058A.19.19,0,0,1,549.472,339.274Z"
                                              transform="translate(-512.837 -338.961)" fill="#fff"/>
                                        <path id="Path_8" data-name="Path 8"
                                              d="M581.558,345.1h-1.232a.185.185,0,0,1-.143-.058.2.2,0,0,1-.052-.14v-5.624a.2.2,0,0,1,.052-.139.184.184,0,0,1,.143-.058h1.232a.187.187,0,0,1,.138.058.191.191,0,0,1,.057.139V344.9a.193.193,0,0,1-.057.14A.189.189,0,0,1,581.558,345.1Z"
                                              transform="translate(-541.922 -338.961)" fill="#fff"/>
                                        <path id="Path_9" data-name="Path 9"
                                              d="M594.973,340.751v.346a.2.2,0,0,0,.2.2h2.221a.192.192,0,0,1,.14.058.19.19,0,0,1,.057.14v1.136a.195.195,0,0,1-.2.2H595.17a.2.2,0,0,0-.2.2v.313a.2.2,0,0,0,.2.2h2.548a.191.191,0,0,1,.139.057.193.193,0,0,1,.057.14v1.136a.192.192,0,0,1-.057.14.19.19,0,0,1-.139.058h-4.172a.19.19,0,0,1-.14-.058.192.192,0,0,1-.057-.14v-5.632a.194.194,0,0,1,.057-.14.19.19,0,0,1,.14-.057h4.172a.191.191,0,0,1,.139.057.2.2,0,0,1,.057.14v1.12a.193.193,0,0,1-.057.14.191.191,0,0,1-.139.057H595.17a.2.2,0,0,0-.2.2Z"
                                              transform="translate(-552.223 -338.932)" fill="#fff"/>
                                        <path id="Path_10" data-name="Path 10"
                                              d="M625.347,339.237v5.632a.192.192,0,0,1-.057.14.19.19,0,0,1-.139.058H623.94a.355.355,0,0,1-.171-.049.42.42,0,0,1-.14-.116L621.5,341.88c-.033-.044-.067-.062-.1-.054s-.053.04-.053.095v2.947a.2.2,0,0,1-.2.2h-1.227a.2.2,0,0,1-.2-.2v-5.632a.193.193,0,0,1,.057-.14.189.189,0,0,1,.139-.057h1.23a.433.433,0,0,1,.311.156l2.131,3.022c.033.044.067.063.1.058s.053-.035.053-.09v-2.948a.193.193,0,0,1,.057-.14.19.19,0,0,1,.139-.057h1.213a.19.19,0,0,1,.139.057A.193.193,0,0,1,625.347,339.237Z"
                                              transform="translate(-572.771 -338.932)" fill="#fff"/>
                                        <path id="Path_11" data-name="Path 11"
                                              d="M653.948,340.554H652.8a.2.2,0,0,0-.2.2v4.117a.2.2,0,0,1-.053.14.187.187,0,0,1-.144.058h-1.229a.2.2,0,0,1-.2-.2v-4.117a.2.2,0,0,0-.053-.139.186.186,0,0,0-.143-.058h-1.164a.19.19,0,0,1-.139-.057.193.193,0,0,1-.058-.14v-1.12a.194.194,0,0,1,.058-.14.19.19,0,0,1,.139-.057h4.328a.187.187,0,0,1,.143.057.2.2,0,0,1,.053.14v1.12a.2.2,0,0,1-.053.14A.187.187,0,0,1,653.948,340.554Z"
                                              transform="translate(-595.921 -338.932)" fill="#fff"/>
                                        <path id="Path_12" data-name="Path 12"
                                              d="M672.82,341.677a3.017,3.017,0,0,1,.246-1.21,3.236,3.236,0,0,1,.664-.993,3.128,3.128,0,0,1,.983-.671,3.065,3.065,0,0,1,2.41,0,3.149,3.149,0,0,1,1.656,1.663,3.1,3.1,0,0,1,0,2.42,3.152,3.152,0,0,1-1.656,1.664,3.066,3.066,0,0,1-2.41,0,3.129,3.129,0,0,1-.983-.671,3.225,3.225,0,0,1-.664-.993A3.016,3.016,0,0,1,672.82,341.677Zm1.623,0a1.556,1.556,0,0,0,.114.593,1.6,1.6,0,0,0,.316.494,1.527,1.527,0,0,0,.471.342,1.352,1.352,0,0,0,1.147,0,1.583,1.583,0,0,0,.795-.836,1.573,1.573,0,0,0,0-1.182,1.516,1.516,0,0,0-.319-.494,1.636,1.636,0,0,0-.475-.337,1.35,1.35,0,0,0-1.147,0,1.573,1.573,0,0,0-.471.337,1.541,1.541,0,0,0-.316.494A1.564,1.564,0,0,0,674.443,341.677Z"
                                              transform="translate(-614.154 -338.557)" fill="#fff"/>
                                        <path id="Path_13" data-name="Path 13"
                                              d="M415.1,381.88a6.306,6.306,0,0,1-.7.935,4.037,4.037,0,0,1-.858.715,4.1,4.1,0,0,1-1.055.459,4.7,4.7,0,0,1-1.279.164,4.1,4.1,0,0,1-1.639-.329,4.373,4.373,0,0,1-1.339-.89,4.1,4.1,0,0,1-.9-1.318,4.141,4.141,0,0,1,0-3.228,4.1,4.1,0,0,1,.9-1.317,4.368,4.368,0,0,1,1.339-.89,4.1,4.1,0,0,1,1.639-.33,4.748,4.748,0,0,1,1.3.165,3.9,3.9,0,0,1,1.9,1.18,6.931,6.931,0,0,1,.694.928.213.213,0,0,1,.022.186.228.228,0,0,1-.132.143l-1.551.615a.282.282,0,0,1-.219,0,.335.335,0,0,1-.164-.132,2.321,2.321,0,0,0-.765-.774,2.069,2.069,0,0,0-1.082-.269,1.789,1.789,0,0,0-.781.176,2.157,2.157,0,0,0-1.218,1.938,2.119,2.119,0,0,0,.152.8,2.082,2.082,0,0,0,.426.666,2.186,2.186,0,0,0,.639.462,1.774,1.774,0,0,0,.781.176,2.08,2.08,0,0,0,1.087-.291,2.23,2.23,0,0,0,.771-.752.338.338,0,0,1,.158-.132.274.274,0,0,1,.213,0l1.551.615a.226.226,0,0,1,.11.329Z"
                                              transform="translate(-407.004 -367.583)" fill="#fff"/>
                                        <path id="Path_14" data-name="Path 14"
                                              d="M449.458,384.473h-1.642a.248.248,0,0,1-.19-.077.267.267,0,0,1-.071-.187v-7.5a.267.267,0,0,1,.071-.187.247.247,0,0,1,.19-.077h1.642a.25.25,0,0,1,.185.077.257.257,0,0,1,.076.187v7.5a.256.256,0,0,1-.076.187A.252.252,0,0,1,449.458,384.473Z"
                                              transform="translate(-438.605 -368.046)" fill="#fff"/>
                                        <path id="Path_15" data-name="Path 15"
                                              d="M463.746,376.71a.256.256,0,0,1,.076-.187.252.252,0,0,1,.185-.077h1.642a.251.251,0,0,1,.185.077.257.257,0,0,1,.076.187v4.446a1.6,1.6,0,0,0,.137.708,1.239,1.239,0,0,0,.34.439,1.26,1.26,0,0,0,.434.225,1.354,1.354,0,0,0,.834,0,1.211,1.211,0,0,0,.428-.225,1.278,1.278,0,0,0,.335-.439,1.607,1.607,0,0,0,.138-.708V376.71a.255.255,0,0,1,.075-.187.252.252,0,0,1,.185-.077h1.642a.25.25,0,0,1,.184.077.256.256,0,0,1,.077.187v4.446a3.906,3.906,0,0,1-.246,1.416,3.028,3.028,0,0,1-.7,1.087,3.171,3.171,0,0,1-1.1.7,4.256,4.256,0,0,1-2.859,0,3.157,3.157,0,0,1-1.1-.7,3.088,3.088,0,0,1-.71-1.087,3.831,3.831,0,0,1-.251-1.416Z"
                                              transform="translate(-451.223 -368.046)" fill="#fff"/>
                                        <path id="Path_16" data-name="Path 16"
                                              d="M502.613,384.17v-7.51a.264.264,0,0,1,.263-.263h2.983a3.975,3.975,0,0,1,2.808,1.01,3.6,3.6,0,0,1,.9,1.307,4.515,4.515,0,0,1,.306,1.7,4.563,4.563,0,0,1-.306,1.708,3.589,3.589,0,0,1-.9,1.311,3.705,3.705,0,0,1-1.251.747,4.583,4.583,0,0,1-1.557.253h-2.983a.263.263,0,0,1-.263-.264Zm2.426-1.757h.819a2.78,2.78,0,0,0,.634-.077,1.442,1.442,0,0,0,.59-.291,1.57,1.57,0,0,0,.432-.6,3.126,3.126,0,0,0,0-2.031,1.542,1.542,0,0,0-.437-.6,1.49,1.49,0,0,0-.59-.291,2.722,2.722,0,0,0-.629-.077h-.819a.252.252,0,0,0-.186.077.256.256,0,0,0-.077.187v3.448a.255.255,0,0,0,.077.186A.251.251,0,0,0,505.039,382.413Z"
                                              transform="translate(-481.512 -368.007)" fill="#fff"/>
                                        <path id="Path_17" data-name="Path 17"
                                              d="M536.706,376.688a.411.411,0,0,1,.148-.17.389.389,0,0,1,.224-.071h1.53a.377.377,0,0,1,.213.071.411.411,0,0,1,.147.17l3.191,7.465a.227.227,0,0,1-.016.209.244.244,0,0,1-.235.11h-1.869a.384.384,0,0,1-.224-.072.487.487,0,0,1-.158-.17l-.3-.659a.5.5,0,0,0-.159-.17.372.372,0,0,0-.213-.072h-2.306a.39.39,0,0,0-.225.072.4.4,0,0,0-.147.17l-.306.659a.4.4,0,0,1-.147.17.37.37,0,0,1-.213.072h-1.88a.337.337,0,0,1-.115-.022.241.241,0,0,1-.1-.066.221.221,0,0,1-.049-.11.26.26,0,0,1,.033-.154Zm.645,4.776h.973a.178.178,0,0,0,.158-.071.153.153,0,0,0-.005-.171q-.109-.274-.262-.642l-.284-.686c-.029-.066-.062-.1-.1-.1s-.069.033-.1.1l-.547,1.328a.159.159,0,0,0,.164.242Z"
                                              transform="translate(-505.584 -368.046)" fill="#fff"/>
                                        <path id="Path_18" data-name="Path 18"
                                              d="M576.045,384.17v-7.51a.254.254,0,0,1,.077-.186.25.25,0,0,1,.186-.077h2.984a3.975,3.975,0,0,1,2.808,1.01,3.619,3.619,0,0,1,.9,1.307,4.507,4.507,0,0,1,.306,1.7,4.554,4.554,0,0,1-.306,1.708,3.6,3.6,0,0,1-.9,1.311,3.716,3.716,0,0,1-1.251.747,4.588,4.588,0,0,1-1.557.253h-2.984a.253.253,0,0,1-.186-.077A.256.256,0,0,1,576.045,384.17Zm2.426-1.757h.82a2.779,2.779,0,0,0,.634-.077,1.442,1.442,0,0,0,.589-.291,1.576,1.576,0,0,0,.432-.6,3.137,3.137,0,0,0,0-2.031,1.545,1.545,0,0,0-.438-.6,1.49,1.49,0,0,0-.589-.291,2.722,2.722,0,0,0-.629-.077h-.82a.261.261,0,0,0-.262.263v3.448a.255.255,0,0,0,.076.186A.252.252,0,0,0,578.471,382.413Z"
                                              transform="translate(-538.737 -368.007)" fill="#fff"/>
                                        <path id="Path_19" data-name="Path 19"
                                              d="M610.137,376.688a.415.415,0,0,1,.148-.17.386.386,0,0,1,.223-.071h1.53a.374.374,0,0,1,.213.071.407.407,0,0,1,.147.17l3.191,7.465a.226.226,0,0,1-.017.209.243.243,0,0,1-.235.11H613.47a.384.384,0,0,1-.224-.072.489.489,0,0,1-.158-.17l-.295-.659a.5.5,0,0,0-.159-.17.373.373,0,0,0-.213-.072h-2.306a.388.388,0,0,0-.224.072.4.4,0,0,0-.147.17l-.307.659a.4.4,0,0,1-.148.17.366.366,0,0,1-.213.072H607.2a.339.339,0,0,1-.115-.022.236.236,0,0,1-.1-.066.216.216,0,0,1-.049-.11.256.256,0,0,1,.033-.154Zm.645,4.776h.972a.18.18,0,0,0,.159-.071.155.155,0,0,0-.006-.171q-.109-.274-.262-.642c-.1-.245-.2-.473-.284-.686-.029-.066-.062-.1-.1-.1s-.069.033-.1.1l-.546,1.328a.159.159,0,0,0,.164.242Z"
                                              transform="translate(-562.808 -368.046)" fill="#fff"/>
                                        <path id="Path_20" data-name="Path 20"
                                              d="M656.932,376.66v7.51a.261.261,0,0,1-.261.264h-1.614a.479.479,0,0,1-.229-.066.57.57,0,0,1-.185-.154l-2.846-4.029c-.044-.059-.09-.082-.137-.071s-.071.053-.071.126v3.93a.255.255,0,0,1-.077.187.258.258,0,0,1-.187.077h-1.636a.258.258,0,0,1-.187-.077.255.255,0,0,1-.077-.187v-7.51a.263.263,0,0,1,.263-.263h1.639a.571.571,0,0,1,.415.209l2.841,4.029c.043.059.089.084.137.076s.071-.047.071-.12V376.66a.263.263,0,0,1,.263-.263h1.617a.262.262,0,0,1,.262.263Z"
                                              transform="translate(-595.921 -368.007)" fill="#fff"/>
                                        <path id="Path_21" data-name="Path 21"
                                              d="M687.9,379.915a4.02,4.02,0,0,1,.327-1.614,4.3,4.3,0,0,1,.886-1.323,4.16,4.16,0,0,1,1.311-.894,4.08,4.08,0,0,1,3.213,0,4.2,4.2,0,0,1,2.208,2.218,4.137,4.137,0,0,1,0,3.228,4.2,4.2,0,0,1-2.208,2.218,4.08,4.08,0,0,1-3.213,0,4.166,4.166,0,0,1-1.311-.895,4.3,4.3,0,0,1-.886-1.323A4.022,4.022,0,0,1,687.9,379.915Zm2.164,0a2.067,2.067,0,0,0,.152.791,2.126,2.126,0,0,0,.421.658,2.052,2.052,0,0,0,.628.456,1.8,1.8,0,0,0,1.53,0,2.108,2.108,0,0,0,1.06-1.114,2.106,2.106,0,0,0,0-1.576,2.03,2.03,0,0,0-.426-.659,2.185,2.185,0,0,0-.635-.45,1.805,1.805,0,0,0-1.53,0,2.108,2.108,0,0,0-.628.45,2.048,2.048,0,0,0-.421.659A2.079,2.079,0,0,0,690.064,379.915Z"
                                              transform="translate(-625.906 -367.506)" fill="#fff"/>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <ul className='list-none inline-block pt-4'>
                            <li className='float-left pr-8'>
                                <a href="">
                                    <FacebookIcon className='text-cyan-50'/>
                                </a>
                            </li>
                            <li className='float-left pr-8'>
                                <a href="">
                                    <InstagramIcon className='text-cyan-50'/>
                                </a>
                            </li>
                            <li className='float-left pr-8'>
                                <a href="">
                                    <TwitterIcon className='text-cyan-50'/>
                                </a>
                            </li>
                            <li className='float-left pr-8'>
                                <a href="">
                                    <TelegramIcon className='text-cyan-50'/>
                                </a>
                            </li>
                            <li className='float-left pr-8'>
                                <a href="">
                                    <WhatsAppIcon className='text-cyan-50'/>
                                </a>
                            </li>
                            <li className='float-left'>
                                <a href="">
                                    <YouTubeIcon className='text-cyan-50'/>
                                </a>
                            </li>
                        </ul>
                        <div className='pt-6'>
                            <h1 className='text-xl font-bold'>Dirección:</h1>
                            <p className='text-sm'>Lousiana No. 113 esq. Nueva York,</p>
                            <p className='text-sm'>Nápoles, Del. Benito Juárez., 3810, D.F.</p>
                        </div>
                        <div className='pt-4'>
                            <h1 className='text-xl font-bold'>Teléfono:</h1>
                            <p className='text-sm'>(01 55) 1167-6767</p>
                        </div>
                        <div className='pt-4'>
                            <h1 className='text-xl font-bold'>Contacto:</h1>
                            <p>labmc@movimientociudadano.mx</p>
                        </div>
                    </div>

                    <div>
                        <div className='w-full flex justify-center lg:justify-end lg:mt-20 flex flex-col'>
                            <button className="underline lg:ml-20 mt-0 text-2xl" onClick={() => {
                                location.replace(route('soporte'))
                            }}>
                                Soporte
                                <HeadsetMicOutlined/>
                            </button>
                        </div>
                        <div className='w-full m-auto p-auto w-max-2xl justify-center flex'>
                            <img src={logolabmc} alt='' className='my-2 lg:ml-20 h-28 w-28'/>
                        </div>

                        <div className='flex justify-center m-2 lg:ml-28'>
                            <ul className='list-none inline-block pt-4'>
                                <li className='float-left pr-8'>
                                    <a href="">
                                        <FacebookIcon className='text-cyan-50'/>
                                    </a>
                                </li>
                                <li className='float-left pr-8'>
                                    <a href="">
                                        <InstagramIcon className='text-cyan-50'/>
                                    </a>
                                </li>
                                <li className='float-left pr-8'>
                                    <a href="">
                                        <TwitterIcon className='text-cyan-50'/>
                                    </a>
                                </li>
                                <li className='float-left pr-8'>
                                    <a href="">
                                        <TelegramIcon className='text-cyan-50'/>
                                    </a>
                                </li>
                                <li className='float-left pr-8'>
                                    <a href="">
                                        <WhatsAppIcon className='text-cyan-50'/>
                                    </a>
                                </li>
                                <li className='float-left'>
                                    <a href="">
                                        <YouTubeIcon className='text-cyan-50'/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {
                    showingNavigationDropdown
                        ?
                        <OverlayMenu className='overlay appear-from-right'>
                            <div className="top-4 right-4 absolute flex items-center">
                                <button
                                    onClick={handleCloseOverlay}
                                    className="inline-flex items-center justify-center p-0 rounded-md text-white transition duration-150 ease-in-out"
                                >
                                    <svg className="h-9 w-9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M6 6h10M8 12h13M6 18h10"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className='w-full h-full flex justify-center items-center p-4'>
                                <div className='relative min-w-20 h-full flex justify-center items-center p-4'>
                                    {/* <div className='absolute top-0 bottom-0 w-px bg-white'>
                                    </div> */}
                                    <ul style={{zIndex: 1}}>
                                        <li className='p-6 pt-12'><a href=""><FacebookIcon
                                            className='text-cyan-50 transition-all ease-in-out duration-200 group-hover:text-mc-gradient1_1'/></a>
                                        </li>
                                        <li className='p-6'><a href=""><InstagramIcon className='text-cyan-50'/></a>
                                        </li>
                                        <li className='p-6'><a href=""><TwitterIcon className='text-cyan-50'/></a></li>
                                        <li className='p-6'><a href=""><TelegramIcon className='text-cyan-50'/></a></li>
                                        <li className='p-6'><a href=""><WhatsAppIcon className='text-cyan-50'/></a></li>
                                        <li className='p-6 pb-12'><a href=""><YouTubeIcon className='text-cyan-50'/></a>
                                        </li>
                                    </ul>
                                </div>
                                <div className='flex-grow h-full flex justify-center items-center'>
                                    <ul>

                                        {
                                            user?.id
                                                ? <li className='p-2 pb-4'>
                                                    <Link
                                                        href={
                                                            user?.perfil_grupal_tagged_in
                                                                ? route('perfil.grupal.page', {id: user?.perfil_grupal_tagged_in})
                                                                : user?.perfil_data?.customUrl && user?.perfil_data?.customUrl.length > 0
                                                                    ? route('perfil.page.custom', user?.perfil_data?.customUrl ?? '')
                                                                    : route('perfil.page', {id: user?.perfil_data?.guid ?? ''})
                                                        }
                                                        onClick={() => toast("Cargando", {
                                                            position: toast.POSITION.TOP_CENTER
                                                        })}
                                                    >
                                                        <Typography
                                                            variant='h4'
                                                            fontWeight='bolder'
                                                            className='text-white tracking-wide transition-all ease-in-out duration-300 hover:text-mc-gradient1_1'
                                                        >
                                                            Mi perfil
                                                        </Typography>
                                                    </Link>
                                                </li>
                                                : <li className='p-2 pb-4'>
                                                    <Link
                                                        href={route("login")}
                                                        onClick={() => toast("Cargando", {
                                                            position: toast.POSITION.TOP_CENTER
                                                        })}
                                                    >
                                                        <Typography
                                                            variant='h4'
                                                            fontWeight='bolder'
                                                            className='text-white tracking-wide transition-all ease-in-out duration-300 hover:text-mc-gradient1_1'
                                                        >
                                                            Iniciar sesión
                                                        </Typography>
                                                    </Link>
                                                </li>
                                        }

                                        {
                                            user?.id && user?.perfiles_grupales_data?.length > 0
                                                ? <li className='p-2 pb-4'>
                                                    <Link
                                                        href={route('menu.perfiles.page')}
                                                        onClick={() => toast("Cargando", {
                                                            position: toast.POSITION.TOP_CENTER
                                                        })}
                                                    >
                                                        <Typography
                                                            variant='h4'
                                                            fontWeight='bolder'
                                                            className='text-white tracking-wide transition-all ease-in-out duration-300 hover:text-mc-gradient1_1'
                                                        >
                                                            Cambiar de perfil
                                                        </Typography>
                                                    </Link>
                                                </li>
                                                : null
                                        }

                                        {
                                            user?.id
                                                ? <li className='p-2 pb-4'>
                                                    <Link
                                                        method='get'
                                                        href={route("get.cerrar.sesion")}
                                                        as='button'
                                                        className='text-left'
                                                        onClick={() => toast("Cargando", {
                                                            position: toast.POSITION.TOP_CENTER
                                                        })}
                                                    >
                                                        <Typography
                                                            variant='h4'
                                                            fontWeight='bolder'
                                                            className='text-white tracking-wide transition-all ease-in-out duration-300 hover:text-mc-gradient1_1'
                                                        >
                                                            Cerrar sesión
                                                        </Typography>
                                                    </Link>
                                                </li>
                                                : null
                                        }

                                        <hr/>
                                        <li className='p-2 pt-4'>
                                            <Link
                                                href={route("/")}
                                                onClick={() => toast("Cargando", {
                                                    position: toast.POSITION.TOP_CENTER
                                                })}
                                            >
                                                <Typography
                                                    variant='h4'
                                                    fontWeight='bolder'
                                                    className={
                                                        `${route().current('/')
                                                            ? 'text-mc-gradient1_1'
                                                            : 'text-white'
                                                        } tracking-wide transition-all ease-in-out duration-300 hover:text-mc-gradient1_1`
                                                    }>
                                                    Inicio
                                                </Typography>
                                            </Link>
                                        </li>
                                        <li className='p-2'>
                                            <Link
                                                href={route("eventos.page")}
                                                onClick={() => toast("Cargando", {
                                                    position: toast.POSITION.TOP_CENTER
                                                })}
                                            >
                                                <Typography
                                                    variant='h4'
                                                    fontWeight='bolder'
                                                    className={`${route().current('eventos.page') ? 'text-mc-gradient1_1' : 'text-white'} tracking-wide transition-all ease-in-out duration-300 hover:text-mc-gradient1_1`}
                                                >
                                                    Eventos
                                                </Typography>
                                            </Link>
                                        </li>

                                        <li className='p-2'>
                                            <Link
                                                href={"https://public.ciudadanosenmovimiento.org/lista-perfiles"}
                                                onClick={() => toast("Cargando", {
                                                    position: toast.POSITION.TOP_CENTER
                                                })}
                                            >
                                                <Typography
                                                    variant='h4'
                                                    fontWeight='bolder'
                                                    className={`${route().current('eventos.page') ? 'text-mc-gradient1_1' : 'text-white'} tracking-wide transition-all ease-in-out duration-300 hover:text-mc-gradient1_1`}
                                                >
                                                    Directorio
                                                </Typography>
                                            </Link>
                                        </li>
                                        <li className='p-2'>
                                            <Link
                                                href={"https://public.ciudadanosenmovimiento.org/lista-perfiles-grupales"}
                                                onClick={() => toast("Cargando", {
                                                    position: toast.POSITION.TOP_CENTER
                                                })}
                                            >
                                                <Typography
                                                    variant='h4'
                                                    fontWeight='bolder'
                                                    className={`${route().current('eventos.page') ? 'text-mc-gradient1_1' : 'text-white'} tracking-wide transition-all ease-in-out duration-300 hover:text-mc-gradient1_1`}
                                                >
                                                    Áreas
                                                </Typography>
                                            </Link>
                                        </li>

                                        {/* <li className='p-2'><Link href=""><Typography variant='h4' fontWeight='bolder' className={`${route().current('/') ? 'text-mc-gradient1_1' : 'text-white'} tracking-wide transition-all ease-in-out duration-300 hover:text-mc-gradient1_1`}>Quiero ser voluntario</Typography></Link></li> */}
                                        {/* <li className='p-2'><Link href=""><Typography variant='h4' fontWeight='bolder' className={`${route().current('/') ? 'text-mc-gradient1_1' : 'text-white'} tracking-wide transition-all ease-in-out duration-300 hover:text-mc-gradient1_1`}>Causas</Typography></Link></li> */}
                                        {/* <li className='p-2'>
                                            <Link href="">
                                                <Typography
                                                    variant='h4'
                                                    fontWeight='bolder'
                                                    className={`${route().current('/') ? 'text-mc-gradient1_1' : 'text-white'} tracking-wide transition-all ease-in-out duration-300 hover:text-mc-gradient1_1`}
                                                >
                                                    Las
                                                    <span className='text-mc-primary'> 8 </span>
                                                    <span style={{ color: '#0BFFD5' }}>A</span>
                                                    <span style={{ color: '#0BA1FF' }}>C</span>
                                                    <span style={{ color: '#6442FF' }}>C</span>
                                                    <span style={{ color: '#FBAE00' }}>I</span>
                                                    <span style={{ color: '#FE445F' }}>O</span>
                                                    <span style={{ color: '#E300FF' }}>N</span>
                                                    <span style={{ color: '#9100FF' }}>E</span>
                                                    <span style={{ color: '#FF268F' }}>S</span>
                                                </Typography>
                                            </Link>
                                        </li> */}

                                    </ul>
                                </div>
                            </div>
                        </OverlayMenu>
                        : null
                }
            </div>
        </div>
    );
};

export default CustomLayout;
