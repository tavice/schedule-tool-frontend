import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Import Project Screens
import ProjectListScreen from './src/screens/ProjectListScreen';
import {ProjectDetailScreen} from './src/screens/ProjectDetailScreen';
import ProjectCreateScreen from './src/screens/ProjectCreateScreen';
import ProjectEditScreen from './src/screens/ProjectEditScreen';

//Import Activity Screens
import ActivityListScreen from './src/screens/activity/ActivityListScreen';
import {ActivityDetailScreen} from './src/screens/activity/ActivityDetailScreen';
import ActivityCreateScreen from './src/screens/activity/ActivityCreateScreen';

type RootStackParamList = {
  ProjectList: undefined;
  ProjectDetail: {projectId: number};
  ProjectCreate: undefined;
  ProjectEdit: {projectId: number};
  ActivityList: {projectId: number};
  ActivityDetail: {activityId: number};
  ActivityCreate: {projectId: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProjectList">
        <Stack.Screen
          name="ProjectList"
          component={ProjectListScreen}
          options={{title: 'Project List'}}
        />
        <Stack.Screen
          name="ProjectDetail"
          component={ProjectDetailScreen}
          options={{title: 'Project Detail'}}
        />
        <Stack.Screen
          name="ProjectCreate"
          component={ProjectCreateScreen}
          options={{title: 'Create Project'}}
        />
        <Stack.Screen
          name="ProjectEdit"
          component={ProjectEditScreen}
          options={{title: 'Edit Project'}}
        />
        <Stack.Screen
          name="ActivityList"
          component={ActivityListScreen}
          options={{title: 'Project Tasks'}}
        />
        <Stack.Screen
          name="ActivityDetail"
          component={ActivityDetailScreen}
          options={{title: 'Task Detail'}}
        />
        <Stack.Screen
          name="ActivityCreate"
          component={ActivityCreateScreen}
          options={{title: 'Create Task'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
