import React, { useState } from 'react';
import { Outlet, useLocation, useOutlet } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import CustomSnackbar from '../components/globals/CustomSnackbar';
import { closeSnackbar } from '../context/reducers/generalSnackbar';

export default function Layout() {
  const generalSnackbar = useSelector((state) => state.generalSnackbar);
  const dispatch = useDispatch();
  return (
    <Container>
      <Header />
      <MainContainer>
        <Sidebar />
        <Outlet />
      </MainContainer>
      <CustomSnackbar
        type={generalSnackbar.type}
        open={generalSnackbar.isOpen}
        setOpen={() => dispatch(closeSnackbar({}))}
        message={generalSnackbar.message}
      />
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  height: 100vh;
  width: 100vw;
`;

const MainContainer = styled.div``;
