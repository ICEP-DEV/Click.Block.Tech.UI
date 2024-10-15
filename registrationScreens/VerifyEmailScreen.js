import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../API/API';

const API_URL = `${BASE_URL}/customers`;

const VerifyEmailScreen = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { Email } = route.params; // Assuming email is passed from the previous page
  const {CustID_Nr} = route.params;

  // Handle verification code change
  const handleCodeChange = (text) => {
    // Limit the input to 6 digits
    setVerificationCode(text.slice(0, 6));
    
  };

  // API call to verify the OTP
  const verifyOtp = async () => {
    try {
      const otpData = {
        Email, 
        otp: verificationCode
      };

      console.log(otpData);

      const response = await axios.post(`${API_URL}/verify-otp`, otpData);

      console.log(otpData);
      console.log('Verification successful:', response.data);
      Alert.alert('Success', 'Email verified successfully!'); // Show success alert
      navigation.navigate('emailSuccess',{CustID:CustID_Nr}); // Navigate to the next screen

    } catch (error) {
      console.error('Error verifying OTP:', error.response.data);
      Alert.alert('Error', 'Failed to verify email: ' + error.message); // Show error alert
    }
  };

  // Handle the "Next" button press
  const handleNext = () => {
    if (verificationCode.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter a valid 6-digit code.');
    } else {
      console.log('Code is valid:', verificationCode);
      verifyOtp(); // Call the API to verify OTP
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#003366', '#003366', '#ffffff']} style={styles.gradient}>
        <View style={styles.formContainer}>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressSquare}><Text style={styles.inactiveProgressText}>1</Text></View>
            <View style={styles.progressSquare}><Text style={styles.inactiveProgressText}>2</Text></View>
            <View style={[styles.progressSquare, styles.activeSquare]}><Text style={styles.activeProgressText}>3</Text></View>
            <View style={styles.progressSquare}><Text style={styles.inactiveProgressText}>4</Text></View>
          </View>

          {/* Title and instructions */}
          <Text style={styles.title}>VERIFY EMAIL ACCOUNT</Text>
          <Text style={styles.subtitle}>
            We've sent an email to your provided email address with a verification code. Please enter it in the field below to verify your email account.
          </Text>

          {/* Single Verification Code Input */}
          <TextInput
            label="Verification Code"
            value={verificationCode}
            onChangeText={handleCodeChange}
            style={styles.input}
            keyboardType=""
            maxLength={6}
            mode="outlined"
          />

          {/* Next Button */}
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
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progressSquare: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  activeSquare: {
    backgroundColor: '#02457A',
  },
  activeProgressText: {
    color: '#fff', // White text for active square
    fontWeight: 'bold',
  },
  inactiveProgressText: {
    color: '#02457A', // Dark blue text for inactive square
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#02457A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#02457A',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#02457A',
    marginTop: 10,
  },
});

export default VerifyEmailScreen;
