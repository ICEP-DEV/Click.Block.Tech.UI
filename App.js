import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import ContactUs from './screens/ContactUs'; // Import the ContactUs screen

// Create a Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ContactUs"> 
        {/* Define the ContactUs screen in the stack with header hidden */}
        <Stack.Screen 
          name="ContactUs" 
          component={ContactUs} 
          options={{ headerShown: false }}  // Hide the header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
