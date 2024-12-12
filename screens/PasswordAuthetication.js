import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../API/API';

const PasswordAuthetication = () => {
  const [Email, setEmail] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const navigation = useNavigation();

  const handleNext = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!emailPattern.test(Email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setIsSendingOtp(true);

    try {
      const response = await axios.post(`${BASE_URL}/generate-otp`, { Email });
      console.log('API Response:', response.data);

      if (response.status === 200) {
        Alert.alert('Success', 'Verification code sent. Check your inbox.', [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('VerifyEmail', { Email }),
          },
        ]);
      } else {
        Alert.alert('Error', 'Failed to send verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error generating OTP:', error);
      Alert.alert('Error', 'An error occurred while sending the OTP. Please try again.');
    } finally {
      setIsSendingOtp(false);
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
            value={Email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Button
            mode="contained"
            onPress={handleNext}
            style={styles.button}
            loading={isSendingOtp}
            disabled={isSendingOtp}
          >
            {isSendingOtp ? 'Sending...' : 'Next'}
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