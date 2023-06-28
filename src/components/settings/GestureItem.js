import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import CustomMenu from '../globals/CustomMenu';
import { ACTIONS } from '../../utils/constants';

export default function GestureItem({ img, action }) {
  const [selectedValue, setSelectedValue] = useState(ACTIONS[0].value);
  const [anchorEl, setAnchorEl] = useState(null);

  const options = ACTIONS.map((action, index) => {
    return {
      label: action.name,
      icon: <LogoutIcon style={{ color: 'transparent' }} />,
      action: () => {
        setSelectedValue(action.value);
        setAnchorEl(null);
      },
    };
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const getSelectedValue = () => {
    return ACTIONS[ACTIONS.findIndex((item) => item.value === selectedValue)].name;
  };

  return (
    <Container>
      <ImageContainer>
        <Image src={img} />
      </ImageContainer>
      <StyledButton
        disabled
        /* onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon style={{ color: 'white' }} />} */
      >
        {/*      <Text>{getSelectedValue()}</Text> */}
        <Text>{action}</Text>
      </StyledButton>
      {/*     <Action>{action}</Action> */}
      {/*  <CustomMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        options={options}
        color={'#3C3C3B'}
      /> */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const ImageContainer = styled.div``;

const Image = styled.img``;

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 20px;
`;

const Text = styled.p`
  color: white;
  text-transform: none;
`;

const Action = styled.p``;
