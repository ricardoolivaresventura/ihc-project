import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { CircularProgress } from '@mui/material';
import { auth, db } from '../firebase';
import CustomButton from '../components/login/CustomButton';
import InputWithLabel from '../components/login/InputWithLabel';

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
  const isMounted = useRef(false);
  const taskCollection = collection(db, 'tasks');

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
    }
  }, [task]);

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

  return (
    <Container>
      <Header>
        <Title>Detalles de tarea</Title>
        <CustomButton title={'Guardar cambios'} maxWidth={300} />
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
        </Column>
        <Column></Column>
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
  grid-template-columns: repeat(1fr, 1.5fr);
  gap: 100px;
`;

const Column = styled.div``;
