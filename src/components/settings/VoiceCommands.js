import React from 'react';
import styled from 'styled-components';

export default function VoiceCommands() {
  return (
    <Container>
      <Title>Comandos de Voz</Title>
      <Subtitle>Puedes modificar el comando de voz asociado a cada acción: </Subtitle>
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
