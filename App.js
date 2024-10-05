import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './screens/navigationBar'; 
import { createStackNavigator } from '@react-navigation/stack';
import Registration from './registrationScreens/Registration';
import PersonalInfoForm from './registrationScreens/PersonalInfoForm';
import ContactDetailsScreen from './registrationScreens/ContactDetailsScreen'; // Adjust the path based on where your file is located
import VerifyEmailScreen from './registrationScreens/VerifyEmailScreen';
import SuccessScreen from './registrationScreens/RegistrationSuccessScreen';
import TermsScreen from './registrationScreens/TermsScreen';
import NavigationBar from './screens/navigationBar'; 
import Login from './screens/Login';

// Create a Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
      <Stack.Screen name="Login"  component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="Registration" component={Registration}  options={{ headerShown: false }}  />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoForm}  options={{ headerShown: false }} />
      <Stack.Screen name="ContactDetails" component={ContactDetailsScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="Success" component={SuccessScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="Terms" component={TermsScreen}  options={{ headerShown: false }} />
      <NavigationBar />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




      
  
  