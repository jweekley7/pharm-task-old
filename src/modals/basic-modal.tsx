import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type BasicModalType = {
  headingText: string;
  bodyText: any;
  openModal: boolean;
  closeModal: () => void;
}

export const BasicModal = (props: BasicModalType) => {
  const {
    headingText, 
    bodyText, 
    openModal,
    closeModal,
  } = props;
  // const [open, setOpen] = useState(true);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {headingText}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {bodyText}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;