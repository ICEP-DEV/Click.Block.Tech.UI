import {ActivityIndicator } from 'react-native';
import React, { useState, useEffect,  } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationBar from './screens/navigationBar'; 
import { createStackNavigator } from '@react-navigation/stack';
import Registration from './registrationScreens/Registration';
import PersonalInfoForm from './registrationScreens/PersonalInfoForm';
import ContactDetailsScreen from './registrationScreens/ContactDetailsScreen'; // Adjust the path based on where your file is located
import VerifyEmailScreen from './registrationScreens/VerifyEmailScreen';
import SuccessScreen from './screens/SuccessScreen';
import TermsScreen from './registrationScreens/TermsScreen';
import Login from './screens/Login';
import SavingsAccount from './screens/savingsAccount';  
import IdentityVerificationScreen from './screens/IdentityVerificationScreen';
import EmailVerificationScreen from './registrationScreens/RegistrationSuccessScreen'; 
import LandingPage from './screens/LandingPage';
import OnboardingOne from './screens/OnboardingOne';
import OnboardingTwo from './screens/OnboardingTwo';
import OnboardingThree from './screens/OnboardingThree';
import LoginOrSignup from './screens/LoginOrSignup';
import ActivateApp from './screens/activateApp_screen';
import CardSettings from './screens/CardSettings';
import UpdatePin from './screens/UpdatePin';
import PinEntry from './screens/pinEntry.js';
import PersonalInfoScreen from './screens/PersonalInfoScreen.js';
import ManageCard from './screens/ManageCard.js';
import ManageScreen from './screens/manageScreen.js';


// Create a Stack Navigator
const Stack = createStackNavigator();

export default  function App() {
  const [route, setRoute] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const storage = require('./async_storage.js');
  
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const value = await storage.getItem('accountNumber'); 
      console.log(value);
      if(value !== null){
        setRoute('Home');
        setIsLoading(false);
      }else{       
         setRoute('LandingPage');
         setIsLoading(false);
      }
    };
    fetchData();
    
  }, [route]);
  return (
    <NavigationContainer>
     
     {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Display a loading indicator while data is being fetched
      ) : (
        <Stack.Navigator initialRouteName={route}>
          <Stack.Screen name="LoginOrSignup"  component={LoginOrSignup} options={{headerShown: false}}/>
          <Stack.Screen name="Login"  component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="LandingPage"  component={LandingPage} options={{headerShown: false}}/>
          <Stack.Screen name="Registration" component={Registration}  options={{ headerShown: false }}  />
          <Stack.Screen name="PersonalInfo" component={PersonalInfoForm}  options={{ headerShown: false }} />
          <Stack.Screen name="ContactDetails" component={ContactDetailsScreen}  options={{ headerShown: false }} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen}  options={{ headerShown: false }} />
          <Stack.Screen name="emailSuccess" component={EmailVerificationScreen}  options={{ headerShown: false }} />
          <Stack.Screen name="Success" component={SuccessScreen}  options={{ headerShown: false }} />
          <Stack.Screen name="Terms" component={TermsScreen}  options={{ headerShown: false }} />
          <Stack.Screen name="OnboardingOne" component={OnboardingOne} options={{ headerShown: false }} />
          <Stack.Screen name="OnboardingTwo" component={OnboardingTwo} options={{ headerShown: false }} />
          <Stack.Screen name="OnboardingThree" component={OnboardingThree} options={{ headerShown: false }} />
          <Stack.Screen name="IdentityVerification" component={IdentityVerificationScreen}  options={{ headerShown: false }} />
          <Stack.Screen name="VerifyApp" component={ActivateApp}  options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={NavigationBar}  options={{ headerShown: false }} />
          <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen}  options={{ headerShown: false }} />
          <Stack.Screen name="ManageCard" component={ManageCard}  options={{ headerShown: false }} />
          <Stack.Screen name="ManageScreen" component={ManageScreen}  options={{ headerShown: false }} />
          <Stack.Screen name="SavingsAccount" component={SavingsAccount} options={{ headerShown: false }} />
          <Stack.Screen
          name="CardSettings"
          component={CardSettings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdatePin"
          component={UpdatePin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PinEntry"
          component={PinEntry} // Add the PinEntry screen here
          options={{ headerShown: false }} 
        />
          </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}




    