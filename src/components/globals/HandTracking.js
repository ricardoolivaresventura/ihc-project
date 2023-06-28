import React, { useRef, useState } from 'react';
import * as handTrack from 'handtrackjs';
import styled, { keyframes } from 'styled-components';
import { IconButton } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';

const HandTracking = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const modelRef = useRef(null);
  const [gesture, setGesture] = useState('');
  const [isVideoActived, setIsVideoActived] = useState(false);

  const startHandTracking = async () => {
    const video = videoRef.current;

    const defaultParams = {
      flipHorizontal: true,
      outputStride: 16,
      imageScaleFactor: 1,
      maxNumBoxes: 20,
      iouThreshold: 0.2,
      scoreThreshold: 0.55,
      modelType: 'ssd320fpnlite',
      modelSize: 'large',
      bboxLineWidth: '2',
      fontSize: 17,
    };

    if (!modelRef.current) {
      modelRef.current = await handTrack.load(defaultParams);
    }

    handTrack
      .startVideo(video)
      .then((status) => {
        setIsVideoActived(true);
        if (status) {
          console.log('Cámara activada correctamente');
          runHandTracking();
        } else {
          console.log('No se pudo activar la cámara');
        }
      })
      .catch((error) => {
        console.error('Error al activar la cámara:', error);
      });
  };

  const runHandTracking = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const predictions = await modelRef.current.detect(video);

    if (predictions.length > 0) {
      const gestureName = predictions[0].label;
      modelRef.current.renderPredictions(predictions, canvas, context, video);
      if (gestureName !== 'face') {
        setGesture(gestureName);
      }
    }

    requestAnimationFrame(runHandTracking);
  };

  const isCameraOn = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('No se pudo acceder a la cámara:', error);
      return false;
    }
  };

  const handleButtonClick = () => {
    if (isVideoActived) {
      handTrack.stopVideo(videoRef.current);
      setIsVideoActived(false);
    } else {
      startHandTracking();
    }
  };

  return (
    <div>
      <ContainerButton>
        <IconButton
          onClick={handleButtonClick}
          style={{ borderColor: '#5051F9', borderWidth: '1px', borderStyle: 'solid' }}
        >
          {isVideoActived && <Point />}
          <VideocamIcon style={{ color: 'white' }} />
        </IconButton>
      </ContainerButton>
      <video style={{ display: 'none' }} ref={videoRef} autoPlay muted />
      <Canvas
        ref={canvasRef}
        id='canvas'
        style={{
          display: 'none',
        }}
      ></Canvas>
      {/*  <p style={{ color: 'white' }}>Último gesto detectado: {gesture}</p> */}
    </div>
  );
};

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

const Canvas = styled.canvas`
  border-radius: 3px;
  margin-right: 10px;
  width: 450px;
  height: 338px;
  border-bottom: 3px solid #0063ff;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 #00000030;
  background: #333;
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

export default HandTracking;
