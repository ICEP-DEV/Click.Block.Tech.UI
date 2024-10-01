// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ManageCard from './Screens/ManageCard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ManageCard"
          component={ManageCard}
          options={{ headerShown: false }} // Hide the default header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
