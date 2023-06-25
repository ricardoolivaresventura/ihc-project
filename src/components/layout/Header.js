import React from 'react';
import styled from 'styled-components';
import HeaderProfile from './HeaderProfile';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <CustomHeader>
      <LeftContainer>
        <LogoContainer>
          <Logo src={require('../../images/headerLogo.png')} />
        </LogoContainer>
        <Name>GesTask</Name>
      </LeftContainer>
      <SearchBar />
      <HeaderProfile />
    </CustomHeader>
  );
}

const CustomHeader = styled.header`
  position: fixed;
  top: 0px;
  z-index: 999;
  width: 100vw;
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 76px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const LogoContainer = styled.div`
  width: 94px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Logo = styled.img``;

const Name = styled.p`
  color: white;
  font-size: 25px;
  font-family: ${(props) => props.theme.fonts.semiBold};
  padding-left: 5px;
`;
