import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ManageScreen from './manageScreen'; // Entry point for the Manage section
import ManageCard from './ManageCard'; // Deeper screen in the Manage section

const Stack = createStackNavigator();

const ManageStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ManageScreen" component={ManageScreen} />
  
      
    </Stack.Navigator>
  );
};

export default ManageStack;


