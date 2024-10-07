import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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




      
  
  