import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import axios from 'axios';
import {RouteProp} from '@react-navigation/native';

interface Project {
  //define the type of project
  id: number;
  name: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
}

interface Props {
  route: RouteProp<Record<string, {projectId: number}>, 'ProjectDetail'>; //explicitly define the type of route prop
  navigation: any;
}

export const ProjectDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const {projectId} = route.params;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  console.log('Project ID:', projectId);

  const fetchProject = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/projects/${projectId}/`,
      );
      setProject(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project:', error);
      setFetchError('Failed to fetch project details');
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading project...</Text>
      </View>
    );
  }

  if (fetchError) {
    return (
      <View style={styles.errorContainer}>
        <Text>{fetchError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.projectName}>{project?.name}</Text>
      <Text style={styles.projectLocation}>{project?.location}</Text>
      <Text style={styles.projectDetail}>
        Start Date: {project?.start_date}
      </Text>
      <Text style={styles.projectDetail}>End Date: {project?.end_date}</Text>
      <Text style={styles.projectDetail}>{project?.description}</Text>
      <Button
        title="Edit Project"
        onPress={() =>
          navigation.navigate('ProjectEdit', {projectId: project?.id})
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  projectLocation: {
    fontSize: 16,
    marginBottom: 16,
  },
  projectDetail: {
    fontSize: 14,
    marginBottom: 8,
  },
});
