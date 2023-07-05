import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../context/reducers/generalSnackbar';

export default function CategoryItem({ category }) {
  const [deleting, setDeleting] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const { name, userId, id } = category;
  const dispatch = useDispatch();

  const navigateToCategoryPage = () => {
    navigate(`/categories/${id}`);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (!deleting) {
      setDeleting(true);
      const batch = writeBatch(db);
      const tasksRef = doc(collection(db, 'categories'), id);
      batch
        .delete(tasksRef)
        .commit()
        .then(() => {
          dispatch(
            openSnackbar({
              type: 'success',
              message: 'Categoría eliminada correctamente',
            }),
          );
        })
        .catch(() => {
          dispatch(
            openSnackbar({
              type: 'error',
              message: 'Ocurrió un error al tratar de eliminar la categoría',
            }),
          );
        });
    }
  };

  return (
    <Container
      to={`/categories/${id}`}
      onMouseOver={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <Header>
        <StyleIconButton onClick={handleDelete} disabled={!showButton}>
          <DeleteOutlineIcon style={{ color: 'red', opacity: showButton ? 1 : 0 }} />
        </StyleIconButton>
      </Header>
      <Name>{name}</Name>
    </Container>
  );
}

const Container = styled(Link)`
  cursor: pointer;
  background-color: #282932;
  border-radius: 10px;
  padding: 16px;
  padding-bottom: 20px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

const StyleIconButton = styled(IconButton)``;

const Name = styled.p`
  color: white;
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 14px;
  text-transform: capitalize;
`;
