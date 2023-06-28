import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import CustomButton from '../components/login/CustomButton';
import AddOptionsModal from '../components/globals/AddOptionsModal';
import NewTaskModal from '../components/globals/NewTaskModal';
import PriorityColumn from '../components/home/PriorityColumn';
import { PRIORITIES } from '../utils/constants';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export default function Home() {
  const navigate = useNavigate();
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] = useState(false);
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);
  const [criticalTasks, setCriticalTasks] = useState(null);
  const [urgentTasks, setUrgentTasks] = useState(null);
  const [importantTasks, setImportantTasks] = useState(null);
  const [deferrableTasks, setDeferrableTasks] = useState(null);
  const [withoutImportanceTasks, setWithoutImportanceTasks] = useState(null);
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const options = [
    {
      label: 'Crear categoría',
      action: () => {
        setIsOptionsVisible(false);
        setIsNewCategoryModalVisible(true);
      },
    },
    {
      label: 'Crear tarea',
      action: () => {
        setIsOptionsVisible(false);
        setIsNewTaskModalVisible(true);
      },
    },
  ];

  if (authenticated == null) {
    return (
      <div
        style={{
          marginTop: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Tareas</Title>
      </Header>
      <Columns>
        <PriorityColumn
          title={'Crítico'}
          priority={PRIORITIES[0].value}
          tasks={criticalTasks}
          setTasks={setCriticalTasks}
          message={'No has agregado ninguna tarea CRÍTICA'}
        />
        <PriorityColumn
          title={'Urgente'}
          priority={PRIORITIES[1].value}
          tasks={urgentTasks}
          setTasks={setUrgentTasks}
          message={'No has agregado ninguna tarea URGENTE'}
        />
        <PriorityColumn
          title={'Importante'}
          priority={PRIORITIES[2].value}
          tasks={importantTasks}
          setTasks={setImportantTasks}
          message={'No has agregado ninguna tarea IMPORTANTE'}
        />
        <PriorityColumn
          title={'Aplazable'}
          priority={PRIORITIES[3].value}
          tasks={deferrableTasks}
          setTasks={setDeferrableTasks}
          message={'No has agregado ninguna tarea APLAZABLE'}
        />
        <PriorityColumn
          title={'Sin importancia'}
          priority={PRIORITIES[4].value}
          tasks={withoutImportanceTasks}
          setTasks={setWithoutImportanceTasks}
          message={'No has agregado ninguna tarea SIN IMPORTANCIA'}
        />
      </Columns>
      <AddOptionsModal
        isVisible={isOptionsVisible}
        setIsVisible={setIsOptionsVisible}
        options={options}
      />
      <NewTaskModal isVisible={isNewTaskModalVisible} setIsVisible={setIsNewTaskModalVisible} />
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
  margin-bottom: 16px;
`;

const Title = styled.p`
  color: white;
  font-family: ${(props) => props.theme.fonts.semiBold};
  font-size: 30px;
  flex: 1;
`;

const AddButtonContainer = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
`;

const AddButton = styled(IconButton)`
  background-color: ${(props) => props.theme.colors.primary};
  height: 70px;
  width: 70px;
`;

const Columns = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
`;
