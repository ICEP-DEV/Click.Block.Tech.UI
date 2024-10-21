import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ManageScreen from './manageScreen'; // Entry point for the Manage section
import ManageCard from './ManageCard'; // Deeper screen in the Manage section

const Stack = createStackNavigator();

const ManageStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ManageScreen" component={ManageScreen} />
      <Stack.Screen name="ManageCard" component={ManageCard} />
      
    </Stack.Navigator>
  );
};

export default ManageStack;

import CardSettings from "./CardSettings";
import UpdatePin from "./UpdatePin";

// Inside your Stack Navigator
<Stack.Navigator initialRouteName="CardSettings">
 
</Stack.Navigator>


