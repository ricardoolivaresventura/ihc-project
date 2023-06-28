import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TaskCategoryItem from './TaskCategoryItem';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import { formatLessThan10 } from '../../utils/formatLessThan10';
import { MONTHS } from '../../utils/constants';

export default function TaskItem({ title, categories, description, createdAt }) {
  const getCreatedAt = () => {
    const auxCreatedAt = new Date(createdAt.seconds * 1000);
    const fullYear = auxCreatedAt.getFullYear();
    const month = auxCreatedAt.getMonth();
    const day = auxCreatedAt.getDate();
    return `${capitalizeFirstLetter(MONTHS[month])} ${formatLessThan10(day)}, ${fullYear}`;
  };

  const getDescription = () => {
    return description ? capitalizeFirstLetter(description) : 'Sin descripción';
  };

  return (
    <Container to={`/task/${2}`}>
      <Header>
        {categories.map((categoryId, index) => (
          <TaskCategoryItem key={index} categoryId={categoryId} />
        ))}
      </Header>
      <Title>{title ? capitalizeFirstLetter(title) : ''}</Title>
      <Description>{getDescription()}</Description>
      <Footer>
        <CreatedAt>{getCreatedAt()}</CreatedAt>
      </Footer>
    </Container>
  );
}

const Container = styled(Link)`
  width: 100%;
  min-height: 143px;
  border-radius: 12px;
  padding: 16px 18px;
  background-color: #1e1f25;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 6px;
`;

const Title = styled.p`
  color: white;
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.medium};
  margin-top: 14px;
  text-transform: capitalize;
`;

const Description = styled.p`
  color: #768396;
  font-family: ${(props) => props.theme.fonts.regular};
  margin-top: 7px;
  font-size: 13px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 16px;
`;

const CreatedAt = styled.p`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #c1c1c1;
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 12px;
  color: white;
`;
