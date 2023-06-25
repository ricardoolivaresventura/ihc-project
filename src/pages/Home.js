import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import CustomButton from '../components/login/CustomButton';

export default function Home() {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const options = [
    {
      label: 'Crear categoría',
      action: () => {},
    },
    {
      label: 'Crear tarea',
      action: () => {},
    },
  ];

  return (
    <Container>
      <AddButtonContainer>
        {isOptionsVisible &&
          options.map((opt, index) => (
            <CustomButton
              title={opt.label}
              handleClick={opt.action}
              key={index}
              paddingLeft={40}
              paddingRight={40}
            />
          ))}
        <AddButton onClick={() => setIsOptionsVisible(!isOptionsVisible)}>
          {isOptionsVisible ? (
            <KeyboardArrowDownIcon style={{ color: 'white' }} fontSize='large' />
          ) : (
            <KeyboardArrowUp style={{ color: 'white' }} fontSize='large' />
          )}
        </AddButton>
      </AddButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  padding-right: 24px;
  margin-left: 150px;
  padding-top: 120px;
  /*   width: calc(100vw - 94px); */
  padding-bottom: 50px;
`;

const AddButtonContainer = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
`;

const AddButton = styled(IconButton)`
  background-color: ${(props) => props.theme.colors.primary};
  height: 70px;
  width: 70px;
`;
