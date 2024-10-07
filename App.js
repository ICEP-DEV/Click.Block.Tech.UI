import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ManageCard from './screens/ManageCard'; // Import ManageCard screen
import NavigationBar from './screens/navigationBar'; // Import the Bottom Tab Navigator

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}  initialRouteName="ManageCard">
        {/* ManageCard is the main screen */}
        <Stack.Screen name="ManageCard" component={ManageCard} />
        {/* Bottom Tab Navigator */}
        <Stack.Screen name="MainTabs" component={NavigationBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
