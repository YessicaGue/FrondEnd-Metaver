import {Box, Typography} from "@mui/material";
import React from "react";

const NumberedCircle = ({number, color='#101010'}) => {
    return (
        <Box className='flex flex-row justify-start items-center w-full'>
            <Box
                className='rounded-[50%] w-[40px] h-[40px] flex justify-center items-center border'
                style={{
                    border: `2px solid ${ color }`,
                }}
            >
                <Typography
                    style={{
                        fontWeight: '700',
                        color,
                        fontSize: '18px',
                    }}
                >
                    {number}
                </Typography>
            </Box>

            <Box className={`ml-[10px] grow h-[2px] bg-[${color}]`} />
        </Box>
    );
}

export default NumberedCircle;
