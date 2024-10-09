import * as React from 'react';
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
import IdentityVerificationScreen from './screens/IdentityVerificationScreen';
import EmailVerificationScreen from './registrationScreens/RegistrationSuccessScreen'; 
import LandingPage from './screens/LandingPage';
import OnboardingOne from './screens/OnboardingOne';
import OnboardingTwo from './screens/OnboardingTwo';
import OnboardingThree from './screens/OnboardingThree';
import LoginOrSignup from './screens/LoginOrSignup';
import VerifyApp from './screens/activateApp_screen';
import HomeScreen from './screens/homeScreen';

// Create a Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login"  component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="LoginOrSignup"  component={LoginOrSignup} options={{headerShown: false}}/>
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
      <Stack.Screen name="VerifyApp" component={VerifyApp}  options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }} />
      </Stack.Navigator>
      {/* <NavigationBar /> */}
    </NavigationContainer>
  );
}




      
  
  