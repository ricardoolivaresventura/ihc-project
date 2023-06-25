import React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';

export default function CustomButton({ title, maxWidth = 450 }) {
  return (
    <ButtonStyled maxWidth={maxWidth}>
      <Text>{title}</Text>
    </ButtonStyled>
  );
}

const ButtonStyled = styled(Button)`
  width: 100%;
  max-width: ${(props) => `${props.maxWidth}px`};
  background-color: ${(props) => props.theme.colors.primary};
  height: 54px;
`;

const Text = styled.p`
  color: white;
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.bold};
  text-transform: none;
`;
