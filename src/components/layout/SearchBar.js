import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  return (
    <Container>
      <InputContainer>
        <SearchIcon style={{ color: 'white' }} />
        <Input placeholder='Buscar...' />
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  padding-left: 85px;
  height: 44px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #050505;
  height: 100%;
  max-width: 650px;
  margin-right: 40px;
  border-radius: 10px;
  padding-left: 12px;
`;

const Input = styled.input`
  height: 100%;
  flex: 1;
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  padding-left: 15px;
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 16px;
  ::placeholder {
    color: white;
  }
`;
