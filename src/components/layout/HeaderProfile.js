import React, { useState } from 'react';
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import CustomMenu from '../globals/CustomMenu';

export default function HeaderProfile() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const options = [
    {
      label: 'Cerrar sesión',
      icon: <LogoutIcon style={{ color: '#3C3C3B' }} />,
      action: () => {
        navigate('/login');
        setAnchorEl(null);
      },
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Container onClick={handleClick}>
        <LineContainer>
          <Line />
        </LineContainer>
        <Content>
          <ProfileContainer>
            <Profile>MA</Profile>
          </ProfileContainer>
          <Name>María Alejandra Gutiérrez</Name>
          <KeyboardArrowDownIcon style={{ color: 'white' }} />
        </Content>
      </Container>
      <CustomMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        options={options}
        color={'#3C3C3B'}
      />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  height: 100%;
  transition: background-color 0.2s linear;
  margin-left: 15px;
  :hover {
    background-color: rgba(155, 155, 155, 0.2);
  }
`;

const LineContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Line = styled.div`
  background-color: ${(props) => props.theme.colors.lightGray};
  width: 2px;
  height: 54px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  padding-left: 12px;
  padding-right: 25px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 44px;
  border-radius: 100%;
  background-color: ${(props) => props.theme.colors.primary};
`;

const Profile = styled.div`
  color: white;
  font-size: 13px;
`;

const Name = styled.p`
  font-size: 13px;
  margin: 0px 14px;
  color: white;
`;
