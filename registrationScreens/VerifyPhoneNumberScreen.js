import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const VerifyPhoneNumberScreen = () => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const navigation = useNavigation();

  const inputRefs = useRef([]);

  const handleCodeChange = (text, index) => {
    const newCode = [...verificationCode];
    newCode[index] = text.slice(0, 1); // Allow only one character per input
    setVerificationCode(newCode);

    // Move to the next input if a value is entered
    if (text && index < verificationCode.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (!text && index > 0) {
      inputRefs.current[index - 1].focus(); // Move to previous input if deleted
    }
  };

  const handleNext = () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      alert('Please enter a valid 6-digit code.');
    } else {
      console.log('Code is valid:', code);
      navigation.navigate('Success');
    }
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
            We've sent a text message to your email account with a verification code. Please enter it in the field below to verify your email account.
          </Text>

          <View style={styles.codeInputContainer}>
            {verificationCode.map((code, index) => (
              <TextInput
                key={index}
                ref={ref => inputRefs.current[index] = ref}
                style={styles.codeInput}
                value={code}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(text) => handleCodeChange(text, index)}
                textAlign="center" // Center the text
                mode="outlined" // Optional: gives it an outlined look
              />
            ))}
          </View>

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
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
    backgroundColor: '#fff',
    color: '#02457A',
    textAlign: 'center', // Ensure text is centered
    padding: 0,
  },
  button: {
    backgroundColor: '#02457A',
    marginTop: 10,
  },
});

export default VerifyPhoneNumberScreen;
