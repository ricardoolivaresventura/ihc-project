import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

export default function TaskCategoryItem({ categoryId }) {
  const [category, setCategory] = useState(null);

  const categoriesRef = collection(db, 'categories');

  useEffect(() => {
    const q = doc(categoriesRef, categoryId);

    getDoc(q)
      .then((docSnap) => {
        if (docSnap.exists) {
          const object = docSnap.data();
          object.id = docSnap.id;
          setCategory(object);
        }
      })
      .catch(() => {});
  }, []);

  if (category == null) {
    return <></>;
  }

  return (
    <Container>
      <Name>{category?.name ? capitalizeFirstLetter(category?.name) : ''}</Name>
    </Container>
  );
}

const Container = styled.div`
  height: 22px;
  border-radius: 4px;
  padding: 4px 8px;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Name = styled.p`
  color: white;
  font-size: 12px;
  text-align: center;
`;
