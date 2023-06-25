import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import InputWithLabel from '../components/login/InputWithLabel';
import CustomButton from '../components/login/CustomButton';
import { validationEmail } from '../utils/validationEmail';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const navigateToSignupPage = () => {
    navigate('/register');
  };

  const handleClick = () => {
    const errors = {};
    setLoginError('');
    if (!email || !password) {
      if (!email) {
        errors.email = true;
        errors.emailError = 'El correo es obligatorio';
      }
      if (!password) {
        errors.password = true;
        errors.passwordError = 'La contraseña es obligatoria';
      }
    } else if (!validationEmail(email?.trim())) {
      errors.email = true;
      errors.emailError = 'Introduce un correo válido';
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email.trim(), password)
        .then(() => {
          navigate('/');
        })
        .catch((err) => {
          console.log('Err: ', err);
          let message = 'Correo o contraseña incorrectos';
          switch (err.code) {
            case 'auth/user-not-found':
              message = 'Correo no registrado';
              break;
            case 'auth/unknown':
              message = 'Ha ocurrido un error, revisa tu conexión a internet';
              break;
            default:
              break;
          }
          setLoading(false);
          setLoginError(message);
        });
    }
    setFormError(errors);
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
        <Title>Iniciar Sesión</Title>
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
        {loginError && <Error>{loginError}</Error>}
        <Footer>
          <CustomButton title={'Ingresar'} handleClick={handleClick} loading={loading} />
          <DoesntHaveAccount onClick={navigateToSignupPage}>
            ¿No tienes una cuenta? <DoesntHaveAccountButton>Regístrate</DoesntHaveAccountButton>
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

const RightContainer = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 90px;
  padding-left: 5%;
  padding-right: 5%;
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
const Error = styled.p`
  color: red;
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 16px;
  margin-top: 10px;
`;
