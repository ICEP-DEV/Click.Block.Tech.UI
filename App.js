import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//OPM - Importing Other screens

import LandingPage from './screens/LandingPage';
import OnboardingOne from './screens/OnboardingOne'; 
import OnboardingTwo from './screens/OnboardingTwo'; 
import OnboardingThree from './screens/OnboardingThree';
import LoginOrSignup from './screens/LoginOrSignup';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
         <NavigationContainer>
             <Stack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LandingPage" component={LandingPage} />
                <Stack.Screen name="OnboardingOne" component={OnboardingOne} />
                <Stack.Screen name="OnboardingTwo" component={OnboardingTwo} />
                <Stack.Screen name="OnboardingThree" component={OnboardingThree} />
                <Stack.Screen name="LoginOrSignup" component={LoginOrSignup} />
             </Stack.Navigator>
         </NavigationContainer>
    );
};

export default App;
