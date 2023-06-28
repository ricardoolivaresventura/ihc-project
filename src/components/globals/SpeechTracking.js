import React, { useEffect } from 'react';
import { IconButton } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styled, { keyframes } from 'styled-components';
import { useDispatch } from 'react-redux';
import { setCurrentVoiceCommand } from '../../context/reducers/voiceCommands';
import { VOICE_COMMANDS } from '../../utils/constants';

export default function SpeechTracking() {
  const dispatch = useDispatch();
  const commands = [
    {
      command: 'Crear nueva tarea',
      callback: () => {
        dispatch(
          setCurrentVoiceCommand({
            currentVoiceCommand: VOICE_COMMANDS[0].value,
          }),
        );
        resetTranscript();
      },
    },
    {
      command: 'Marcar como completada',
      callback: () => {
        dispatch(
          setCurrentVoiceCommand({
            currentVoiceCommand: VOICE_COMMANDS[1].value,
          }),
        );
        resetTranscript();
      },
    },
    {
      command: 'Crear nueva categoría',
      callback: () => {
        dispatch(
          setCurrentVoiceCommand({
            currentVoiceCommand: VOICE_COMMANDS[2].value,
          }),
        );
        resetTranscript();
      },
    },
    {
      command: 'Eliminar tarea',
      callback: () => {
        dispatch(
          setCurrentVoiceCommand({
            currentVoiceCommand: VOICE_COMMANDS[3].value,
          }),
        );
        resetTranscript();
      },
    },
    {
      command: 'Guardar nueva tarea',
      callback: () => {
        dispatch(
          setCurrentVoiceCommand({
            currentVoiceCommand: VOICE_COMMANDS[4].value,
          }),
        );
        resetTranscript();
      },
    },
    {
      command: 'Guardar cambios',
      callback: () => {
        dispatch(
          setCurrentVoiceCommand({
            currentVoiceCommand: VOICE_COMMANDS[5].value,
          }),
        );
        resetTranscript();
      },
    },
    {
      command: 'Guardar nueva categoría',
      callback: () => {
        dispatch(
          setCurrentVoiceCommand({
            currentVoiceCommand: VOICE_COMMANDS[6].value,
          }),
        );
        resetTranscript();
      },
    },
    {
      command: 'Cerrar modal',
      callback: () => {
        dispatch(
          setCurrentVoiceCommand({
            currentVoiceCommand: VOICE_COMMANDS[7].value,
          }),
        );
        resetTranscript();
      },
    },
  ];

  const { transcript, interimTranscript, finalTranscript, resetTranscript, listening } =
    useSpeechRecognition({ commands });

  useEffect(() => {
    if (finalTranscript !== '') {
      console.log('Got final result:', finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      'Your browser does not support speech recognition software! Try Chrome desktop, maybe?',
    );
  }

  const handleClick = () => {
    if (!listening) {
      SpeechRecognition.startListening({
        continuous: true,
        language: 'es-Es',
      });
    } else {
      SpeechRecognition.stopListening();
    }
  };

  return (
    <ContainerButton>
      <IconButton
        onClick={handleClick}
        style={{
          borderColor: '#5051F9',
          borderWidth: '1px',
          borderStyle: 'solid',
          marginLeft: '15px',
        }}
      >
        {listening && <Point />}
        <KeyboardVoiceIcon style={{ color: 'white' }} />
      </IconButton>
    </ContainerButton>
  );
}

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const ContainerButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Point = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  height: 8px;
  width: 8px;
  border-radius: 10px;
  background-color: green;
  animation: ${blinkAnimation} 1s infinite;
`;
