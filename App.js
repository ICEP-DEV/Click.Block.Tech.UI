import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './screens/navigationBar'; // Import the Bottom Tab Navigator

export default function App() {
  return (
    <NavigationContainer>
      <NavigationBar />
    </NavigationContainer>
  );
}
