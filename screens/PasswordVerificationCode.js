import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Alert, ToastAndroid } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../API/API';

const PasswordVerificationCode = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { Email, CustID_Nr } = route.params;

  const showToastMsg = (msg) => {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const handleCodeChange = (text) => {
    setVerificationCode(text.slice(0, 6)); // Limit to 6 characters
  };

  const verifyOtp = async () => {
    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);
    try {
      const otpData = {
        Email,
        otp: verificationCode,
      };

      const response = await axios.post(`${BASE_URL}/forgotPin/verify-otp`, otpData);

      if (response.status === 200 && response.data?.message) {
        Alert.alert('Success', 'OTP verified successfully!');
        
        navigation.navigate('NewPassword', { CustID: CustID_Nr }); // Navigate to NewPassword screen
      } else {
        const errorMsg = response.data?.error || 'Unexpected response from the server.';
        Alert.alert('Error', errorMsg);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to verify OTP. Please try again.';
      Alert.alert('Error', errorMsg);
      showToastMsg(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (verificationCode.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter a valid 6-digit code.');
      return;
    }
    verifyOtp(); // Trigger OTP verification
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#0F0C29', '#16335D', '#1E5E98']} style={styles.gradient}>
        <View style={styles.formContainer}>

          {/* Title and instructions */}
          <Text style={styles.title}>VERIFY EMAIL ACCOUNT</Text>
          <Text style={styles.subtitle}>
            We've sent an email to your provided email address with a verification code. Please enter it in the field below to verify your email account.
          </Text>

          {/* Verification Code Input */}
          <TextInput
            label="Verification Code"
            value={verificationCode}
            onChangeText={handleCodeChange}
            style={styles.input}
            keyboardType="numeric"
            maxLength={6}
            mode="outlined"
          />

          {/* Next Button */}
          <Button mode="contained" onPress={handleNext} style={styles.button} loading={isLoading} disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Next'}
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

export default PasswordVerificationCode;
