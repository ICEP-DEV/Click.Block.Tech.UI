import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './screens/navigationBar'; 

// Create a Stack Navigator
const Stack = createStackNavigator();
import React from 'react';
import Login from './screens/Login';

//rimport HomeScreen from './src/screens/HomeScreen'; // A new screen for navigation


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login"  component={Login} options={{headerShown: false}}/>
  
      </Stack.Navigator>
    </NavigationContainer>
  );
}
