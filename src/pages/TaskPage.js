import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { collection, doc, getDoc, onSnapshot, query, writeBatch } from 'firebase/firestore';
import { CircularProgress } from '@mui/material';
import { auth, db } from '../firebase';
import CustomButton from '../components/login/CustomButton';
import InputWithLabel from '../components/login/InputWithLabel';
import { PRIORITIES } from '../utils/constants';
import PriorityItem from '../components/task/PriorityItem';
import CustomSwitch from '../components/globals/CustomSwitch';
import CategoriesList from '../components/task/CategoriesList';
import { openSnackbar } from '../context/reducers/generalSnackbar';
import { useDispatch } from 'react-redux';

export default function TaskPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const user = auth.currentUser;
  const [formError, setFormError] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [createdAt, setCreatedAt] = useState(new Date());
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
          const object = docSnap.data();
          object.id = docSnap.id;
          setTask(object);
        }
      },
      () => {},
    );
  }, []);

  useEffect(() => {
    if (task !== null) {
      setTitle(task.title);
      setDescription(task.description);
      setSelectedCategories(task.categories);
      setCreatedAt(new Date(task.createdAt.seconds * 1000));
      setCompleted(task.completed);
      setSelectedPriority(task.priority);
    }
  }, [task]);

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
              message: 'Ocurrió un error al actualizar la tarea',
            }),
          );
        })
        .finally(() => {
          setSavingChanges(false);
        });
    }
    setFormError(errors);
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
