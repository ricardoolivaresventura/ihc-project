import React from 'react';
import styled from 'styled-components';

export default function PriorityItem({ name, value, selectedPriority, setSelectedPriority }) {
  const handleClick = () => {
    setSelectedPriority(value);
  };

  return (
    <Container onClick={handleClick} isSelected={selectedPriority === value}>
      <Name>{name}</Name>
    </Container>
  );
}

const Container = styled.div`
  cursor: pointer;
  height: 54px;
  border-radius: 10px;
  padding: 0px 16px;
  min-width: 150px;
  background-color: #14ff00;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid ${(props) => (!props.isSelected ? 'transparent' : 'white')};
`;

const Name = styled.p`
  color: black;
  font-size: 17px;
  font-family: ${(props) => props.theme.fonts.medium};
  text-align: center;
  white-space: nowrap;
`;
