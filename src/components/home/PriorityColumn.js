import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import TaskItem from './TaskItem';
import { auth, db } from '../../firebase';

export default function PriorityColumn({
  title,
  tasks,
  setTasks,
  bgColor = '#14FF00',
  priority,
  message,
}) {
  const user = auth.currentUser;
  const tasksReference = collection(db, 'tasks');
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const q = query(
      tasksReference,
      where('userId', '==', user?.uid),
      where('priority', '==', priority),
      orderBy('createdAt', 'asc'),
    );

    const suscriber = onSnapshot(
      q,
      (response) => {
        if (!response.empty) {
          const tempArray = [];
          response.forEach((doc) => {
            const object = doc.data();
            object.id = doc.id;
            tempArray.push(object);
          });
          if (isMounted.current) {
            setTasks(tempArray);
          }
        } else {
          if (isMounted.current) {
            setTasks([]);
          }
        }
      },
      (err) => {
        console.log('Err tasks: ', err);
      },
    );

    return () => {
      suscriber();
    };
  }, []);

  return (
    <Container>
      <Header style={{ backgroundColor: bgColor }}>
        <Title>{title}</Title>
        {tasks !== null && <Quantity>{tasks?.length} tareas</Quantity>}
      </Header>
      {tasks === null ? (
        <ContainerMessage>
          <CircularProgress />
        </ContainerMessage>
      ) : tasks?.length === 0 ? (
        <ContainerMessage>
          <Message>{message}</Message>
        </ContainerMessage>
      ) : (
        <List>
          {tasks.map((task, index) => (
            <TaskItem key={index} {...task} />
          ))}
        </List>
      )}
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.div`
  height: 54px;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const List = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.p`
  font-size: 14px;
  flex: 1;
`;

const Quantity = styled.p`
  font-size: 14px;
`;

const ContainerMessage = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Message = styled.p`
  color: white;
  padding: 0px 20px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.medium};
`;
