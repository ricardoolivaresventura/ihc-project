import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import CustomButton from '../components/login/CustomButton';
import NewCategoryModal from '../components/categories/NewCategoryModal';
import AddOptionsModal from '../components/globals/AddOptionsModal';
import NewTaskModal from '../components/globals/NewTaskModal';
import PriorityColumn from '../components/home/PriorityColumn';
import { PRIORITIES } from '../utils/constants';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import HandTracking from '../components/globals/HandTracking';
import { openSnackbar } from '../context/reducers/generalSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { setCurrentGesture } from '../context/reducers/gestures';

export default function Home() {
  const navigate = useNavigate();
  const currentGesture = useSelector((state) => state.gestures.currentGesture);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] = useState(false);
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);
  const [criticalTasks, setCriticalTasks] = useState(null);
  const [urgentTasks, setUrgentTasks] = useState(null);
  const [importantTasks, setImportantTasks] = useState(null);
  const [deferrableTasks, setDeferrableTasks] = useState(null);
  const [withoutImportanceTasks, setWithoutImportanceTasks] = useState(null);
  const [formError, setFormError] = useState({});
  const [creating, setCreating] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [authenticated, setAuthenticated] = useState(null);
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const categoriesRef = collection(db, 'categories');

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

  useEffect(() => {
    if (currentGesture === 'open') {
      setIsNewTaskModalVisible(true);
    } else if (currentGesture === 'closed') {
      setIsNewTaskModalVisible(false);
    }
    dispatch(
      setCurrentGesture({
        currentGesture: null,
      }),
    );
  }, [currentGesture]);

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

  const createCategory = async () => {
    const errors = {};
    if (!newCategory) {
      errors.category = true;
      errors.categoryMessage = 'El nombre de la categoría es obligatorio';
    } else {
      setCreating(true);
      const batch = writeBatch(db);

      const newCategoryRef = doc(categoriesRef);

      batch.set(newCategoryRef, {
        name: newCategory?.toLowerCase()?.trim(),
        userId: user?.uid,
      });

      await batch
        .commit()
        .then(() => {
          setNewCategory('');
          dispatch(
            openSnackbar({
              type: 'success',
              message: 'Categoría agregada correctamente',
            }),
          );
          navigate('/categories');
        })
        .catch(() => {
          dispatch(
            openSnackbar({
              type: 'error',
              message: 'Ocurrió un error al intentar eliminar la categoría',
            }),
          );
        })
        .finally(() => {
          setCreating(false);
          setIsNewCategoryModalVisible(false);
        });
    }
    setFormError(errors);
  };

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
          bgColor='#14FF00'
          setIsNewTaskModalVisible={setIsNewTaskModalVisible}
        />
        <PriorityColumn
          title={'Urgente'}
          priority={PRIORITIES[1].value}
          tasks={urgentTasks}
          setTasks={setUrgentTasks}
          message={'No has agregado ninguna tarea URGENTE'}
          bgColor='rgba(20, 255, 0, 0.8)'
          setIsNewTaskModalVisible={setIsNewTaskModalVisible}
        />
        <PriorityColumn
          title={'Importante'}
          priority={PRIORITIES[2].value}
          tasks={importantTasks}
          setTasks={setImportantTasks}
          message={'No has agregado ninguna tarea IMPORTANTE'}
          bgColor='rgba(20, 255, 0, 0.6)'
          setIsNewTaskModalVisible={setIsNewTaskModalVisible}
        />
        <PriorityColumn
          title={'Aplazable'}
          priority={PRIORITIES[3].value}
          tasks={deferrableTasks}
          setTasks={setDeferrableTasks}
          message={'No has agregado ninguna tarea APLAZABLE'}
          bgColor='rgba(20, 255, 0, 0.5)'
          setIsNewTaskModalVisible={setIsNewTaskModalVisible}
        />
        <PriorityColumn
          title={'Sin importancia'}
          priority={PRIORITIES[4].value}
          tasks={withoutImportanceTasks}
          setTasks={setWithoutImportanceTasks}
          message={'No has agregado ninguna tarea SIN IMPORTANCIA'}
          bgColor='rgba(20, 255, 0, 0.4)'
          setIsNewTaskModalVisible={setIsNewTaskModalVisible}
        />
      </Columns>
      <AddOptionsModal
        isVisible={isOptionsVisible}
        setIsVisible={setIsOptionsVisible}
        options={options}
      />
      <NewCategoryModal
        isVisible={isNewCategoryModalVisible}
        setIsVisible={setIsNewCategoryModalVisible}
        formError={formError}
        setFormError={setFormError}
        creating={creating}
        setCreating={setCreating}
        createCategory={createCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
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
