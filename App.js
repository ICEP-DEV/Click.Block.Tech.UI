import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IdentityVerificationScreen from './screens/IdentityVerificationScreen';
import SuccessScreen from './screens/SuccessScreen';

// Create a Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IdentityVerification">
        <Stack.Screen 
          name="IdentityVerification" 
          component={IdentityVerificationScreen}
          options={{ headerShown: false }} // Hide header for this screen
        />
        <Stack.Screen 
          name="Success" 
          component={SuccessScreen}
          options={{ headerShown: false }} // Hide header for this screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
