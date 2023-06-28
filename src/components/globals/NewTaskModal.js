import React, { useEffect, useState } from 'react';
import CustomDrawer from './CustomDrawer';
import styled from 'styled-components';
import CustomButton from '../login/CustomButton';
import InputWithLabel from '../login/InputWithLabel';
import { PRIORITIES, VOICE_COMMANDS } from '../../utils/constants';
import PriorityItem from '../task/PriorityItem';
import CategoriesList from '../task/CategoriesList';
import DateTimeSelector from './DateTimeSelector';
import { auth, db } from '../../firebase';
import { collection, doc, writeBatch } from 'firebase/firestore';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { openSnackbar } from '../../context/reducers/generalSnackbar';
import { useNavigate } from 'react-router-dom';

export default function NewTaskModal({ isVisible, setIsVisible }) {
  const currentVoiceCommand = useSelector((state) => state.voiceCommands.currentVoiceCommand);
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState(PRIORITIES[0].value);
  const today = Date.now();
  const [selectedDate, setSelectedDate] = useState(dayjs(today));
  const user = auth.currentUser;
  const tasksRef = collection(db, 'tasks');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentVoiceCommand === VOICE_COMMANDS[0].value) {
      setIsVisible(true);
    } else if (currentVoiceCommand === VOICE_COMMANDS[7].value && isVisible) {
      setIsVisible(false);
    } else if (currentVoiceCommand === VOICE_COMMANDS[4].value) {
      createTask();
    }
  }, [currentVoiceCommand]);

  const emptyFields = () => {
    setTitle('');
    setDescription('');
    setSelectedPriority(PRIORITIES[0].value);
    setSelectedDate(dayjs(today));
    setSelectedCategories([]);
  };

  const createTask = () => {
    const errors = {};
    if (!title) {
      errors.title = true;
      errors.titleMessage = 'El título es obligatorio';
    } else {
      setCreating(true);
      const batch = writeBatch(db);
      const newTaskRef = doc(tasksRef);

      batch.set(newTaskRef, {
        userId: user?.uid,
        title: title.toLowerCase().trim(),
        description,
        priority: selectedPriority,
        categories: selectedCategories,
        createdAt: selectedDate.toDate(),
        completed: false,
      });

      batch
        .commit()
        .then(() => {
          setIsVisible(false);
          emptyFields();
          dispatch(
            openSnackbar({
              type: 'success',
              message: 'Tarea agregada correctamente',
            }),
          );
          navigate('/');
        })
        .catch(() => {
          setIsVisible(false);
          dispatch(
            openSnackbar({
              type: 'error',
              message: 'Ocurrió un error al intentar crear la tarea',
            }),
          );
        })
        .finally(() => {
          setCreating(false);
        });
    }
    setFormError(errors);
  };

  return (
    <CustomDrawer isOpen={isVisible} setIsOpen={setIsVisible}>
      <Container>
        <Title>Nueva tarea</Title>
        <Content>
          <InputContainer>
            <InputWithLabel
              error={formError.title}
              errorMessage={formError.titleMessage}
              label={'Título'}
              placeholder={'Escribe el título...'}
              value={title}
              setValue={setTitle}
              background='#050505'
              marginTop={30}
            />
          </InputContainer>
          <InputContainer>
            <InputWithLabel
              error={formError.description}
              errorMessage={formError.descriptionMessage}
              label={'Descripción'}
              placeholder={'Escribe una descripción...'}
              value={description}
              setValue={setDescription}
              background='#050505'
              marginTop={30}
            />
          </InputContainer>
          <InputContainer style={{ marginTop: '30px', paddingRight: '0px' }}>
            <Label>Prioridad</Label>
            <PrioritiesContainer>
              {PRIORITIES.map((priority, index) => (
                <PriorityItem
                  {...priority}
                  key={index}
                  selectedPriority={selectedPriority}
                  setSelectedPriority={setSelectedPriority}
                />
              ))}
            </PrioritiesContainer>
          </InputContainer>
          <InputContainer style={{ marginTop: '30px', paddingRight: '30px' }}>
            <Label>Fecha</Label>
            <DateTimeSelector
              type={'date'}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </InputContainer>
          <CategoriesList
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </Content>
        <Footer>
          <CustomButton title={'Crear tarea'} loading={creating} handleClick={createTask} />
        </Footer>
      </Container>
    </CustomDrawer>
  );
}

const Container = styled.div`
  position: relative;
  padding-left: 30px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Title = styled.p`
  color: white;
  font-size: 22px;
  font-family: ${(props) => props.theme.fonts.bold};
`;

const Content = styled.div`
  padding-bottom: 100px;
  flex: 1;
`;

const InputContainer = styled.div`
  padding-right: 30px;
`;

const Footer = styled.div`
  position: fixed;
  padding-right: 30px;
  bottom: 10px;
  width: 355px;
`;

const Label = styled.p`
  font-size: 16px;
  color: #f6f6f6;
  flex: 1;
  font-family: ${(props) => props.theme.fonts.medium};
  margin-bottom: 10px;
`;

const PrioritiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: scroll;
  gap: 10px;

  ::-webkit-scrollbar {
    height: 0px;
  }
`;
