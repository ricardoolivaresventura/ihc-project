import React from 'react';
import styled from 'styled-components';
import { VOICE_COMMANDS } from '../../utils/constants';
import VoiceCommandItem from './VoiceCommandItem';

export default function VoiceCommands() {
  return (
    <Container>
      <Title>Comandos de Voz</Title>
      {/*   <Subtitle>Puedes modificar el comando de voz asociado a cada acción: </Subtitle> */}
      <Subtitle>Utiliza estos comandos de voz para la acción que desees: </Subtitle>
      <List>
        {VOICE_COMMANDS.map((voice, index) => (
          <VoiceCommandItem {...voice} key={index} />
        ))}
      </List>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 30px;
  padding-left: 24px;
`;

const Title = styled.p`
  color: white;
  font-size: 28px;
  font-family: ${(props) => props.theme.fonts.medium};
`;

const Subtitle = styled.p`
  color: white;
  font-size: 18px;
  margin-top: 18px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
`;
