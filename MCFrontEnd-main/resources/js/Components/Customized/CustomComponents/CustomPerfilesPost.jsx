import { Box } from '@mui/material';
import React from 'react';

const CustomPerfilesPost = (props) => {
    const { children } = props;
    return (
        <Box
            className='w-full h-auto relative'
        >
            { children }
        </Box>
    );
};

export default CustomPerfilesPost;