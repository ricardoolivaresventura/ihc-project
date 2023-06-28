import React from 'react';
import { IconButton } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

export default function SpeechTracking() {
  const handleClick = () => {};

  return (
    <IconButton
      onClick={handleClick}
      style={{
        borderColor: '#5051F9',
        borderWidth: '1px',
        borderStyle: 'solid',
        marginLeft: '15px',
      }}
    >
      <KeyboardVoiceIcon style={{ color: 'white' }} />
    </IconButton>
  );
}
