import { ActivityIndicator, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationBar from './screens/navigationBar';
import Registration from './registrationScreens/Registration';
import PersonalInfoForm from './registrationScreens/PersonalInfoForm';
import ContactDetailsScreen from './registrationScreens/ContactDetailsScreen';
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
import CongratulationsScreen from './screens/CongratulationsScreen.js';
import CreatePanicPin from './screens/createPanicpin_screen.js';
import UpdateRemotePin from './screens/update_remotePin_screen.js';
import UpdateAlertPin from './screens/update_panicPin_screen.js';
import PasswordAuthentication from './screens/PasswordAuthetication.js';
import PasswordVerificationCode from './screens/PasswordVerificationCode.js';
import NewPassword from './screens/NewPassword.js';
import { SessionProvider } from './screens/SessionProvider.js';  // Import the SessionProvider

const Stack = createStackNavigator();

export default function App() {
  const [route, setRoute] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60); // Initialize the timer (in seconds)
  const storage = require('./async_storage.js');

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const value = await storage.getItem('accountNumber');
      console.log(value);
      if (value !== null) {
        setRoute('Login');
        setIsLoading(false);
      } else {       
        setRoute('LandingPage');
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle the countdown timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1); // Decrease the timer by 1 second
      }, 1000);
    } else {
      // Timer reached zero, perform an action (e.g., logout or show an alert)
      clearInterval(interval);
      console.log('Timer finished');
    }

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [timer]);

  // Reset the timer on any user interaction (touch or click)
  const resetTimer = () => {
    setTimer(60); // Reset the timer back to 60 seconds or your desired countdown value
  };

  return (
    <NavigationContainer>
      <TouchableWithoutFeedback onPress={resetTimer} onTouchStart={resetTimer}>
        <View style={{ flex: 1 }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" /> // Display a loading indicator while data is being fetched
          ) : (
            <Stack.Navigator initialRouteName={route}>
              {/* Initial Flow: Login, Registration, and Onboarding Screens */}
              <Stack.Screen name="LoginOrSignup" component={LoginOrSignup} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} />
              <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
              <Stack.Screen name="PersonalInfo" component={PersonalInfoForm} options={{ headerShown: false }} />
              <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} options={{ headerShown: false }} />
              <Stack.Screen name="emailSuccess" component={EmailVerificationScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Success" component={SuccessScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="OnboardingOne" component={OnboardingOne} options={{ headerShown: false }} />
              <Stack.Screen name="OnboardingTwo" component={OnboardingTwo} options={{ headerShown: false }} />
              <Stack.Screen name="OnboardingThree" component={OnboardingThree} options={{ headerShown: false }} />
              <Stack.Screen name="IdentityVerification" component={IdentityVerificationScreen} options={{ headerShown: false }} />
              <Stack.Screen name="VerifyApp" component={ActivateApp} options={{ headerShown: false }} />
              <Stack.Screen name="PasswordAuthentication" component={PasswordAuthentication} options={{ headerShown: false }} />
              <Stack.Screen name="PasswordVerificationCode" component={PasswordVerificationCode} options={{ headerShown: false }} />
              <Stack.Screen name="NewPassword" component={NewPassword} options={{ headerShown: false }} />
              {/* Only wrap the 'Home' and later screens with SessionProvider */}
              <Stack.Screen name="Home">
                {() => (
                  <SessionProvider>
                    <NavigationBar />
                  </SessionProvider>
                )}
              </Stack.Screen>

              <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ManageCard" component={ManageCard} options={{ headerShown: false }} />
              <Stack.Screen name="ManageScreen" component={ManageScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SavingsAccount" component={SavingsAccount} options={{ headerShown: false }} />
              <Stack.Screen name="Congratulations" component={CongratulationsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="CardSettings" component={CardSettings} options={{ headerShown: false }} />
              <Stack.Screen name="UpdatePin" component={UpdatePin} options={{ headerShown: false }} />
              <Stack.Screen name="PinEntry" component={PinEntry} options={{ headerShown: false }} />
              <Stack.Screen name="CratePanicPin" component={CreatePanicPin} options={{ headerShown: false }} />
              <Stack.Screen name="UpdateRemotePin" component={UpdateRemotePin} options={{ headerShown: false }} />
              <Stack.Screen name="UpdateAlertPin" component={UpdateAlertPin} options={{ headerShown: false }} />
              
            </Stack.Navigator>
          )}
        </View>
      </TouchableWithoutFeedback>
    </NavigationContainer>
  );
}
