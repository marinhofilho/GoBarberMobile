// https://github.com/react-native-datetimepicker/datetimepicker

import React, { useMemo, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput({ date, onDateChange }) {
  // const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  )


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    onDateChange(currentDate);
  }

  const showMode = (currentMode) => {
    setShow(true);
  };
  /* async function handleOpenPicker() {
    setOpened(true);
    const { action, year, month, day } = await DateTimePicker.open({
      mode: 'spinner',
      date
    })
    console.tron.log(date);

    // !==
    if (action !== DateTimePicker.dateSetAction) {
      const selectedDate = new Date(year, month, day)
      onChange(selectedDate)
    }
  }
  */


  return (
    <Container>
      <DateButton onPress={showMode}>
        <Icon name="event" color="#fff" size={20}/>
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      { show && (
        <Picker>
          <DateTimePicker
            value={date}
            display="spinner"
            onChange={onChange}
            minimumDate={new Date()}
            minuteInterval={60}
            locale="ptBR"
            mode="date"
          />
        </Picker>

      )}
    </Container>
  )
}
