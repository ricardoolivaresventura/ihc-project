import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function InputWithLabel({
  label,
  placeholder,
  type,
  value,
  setValue,
  showPassword,
  setShowPassword,
  marginTop = 0,
}) {
  const onChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Container marginTop={marginTop}>
      <Header>
        <Label>{label}</Label>
      </Header>
      <InputContainer>
        <Input
          onChange={onChange}
          type={type === 'password' ? (!showPassword ? 'password' : 'text') : 'text'}
          value={value}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <IconButton onClick={() => setShowPassword(!showPassword)}>
            {!showPassword ? (
              <VisibilityOffIcon style={{ color: 'white' }} />
            ) : (
              <VisibilityIcon style={{ color: 'white' }} />
            )}
          </IconButton>
        )}
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 450px;
  margin-top: ${(props) => `${props.marginTop}px`};
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 8px;
`;

const Label = styled.p`
  font-size: 16px;
  color: #f6f6f6;
  flex: 1;
  font-family: ${(props) => props.theme.fonts.medium};
`;

const InputContainer = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  height: 54px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 16px;
  padding-right: 16px;
`;

const Input = styled.input`
  background-color: transparent;
  height: 100%;
  outline: none;
  border: none;
  flex: 1;
  font-family: ${(props) => props.theme.fonts.medium};
  color: white;
`;
