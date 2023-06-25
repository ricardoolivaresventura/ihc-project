import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import InputWithLabel from '../components/login/InputWithLabel';
import CustomButton from '../components/login/CustomButton';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formError, setFormError] = useState({});

  const navigateToLoginPage = () => {
    navigate('/login');
  };

  return (
    <Container>
      <LeftContainer>
        <Circle />
        <BottomCircle />
        <ImageContainer>
          <RocketImage src={require('../images/rocket.png')} />
        </ImageContainer>
      </LeftContainer>
      <RightContainer>
        <LogoContainer>
          <Logo src={require('../images/logo.png')} />
        </LogoContainer>
        <Title>Regístrate</Title>
        <InputWithLabel
          value={email}
          setValue={setEmail}
          label='Correo'
          placeholder='Escribe tu correo aquí'
          error={formError.email}
          errorMessage={formError.emailError}
          marginTop={30}
        />
        <InputWithLabel
          value={password}
          setValue={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          label='Contraseña'
          placeholder='******'
          type='password'
          error={formError.password}
          errorMessage={formError.passwordError}
          marginTop={25}
        />
        <InputWithLabel
          value={repeatPassword}
          setValue={setRepeatPassword}
          showPassword={showRepeatPassword}
          setShowPassword={setShowRepeatPassword}
          label='Repetir contraseña'
          placeholder='******'
          type='password'
          error={formError.repeatPassword}
          errorMessage={formError.repeatPasswordError}
          marginTop={25}
        />
        <Footer>
          <CustomButton title={'Ingresar'} />
          <DoesntHaveAccount onClick={navigateToLoginPage}>
            ¿Ya tienes una cuenta? <DoesntHaveAccountButton>Inicia sesión</DoesntHaveAccountButton>
          </DoesntHaveAccount>
        </Footer>
      </RightContainer>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  background-color: #141516;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1.7fr 1fr;
`;

const LeftContainer = styled.section`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  height: 70%;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RocketImage = styled.img`
  height: 100%;
  object-fit: contain;
`;

const RightContainer = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 90px;
  padding-left: 5%;
  padding-right: 5%;
`;

const Circle = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  height: 500px;
  width: 500px;
  border-radius: 100%;
  position: absolute;
  top: -250px;
  left: -250px;
`;

const BottomCircle = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  height: 200px;
  width: 400px;
  border-top-right-radius: 300px;
  border-top-left-radius: 300px;
  position: absolute;
  bottom: 0px;
  left: 35vw;
`;

const LogoContainer = styled.div``;

const Logo = styled.img`
  height: 140px;
  width: 140px;
`;

const Title = styled.p`
  margin-top: 30px;
  font-size: 30px;
  color: white;
`;

const Footer = styled.div`
  margin-top: 35px;
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DoesntHaveAccount = styled.p`
  margin-top: 30px;
  color: white;
  font-family: ${(props) => props.theme.fonts.medium};
`;

const DoesntHaveAccountButton = styled.span`
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.semiBold};
`;
