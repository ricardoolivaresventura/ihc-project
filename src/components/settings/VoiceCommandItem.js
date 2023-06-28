import React from 'react';
import styled from 'styled-components';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { VOICE_COMMANDS } from '../../utils/constants';

export default function VoiceCommandItem({ value, name, description }) {
  return (
    <Container>
      <NameContainer>
        <RecordVoiceOverIcon style={{ color: 'white' }} />
        <Name>{name}</Name>
      </NameContainer>
      <Description>{description}</Description>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 15px;
  gap: 10px;
  min-width: 270px;
  border: 0.5px solid rgba(155, 155, 155, 0.5);
  border-radius: 15px;
`;

const Name = styled.p`
  color: white;
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

const Description = styled.p`
  flex: 1;
  margin-left: 20px;
  color: white;
  font-size: 14px;
  border-bottom: 1px solid rgba(155, 155, 155, 0.5);
  font-family: ${(props) => props.theme.fonts.regular};
  padding-bottom: 15px;
`;
