import React, { useState } from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import styled from 'styled-components';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { Dialog } from '@mui/material';
import dayjs from 'dayjs';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import ClockIcon from '@mui/icons-material/QueryBuilder';

export default function DateTimeSelector({ type, selectedDate, setSelectedDate }) {
  const today = Date.now();
  const [pickerIsOpen, setPickerIsOpen] = useState(false);

  const getSelectedDate = () => {
    return selectedDate.format('D/M/YYYY');
  };

  return (
    <>
      <CustomButtonBase
        pickerIsOpen={pickerIsOpen}
        onClick={() => {
          setPickerIsOpen(true);
        }}
      >
        {type === 'date' ? <DateText>{getSelectedDate()}</DateText> : <DateText>14:00</DateText>}
        {type === 'date' ? (
          <CalendarIcon style={{ color: 'white' }} />
        ) : (
          <ClockIcon style={{ color: 'white' }} />
        )}
      </CustomButtonBase>
      <Dialog
        open={pickerIsOpen}
        onClose={() => {
          setPickerIsOpen(false);
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {type === 'date' ? (
            <StaticDatePicker
              defaultValue={dayjs(selectedDate)}
              value={selectedDate}
              onChange={(newValue) => {
                setSelectedDate(newValue);
              }}
              onClose={() => {
                setPickerIsOpen(false);
              }}
              disablePast
              localeText={{
                cancelButtonLabel: 'Cancelar',
                toolbarTitle: 'Selecciona la fecha',
              }}
            />
          ) : (
            <StaticTimePicker
              defaultValue={dayjs(selectedDate)}
              value={selectedDate}
              onChange={(newValue) => {
                setSelectedDate(newValue);
              }}
              onClose={() => {
                setPickerIsOpen(false);
              }}
              disablePast
              localeText={{
                cancelButtonLabel: 'Cancelar',
                toolbarTitle: 'Selecciona la hora',
              }}
            />
          )}
        </LocalizationProvider>
      </Dialog>
    </>
  );
}

const CustomButtonBase = styled(ButtonBase)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid ${(props) => (!props.pickerIsOpen ? '#f0f6fa' : props.theme.colors.primary)};
  border-radius: 5px;
  height: 40px;
  width: 100%;
  padding-left: 13px;
  padding-right: 13px;
`;

const DateText = styled.p`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 13px;
  flex: 1;
  text-align: left;
  color: white;
`;
