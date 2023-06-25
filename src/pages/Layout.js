import React, { useState } from 'react';
import { Outlet, useLocation, useOutlet } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

export default function Layout() {
  return (
    <Container>
      <Header />
      <MainContainer>
        <Sidebar />
        <Outlet />
      </MainContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  height: 100vh;
  width: 100vw;
`;

const MainContainer = styled.div``;
