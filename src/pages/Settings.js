import React, { useState } from 'react';
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomButton from '../components/login/CustomButton';
import Gestures from '../components/settings/Gestures';
import VoiceCommands from '../components/settings/VoiceCommands';

export default function Settings() {
  const [value, setValue] = useState('GESTURES');

  const hanldeChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Header>
        <Title>Gestos & Comandos de voz</Title>
        {/*  <CustomButton title={'Guardar'} maxWidth={300} /> */}
      </Header>
      <TabsContainer>
        <Tabs value={value} onChange={hanldeChange}>
          <Tab
            label='Gestos'
            value={'GESTURES'}
            style={{ color: value === 'GESTURES' ? 'white' : '#505664' }}
          />
          <Tab
            label='Comandos de voz'
            value={'VOICE_COMMANDS'}
            style={{ color: value === 'VOICE_COMMANDS' ? 'white' : '#505664' }}
          />
        </Tabs>
      </TabsContainer>
      {value === 'GESTURES' ? <Gestures /> : <VoiceCommands />}
    </Container>
  );
}

const Container = styled.div`
  padding-right: 24px;
  margin-left: 150px;
  padding-top: 120px;
  /*   width: calc(100vw - 94px); */
  padding-bottom: 50px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.p`
  color: white;
  font-family: ${(props) => props.theme.fonts.semiBold};
  font-size: 30px;
  flex: 1;
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
