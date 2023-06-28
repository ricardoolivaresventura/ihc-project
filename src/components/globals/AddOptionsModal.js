import { IconButton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { KeyboardArrowUp } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CustomButton from '../login/CustomButton';

export default function AddOptionsModal({ isVisible, options, setIsVisible }) {
  return (
    <AddButtonContainer>
      {isVisible &&
        options.map((opt, index) => (
          <CustomButton
            title={opt.label}
            handleClick={opt.action}
            key={index}
            paddingLeft={40}
            paddingRight={40}
          />
        ))}
      <AddButton onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? (
          <KeyboardArrowDownIcon style={{ color: 'white' }} fontSize='large' />
        ) : (
          <KeyboardArrowUp style={{ color: 'white' }} fontSize='large' />
        )}
      </AddButton>
    </AddButtonContainer>
  );
}

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
