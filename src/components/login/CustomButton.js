import React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

export default function CustomButton({
  title,
  maxWidth = 450,
  handleClick,
  loading = false,
  paddingLeft = 0,
  paddingRight = 0,
}) {
  return (
    <ButtonStyled
      style={{ paddingLeft: `${paddingLeft}px`, paddingRight: `${paddingRight}px` }}
      maxWidth={maxWidth}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? <CircularProgress style={{ color: 'white' }} size={30} /> : <Text>{title}</Text>}
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
