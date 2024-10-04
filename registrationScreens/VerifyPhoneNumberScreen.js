import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient'; // Requires 'expo-linear-gradient' package for gradient
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const VerifyPhoneNumberScreen = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const navigation = useNavigation(); // Initialize navigation hook

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
      navigation.navigate('Success'); // Replace 'NextScreen' with your target screen name
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
            We've sent a text message to your email account with a verification code. Please enter it in the field below to verify your email account.
          </Text>

          {/* Phone Number Mask */}
          <Text style={styles.phoneNumber}></Text>

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
  phoneNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#02457A',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInput: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#02457A', // Ensure the input text color is visible
     padding: 0,
     fontWeightnt: 'bold',
   
  },
  button: {
    backgroundColor: '#02457A',
    marginTop: 10,

  },
});

export default VerifyPhoneNumberScreen;
