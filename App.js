import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screens/Login'
//rimport HomeScreen from './src/screens/HomeScreen'; // A new screen for navigation

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
