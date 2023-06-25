import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import CustomMenu from '../globals/CustomMenu';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

export default function HeaderProfile() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const onPressSignOut = async () => {
    try {
      await signOut(auth).then(() => {
        navigate('/login');
      });
    } catch (err) {
      console.log('Err: ', err);
    }
  };

  const options = [
    {
      label: 'Cerrar sesión',
      icon: <LogoutIcon style={{ color: '#3C3C3B' }} />,
      action: () => {
        onPressSignOut();
        setAnchorEl(null);
      },
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const getAvatar = () => {
    return user?.email ? `${user?.email?.charAt(0)}${user?.email?.charAt(1)}` : '';
  };

  const getEmail = () => {
    return user?.email ?? '';
  };

  return (
    <>
      <Container onClick={handleClick}>
        <LineContainer>
          <Line />
        </LineContainer>
        <Content>
          <ProfileContainer>
            <Profile>{getAvatar()}</Profile>
          </ProfileContainer>
          <Name>{getEmail()}</Name>
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
  text-transform: uppercase;
`;

const Name = styled.p`
  font-size: 13px;
  margin: 0px 14px;
  color: white;
`;
