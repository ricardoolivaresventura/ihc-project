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
} from 'firebase/firestore';
import { db } from '../firebase';
import { CircularProgress } from '@mui/material';
import CategoryItem from '../components/categories/CategoryItem';
import AddOptionsModal from '../components/globals/AddOptionsModal';

export default function Categories() {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [categories, setCategories] = useState(null);
  const isMounted = useRef(false);
  const categoriesRef = collection(db, 'categories');
  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] = useState(false);
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);

  const options = [
    {
      label: 'Crear categoría',
      action: () => {
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
    const q = query(categoriesRef, orderBy('name', 'desc'));

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
        categories.map((category, index) => <CategoryItem key={index} category={category} />)
      )}
      <AddOptionsModal
        isVisible={isOptionsVisible}
        setIsVisible={setIsOptionsVisible}
        options={options}
      />
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
