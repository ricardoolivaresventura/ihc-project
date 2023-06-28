import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { collection, doc, getDoc, onSnapshot, query, writeBatch } from 'firebase/firestore';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { auth, db } from '../firebase';
import CustomButton from '../components/login/CustomButton';
import InputWithLabel from '../components/login/InputWithLabel';
import { PRIORITIES, VOICE_COMMANDS } from '../utils/constants';
import PriorityItem from '../components/task/PriorityItem';
import CustomSwitch from '../components/globals/CustomSwitch';
import CategoriesList from '../components/task/CategoriesList';
import { openSnackbar } from '../context/reducers/generalSnackbar';
import DateTimeSelector from '../components/globals/DateTimeSelector';
import { setCurrentVoiceCommand } from '../context/reducers/voiceCommands';

export default function TaskPage() {
  const currentVoiceCommand = useSelector((state) => state.voiceCommands.currentVoiceCommand);
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const user = auth.currentUser;
  const [formError, setFormError] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const today = Date.now();
  const [createdAt, setCreatedAt] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [savingChanges, setSavingChanges] = useState(false);
  const isMounted = useRef(false);
  const taskCollection = collection(db, 'tasks');
  const dispatch = useDispatch();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const q = doc(taskCollection, taskId);
    onSnapshot(
      q,
      (docSnap) => {
        if (docSnap.exists) {
          if (isMounted.current) {
            const object = docSnap?.data();
            if (object !== undefined) {
              object.id = docSnap?.id;
              setTask(object);
            }
          }
        }
      },
      () => {},
    );
  }, []);

  useEffect(() => {
    if (task !== null) {
      setCreatedAt(dayjs(new Date(task?.createdAt?.seconds * 1000)));
      setTitle(task?.title);
      setDescription(task?.description);
      setSelectedCategories(task?.categories);
      setCompleted(task?.completed);
      setSelectedPriority(task?.priority);
    }
  }, [task]);

  useEffect(() => {
    if (currentVoiceCommand === VOICE_COMMANDS[1].value) {
      setCompleted(true);
    } else if (currentVoiceCommand === VOICE_COMMANDS[3].value && !deleting && !savingChanges) {
      deleteTask();
    } else if (currentVoiceCommand === VOICE_COMMANDS[5].value && !deleting && !savingChanges) {
      saveChanges();
    }
    dispatch(setCurrentVoiceCommand({ currentVoiceCommand: null }));
  }, [currentVoiceCommand, deleting, savingChanges]);

  const saveChanges = async () => {
    const errors = {};
    if (!title) {
      errors.title = true;
      errors.titleMessage = 'El título es obligatorio';
    } else {
      setSavingChanges(true);
      const batch = writeBatch(db);
      const taskReference = doc(taskCollection, taskId);

      batch.update(taskReference, {
        title: title.toLowerCase().trim(),
        description,
        priority: selectedPriority,
        categories: selectedCategories,
        createdAt: createdAt instanceof Date ? createdAt : createdAt.toDate(),
        completed,
      });
      await batch
        .commit()
        .then(() => {
          dispatch(
            openSnackbar({
              type: 'success',
              message: 'Tarea actualizada correctamente',
            }),
          );
        })
        .catch(() => {
          dispatch(
            openSnackbar({
              type: 'error',
              message: 'Ocurrió un error al intentar actualizar la tarea',
            }),
          );
        })
        .finally(() => {
          setSavingChanges(false);
        });
    }
    setFormError(errors);
  };

  const deleteTask = async () => {
    setDeleting(true);
    const batch = writeBatch(db);
    const taskReference = doc(taskCollection, taskId);
    batch.delete(taskReference);
    await batch
      .commit()
      .then(() => {
        navigate('/');
        dispatch(
          openSnackbar({
            type: 'success',
            message: 'Tarea eliminada correctamente',
          }),
        );
      })
      .catch(() => {
        dispatch(
          openSnackbar({
            type: 'error',
            message: 'Ocurrió un error al intentar eliminar la tarea',
          }),
        );
      })
      .finally(() => {
        if (isMounted.current) {
          setDeleting(false);
        }
      });
  };

  if (task == null) {
    return (
      <Container>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '120px',
          }}
        >
          <CircularProgress />
        </div>
      </Container>
    );
  }

  const handleChange = () => {
    setCompleted(!completed);
  };

  return (
    <Container>
      <Header>
        <Title>Detalles de tarea</Title>
        <CustomButton
          loading={deleting || savingChanges}
          title={'Guardar cambios'}
          maxWidth={300}
          handleClick={saveChanges}
        />
      </Header>
      <Content>
        <Column>
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
          <CategoriesList
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </Column>
        <Column style={{ paddingTop: '30px' }}>
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
          {createdAt !== null && (
            <InputContainer
              style={{ marginTop: '30px', paddingRight: '30px', marginBottom: '20px' }}
            >
              <Label>Fecha</Label>
              <div style={{ width: '240px' }}>
                <DateTimeSelector
                  type={'date'}
                  selectedDate={createdAt}
                  setSelectedDate={setCreatedAt}
                />
              </div>
            </InputContainer>
          )}
          <Row style={{ marginBottom: '50px' }}>
            <LabelSecondary style={{ fontSize: '24px', flex: 'auto' }}>
              Marcar tarea como completada
            </LabelSecondary>
            <CustomSwitch handleChange={handleChange} checked={completed} />
          </Row>
          <CustomButton
            loading={deleting || savingChanges}
            title={'Eliminar tarea'}
            withBackground={false}
            handleClick={deleteTask}
          />
        </Column>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  padding-right: 24px;
  margin-left: 150px;
  padding-top: 120px;
  padding-bottom: 50px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.p`
  color: white;
  font-family: ${(props) => props.theme.fonts.semiBold};
  font-size: 30px;
  flex: 1;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 100px;
`;

const Column = styled.div``;

const Label = styled.p`
  font-size: 16px;
  color: #f6f6f6;
  flex: 1;
  font-family: ${(props) => props.theme.fonts.medium};
  margin-bottom: 10px;
`;

const LabelSecondary = styled.p`
  font-size: 16px;
  color: #f6f6f6;
  font-family: ${(props) => props.theme.fonts.medium};
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PrioritiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 50px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
