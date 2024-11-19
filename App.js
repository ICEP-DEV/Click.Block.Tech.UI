import { ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NavigationBar from './screens/navigationBar';
import TransactionNotification from './screens/TransactionNotification';
import Login from './screens/Login';
import LoginOrSignup from './screens/LoginOrSignup';

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null); // Start with null to show a loading spinner
  const storage = require('./async_storage.js'); // Replace with your correct storage path

  useEffect(() => {
    const fetchInitialRoute = async () => {
      try {
        const value = await storage.getItem('accountNumber');
        if (value) {
          setInitialRoute('TransactionNotification');
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.error('Error fetching initial route:', error);
        setInitialRoute('Login'); // Fallback to a safe default
      }
    };

    fetchInitialRoute();
  }, []);

  if (initialRoute === null) {
    // Display a loading spinner while determining the initial route
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="TransactionNotification" component={TransactionNotification} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="LoginOrSignup" component={LoginOrSignup} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={NavigationBar} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
