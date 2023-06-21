import React, {useState, useEffect, useCallback} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import axios from 'axios';
import {RouteProp} from '@react-navigation/native';

interface Project {
  id: number;
  name: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
}

interface Props {
  route: RouteProp<Record<string, {projectId: number}>, 'ProjectEdit'>; //explicitly define the type of route prop
}

const ProjectEditScreen: React.FC<Props> = ({route}) => {
  const {projectId} = route.params;
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  console.log('Project ID:', projectId);

  const fetchProject = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/projects/${projectId}/`,
      );
      const projectData = response.data as Project;
      setName(projectData.name);
      setLocation(projectData.location);
      setStartDate(projectData.start_date);
      setEndDate(projectData.end_date);
      setDescription(projectData.description);
    } catch (error) {
      console.error('Error fetching project:', error);
      // Handle error
    }
  }, [projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const updateProject = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/projects/projects/${projectId}/`,
        {
          name,
          location,
          start_date: startDate,
          end_date: endDate,
          description,
        },
      );
      console.log('Project updated');
      // Handle success or navigate to a different screen
    } catch (error) {
      console.error('Error updating project:', error);
      // Handle error
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Project Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Date (YYYY-MM-DD)"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        style={styles.input}
        placeholder="End Date (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Update Project" onPress={updateProject} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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

export default ProjectEditScreen;
