import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import ModalContainer from '../globals/ModalContainer';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { VOICE_COMMANDS } from '../../utils/constants';
import { setCurrentVoiceCommand } from '../../context/reducers/voiceCommands';

const MAX_QUANTITY_OF_CHARACTERS = 50;

export default function NewCategoryModal({
  isVisible,
  setIsVisible,
  creating,
  setCreating,
  createCategory,
  newCategory,
  setNewCategory,
  formError,
  setFormError,
}) {
  const currentVoiceCommand = useSelector((state) => state.voiceCommands.currentVoiceCommand);
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isVisible) {
      setFormError({});
    }
  }, [isVisible]);

  useEffect(() => {
    if (currentVoiceCommand === VOICE_COMMANDS[2].value && !isVisible) {
      setIsVisible(true);
    } else if (currentVoiceCommand === VOICE_COMMANDS[7].value && isVisible) {
      setIsVisible(false);
    } else if (currentVoiceCommand === VOICE_COMMANDS[6].value && isVisible && !creating) {
      createCategory(newCategory?.trim());
    }
    dispatch(
      setCurrentVoiceCommand({
        currentVoiceCommand: null,
      }),
    );
  }, [currentVoiceCommand, isVisible, creating]);

  const saveTag = () => {
    createCategory(newCategory?.trim());
  };

  const handleClose = () => {
    dispatch(
      setCurrentVoiceCommand({
        currentVoiceCommand: null,
      }),
    );
    setIsVisible(false);
    if (!creating) {
      setFormError({});
      setNewCategory('');
    }
  };

  const handleOnChange = (event) => {
    setNewCategory('');
    setNewCategory(event.target.value);
  };

  return (
    <ModalContainer
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      paddingTop={12}
      paddingRight={20}
      paddingLeft={25}
      setIsMainValue={setNewCategory}
    >
      <Container>
        <Header>
          <IconButton onClick={handleClose}>
            <CloseIcon color='primary' />
          </IconButton>
        </Header>
        <Title>Crear categoría</Title>
        <Subtitle>Nombre de la categoría</Subtitle>
        <InputContainer focused={inputIsFocused} error={formError?.message !== undefined}>
          <Input
            maxLength={MAX_QUANTITY_OF_CHARACTERS}
            placeholder='Escribe aquí'
            value={newCategory}
            onChange={handleOnChange}
            onFocus={() => {
              setInputIsFocused(true);
            }}
            onBlur={() => {
              setInputIsFocused(false);
            }}
          />
          <CharactersNumber>{MAX_QUANTITY_OF_CHARACTERS - newCategory?.length}</CharactersNumber>
        </InputContainer>
        {formError?.message && <ErrorMessage>{formError?.message}</ErrorMessage>}
        <ButtonsContainer>
          <CustomButton
            disabled={creating}
            isDisabled={creating}
            onClick={handleClose}
            withBackground={false}
          >
            <ButtonText white={false}>Cancelar</ButtonText>
          </CustomButton>
          <CustomButton
            isDisabled={newCategory === '' || creating}
            disabled={newCategory === '' || creating}
            onClick={saveTag}
            withBackground={true}
          >
            {creating ? (
              <CircularProgress size={22} style={{ color: 'white' }} />
            ) : (
              <ButtonText white={true}>Guardar</ButtonText>
            )}
          </CustomButton>
        </ButtonsContainer>
      </Container>
    </ModalContainer>
  );
}

const Container = styled.div``;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const Title = styled.p`
  font-family: ${(props) => props.theme.fonts.semiBold};
  color: white;
  font-size: 20px;
  margin-bottom: 15px;
`;

const Subtitle = styled.p`
  font-family: ${(props) => props.theme.fonts.semiBold};
  color: #c1c1c1;
  font-size: 14px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 22px;
`;

const CustomButton = styled(Button)`
  &&& {
    border: 1px solid;
    border-color: ${(props) => (props.isDisabled ? 'transparent' : props.theme.colors.primary)};
    border-radius: 5px;
    background-color: ${(props) =>
      !props?.withBackground
        ? 'transparent'
        : props.isDisabled
        ? props.theme.colors.disabledPrimary
        : props.theme.colors.primary};
  }
`;

const ButtonText = styled.p`
  text-transform: none;
  font-family: ${(props) => props.theme.fonts.semiBold};
  color: ${(props) => (props.white ? 'white' : props.theme.colors.primary)};
  font-size: 13px;
  padding: 0px 15px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
  margin-top: 10px;
  border: 1px solid #f0f6fa;
  border-radius: 5px;
  padding-right: 10px;
  padding-left: 10px;
  width: 450px;
  border-color: ${(props) =>
    props.error ? props.theme.colors.red : props.focused ? props.theme.colors.primary : '#c1c1c1'};
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  margin-right: 5px;
  border: none;
  outline: none;
  font-family: ${(props) => props.theme.fonts.regular};
  color: white;
  background-color: transparent;
`;

const CharactersNumber = styled.p`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.gray2};
`;

const ErrorMessage = styled.p`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 12px;
  color: ${(props) => props.theme.colors.red};
  margin-top: 8px;
  padding-left: 15px;
`;
