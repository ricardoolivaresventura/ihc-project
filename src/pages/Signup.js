import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import InputWithLabel from '../components/login/InputWithLabel';
import CustomButton from '../components/login/CustomButton';
import { validationEmail } from '../utils/validationEmail';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, []);

  const navigateToLoginPage = () => {
    navigate('/login');
  };

  const handleClick = () => {
    const errors = {};
    setLoginError('');
    if (!email || !password || !repeatPassword) {
      if (!email) {
        errors.email = true;
        errors.emailError = 'El correo es obligatorio';
      }
      if (!password) {
        errors.password = true;
        errors.passwordError = 'La contraseña es obligatoria';
      }
      if (!repeatPassword) {
        errors.repeatPassword = true;
        errors.repeatPasswordError = 'La contraseña es obligatoria';
      }
    } else if (!validationEmail(email?.trim())) {
      errors.email = true;
      errors.emailError = 'Introduce un correo válido';
    } else if (password.trim() !== repeatPassword.trim()) {
      errors.password = true;
      errors.passwordError = 'Las contraseñas no coinciden';
      errors.repeatPassword = true;
      errors.repeatPasswordError = 'Las contraseñas no coinciden';
    } else if (password.trim().length < 6) {
      errors.password = true;
      errors.passwordError = 'Las contraseña debe tener mínimo 6 caracteres';
      errors.repeatPassword = true;
      errors.repeatPasswordError = 'Las contraseña debe tener mínimo 6 caracteres';
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email.trim(), password)
        .then(async (response) => {
          navigate('/');
        })
        .catch((err) => {
          let message = 'Ocurrió un error, inténtalo otra vez';
          switch (err.code) {
            case 'auth/email-already-in-use':
              message = 'El correo ya está siendo utilizado';
              break;
            case 'auth/internal-error':
              message = 'Ocurrió un error, inténtalo otra vez';
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
        <Title>Regístrate</Title>
        <InputWithLabel
          value={email}
          setValue={setEmail}
          label='Correo'
          placeholder='Escribe tu correo aquí'
          error={formError.email}
          errorMessage={formError.emailError}
          marginTop={20}
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
        {loginError && <Error>{loginError}</Error>}
        <Footer>
          <CustomButton title={'Registrarte'} loading={loading} handleClick={handleClick} />
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
  min-height: 100vh;
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
  padding-top: 50px;
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
  height: 120px;
  width: 120px;
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
