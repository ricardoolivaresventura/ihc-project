import React from 'react';
import styled from 'styled-components';
import GestureItem from './GestureItem';

export default function Gestures() {
  const gestures = [
    {
      img: require('../../images/open.png'),
      action: 'Abrir modal de nueva tarea',
    },
    {
      img: require('../../images/close.png'),
      action: 'Guardar nueva tarea',
    },
    {
      img: require('../../images/point.png'),
      action: 'Marcar tarea como completada',
    },
    /*     {
      img: require('../../images/pinchtip.png'),
    }, */
  ];

  return (
    <Container>
      <Title>Gestos</Title>
      {/*       <Subtitle>Puedes modificar las acciones asociadas a cada gesto:</Subtitle> */}
      <Subtitle>Acciones asociadas a cada gesto:</Subtitle>
      <GesturesContainer>
        {gestures.map((item, index) => (
          <GestureItem {...item} key={index} />
        ))}
      </GesturesContainer>
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

const GesturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
