import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registration from './screens/Registration';
import PersonalInfoForm from './registrationScreens/PersonalInfoForm';
import ContactDetailsScreen from './registrationScreens/ContactDetailsScreen'; // Adjust the path based on where your file is located
import VerifyEmailScreen from './registrationScreens/VerifyEmailScreen';
import SuccessScreen from './registrationScreens/SuccessScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
      <Stack.Screen name="Registration" component={Registration}  options={{ headerShown: false }}  />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoForm}  options={{ headerShown: false }} />
      <Stack.Screen name="ContactDetails" component={ContactDetailsScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="Success" component={SuccessScreen}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
