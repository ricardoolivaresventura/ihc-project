import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import SidebarButton from './SidebarButton';
import Statistics from '../../icons/Statistics';
import Categories from '../../icons/Categories';
import Priorities from '../../icons/Priorities';
import Settings from '../../icons/Settings';
import Home from '../../icons/Home';

export default function Sidebar() {
  const location = useLocation();

  const isSelected = (pathname) => {
    return location.pathname === pathname;
  };

  const buttons = [
    {
      pathname: '/',
      icon: <Home color={isSelected('/') ? 'white' : '#5F6388'} />,
    },
    /*     {
      pathname: '/statistics',
      icon: <Statistics color={isSelected('/statistics') ? 'white' : '#5F6388'} />,
    }, */
    {
      pathname: '/categories',
      icon: <Categories color={isSelected('/categories') ? 'white' : '#5F6388'} />,
    },
    {
      pathname: '/settings',
      icon: <Settings color={isSelected('/settings') ? 'white' : '#5F6388'} />,
    },
  ];

  return (
    <Container>
      {buttons.map((btn, index) => (
        <SidebarButton
          isSelected={isSelected(btn.pathname)}
          icon={btn.icon}
          pathname={btn.pathname}
          key={index}
        />
      ))}
    </Container>
  );
}

const Container = styled.aside`
  position: fixed;
  z-index: 999;
  top: 76px;
  width: 94px;
  height: calc(100vh - 76px);
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;
  row-gap: 25px;
`;
