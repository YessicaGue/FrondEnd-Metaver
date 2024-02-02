import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

export const CustomModal = ({ open, setOpen, children }) => {
  return (
    <Modal
      open={ open }
      onClose={ () => setOpen(false) }
      sx={{ backgroundColor: 'rgba(0,0,0,0.2) !important' }}
    >
      <Box sx={style}>
        { children }
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  width: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};