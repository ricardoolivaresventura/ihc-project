import React, { useState } from 'react';
import styled from 'styled-components';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function CustomMenu({
  anchorEl,
  setAnchorEl,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = {
    vertical: 'top',
    horizontal: 'left',
  },
  options,
  color = null,
}) {
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledMenu
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >
      {options.map((opt, index) => (
        <StyleMenuItem
          key={index}
          onClick={() => {
            opt.action();
          }}
        >
          {opt.icon !== undefined && <IconContainer>{opt.icon}</IconContainer>}
          <MenuItemLabel customColor={color}>{opt.label}</MenuItemLabel>
        </StyleMenuItem>
      ))}
    </StyledMenu>
  );
}

const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    border-radius: 8px;
  }
`;

const StyleMenuItem = styled(MenuItem)`
  margin: 0px 10px;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => props.theme.colors.lightSkyBlue};
  }
`;

const IconContainer = styled.div`
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.gray2};
  font-weight: bold;
  ${StyleMenuItem}:hover & {
    color: ${(props) => props.theme.colors.skyBlue};
  }
`;

const MenuItemLabel = styled.p`
  margin-left: 8px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => (props.customColor ? props.customColor : props.theme.colors.gray2)};
  font-size: 16px;
  padding-right: 40px;

  ${StyleMenuItem}:hover & {
    color: ${(props) => props.theme.colors.primary};
  }
`;
