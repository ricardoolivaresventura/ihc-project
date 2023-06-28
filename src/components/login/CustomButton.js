import React from 'react';
import Button from '@mui/material/Button';
import styled, { css } from 'styled-components';
import { CircularProgress } from '@mui/material';

export default function CustomButton({
  title,
  maxWidth = 450,
  handleClick,
  loading = false,
  paddingLeft = 0,
  paddingRight = 0,
  withBackground = true,
}) {
  return (
    <ButtonStyled
      withBackground={withBackground}
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
  background-color: ${(props) =>
    !props.withBackground ? 'transparent' : props.theme.colors.primary};
  height: 54px;
  ${(props) =>
    !props.withBackground &&
    css`
      border: 1px solid red;
    `}
`;

const Text = styled.p`
  color: white;
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.bold};
  text-transform: none;
`;
