import React, { useEffect, useRef, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import styled from 'styled-components';
import { db } from '../../firebase';
import { CircularProgress } from '@mui/material';
import CategoryItem from './CategoryItem';

export default function CategoriesList({ selectedCategories, setSelectedCategories }) {
  const [categories, setCategories] = useState(null);
  const categoriesRef = collection(db, 'categories');
  const isMounted = useRef(false);

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
      <Label>Categorías</Label>
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
            <CategoryItem
              key={index}
              category={category}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          ))}
        </CategoriesContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 30px;
`;

const Label = styled.p`
  font-size: 16px;
  color: #f6f6f6;
  flex: 1;
  font-family: ${(props) => props.theme.fonts.medium};
  margin-bottom: 10px;
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
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.medium};
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;
