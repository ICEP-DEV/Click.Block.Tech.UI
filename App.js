import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './screens/HomeScreen';
import PanicScreen from './screens/PanicButton';
import HowItWorksScreen from './screens/HowItWorksScreen'; // Adjust the path based on your project structure

// Create a Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Panic">
      <Stack.Screen name="Panic" component={PanicScreen} options={{ headerShown: false }} /> 
      <Stack.Screen name="HowItWorks" component={HowItWorksScreen} options={{ headerShown: true }}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
