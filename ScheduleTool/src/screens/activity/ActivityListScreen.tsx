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

interface Activity {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  project: number;
  description: string;
}

interface Props {
  navigation: any;
  route: any;
}

const ActivityListScreen: React.FC<Props> = ({navigation, route}) => {
  const {projectId} = route.params;

  const [activities, setActivities] = useState<Activity[]>([]);

  const fetchActivities = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/activities/');
      const filteredActivities = response.data.filter(
        (activity: Activity) => activity.project === projectId,
      );
      setActivities(filteredActivities);
    } catch (error) {
      console.log('Error fetching activities:', error);
    }
  }, [projectId]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleActivityPress = (activityId: number) => {
    console.log('Pressed with activityId:', activityId);
    navigation.navigate('ActivityDetail', {activityId});
  };

  const renderActivityItem = ({item}: {item: Activity}) => {
    const content = (
      <View style={styles.activityItem}>
        <Text style={styles.activityName}>{item.name}</Text>
        <Text style={styles.activityDescription}>{item.description}</Text>
      </View>
    );

    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('blue', false)}
          onPress={() => handleActivityPress(item.id)}>
          {content}
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <Pressable
          style={styles.pressableActivityList}
          onPress={() => handleActivityPress(item.id)}>
          {content}
        </Pressable>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        keyExtractor={item => item.id.toString()}
        renderItem={renderActivityItem}
      />

      <Button
        title="Create Activity"
        onPress={() => navigation.navigate('ActivityCreate', {projectId})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  activityItem: {
    marginBottom: 12,
  },
  activityName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activityLocation: {
    fontSize: 16,
  },
  activityDescription: {
    fontSize: 14,
  },
  pressableActivityList: {
    marginBottom: 12,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 4,
    elevation: 2,
  },
});

export default ActivityListScreen;
