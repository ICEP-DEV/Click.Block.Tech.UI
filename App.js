import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import TransactionNotification from './screens/TransactionNotification';
import PinEntryScreen from './screens/PinEntryScreen';

// Create a Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TransactionNotification"> 
      <Stack.Screen name="Transaction"  component={TransactionNotification} options={{headerShown: false}}/>
      <Stack.Screen name="PinEntry" component={PinEntryScreen}options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




      
  
  