import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

interface Props {
  navigation: any;
  route: any;
}

const ActivityCreateScreen: React.FC<Props> = ({navigation, route}) => {
  const {projectId} = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  const onChangeDateStart = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || dateStart;
    setShow(false);
    setDateStart(currentDate);
  };
  const onChangeDateEnd = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || dateEnd;
    setShow(false);
    setDateEnd(currentDate);
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const createActivity = async () => {
    try {
      const formattedDateStart = dateStart.toISOString().split('T')[0]; // Format the date to YYYY-MM-DD
      console.log('formattedDate', formattedDateStart);
      const formattedDateEnd = dateEnd.toISOString().split('T')[0]; // Format the date to YYYY-MM-DD
      console.log('formattedDate', formattedDateEnd);
      const response = await axios.post(
        'http://127.0.0.1:8000/api/activities/',
        {
          name,
          start_date: formattedDateStart,
          end_date: formattedDateEnd,
          project: projectId,
          description,
        },
      );
      console.log('Project created:', response.data);
      navigation.goBack();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={name}
        onChangeText={setName}
      />
      <Button onPress={showDatepicker} title="Choose Start Day" />
      <Text>selected: {dateStart.toISOString().split('T')[0]}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateStart}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeDateStart}
        />
      )}
      <Button onPress={showDatepicker} title="Choose Finish Day" />
      <Text>selected: {dateEnd.toISOString().split('T')[0]}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateEnd}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeDateEnd}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Create Task" onPress={createActivity} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default ActivityCreateScreen;
