import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient'; // Requires 'expo-linear-gradient' package for gradient


const VerifyPhoneNumberScreen = () => {
  const [verificationCode, setVerificationCode] = useState('');

  // Handle verification code change
  const handleCodeChange = (text) => {
    // Limit the input to 6 digits
    setVerificationCode(text.slice(0, 6));
  };

  // Handle the "Next" button press
  const handleNext = () => {
    if (verificationCode.length !== 6) {
      alert('Please enter a valid 6-digit code.');
    } else {
      console.log('Code is valid:', verificationCode);
      // Navigate to the next screen
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#003366', '#003366', '#ffffff']} style={styles.gradient}>
        <View style={styles.formContainer}>
            
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressCircle, styles.activeCircle]}><Text style={styles.progressText}>1</Text></View>
            <View style={[styles.progressCircle, styles.activeCircle]}><Text style={styles.progressText}>2</Text></View>
            <View style={styles.progressCircle}><Text style={styles.progressText}>3</Text></View>
            <View style={styles.progressCircle}><Text style={styles.progressText}>4</Text></View>
          </View>

          {/* Title and instructions */}
          <Text style={styles.title}>VERIFY PHONE NUMBER</Text>
          <Text style={styles.subtitle}>
            We've sent a text message to your phone with a verification code. Please enter it in the field below to verify your phone number.
          </Text>

          {/* Phone Number Mask */}
          <Text style={styles.phoneNumber}>+27 (02) 1234 346</Text>

          {/* Verification Code Input */}
          <View style={styles.codeInputContainer}>
            {Array(6).fill('').map((_, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                value={verificationCode[index] || ''}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(text) => handleCodeChange(verificationCode.substr(0, index) + text + verificationCode.substr(index + 1))}
              />
            ))}
          </View>

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
  progressCircle: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 20,
  },
  activeCircle: {
    backgroundColor: '#003366',
  },
  progressText: {
    color: '#fff',
    fontWeight: 'bold',
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
  phoneNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#003366',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#003366',
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#003366',
    marginTop: 10,
  },
});

export default VerifyPhoneNumberScreen;
