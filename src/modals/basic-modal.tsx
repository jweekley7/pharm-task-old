import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

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
  backEnabled?: boolean;
  onBackClicked?: () => void;
}

export const BasicModal = (props: BasicModalType) => {
  const {
    headingText, 
    bodyText, 
    openModal,
    closeModal,
  } = props;

  return (
    <div>
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex justify-between items-center'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {headingText}
            </Typography>
            <IconButton
              aria-label="close-modal-x-button"
              onClick={() => closeModal()}
              edge="end"
            >
              <CloseIcon/>
            </IconButton>       
          </div>         
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {bodyText}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;