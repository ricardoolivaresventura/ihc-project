import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  limit,
  query,
  startAfter,
  getDoc,
  onSnapshot,
  writeBatch,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { CircularProgress } from '@mui/material';
import CategoryItem from '../components/categories/CategoryItem';
import AddOptionsModal from '../components/globals/AddOptionsModal';
import NewCategoryModal from '../components/categories/NewCategoryModal';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../context/reducers/generalSnackbar';
import NewTaskModal from '../components/globals/NewTaskModal';

export default function Categories() {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [categories, setCategories] = useState(null);
  const isMounted = useRef(false);
  const categoriesRef = collection(db, 'categories');
  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] = useState(false);
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);
  const [formError, setFormError] = useState({});
  const [creating, setCreating] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const user = auth.currentUser;
  const dispatch = useDispatch();

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
        setIsNewTaskModalVisible(true);
      },
    },
  ];

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const q = query(categoriesRef, where('userId', '==', user?.uid), orderBy('name', 'desc'));

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
            setCategories(tempArray);
          }
        } else {
          if (isMounted.current) {
            setCategories([]);
          }
        }
      },
      (err) => {
        console.log('Err categories: ', err);
      },
    );

    return () => {
      suscriber();
    };
  }, []);

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

  return (
    <Container>
      <Header>
        <Title>Categorías</Title>
      </Header>
      {categories === null ? (
        <AuxContainer>
          <CircularProgress />
        </AuxContainer>
      ) : categories?.length === 0 ? (
        <AuxContainer>
          <Message>Todavía no has agregado ninguna categoría</Message>
        </AuxContainer>
      ) : (
        <CategoriesContainer>
          {categories.map((category, index) => (
            <CategoryItem key={index} category={category} />
          ))}
        </CategoriesContainer>
      )}
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

const AuxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
`;

const Message = styled.p`
  text-align: center;
  color: white;
  font-size: 18px;
  font-family: ${(props) => props.theme.fonts.medium};
`;

const CategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`;
