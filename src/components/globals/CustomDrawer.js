import React from 'react';
import Drawer from '@mui/material/Drawer';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setCurrentVoiceCommand } from '../../context/reducers/voiceCommands';

export default function CustomDrawer({ children, isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(
      setCurrentVoiceCommand({
        currentVoiceCommand: null,
      }),
    );
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
      PaperProps={{
        style: {
          backgroundColor: '#1e1f25',
        },
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
