import React from 'react';
import styled from 'styled-components';

export default function CategoryItem({ category, selectedCategories, setSelectedCategories }) {
  const removeCategory = () => {
    setSelectedCategories(selectedCategories?.filter((item) => item.id !== category.id));
  };

  const addCategory = () => {
    const newArray = [...selectedCategories];
    newArray.push(category);
    setSelectedCategories(newArray);
  };

  const checkIfCategoryIsSelected = () => {
    return selectedCategories?.findIndex((item) => item.id === category.id) !== -1;
  };

  const handleClick = () => {
    if (checkIfCategoryIsSelected()) {
      removeCategory();
    } else {
      addCategory();
    }
  };

  return (
    <Container
      onClick={handleClick}
      style={{ backgroundColor: checkIfCategoryIsSelected() ? '#5051F9' : '#828fa5' }}
    >
      <Name style={{ color: checkIfCategoryIsSelected() ? 'white' : 'black' }}>
        {category?.name}
      </Name>
    </Container>
  );
}

const Container = styled.div`
  cursor: pointer;
  background-color: #828fa5;
  border-radius: 12px;
  padding: 8px 15px;
  border: 1px solid transparent;
  :hover {
    border: 1px solid white;
  }
`;

const Name = styled.p`
  text-transform: capitalize;
`;
