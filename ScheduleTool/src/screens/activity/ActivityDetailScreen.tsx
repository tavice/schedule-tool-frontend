import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import axios from 'axios';
import {RouteProp} from '@react-navigation/native';

interface Activity {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  project: number;
  description: string;
}

interface Props {
  route: RouteProp<Record<string, {activityId: number}>, 'ActivityDetail'>;
  navigation: any;
}

export const ActivityDetailScreen: React.FC<Props> = ({route, navigation}) => {
  const {activityId} = route.params;
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  console.log('Activity ID:', activityId);

  const fetchProject = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/activities/${activityId}/`,
      );
      setActivity(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project:', error);
      setFetchError('Failed to fetch project details');
      setLoading(false);
    }
  }, [activityId]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const deleteActivity = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/activities/${activityId}/`);
      navigation.goBack(); // Navigate back to the previous screen after successful deletion
    } catch (error) {
      console.error('Error deleting project:', error);
      // Handle error
    }
  };

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
      <Text style={styles.projectName}>{activity?.name}</Text>
      <Text style={styles.projectDetail}>
        Start Date: {activity?.start_date}
      </Text>
      <Text style={styles.projectDetail}>End Date: {activity?.end_date}</Text>
      <Text style={styles.projectDetail}>{activity?.description}</Text>
      <Button
        title="Edit Activity"
        color={'#f194ff'}
        onPress={() =>
          navigation.navigate('ProjectEdit', {activityId: activity?.id})
        }
      />
      <Button
        title="Delete Activity"
        color="red"
        onPress={() => deleteActivity()}
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

export default ActivityDetailScreen;
