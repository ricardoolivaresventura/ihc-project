import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

export default function SidebarButton({ icon, pathname, isSelected }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(pathname);
  };

  return (
    <IconButton
      onClick={handleClick}
      style={{
        height: '50px',
        width: '50px',
        borderRadius: '10px',
        backgroundColor: isSelected ? '#5051F9' : 'transparent',
      }}
    >
      {icon}
    </IconButton>
  );
}
