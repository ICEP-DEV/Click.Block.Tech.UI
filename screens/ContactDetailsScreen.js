import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient'; // Requires 'expo-linear-gradient' package for gradient
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for screen navigation

const ContactDetailsScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation(); // Hook to use navigation

  // Validate and format phone number
  const handlePhoneNumberChange = (text) => {
    let formattedText = text.replace(/[^0-9]/g, '');

    if (formattedText.length > 0 && formattedText[0] !== '0') {
      formattedText = '0' + formattedText.slice(1);
    }

    if (formattedText.length > 10) {
      formattedText = formattedText.slice(0, 10);
    }

    setPhoneNumber(formattedText);
  };

  // Handle the "Next" button press
  const handleNext = () => {
    if (phoneNumber.length !== 10) {
      Alert.alert('Invalid Phone Number', 'Phone number must be exactly 10 digits.');
    } else {
      // Show an alert, and navigate to the next screen after pressing "OK"
      Alert.alert('Success', 'Phone number is valid', [
        { text: 'OK', onPress: () => navigation.navigate('VerifyPhoneNumber') },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#003366', '#003366', '#ffffff']} style={styles.gradient}>
        <View style={styles.formContainer}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressSquare, styles.activeSquare]}>
              <Text style={styles.progressText}>2</Text>
            </View>
            <View style={styles.progressSquare}>
              <Text style={styles.progressText}>2</Text>
            </View>
            <View style={styles.progressSquare}>
              <Text style={styles.progressText}>3</Text>
            </View>
            <View style={styles.progressSquare}>
              <Text style={styles.progressText}>4</Text>
            </View>
          </View>

          <Text style={styles.title}>CONTACT DETAILS</Text>
          <Text style={styles.subtitle}>Verify your phone number</Text>

          <TextInput
            label="Enter your phone number"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
          />
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
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeSquare: {
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
  input: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#003366',
    marginTop: 10,
  },
});

export default ContactDetailsScreen;
