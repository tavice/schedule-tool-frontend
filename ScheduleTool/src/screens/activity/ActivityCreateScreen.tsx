import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
//import DateTimePicker from '@react-native-community/datetimepicker';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
//import {format, parse} from 'date-fns';
import axios from 'axios';

interface Props {
  navigation: any;
  route: any;
}

const ActivityCreateScreen: React.FC<Props> = ({navigation, route}) => {
  const {projectId} = route.params;
  console.log('Project ID:', projectId);
  const [name, setName] = useState('');
  //const [startDate, setStartDate] = useState('');
  //const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  //================================================================================================
  //try to add date picker
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
    console.log(date);
  };

  const showTimepicker = () => {
    showMode('time');
    console.log(date);
  };

  //================================================================================================

  const createActivity = async () => {
    try {
      //   const formattedStartDate = format(
      //     parse(startDate, 'MM/dd/yyyy', new Date()),
      //     'yyyy-MM-dd',
      //   );
      //   const formattedEndDate = format(
      //     parse(endDate, 'MM/dd/yyyy', new Date()),
      //     'yyyy-MM-dd',
      //   );
      const response = await axios.post(
        'http://127.0.0.1:8000/api/activities/',
        {
          name: name,
          //start_date: formattedStartDate,
          //end_date: formattedEndDate,
          project: projectId,
          description: description,
        },
      );
      console.log('Project created:', response.data);
      // Handle success or navigate to a different screen
      navigation.goBack();
    } catch (error) {
      console.error('Error creating project:', error);
      // Handle error
    }
  };

  console.log(name, description);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={name}
        onChangeText={setName}
      />
      {/* <DateTimePicker
        style={styles.datePicker}
        value={startDate}
        mode="date"
        placeholder="Start Date (MM/DD/YYYY)"
        format="MM/DD/YYYY"
        onDateChange={setStartDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
      />
      <DateTimePicker
        style={styles.datePicker}
        value={endDate}
        mode="date"
        placeholder="End Date (MM/DD/YYYY)"
        format="MM/DD/YYYY"
        onDateChange={setEndDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
      /> */}
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
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
  datePicker: {
    width: '100%',
    marginBottom: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default ActivityCreateScreen;
