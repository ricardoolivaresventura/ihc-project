import React from 'react';
import Drawer from '@mui/material/Drawer';
import styled from 'styled-components';

export default function CustomDrawer({ children, isOpen, setIsOpen }) {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      anchor='right'
      variant='temporary'
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Container>{children}</Container>
    </Drawer>
  );
}

const Container = styled.div`
  width: 385px;
  height: 100vh;
  background-color: #1e1f25;
`;
