import React, { useMemo } from 'react';
import { Head } from '@inertiajs/react';
import TrailAppear from '@/Components/Customized/AnimationComponents/TrailAppear';
import { Box, Button, TextField, Container, FormControlLabel, Checkbox,TextareaAutosize,Typography,Link,LinearProgress,Backdrop,CircularProgress} from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { CustomAutoComplete } from '@/Components/Customized/CustomComponents/CustomAutoComplete';
import NumberedCircle from '@/Components/Customized/CustomComponents/NumberedCircle';
import { CustomSelect } from '@/Components/Customized/CustomComponents/CustomSelect';
import { estados } from '@/data/estados';
import { CustomDatePicker } from '../Voluntarios/CustomDatePicker';
import dayjs from 'dayjs';
//import PruebaLabel from './PruebaLabel';
import '../../../assets/fonts/CompactaSHOP-Light.woff';
import '../../../assets/fonts/Montserrat-Black.woff';
import Loader from './Loader';
import './style.css';
import { MdLocationOn } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa';
import { BsEnvelopeFill } from 'react-icons/bs';



const formularioInit = {
    causas: [],
    nombre: '',
    email: '',
    ciudad: '',
    estado: '',
    fechaNacimiento: dayjs(new Date()),
    avisoAceptado: false
};

const Footer = () => {
    return (
        <div className='w-full'>
            <div>
                <div className='py-12 bg-gray-900'>
                    <div className='px-6 xs:px-6 sm:px-10 lg:px-30 h-full flex flex-col text-white justify-evenly'>
                        <div className='grid lg:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1 md:grid-cols-1'>
                            <div className='w-36 h-26 pb-10'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.7 44.999">
                                    <g id="logo-mc" transform="translate(-397.697 -210.334)">
                                        <g id="Group_2" data-name="Group 2" transform="translate(397.697 210.334)">
                                            <g id="Group_1" data-name="Group 1" transform="translate(0 0)">
                                                <path id="Path_1" data-name="Path 1" d="M430.162,230.867a18.745,18.745,0,0,1,3.011-1.516c.541-.224,1.076-.449,1.609-.671.55-.244,1.094-.494,1.621-.793a12.667,12.667,0,0,0,1.528-.986,9.045,9.045,0,0,0,.7-.595c.109-.106.226-.2.331-.318l.312-.341a7.574,7.574,0,0,0,1.658-3.194c.069-.285.11-.571.163-.853.027-.292.061-.6.075-.872v-.791c-.012-.264-.027-.525-.049-.781-.026-.306-.062-.7-.1-1,0,0-.079-.3-.323-.319-.2-.037-.918.495-1.334.825.03.2.066.384.078.606s.018.466.019.7-.016.477-.024.718c-.027.216-.052.433-.078.651-.049.221-.086.449-.144.669l-.1.327-.05.164-.066.157-.131.317c-.051.1-.108.2-.16.306a5.6,5.6,0,0,1-.359.593c-.064.1-.144.186-.215.281a2.816,2.816,0,0,1-.228.273c-.021.024-.044.046-.067.07a11.35,11.35,0,0,1-.631-3.62c.225-2.085,3.131-3.694,3.5-3.651s.512.8.512.8,1.236-2.364.377-2.944a2.237,2.237,0,0,0-1.384-.179c-.149-.436-.31-.858-.491-1.262a7.4,7.4,0,0,0-1.391-2.195,2.565,2.565,0,0,0-.6-.446c-.067-.031-.126-.059-.205-.087a1.934,1.934,0,0,0-.282-.066l-.065,0-.031,0h-.017c-.131-.006-.051,0-.086,0-.068,0-.14.009-.2.019a2.948,2.948,0,0,0-1.151.49,11.892,11.892,0,0,0-1.429,1.172c-.038.035-.076.069-.112.1a3.291,3.291,0,0,0-.436.4l-.173.151c-.531.381-1.044-.044-1.312-.346a10.889,10.889,0,0,0-2.329-2.484c-.5-.106-1.164.794-.891,1.479a.636.636,0,0,0,.121.109c.077.054.038-.529.3-.476s.3.939.534,1.125a.708.708,0,0,1-.9-.044l-.206-.186c-.1-.093-.205.315.052.532a2.186,2.186,0,0,0,.847.533c.245.088,1.034.371,1.875.763,1.36.87,2.068.2,2.068.2.048-.028.093-.056.139-.087.389-.262.747-.575,1.153-.91a11.162,11.162,0,0,1,1.333-.986,1.808,1.808,0,0,1,.675-.265.171.171,0,0,1,.03,0l.019,0,.064.008c.013.009-.02.011-.026,0a.182.182,0,0,0,.036.021,1.379,1.379,0,0,1,.254.221,6.369,6.369,0,0,1,1.01,1.825c.111.281.242.685.336.991-.239.067-.392.116-.392.116a.894.894,0,0,0-1.037-.646,10.736,10.736,0,0,0-2.456,1.446,3.873,3.873,0,0,1-2.3.648,1.642,1.642,0,0,0,.86.952,6.578,6.578,0,0,0-1.73,2.456h0a17.828,17.828,0,0,0-1.365,4.318,6.14,6.14,0,0,1-1.078-.2,22.034,22.034,0,0,1-2.585-.969,3.287,3.287,0,0,1-1.418-5.213s2.025-2.223-1.843-4.066a18.083,18.083,0,0,0-6.533-1.586c-3.639-.155-13.539-.4-19.153-1.178,0,0,7.118,6.667,9.511,8.787a3.939,3.939,0,0,0,2.7,1.018,32.642,32.642,0,0,0,5.8-.79,8.563,8.563,0,0,1-3.855,1.8s2.114,4.221,5.067,5.918a3.373,3.373,0,0,0,2,.367,14.769,14.769,0,0,0,3.977-1.205s-.911,1.367-3.79,2.11a19.5,19.5,0,0,0,7.174,3.319,2.555,2.555,0,0,0,1.276,2.446,4.2,4.2,0,0,1,.448-1.965A5.887,5.887,0,0,1,430.162,230.867Z" transform="translate(-397.697 -210.334)" fill="#fff"/>
                                                <path id="Path_2" data-name="Path 2" d="M565.325,215.755a18.1,18.1,0,0,0-6.536,1.586c-3.867,1.843-1.841,4.066-1.841,4.066a3.288,3.288,0,0,1-1.419,5.213s-1.015.417-2.476.861a8.456,8.456,0,0,1-1.279,2.029,7.122,7.122,0,0,1-.874.874c-.1.086-.205.168-.305.249l-.168.135a13.31,13.31,0,0,1-1.612,1.041c-.55.312-1.127.575-1.669.818l-1.626.678a18.4,18.4,0,0,0-2.9,1.454c-.018.011-.034.022-.052.034a8.038,8.038,0,0,0-1.051.831c4.417-.018,5.608,2.73,5.608,2.73s1.634-3.787,8.2-2.446a18.123,18.123,0,0,0,7.734-3.319c-2.879-.743-3.79-2.11-3.79-2.11a14.766,14.766,0,0,0,3.977,1.205,3.372,3.372,0,0,0,2-.367c2.953-1.7,5.066-5.918,5.066-5.918a8.561,8.561,0,0,1-3.853-1.8,32.613,32.613,0,0,0,5.795.79,3.937,3.937,0,0,0,2.7-1.018c2.395-2.12,9.511-8.787,9.511-8.787C578.863,215.351,568.964,215.6,565.325,215.755Z" transform="translate(-509.776 -213.636)" fill="#fff"/>
                                            </g>
                                        </g>
                                        <g id="Group_3" data-name="Group 3" transform="translate(399.751 238.764)">
                                            <path id="Path_3" data-name="Path 3" d="M439.847,339.274V344.9a.19.19,0,0,1-.057.14.188.188,0,0,1-.139.058H438.42a.187.187,0,0,1-.138-.058.19.19,0,0,1-.057-.14v-2.651a.079.079,0,0,0-.074-.09.127.127,0,0,0-.123.058l-1.381,2.231a.145.145,0,0,1-.132.066.165.165,0,0,1-.14-.066L435,342.213a.113.113,0,0,0-.115-.058c-.05.006-.074.036-.074.09V344.9a.192.192,0,0,1-.057.14.189.189,0,0,1-.139.058H433.38a.188.188,0,0,1-.139-.058.193.193,0,0,1-.057-.14v-5.624a.192.192,0,0,1,.057-.139.188.188,0,0,1,.139-.058h1.142a.361.361,0,0,1,.171.049.345.345,0,0,1,.13.116l1.577,2.322a.143.143,0,0,0,.115.066.123.123,0,0,0,.107-.066l1.577-2.322a.427.427,0,0,1,.139-.116.357.357,0,0,1,.171-.049h1.142a.2.2,0,0,1,.2.2Z" transform="translate(-427.406 -338.961)" fill="#fff"/>
                                            <path id="Path_4" data-name="Path 4" d="M467.572,341.677a3.009,3.009,0,0,1,.246-1.21,3.229,3.229,0,0,1,.664-.993,3.119,3.119,0,0,1,.984-.671,3.063,3.063,0,0,1,2.409,0,3.149,3.149,0,0,1,1.656,1.663,3.1,3.1,0,0,1,0,2.42,3.152,3.152,0,0,1-1.656,1.664,3.063,3.063,0,0,1-2.409,0,3.121,3.121,0,0,1-.984-.671,3.218,3.218,0,0,1-.664-.993A3.009,3.009,0,0,1,467.572,341.677Zm1.623,0a1.555,1.555,0,0,0,.115.593,1.591,1.591,0,0,0,.316.494,1.525,1.525,0,0,0,.471.342,1.351,1.351,0,0,0,1.147,0,1.59,1.59,0,0,0,.8-.836,1.585,1.585,0,0,0,0-1.182,1.5,1.5,0,0,0-.32-.494,1.623,1.623,0,0,0-.475-.337,1.349,1.349,0,0,0-1.147,0,1.571,1.571,0,0,0-.471.337,1.533,1.533,0,0,0-.316.494A1.563,1.563,0,0,0,469.2,341.677Z" transform="translate(-454.204 -338.557)" fill="#fff"/>
                                            <path id="Path_5" data-name="Path 5" d="M498.528,344.885l-2.475-5.608a.185.185,0,0,1,0-.164.145.145,0,0,1,.144-.074h1.336a.281.281,0,0,1,.16.054.383.383,0,0,1,.118.127l1.442,3.31a.114.114,0,0,0,.214,0l1.434-3.31a.385.385,0,0,1,.119-.127.278.278,0,0,1,.16-.054h1.361a.141.141,0,0,1,.131.07.136.136,0,0,1,.009.136l-2.5,5.64a.38.38,0,0,1-.119.127.277.277,0,0,1-.16.054h-1.09a.275.275,0,0,1-.16-.054A.375.375,0,0,1,498.528,344.885Z" transform="translate(-476.383 -338.932)" fill="#fff"/>
                                            <path id="Path_6" data-name="Path 6" d="M530.866,345.1h-1.232a.184.184,0,0,1-.142-.058.2.2,0,0,1-.053-.14v-5.624a.2.2,0,0,1,.053-.139.183.183,0,0,1,.142-.058h1.232a.186.186,0,0,1,.139.058.19.19,0,0,1,.057.139V344.9a.192.192,0,0,1-.057.14A.188.188,0,0,1,530.866,345.1Z" transform="translate(-502.417 -338.961)" fill="#fff"/>
                                            <path id="Path_7" data-name="Path 7" d="M549.472,339.274V344.9a.2.2,0,0,1-.2.2h-1.231a.189.189,0,0,1-.139-.058.192.192,0,0,1-.057-.14v-2.651a.079.079,0,0,0-.074-.09.128.128,0,0,0-.123.058l-1.381,2.231a.143.143,0,0,1-.131.066.167.167,0,0,1-.14-.066l-1.38-2.231a.113.113,0,0,0-.115-.058.079.079,0,0,0-.074.09V344.9a.2.2,0,0,1-.2.2H543a.187.187,0,0,1-.138-.058.19.19,0,0,1-.057-.14v-5.624a.188.188,0,0,1,.057-.139.185.185,0,0,1,.138-.058h1.141a.359.359,0,0,1,.172.049.347.347,0,0,1,.131.116l1.577,2.322a.143.143,0,0,0,.115.066.123.123,0,0,0,.107-.066l1.578-2.322a.417.417,0,0,1,.138-.116.358.358,0,0,1,.171-.049h1.142a.188.188,0,0,1,.139.058A.19.19,0,0,1,549.472,339.274Z" transform="translate(-512.837 -338.961)" fill="#fff"/>
                                            <path id="Path_8" data-name="Path 8" d="M581.558,345.1h-1.232a.185.185,0,0,1-.143-.058.2.2,0,0,1-.052-.14v-5.624a.2.2,0,0,1,.052-.139.184.184,0,0,1,.143-.058h1.232a.187.187,0,0,1,.138.058.191.191,0,0,1,.057.139V344.9a.193.193,0,0,1-.057.14A.189.189,0,0,1,581.558,345.1Z" transform="translate(-541.922 -338.961)" fill="#fff"/>
                                            <path id="Path_9" data-name="Path 9" d="M594.973,340.751v.346a.2.2,0,0,0,.2.2h2.221a.192.192,0,0,1,.14.058.19.19,0,0,1,.057.14v1.136a.195.195,0,0,1-.2.2H595.17a.2.2,0,0,0-.2.2v.313a.2.2,0,0,0,.2.2h2.548a.191.191,0,0,1,.139.057.193.193,0,0,1,.057.14v1.136a.192.192,0,0,1-.057.14.19.19,0,0,1-.139.058h-4.172a.19.19,0,0,1-.14-.058.192.192,0,0,1-.057-.14v-5.632a.194.194,0,0,1,.057-.14.19.19,0,0,1,.14-.057h4.172a.191.191,0,0,1,.139.057.2.2,0,0,1,.057.14v1.12a.193.193,0,0,1-.057.14.191.191,0,0,1-.139.057H595.17a.2.2,0,0,0-.2.2Z" transform="translate(-552.223 -338.932)" fill="#fff"/>
                                            <path id="Path_10" data-name="Path 10" d="M625.347,339.237v5.632a.192.192,0,0,1-.057.14.19.19,0,0,1-.139.058H623.94a.355.355,0,0,1-.171-.049.42.42,0,0,1-.14-.116L621.5,341.88c-.033-.044-.067-.062-.1-.054s-.053.04-.053.095v2.947a.2.2,0,0,1-.2.2h-1.227a.2.2,0,0,1-.2-.2v-5.632a.193.193,0,0,1,.057-.14.189.189,0,0,1,.139-.057h1.23a.433.433,0,0,1,.311.156l2.131,3.022c.033.044.067.063.1.058s.053-.035.053-.09v-2.948a.193.193,0,0,1,.057-.14.19.19,0,0,1,.139-.057h1.213a.19.19,0,0,1,.139.057A.193.193,0,0,1,625.347,339.237Z" transform="translate(-572.771 -338.932)" fill="#fff"/>
                                            <path id="Path_11" data-name="Path 11" d="M653.948,340.554H652.8a.2.2,0,0,0-.2.2v4.117a.2.2,0,0,1-.053.14.187.187,0,0,1-.144.058h-1.229a.2.2,0,0,1-.2-.2v-4.117a.2.2,0,0,0-.053-.139.186.186,0,0,0-.143-.058h-1.164a.19.19,0,0,1-.139-.057.193.193,0,0,1-.058-.14v-1.12a.194.194,0,0,1,.058-.14.19.19,0,0,1,.139-.057h4.328a.187.187,0,0,1,.143.057.2.2,0,0,1,.053.14v1.12a.2.2,0,0,1-.053.14A.187.187,0,0,1,653.948,340.554Z" transform="translate(-595.921 -338.932)" fill="#fff"/>
                                            <path id="Path_12" data-name="Path 12" d="M672.82,341.677a3.017,3.017,0,0,1,.246-1.21,3.236,3.236,0,0,1,.664-.993,3.128,3.128,0,0,1,.983-.671,3.065,3.065,0,0,1,2.41,0,3.149,3.149,0,0,1,1.656,1.663,3.1,3.1,0,0,1,0,2.42,3.152,3.152,0,0,1-1.656,1.664,3.066,3.066,0,0,1-2.41,0,3.129,3.129,0,0,1-.983-.671,3.225,3.225,0,0,1-.664-.993A3.016,3.016,0,0,1,672.82,341.677Zm1.623,0a1.556,1.556,0,0,0,.114.593,1.6,1.6,0,0,0,.316.494,1.527,1.527,0,0,0,.471.342,1.352,1.352,0,0,0,1.147,0,1.583,1.583,0,0,0,.795-.836,1.573,1.573,0,0,0,0-1.182,1.516,1.516,0,0,0-.319-.494,1.636,1.636,0,0,0-.475-.337,1.35,1.35,0,0,0-1.147,0,1.573,1.573,0,0,0-.471.337,1.541,1.541,0,0,0-.316.494A1.564,1.564,0,0,0,674.443,341.677Z" transform="translate(-614.154 -338.557)" fill="#fff"/>
                                            <path id="Path_13" data-name="Path 13" d="M415.1,381.88a6.306,6.306,0,0,1-.7.935,4.037,4.037,0,0,1-.858.715,4.1,4.1,0,0,1-1.055.459,4.7,4.7,0,0,1-1.279.164,4.1,4.1,0,0,1-1.639-.329,4.373,4.373,0,0,1-1.339-.89,4.1,4.1,0,0,1-.9-1.318,4.141,4.141,0,0,1,0-3.228,4.1,4.1,0,0,1,.9-1.317,4.368,4.368,0,0,1,1.339-.89,4.1,4.1,0,0,1,1.639-.33,4.748,4.748,0,0,1,1.3.165,3.9,3.9,0,0,1,1.9,1.18,6.931,6.931,0,0,1,.694.928.213.213,0,0,1,.022.186.228.228,0,0,1-.132.143l-1.551.615a.282.282,0,0,1-.219,0,.335.335,0,0,1-.164-.132,2.321,2.321,0,0,0-.765-.774,2.069,2.069,0,0,0-1.082-.269,1.789,1.789,0,0,0-.781.176,2.157,2.157,0,0,0-1.218,1.938,2.119,2.119,0,0,0,.152.8,2.082,2.082,0,0,0,.426.666,2.186,2.186,0,0,0,.639.462,1.774,1.774,0,0,0,.781.176,2.08,2.08,0,0,0,1.087-.291,2.23,2.23,0,0,0,.771-.752.338.338,0,0,1,.158-.132.274.274,0,0,1,.213,0l1.551.615a.226.226,0,0,1,.11.329Z" transform="translate(-407.004 -367.583)" fill="#fff"/>
                                            <path id="Path_14" data-name="Path 14" d="M449.458,384.473h-1.642a.248.248,0,0,1-.19-.077.267.267,0,0,1-.071-.187v-7.5a.267.267,0,0,1,.071-.187.247.247,0,0,1,.19-.077h1.642a.25.25,0,0,1,.185.077.257.257,0,0,1,.076.187v7.5a.256.256,0,0,1-.076.187A.252.252,0,0,1,449.458,384.473Z" transform="translate(-438.605 -368.046)" fill="#fff"/>
                                            <path id="Path_15" data-name="Path 15" d="M463.746,376.71a.256.256,0,0,1,.076-.187.252.252,0,0,1,.185-.077h1.642a.251.251,0,0,1,.185.077.257.257,0,0,1,.076.187v4.446a1.6,1.6,0,0,0,.137.708,1.239,1.239,0,0,0,.34.439,1.26,1.26,0,0,0,.434.225,1.354,1.354,0,0,0,.834,0,1.211,1.211,0,0,0,.428-.225,1.278,1.278,0,0,0,.335-.439,1.607,1.607,0,0,0,.138-.708V376.71a.255.255,0,0,1,.075-.187.252.252,0,0,1,.185-.077h1.642a.25.25,0,0,1,.184.077.256.256,0,0,1,.077.187v4.446a3.906,3.906,0,0,1-.246,1.416,3.028,3.028,0,0,1-.7,1.087,3.171,3.171,0,0,1-1.1.7,4.256,4.256,0,0,1-2.859,0,3.157,3.157,0,0,1-1.1-.7,3.088,3.088,0,0,1-.71-1.087,3.831,3.831,0,0,1-.251-1.416Z" transform="translate(-451.223 -368.046)" fill="#fff"/>
                                            <path id="Path_16" data-name="Path 16" d="M502.613,384.17v-7.51a.264.264,0,0,1,.263-.263h2.983a3.975,3.975,0,0,1,2.808,1.01,3.6,3.6,0,0,1,.9,1.307,4.515,4.515,0,0,1,.306,1.7,4.563,4.563,0,0,1-.306,1.708,3.589,3.589,0,0,1-.9,1.311,3.705,3.705,0,0,1-1.251.747,4.583,4.583,0,0,1-1.557.253h-2.983a.263.263,0,0,1-.263-.264Zm2.426-1.757h.819a2.78,2.78,0,0,0,.634-.077,1.442,1.442,0,0,0,.59-.291,1.57,1.57,0,0,0,.432-.6,3.126,3.126,0,0,0,0-2.031,1.542,1.542,0,0,0-.437-.6,1.49,1.49,0,0,0-.59-.291,2.722,2.722,0,0,0-.629-.077h-.819a.252.252,0,0,0-.186.077.256.256,0,0,0-.077.187v3.448a.255.255,0,0,0,.077.186A.251.251,0,0,0,505.039,382.413Z" transform="translate(-481.512 -368.007)" fill="#fff"/>
                                            <path id="Path_17" data-name="Path 17" d="M536.706,376.688a.411.411,0,0,1,.148-.17.389.389,0,0,1,.224-.071h1.53a.377.377,0,0,1,.213.071.411.411,0,0,1,.147.17l3.191,7.465a.227.227,0,0,1-.016.209.244.244,0,0,1-.235.11h-1.869a.384.384,0,0,1-.224-.072.487.487,0,0,1-.158-.17l-.3-.659a.5.5,0,0,0-.159-.17.372.372,0,0,0-.213-.072h-2.306a.39.39,0,0,0-.225.072.4.4,0,0,0-.147.17l-.306.659a.4.4,0,0,1-.147.17.37.37,0,0,1-.213.072h-1.88a.337.337,0,0,1-.115-.022.241.241,0,0,1-.1-.066.221.221,0,0,1-.049-.11.26.26,0,0,1,.033-.154Zm.645,4.776h.973a.178.178,0,0,0,.158-.071.153.153,0,0,0-.005-.171q-.109-.274-.262-.642l-.284-.686c-.029-.066-.062-.1-.1-.1s-.069.033-.1.1l-.547,1.328a.159.159,0,0,0,.164.242Z" transform="translate(-505.584 -368.046)" fill="#fff"/>
                                            <path id="Path_18" data-name="Path 18" d="M576.045,384.17v-7.51a.254.254,0,0,1,.077-.186.25.25,0,0,1,.186-.077h2.984a3.975,3.975,0,0,1,2.808,1.01,3.619,3.619,0,0,1,.9,1.307,4.507,4.507,0,0,1,.306,1.7,4.554,4.554,0,0,1-.306,1.708,3.6,3.6,0,0,1-.9,1.311,3.716,3.716,0,0,1-1.251.747,4.588,4.588,0,0,1-1.557.253h-2.984a.253.253,0,0,1-.186-.077A.256.256,0,0,1,576.045,384.17Zm2.426-1.757h.82a2.779,2.779,0,0,0,.634-.077,1.442,1.442,0,0,0,.589-.291,1.576,1.576,0,0,0,.432-.6,3.137,3.137,0,0,0,0-2.031,1.545,1.545,0,0,0-.438-.6,1.49,1.49,0,0,0-.589-.291,2.722,2.722,0,0,0-.629-.077h-.82a.261.261,0,0,0-.262.263v3.448a.255.255,0,0,0,.076.186A.252.252,0,0,0,578.471,382.413Z" transform="translate(-538.737 -368.007)" fill="#fff"/>
                                            <path id="Path_19" data-name="Path 19" d="M610.137,376.688a.415.415,0,0,1,.148-.17.386.386,0,0,1,.223-.071h1.53a.374.374,0,0,1,.213.071.407.407,0,0,1,.147.17l3.191,7.465a.226.226,0,0,1-.017.209.243.243,0,0,1-.235.11H613.47a.384.384,0,0,1-.224-.072.489.489,0,0,1-.158-.17l-.295-.659a.5.5,0,0,0-.159-.17.373.373,0,0,0-.213-.072h-2.306a.388.388,0,0,0-.224.072.4.4,0,0,0-.147.17l-.307.659a.4.4,0,0,1-.148.17.366.366,0,0,1-.213.072H607.2a.339.339,0,0,1-.115-.022.236.236,0,0,1-.1-.066.216.216,0,0,1-.049-.11.256.256,0,0,1,.033-.154Zm.645,4.776h.972a.18.18,0,0,0,.159-.071.155.155,0,0,0-.006-.171q-.109-.274-.262-.642c-.1-.245-.2-.473-.284-.686-.029-.066-.062-.1-.1-.1s-.069.033-.1.1l-.546,1.328a.159.159,0,0,0,.164.242Z" transform="translate(-562.808 -368.046)" fill="#fff"/>
                                            <path id="Path_20" data-name="Path 20" d="M656.932,376.66v7.51a.261.261,0,0,1-.261.264h-1.614a.479.479,0,0,1-.229-.066.57.57,0,0,1-.185-.154l-2.846-4.029c-.044-.059-.09-.082-.137-.071s-.071.053-.071.126v3.93a.255.255,0,0,1-.077.187.258.258,0,0,1-.187.077h-1.636a.258.258,0,0,1-.187-.077.255.255,0,0,1-.077-.187v-7.51a.263.263,0,0,1,.263-.263h1.639a.571.571,0,0,1,.415.209l2.841,4.029c.043.059.089.084.137.076s.071-.047.071-.12V376.66a.263.263,0,0,1,.263-.263h1.617a.262.262,0,0,1,.262.263Z" transform="translate(-595.921 -368.007)" fill="#fff"/>
                                            <path id="Path_21" data-name="Path 21" d="M687.9,379.915a4.02,4.02,0,0,1,.327-1.614,4.3,4.3,0,0,1,.886-1.323,4.16,4.16,0,0,1,1.311-.894,4.08,4.08,0,0,1,3.213,0,4.2,4.2,0,0,1,2.208,2.218,4.137,4.137,0,0,1,0,3.228,4.2,4.2,0,0,1-2.208,2.218,4.08,4.08,0,0,1-3.213,0,4.166,4.166,0,0,1-1.311-.895,4.3,4.3,0,0,1-.886-1.323A4.022,4.022,0,0,1,687.9,379.915Zm2.164,0a2.067,2.067,0,0,0,.152.791,2.126,2.126,0,0,0,.421.658,2.052,2.052,0,0,0,.628.456,1.8,1.8,0,0,0,1.53,0,2.108,2.108,0,0,0,1.06-1.114,2.106,2.106,0,0,0,0-1.576,2.03,2.03,0,0,0-.426-.659,2.185,2.185,0,0,0-.635-.45,1.805,1.805,0,0,0-1.53,0,2.108,2.108,0,0,0-.628.45,2.048,2.048,0,0,0-.421.659A2.079,2.079,0,0,0,690.064,379.915Z" transform="translate(-625.906 -367.506)" fill="#fff"/>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className='col-span-2'>
                                <div className='flex items-center'>
                                    <MdLocationOn className='mr-1 text-xl' />
                                    <h1 className='t-n text-lg mr-2' style={{ fontFamily: 'Poppins, sans-serif' }}>Dirección:</h1>
                                    <p className='t-nc' style={{ fontFamily: 'Montserrat, sans-serif' }}>Lousiana Nápoles, 23923</p>
                                </div>
                                <div className='flex items-center'>
                                    <FaPhone className='mr-2' style={{ transform: 'scaleX(-1)' }}/>
                                    <h1 className='font-bold t-n text-lg mr-2' style={{ fontFamily: 'Poppins, sans-serif' }}>Teléfono:</h1>
                                    <p className='t-nc' style={{ fontFamily: 'Montserrat, sans-serif' }}>222 333 4567</p>
                                </div>
                                <div className='flex items-center'>
                                    <BsEnvelopeFill className='mr-2' />
                                    <h1 className='font-bold t-n text-lg mr-2' style={{ fontFamily: 'Poppins, sans-serif' }}>Contacto:</h1>
                                    <p className='t-nc' style={{ fontFamily: 'Montserrat, sans-serif' }}>Labmc@movimientociudadano.mx</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const OverlayMenu = (props) => {
    const { user, children, className, onClick } = props;

    return (
        <div onClick={ onClick } className={`fixed z-50 h-screen w-full flex justify-center items-center top-0 ${className} bg-[rgba(0,0,0,0.5)]`}>
            { children }
        </div>
    );
};

const OverlayCard = (props) => {
    const { title, description, textoBoton } = props;
    return (
        <div className='absolute top-2 right-2 bottom-2 left-2 bg-[rgba(255,255,255,0.90)] rounded-lg flex flex-col gap-2 justify-center items-center cursor-pointer px-2' { ...props }>
            {/* <span className='text-xs font-bold tracking-wide text-mc-primary text-center' style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</span> */}
            {/* <div className='w-1/2 h-[1px] bg-mc-primary px-4'></div> */}
            {/* <span className='text-xs font-light tracking-[2px] text-[#606060] text-center' style={{ fontFamily: 'Poppins, sans-serif' }}>{description}</span> */}
            <span className='max-md:text-base text-3xl uppercase tracking-widest text-center font-bold' style={{ fontFamily: 'Poppins, sans-serif' }}>{ textoBoton }</span>
        </div>
    )
};

const index = () => {
    const [nombre2, setNombre2] = useState('');
    const [email2, setEmail2] = useState('');
    const [ciudad2, setCiudad2] = useState('');
    const [estado2, setEstado2] = useState('');
    const [fechaNacimiento2,setFechaNacimiento2] = useState(dayjs(new Date()));
    const [motivoParaApoyo2,setMotivoParaApoyo2] = useState('');
    const [numeroWhatsapp,setNumeroWhatsapp] = useState('');
    const [siAceptaTerminos2, setSiAceptaTerminos2]=useState(false);

    const [nombreCompleto, setNombreCompleto] = useState('');
    const [email3, setEmail3] = useState('');
    const [ciudad3, setCiudad3] = useState('');
    const [estado3, setEstado3] = useState('');
    const [genero3,setGenero3] = useState('');
    const [escolaridad3,setEscolaridad3] = useState('');
    const [fechaNacimiento3,setFechaNacimiento3] = useState(dayjs(new Date()));
    const [motivoParaApoyo3,setMotivoParaApoyo3] = useState('');
    const [hasChanged, setHasChanged] = useState(false);
    const [isValid, setIsValid] = useState(true);

    // validacion número de whatsapp
    const handleNumeroWhatsappChange=(e)=>{
        const value = e.target.value;
        setNumeroWhatsapp(value);
        setHasChanged(true);
        setIsValid(value.length===10 && /^\d+$/.test(value));
    }

    //validacion nombre Completo
    const handleNombreCompletoChange=(e)=>{
        const value = e.target.value;
        setNombreCompleto(value);
        setHasChange
    }

    const [formulario, setFormulario] = useState(formularioInit);
    const [listaCausasLanding, setListaCausasLanding] = useState([
        { id: 1, nombre: 'Mujeres' },
        { id: 2, nombre: 'Jóvenes' },
        { id: 3, nombre: 'Medio ambiente' },
        { id: 4, nombre: 'Personas con discapacidad' },
        { id: 5, nombre: 'Derechos humanos' },
        { id: 6, nombre: 'Trabajo' },
        { id: 7, nombre: 'El campo' }
    ]);
    const [listaGeneros, setListaGeneros] = useState([
        { id: 1, nombre: "Masculino", activo: true },
        { id: 2, nombre: "Femenino", activo: true },
        { id: 3, nombre: "Chico", activo: true },
        { id: 4, nombre: "Chica", activo: true },
        { id: 5, nombre: "Bigénero", activo: true },
        { id: 6, nombre: "Intersexual", activo: true },
        { id: 7, nombre: "No binario", activo: true },
        { id: 8, nombre: "Sin género", activo: true },
        { id: 9, nombre: "No estoy seguro", activo: true },
        { id: 10, nombre: "Prefiero no decir", activo: true },
        { id: 11, nombre: "Otro", activo: true }
    ]);
    const [listaEscolaridades, setListaEscolaridades] = useState([
        { id: 1, nombre: "Primaria", activo: true },
        { id: 2, nombre: "Secundaria", activo: true },
        { id: 3, nombre: "Preparatoria o Bachiller", activo: true },
        { id: 4, nombre: "Técnico superior", activo: true },
        { id: 5, nombre: "Licenciatura", activo: true },
        { id: 6, nombre: "Posgrado", activo: true },
        { id: 7, nombre: "Otro", activo: true }
    ]);

    const { nombre, email, causas, ciudad, estado, fechaNacimiento, avisoAceptado } = formulario;

    const [openingModal, setOpeningModal] = useState(false);
    const [typeModal, setTypeModal] = useState(0);
    const [ isLoading, setIsLoading ] = useState(false);

    const handleFechaNacimientoChange = (newDate) => {
        // Asignar la nueva fecha a la variable fechaNacimiento2
        setFechaNacimiento2(newDate);
    };

    const handleModalClose = () => {
        setTimeout(() => {
            setTimeout(() => {
                setTypeModal(0);
                setOpeningModal((previousState) => !previousState);
            }, 350);
            document
                .querySelector('.overlay')
                .classList
                .add('disappear');
        }, 50);

        document
            .querySelector('.overlay')
            .classList
            .remove('appear');
    };

    const handleOpenModal = (type) => {
        setTypeModal(type);
        setOpeningModal(true);
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        try{
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsLoading(false);
        await Swal.fire({
            title: `Datos enviados correctamente`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
        });
        setOpeningModal(false)
        }
        catch(Ex){
            setIsLoading(false);
            Swal.fire({
                title: `Datos no enviados.Intenta de nuevo mas tarde`,
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    }
    const handleSubmitApoyoComunidad  = async () => {
        const formularioApoyoComunidad={
            entidadFederativaId:estado2,
            nombre:nombre2,
            email:email2,
            direccion:ciudad2,
            siAceptaTerminos2:siAceptaTerminos2,
        }
        await Swal.fire({
            title: `Datos enviados correctamente Apoyo Comunidad`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
        });

        setOpeningModal(false)
    }
    return (
        <div className={`max-h-screen ${openingModal ? ' overflow-hidden' : ''}`}>
            <Head title="Funnel" />
            <div className='bg-orange-400 h-[400px]'>
                <div className='text-8xl text-white text-center pt-20 justify-center t-mc' style={{ fontFamily: 'CompactaSHOP', letterSpacing: '2px', fontweigh:'500' }}>
                    <span>¿CÓMO QUIERES PARTICIPAR?</span>
                </div>
            </div>
            <div className='w-full z-10 bg-orange-400'>

                <div className='w-full bg-orange-400'>

                    <div className='bg-orange-400 max-w-7xl mx-auto px-6 xs:px-6 sm:px-10 lg:px-30 py-8 h-full flex flex-col'>

                        <TrailAppear>

                            <div className='grid grid-cols-1 gap-4 h-full w-full'>
                                <TrailAppear>
                                    <button class="w-full h-[100px] bg-white rounded-full px-4 py-16 mb-5 text-orange-500 shadow-md overflow-hidden relative transform hover:shadow-xl hover:translate-y-[-5px] transition-all">

                                        <OverlayCard
                                            title="Quiero recibir temas de interés"
                                            description="Comparte tu opinión ¿Qué temas te interesan? Conoce las diferentes actividades temáticas que tenemos para poder escucharte."
                                            textoBoton="Quiero recibir temas de interés"
                                            onClick={ () => handleOpenModal(1) }
                                        />
                                    </button>

                                    <button class="w-full h-[100px] bg-white rounded-full px-4 py-16 mb-5 text-orange-500 shadow-md overflow-hidden relative transform hover:shadow-xl hover:translate-y-[-5px] transition-all">

                                        <OverlayCard
                                            title="Quiero apoyar a mi comunidad"
                                            description="No hay mejor forma de comenzar a participar que ayudando a nuestra comunidad. Déjanos tus datos para avisarte sobre las actividades cerca de ti."
                                            textoBoton="Quiero apoyar a mi comunidad"
                                            onClick={ () => handleOpenModal(2) }
                                        />
                                    </button>

                                    <button class="w-full h-[100px] bg-white rounded-full px-4 py-16 mb-5 text-orange-500 shadow-md overflow-hidden relative transform hover:shadow-xl hover:translate-y-[-5px] transition-all">

                                        <OverlayCard
                                            title="Quiero ser parte del equipo"
                                            description="Quiero ser parte del equipo"
                                            textoBoton="Quiero ser parte del equipo"
                                            onClick={ () => handleOpenModal(3) }
                                        />
                                    </button>
                                    <div className='w-full h-[200px] grid gap-4 grid-cols-2 mb-10'>
                                        <button class="w-full h-[200px] bg-white rounded-full px-4 py-2 text-orange-500 shadow-md overflow-hidden relative transform hover:shadow-xl hover:translate-y-[-5px] transition-all">
                                            <iframe style={{ aspectRatio: '16/9 !important' }} src="https://www.youtube.com/embed/Cd_S6YQtBqk" allowFullScreen width='100%' height='100%'></iframe>
                                            <OverlayCard
                                                title="Solo quiero ver la serie Águila"
                                                description="Solo quiero ver la serie Águila"
                                                onClick={(e) => e.target.classList.add('disappear', 'hidden')}
                                                textoBoton="Solo quiero ver la serie Águila"
                                            />
                                        </button>

                                        <button className='w-full h-[200px] bg-white rounded-full px-4 py-16 text-orange-500 shadow-md overflow-hidden relative transform hover:shadow-xl hover:translate-y-[-5px] transition-all'>
                                            <OverlayCard
                                                title="Solo quiero jugar con naranjita"
                                                description="Solo quiero jugar con naranjita"
                                                onClick={() => location.replace(route('juegos.page'))}
                                                textoBoton="Solo quiero jugar con naranjita"
                                            />
                                        </button>
                                    </div>
                                </TrailAppear>
                            </div>
                        </TrailAppear>

                    </div>

                </div>

            </div>

            <Footer />

            {
                openingModal && typeModal === 1
                ?   <OverlayMenu className='overlay appear max-md:px-0 px-4'>

                        <Box className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl min-h-[50vh] max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'>
                            <div className="top-2 right-2 absolute flex items-center">
                                <button
                                    onClick={ handleModalClose }
                                    className="inline-flex fixed top-4 right-4 items-center justify-center p-0 rounded-md max-md:text-gray-600 text-white transition duration-150 ease-in-out"
                                >
                                    <svg className="h-9 w-9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className='inline-flex'
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className='pt-[3rem] h-full flex gap-4 flex-col'>
                                <Container
                                    className='p-[20px] ml-auto mr-auto'
                                    maxWidth={'lg'}
                                >
                                    <div className='subtitles w-full text-center'>
                                        Movimiento Ciudadano - Temas de interés
                                    </div>

                                    <div className='titles w-full text-center break-words text-mc text-black'>
                                        <span className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                            Llena el siguiente formulario, por favor
                                        </span>
                                    </div>

                                </Container>
                                <NumberedCircle number={1}/>
                                <CustomAutoComplete
                                    label="Temas seleccionados"
                                    freeSolo={ true }
                                    checkboxes={ false }
                                    options={ listaCausasLanding }
                                    value={ causas }
                                    onChange={(event, value) => setFormulario({ ...formulario, causas: value })}
                                />

                                <NumberedCircle number={2}/>
                                <TextField
                                    fullWidth
                                    label="Nombre"
                                    color="primary"
                                    value={ nombre }
                                    onChange={ (event, value) => setFormulario({ ...formulario, nombre: event.target.value }) }
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    color="primary"
                                    value={ email }
                                    onChange={ (event, value) => setFormulario({ ...formulario, email: event.target.value }) }
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={ avisoAceptado }
                                            onChange={() => setFormulario((value) => ({ ...value, avisoAceptado: !avisoAceptado }))}
                                        />
                                    }
                                    label={
                                        <div className="flex-col sm:flex-row items-start">
                                            <Typography variant="body1" display="inline">Acepto el <span className='font-bold'>Aviso de Privacidad</span></Typography>
                                            {' '}
                                            <Link href="https://transparencia.movimientociudadano.mx/protecciondedatospersonales" target="_blank" rel="noopener">Ver</Link>
                                        </div>
                                    }
                                />

                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={ handleSubmit }
                                    disabled={isLoading}
                                >
                                     {isLoading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        "Enviar"
                                    )}
                                </Button>
                            </div>
                        </Box>

                    </OverlayMenu>
                :   null
            }

            {
                openingModal && typeModal === 2
                ?   <OverlayMenu className='overlay appear max-md:px-0 px-4'>

                        <Box className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl min-h-[50vh] max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'>
                            <div className="top-2 right-2 absolute flex items-center">
                                <button
                                    onClick={ handleModalClose }
                                    className="inline-flex fixed top-4 right-4 items-center justify-center p-0 rounded-md max-md:text-gray-600 text-white transition duration-150 ease-in-out"
                                >
                                    <svg className="h-9 w-9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className='inline-flex'
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className='pt-[3rem] h-full flex gap-4 flex-col'>
                                <Container
                                    className='p-[20px] ml-auto mr-auto'
                                    maxWidth={'lg'}
                                >
                                    <div className='subtitles w-full text-center'>
                                        Movimiento Ciudadano - Apoyo a la comunidad
                                    </div>

                                    <div className='titles w-full text-center break-words text-mc text-black'>
                                        <span className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                            Llena el siguiente formulario, por favor
                                        </span>
                                    </div>

                                </Container>
                                <NumberedCircle number={1}/>
                                <TextField
                                    label="Nombre"
                                    value={nombre2}
                                    onChange={(e) => setNombre2(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Email"
                                    value={email2}
                                    onChange={(e) => setEmail2(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Número WhatsApp"
                                    value={numeroWhatsapp}
                                    onChange={(e) => setNumeroWhatsapp(e.target.value)}
                                    fullWidth
                                />
                                 <CustomDatePicker
                                    label="Fecha de nacimiento"
                                    name="fechaNacimiento"
                                    inputFormat="DD/MM/YYYY"
                                    ampm={false}
                                    value={ fechaNacimiento2}
                                    onChange={handleFechaNacimientoChange}
                                />
                                <NumberedCircle number={2}/>
                                <TextField
                                    label="Ciudad"
                                    value={ciudad2}
                                    onChange={(e) => setCiudad2(e.target.value)}
                                    fullWidth
                                />
                                <CustomSelect
                                    label="Estado"
                                    name="estado"
                                    value={ estado2 }
                                    onChange={(e) => setEstado2(e.target.value)}
                                    list={ estados }
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label={
                                        <div className="flex-col sm:flex-row items-start">
                                            <Typography variant="body1" display="inline">Acepto el <span className='font-bold'>Aviso de Privacidad</span></Typography>
                                            {' '}
                                            <Link href="https://transparencia.movimientociudadano.mx/protecciondedatospersonales" target="_blank" rel="noopener">Ver</Link>
                                        </div>
                                    }
                                />
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={ handleSubmit }
                                    disabled={isLoading}
                                >
                                     {isLoading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        "Enviar"
                                    )}
                                </Button>
                            </div>
                        </Box>

                    </OverlayMenu>
                :   null
            }
            {
                openingModal && typeModal === 3
                ?   <OverlayMenu className='overlay appear max-md:px-0 px-4'>

                        <Box className='max-md:max-h-screen max-md:min-h-screen w-full max-w-5xl min-h-[50vh] max-h-[80vh] max-md:rounded-none rounded-xl bg-white relative overflow-auto py-4 px-4'>
                            <div className="top-2 right-2 absolute flex items-center">
                                <button
                                    onClick={ handleModalClose }
                                    className="inline-flex fixed top-4 right-4 items-center justify-center p-0 rounded-md max-md:text-gray-600 text-white transition duration-150 ease-in-out"
                                >
                                    <svg className="h-9 w-9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className='inline-flex'
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className='pt-[3rem] h-full flex gap-4 flex-col'>
                                <Container
                                    className='p-[20px] ml-auto mr-auto'
                                    maxWidth={'lg'}
                                >
                                    <div className='subtitles w-full text-center'>
                                        Movimiento Ciudadano - Únete al equipo
                                    </div>

                                    <div className='titles w-full text-center break-words text-mc text-black'>
                                        <span className={'text-transparent bg-clip-text bg-gradient-to-r from-mc-primary to-mc-gradient3_2'}>
                                            Llena el siguiente formulario, por favor
                                        </span>
                                    </div>
                                </Container>
                                <NumberedCircle number={1}/>
                                <TextField
                                    label="Nombre"
                                    name="nombreCompleto"
                                    value={nombreCompleto}
                                    onChange={(e) => setNombreCompleto(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Email"
                                    value={email3}
                                    onChange={(e) => setEmail3(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Número Whatsapp"
                                    name="numeroWhatsapp"
                                    value={numeroWhatsapp}
                                    onChange={handleNumeroWhatsappChange}
                                    error={hasChanged && !isValid}
                                    helperText={hasChanged && !isValid ? 'El número Whatsapp debe tener 10 dígitos y ser numérico' : ''}
                                />
                                <NumberedCircle number={2}/>
                                <TextField
                                    label="Ciudad"
                                    value={ciudad3}
                                    onChange={(e) => setCiudad3(e.target.value)}
                                    fullWidth
                                />
                                <CustomSelect
                                    label="Estado"
                                    name="estado"
                                    value={ estado3 }
                                    onChange={(e) => setEstado3(e.target.value)}
                                    list={ estados }
                                />
                                <CustomSelect
                                    label="Género"
                                    name="genero"
                                    value={ genero3 }
                                    onChange={(e) => setGenero3(e.target.value)}
                                    list={ listaGeneros }
                                />
                                <CustomDatePicker
                                    label="Fecha de nacimiento"
                                    name="fechaNacimiento"
                                    inputFormat="DD/MM/YYYY"
                                    value={ fechaNacimiento3 }
                                />
                                <CustomSelect
                                    label="Nivel escolar"
                                    value={ escolaridad3 }
                                    onChange={(e) => setEscolaridad3(e.target.value)}
                                    list={ listaEscolaridades }
                                />
                                <CustomAutoComplete
                                    label="¿Cuáles son tus causas?"
                                    freeSolo={ true }
                                    checkboxes={ false }
                                    options={ listaCausasLanding }
                                    value={ causas }
                                    onChange={(event, value) => setFormulario({ ...formulario, causas: value })}
                                />
                                <TextField
                                fullWidth
                                multiline
                                label="Cuéntanos, ¿Por qué quieres unirte?"
                                InputProps={{
                                    //inputComponent: TextareaAutosize,
                                    rows: 3
                                }}
                                value={motivoParaApoyo3}
                                onChange={(e) => setMotivoParaApoyo3(e.target.value)}
                                margin="normal"
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label={
                                        <div className="flex-col sm:flex-row items-start">
                                            <Typography variant="body1" display="inline">Acepto el <span className='font-bold'>Aviso de Privacidad</span></Typography>
                                            {' '}
                                            <Link href="https://transparencia.movimientociudadano.mx/protecciondedatospersonales" target="_blank" rel="noopener">Ver</Link>
                                        </div>
                                    }
                                />
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={ handleSubmit }
                                    disabled={isLoading}
                                >
                                     {isLoading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        "Enviar"
                                    )}
                                </Button>
                            </div>
                        </Box>

                    </OverlayMenu>
                :   null
            }
        </div>
    );
};

export default index;
