import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideocamIcon from '@mui/icons-material/Videocam';
import * as handTrack from 'handtrackjs';
import HeaderProfile from './HeaderProfile';
import SearchBar from './SearchBar';
import HandTracking from '../globals/HandTracking';
import SpeechTracking from '../globals/SpeechTracking';

export default function Header() {
  const handleVideo = () => {
    const video = document.getElementById('video_handtrack');
    handTrack.startVideo(video);
  };

  return (
    <CustomHeader>
      <LeftContainer>
        <LogoContainer>
          <Logo src={require('../../images/headerLogo.png')} />
        </LogoContainer>
        <Name>GesTask</Name>
      </LeftContainer>
      <SearchBar />
      <HandTracking />
      <SpeechTracking />
      {/* <ButtonsContainer>
        <IconButton
          onClick={handleVideo}
          style={{ borderColor: '#5051F9', borderWidth: '1px', borderStyle: 'solid' }}
        >
          <KeyboardVoiceIcon style={{ color: 'white' }} />
        </IconButton>
      </ButtonsContainer> */}
      <HeaderProfile />
    </CustomHeader>
  );
}

const CustomHeader = styled.header`
  position: fixed;
  top: 0px;
  z-index: 999;
  width: 100vw;
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 76px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const LogoContainer = styled.div`
  width: 94px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Logo = styled.img``;

const Name = styled.p`
  color: white;
  font-size: 25px;
  font-family: ${(props) => props.theme.fonts.semiBold};
  padding-left: 5px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
