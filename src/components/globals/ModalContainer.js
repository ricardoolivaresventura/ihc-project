import React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function ModalContainer({
  children,
  isVisible,
  setIsVisible,
  paddingTop = 35,
  paddingBottom = 25,
  paddingLeft = 25,
  paddingRight = 25,
  setIsMainValue,
}) {
  const handleClose = () => {
    setIsVisible(false);
    if (setIsMainValue) {
      setIsMainValue('');
    }
  };

  return (
    <Dialog
      open={isVisible}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          backgroundColor: '#1E1F25',
          borderRadius: '15px',
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
          paddingLeft: `${paddingLeft}px`,
          paddingRight: `${paddingRight}px`,
        },
      }}
    >
      {children}
    </Dialog>
  );
}
