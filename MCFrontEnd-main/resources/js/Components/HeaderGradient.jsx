import React from "react";
import {generateGradiant} from "@/utils/AppGradientes";
import {appColors} from "@/utils/AppColors";
import ScaleText from "react-scale-text";

const HeaderGradient = (props) => {
    return (
        <div
            className="bgnaranja w-full text-white min-h-[450px] flex justify-center items-center !p-8 relative"
            style={{
                background: generateGradiant(45, appColors.gradient2, appColors.gradient1)
            }}
        >
            <div
                className={'w-full h-fit max-h-[100%] border-l-8 border-white py-4 pl-2 overflow-hidden'}
            >
                <div
                    className={'font-sans uppercase'}
                >
                    <ScaleText
                        className="font-black drop-shadow-2xl tracking-wide whitespace-pre-wrap"
                        minFontSize={20}
                        maxFontSize={50}
                    >
                        {props['title']}
                    </ScaleText>

                    {
                        props['subtitle'] !== null && props['subtitle'] !== undefined && props['subtitle'] !== '' ?
                            <div
                                className={'font-semibold tracking-wide whitespace-pre-wrap'}
                            >
                                <ScaleText
                                    minFontSize={15}
                                    maxFontSize={40}
                                >
                                    {props['subtitle']}
                                </ScaleText>
                            </div>
                            : null
                    }
                </div>

                {
                    props['description'] !== null && props['description'] !== undefined && props['description'] !== '' ?
                        <div
                            className={'subtitles !text-white !mt-5'}
                        >
                            {props['description']}
                        </div>
                        : null
                }
            </div>
        </div>
    );
}

export default HeaderGradient;
