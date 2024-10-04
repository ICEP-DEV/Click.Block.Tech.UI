// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from './screens/LandingPage'; // Adjust the path as necessary
import OnboardingOne from './screens/OnboardingOne'; // Adjust the path as necessary

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LandingPage" component={LandingPage} />
                <Stack.Screen name="OnboardingOne" component={OnboardingOne} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
