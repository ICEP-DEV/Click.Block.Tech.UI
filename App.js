import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CardSettings from './screens/CardSettings';
import UpdatePin from './screens/UpdatePin';
import PinEntry from './screens/pinEntry';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CardSettings">
        <Stack.Screen
          name="CardSettings"
          component={CardSettings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdatePin"
          component={UpdatePin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PinEntry"
          component={PinEntry} // Add the PinEntry screen here
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
