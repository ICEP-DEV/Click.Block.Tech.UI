import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registration from './screens/Registration';
import PersonalInfoForm from './screens/PersonalInfoForm';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
      <Stack.Screen name="Registration" component={Registration}  options={{ headerShown: false }}  />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoForm}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
