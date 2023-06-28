import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function CustomSnackbar({
  type = 'success',
  open,
  setOpen,
  message,
  vertical = 'bottom',
  horizontal = 'right',
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
      TransitionComponent={Slide}
      style={{ marginTop: '90px' }}
    >
      <Alert
        style={{ backgroundColor: type === 'success' ? '#0094CF' : '#CD4F4F' }}
        onClose={handleClose}
        severity={type === 'success' ? 'success' : 'error'}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
