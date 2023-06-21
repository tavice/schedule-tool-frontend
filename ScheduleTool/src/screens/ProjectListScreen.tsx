import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Button,
} from 'react-native';
import axios from 'axios';

interface Project {
  id: number;
  name: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
}

interface Props {
  navigation: any;
}

const ProjectListScreen: React.FC<Props> = ({navigation}) => {
  //   console.log('baseUrl:', baseUrl);
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/projects/');
      setProjects(response.data);
      console.log('response.data:', response.data);
    } catch (error) {
      console.log('error is:', error);
      console.error('Error fetching projects:', error);
      // Handle error
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  //navigation:
  const handleProjectPress = (projectId: number) => {
    console.log('i am pressed');
    console.log('Pressed with projectId:', projectId);
    navigation.navigate('ProjectDetail', {projectId});
  };

  const renderProjectItem = ({item}: {item: Project}) => (
    <Pressable onPress={() => handleProjectPress(item.id)}>
      <View style={styles.projectItem}>
        <Text style={styles.projectName}>{item.name}</Text>
        <Text style={styles.projectLocation}>{item.location}</Text>
        <Text style={styles.projectDescription}>{item.description}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProjectItem}
      />

      <Button
        title="Create Project"
        onPress={() => navigation.navigate('ProjectCreate')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  projectItem: {
    marginBottom: 12,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  projectLocation: {
    fontSize: 16,
  },
  projectDescription: {
    fontSize: 14,
  },
});

export default ProjectListScreen;
