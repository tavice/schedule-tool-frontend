import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  Pressable,
  Button,
  TouchableNativeFeedback,
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
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/projects/');
      setProjects(response.data);
      console.log('response.data:', response.data);
    } catch (error) {
      console.log('error is:', error);
      console.error('Error fetching projects:', error);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleProjectPress = (projectId: number) => {
    console.log('i am pressed');
    console.log('Pressed with projectId:', projectId);
    navigation.navigate('ProjectDetail', {projectId});
  };

  const renderProjectItem = ({item}: {item: Project}) => {
    const content = (
      <View style={styles.projectItem}>
        <Text style={styles.projectName}>{item.name}</Text>
        <Text style={styles.projectLocation}>{item.location}</Text>
        <Text style={styles.projectDescription}>{item.description}</Text>
      </View>
    );

    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('blue', false)}
          onPress={() => handleProjectPress(item.id)}>
          {content}
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <Pressable
          style={styles.PressableProjectList}
          onPress={() => handleProjectPress(item.id)}>
          {content}
        </Pressable>
      );
    }
  };

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
  PressableProjectList: {
    marginBottom: 12,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 4,
    elevation: 2,
  },
});

export default ProjectListScreen;
