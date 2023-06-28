import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function CategoryItem({ category }) {
  const navigate = useNavigate();
  const { name, userId, id } = category;

  const navigateToCategoryPage = () => {
    navigate(`/categories/${id}`);
  };

  return (
    <Container to={`/categories/${id}`}>
      <Name>{name}</Name>
    </Container>
  );
}

const Container = styled(Link)`
  cursor: pointer;
  background-color: #282932;
  border-radius: 10px;
  padding: 16px 20px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const Name = styled.p`
  color: white;
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 14px;
  text-transform: capitalize;
`;
