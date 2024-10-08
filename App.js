import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TransactionSimulator from './screens/TransactionSimulator';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TransactionSimulator">
      <Stack.Screen name="TransactionSimulator" component={TransactionSimulator}  options={{ headerShown: false }} />
       </Stack.Navigator>
    </NavigationContainer>
  );
}
