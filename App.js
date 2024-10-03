import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registration from './screens/Registration';
import PersonalInfoForm from './screens/PersonalInfoForm';
import ContactDetailsScreen from './screens/ContactDetailsScreen'; // Adjust the path based on where your file is located
import VerifyPhoneNumberScreen from './screens/VerifyPhoneNumberScreen';
import SuccessScreen from './screens/SuccessScreen';
import TermsScreen from './screens/TermsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
      <Stack.Screen name="Registration" component={Registration}  options={{ headerShown: false }}  />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoForm}  options={{ headerShown: false }} />
      <Stack.Screen name="ContactDetails" component={ContactDetailsScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="VerifyPhoneNumber" component={VerifyPhoneNumberScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="Success" component={SuccessScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="Terms" component={TermsScreen}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
