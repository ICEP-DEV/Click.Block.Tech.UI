import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Alert, ToastAndroid } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../API/API';

const VerifyEmailScreen = () => {
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
    setVerificationCode(text.slice(0, 6));
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
        navigation.navigate('NewPassword', { CustID: CustID_Nr });
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
    verifyOtp();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#003366', '#003366', '#ffffff']} style={styles.gradient}>
        <View style={styles.formContainer}>

          <View style={styles.progressContainer}>
            <View style={styles.progressSquare}><Text style={styles.inactiveProgressText}>1</Text></View>
            <View style={styles.progressSquare}><Text style={styles.inactiveProgressText}>2</Text></View>
            <View style={[styles.progressSquare, styles.activeSquare]}><Text style={styles.activeProgressText}>3</Text></View>
            <View style={styles.progressSquare}><Text style={styles.inactiveProgressText}>4</Text></View>
          </View>

          <Text style={styles.title}>VERIFY EMAIL ACCOUNT</Text>
          <Text style={styles.subtitle}>
            We've sent an email to your provided email address with a verification code. Please enter it in the field below to verify your email account.
          </Text>

          <TextInput
            label="Verification Code"
            value={verificationCode}
            onChangeText={handleCodeChange}
            style={styles.input}
            keyboardType="numeric"
            maxLength={6}
            mode="outlined"
          />

          <Button
            mode="contained"
            onPress={handleNext}
            style={styles.button}
            loading={isLoading}
            disabled={isLoading}
          >
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
    color: '#fff',
    fontWeight: 'bold',
  },
  inactiveProgressText: {
    color: '#02457A',
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
