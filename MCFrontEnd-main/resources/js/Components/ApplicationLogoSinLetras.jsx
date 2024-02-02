import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

export const Logo = () => {

    const [leftColor, setLeftColor] = useState('#fff');
    const [rightColor, setRightColor] = useState('#FECBA2');

    const springs = useSpring({
        from: { fill: leftColor },
        to: { fill: rightColor },
        config: { duration: 1000 },
    });

    const springs2 = useSpring({
        from: { fill: rightColor },
        to: { fill: leftColor },
        config: { duration: 1000 },
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (leftColor === '#fff') {
                setLeftColor('#FECBA2');
                setRightColor('#fff');
            } else {
                setLeftColor('#fff');
                setRightColor('#FECBA2');
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [leftColor]);

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.7 24.6">
            <g id="logo-mc" transform="translate(-397.697 -210.334)">
                <g id="Group_2" dataname="Group 2" transform="translate(397.697 210.334)">
                    <g id="Group_1" dataname="Group 1" transform="translate(0 0)">
                        <animated.path id="Path_1" dataname="Path 1" d="M430.162,230.867a18.745,18.745,0,0,1,3.011-1.516c.541-.224,1.076-.449,1.609-.671.55-.244,1.094-.494,1.621-.793a12.667,12.667,0,0,0,1.528-.986,9.045,9.045,0,0,0,.7-.595c.109-.106.226-.2.331-.318l.312-.341a7.574,7.574,0,0,0,1.658-3.194c.069-.285.11-.571.163-.853.027-.292.061-.6.075-.872v-.791c-.012-.264-.027-.525-.049-.781-.026-.306-.062-.7-.1-1,0,0-.079-.3-.323-.319-.2-.037-.918.495-1.334.825.03.2.066.384.078.606s.018.466.019.7-.016.477-.024.718c-.027.216-.052.433-.078.651-.049.221-.086.449-.144.669l-.1.327-.05.164-.066.157-.131.317c-.051.1-.108.2-.16.306a5.6,5.6,0,0,1-.359.593c-.064.1-.144.186-.215.281a2.816,2.816,0,0,1-.228.273c-.021.024-.044.046-.067.07a11.35,11.35,0,0,1-.631-3.62c.225-2.085,3.131-3.694,3.5-3.651s.512.8.512.8,1.236-2.364.377-2.944a2.237,2.237,0,0,0-1.384-.179c-.149-.436-.31-.858-.491-1.262a7.4,7.4,0,0,0-1.391-2.195,2.565,2.565,0,0,0-.6-.446c-.067-.031-.126-.059-.205-.087a1.934,1.934,0,0,0-.282-.066l-.065,0-.031,0h-.017c-.131-.006-.051,0-.086,0-.068,0-.14.009-.2.019a2.948,2.948,0,0,0-1.151.49,11.892,11.892,0,0,0-1.429,1.172c-.038.035-.076.069-.112.1a3.291,3.291,0,0,0-.436.4l-.173.151c-.531.381-1.044-.044-1.312-.346a10.889,10.889,0,0,0-2.329-2.484c-.5-.106-1.164.794-.891,1.479a.636.636,0,0,0,.121.109c.077.054.038-.529.3-.476s.3.939.534,1.125a.708.708,0,0,1-.9-.044l-.206-.186c-.1-.093-.205.315.052.532a2.186,2.186,0,0,0,.847.533c.245.088,1.034.371,1.875.763,1.36.87,2.068.2,2.068.2.048-.028.093-.056.139-.087.389-.262.747-.575,1.153-.91a11.162,11.162,0,0,1,1.333-.986,1.808,1.808,0,0,1,.675-.265.171.171,0,0,1,.03,0l.019,0,.064.008c.013.009-.02.011-.026,0a.182.182,0,0,0,.036.021,1.379,1.379,0,0,1,.254.221,6.369,6.369,0,0,1,1.01,1.825c.111.281.242.685.336.991-.239.067-.392.116-.392.116a.894.894,0,0,0-1.037-.646,10.736,10.736,0,0,0-2.456,1.446,3.873,3.873,0,0,1-2.3.648,1.642,1.642,0,0,0,.86.952,6.578,6.578,0,0,0-1.73,2.456h0a17.828,17.828,0,0,0-1.365,4.318,6.14,6.14,0,0,1-1.078-.2,22.034,22.034,0,0,1-2.585-.969,3.287,3.287,0,0,1-1.418-5.213s2.025-2.223-1.843-4.066a18.083,18.083,0,0,0-6.533-1.586c-3.639-.155-13.539-.4-19.153-1.178,0,0,7.118,6.667,9.511,8.787a3.939,3.939,0,0,0,2.7,1.018,32.642,32.642,0,0,0,5.8-.79,8.563,8.563,0,0,1-3.855,1.8s2.114,4.221,5.067,5.918a3.373,3.373,0,0,0,2,.367,14.769,14.769,0,0,0,3.977-1.205s-.911,1.367-3.79,2.11a19.5,19.5,0,0,0,7.174,3.319,2.555,2.555,0,0,0,1.276,2.446,4.2,4.2,0,0,1,.448-1.965A5.887,5.887,0,0,1,430.162,230.867Z" transform="translate(-397.697 -210.334)" fill={leftColor} style={springs2}/>
                        <animated.path id="Path_2" dataname="Path 2" d="M565.325,215.755a18.1,18.1,0,0,0-6.536,1.586c-3.867,1.843-1.841,4.066-1.841,4.066a3.288,3.288,0,0,1-1.419,5.213s-1.015.417-2.476.861a8.456,8.456,0,0,1-1.279,2.029,7.122,7.122,0,0,1-.874.874c-.1.086-.205.168-.305.249l-.168.135a13.31,13.31,0,0,1-1.612,1.041c-.55.312-1.127.575-1.669.818l-1.626.678a18.4,18.4,0,0,0-2.9,1.454c-.018.011-.034.022-.052.034a8.038,8.038,0,0,0-1.051.831c4.417-.018,5.608,2.73,5.608,2.73s1.634-3.787,8.2-2.446a18.123,18.123,0,0,0,7.734-3.319c-2.879-.743-3.79-2.11-3.79-2.11a14.766,14.766,0,0,0,3.977,1.205,3.372,3.372,0,0,0,2-.367c2.953-1.7,5.066-5.918,5.066-5.918a8.561,8.561,0,0,1-3.853-1.8,32.613,32.613,0,0,0,5.795.79,3.937,3.937,0,0,0,2.7-1.018c2.395-2.12,9.511-8.787,9.511-8.787C578.863,215.351,568.964,215.6,565.325,215.755Z" transform="translate(-509.776 -213.636)" fill={rightColor} style={springs} />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default function ApplicationLogoSinLetras({ className }) {

    return (
        <div className={ className }>
            <Logo />
        </div>
    );
}
