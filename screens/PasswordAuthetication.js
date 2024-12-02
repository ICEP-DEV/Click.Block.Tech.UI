import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; // Uncommented for navigation use
// import LottieView from 'lottie-react-native'; // Commented out LottieView since it's only used for backend processing
// import axios from 'axios'; // Commented out axios import as it's no longer needed
// import { BASE_URL } from '../API/API'; // Commented out backend URL

// const API_URL = ${BASE_URL}/customers; // Commented out API_URL

const PasswordAuthetication = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation(); // Initialize navigation

  // Commented out the backend API call
  // const updateCustomerStep = async (customerData) => {
  //   try {
  //     const response = await axios.patch(${API_URL}/${customerData.CustID_Nr}, customerData);
  //     console.log('Update successful:', response.data);
  //     return response;
  //   } catch (error) {
  //     console.error('Error updating customer:', error.response.data);
  //     throw error.response.data;
  //   }
  // };

  // Commented out the handleNext function for backend interaction
  // const handleNext = async () => {
  //   setIsSendingOtp(true);
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   if (!emailPattern.test(email)) {
  //     Alert.alert('Invalid Email', 'Please enter a valid email address.');
  //     setIsSendingOtp(false);
  //     return;
  //   }

  //   const customerData = {
  //     CustID_Nr: CustID,
  //     Email: email,
  //   };

  //   console.log('Customer data being submitted:', customerData);

  //   try {
  //     const response = await updateCustomerStep(customerData);
  //     console.log('API response:', response.stepText);

  //     if (response.status === 200) {
  //       setIsSendingOtp(false);
  //       Alert.alert('Success', 'Email sent. Check your inbox for OTP.', [
  //         { text: 'OK', onPress: () => navigation.navigate('VerifyEmail', { Email: email, CustID_Nr: CustID }) }
  //       ]);
  //     }

  //   } catch (error) {
  //     alert('Failed to update customer: ' + error.message);
  //     setIsSendingOtp(false);  // Stop the loading animation in case of error
  //   }
  // };

  const handleNext = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!emailPattern.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // Only call navigation if it is available (when uncommented)
    if (navigation) {
      // Navigate to the "VerifyEmail" screen and pass the email
      navigation.navigate('PasswordVerificationCode', { email });
    } else {
      console.log('Valid email, but navigation is not enabled');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#0F0C29', '#16335D', '#1E5E98']} style={styles.gradient}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Forgot Remote Pin</Text>
          <Text style={styles.subtitle}>Enter your email to receive a verification code to proceed.</Text>

          <TextInput
            label="Enter your email address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none" // To prevent auto-capitalizing the first letter of email
          />

          {/* Mocking loading state, you can remove the Lottie view */}
          {/* 
          {
            isSendingOtp ? (
              <LottieView style={{ width: 100, height: 100, marginLeft: 115, marginBottom: 45 }} source={require('../assets/lottie_animation_icons/loading_anim_icon.json')} autoPlay loop />
            ) : (
              <Button mode="contained" onPress={handleNext} style={styles.button}>
                Next
              </Button>
            )
          }
          */}
          <Button mode="contained" onPress={handleNext} style={styles.button}>
            Next
          </Button>

        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#003366',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#003366',
    marginTop: 10,
  },
});

export default PasswordAuthetication;
