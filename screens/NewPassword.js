import React, { useState } from 'react'; 
import { View, StyleSheet, Text, SafeAreaView, Alert, ToastAndroid } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../API/API';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const storage = require('../async_storage');
  
  

  const showToastMsg = (msg) => {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  // Handle new password change
  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  // API call to reset password
  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      showToastMsg('Passwords do not match!');
      return;
    }

    const CustID = await storage.getItem('CustID_Nr');
    try {
      const passwordData = {
        custID_Nr: CustID ,
        newPin: newPassword
      };

      console.log('Password Data', passwordData);

      const response = await axios.patch(`${BASE_URL}/update-pin`, passwordData);

      console.log('PIN reset successful:', response.data);
      Alert.alert('Success', 'Your Remote pin has been updated!'); // Show success alert
      navigation.navigate('Login'); // Navigate to the login page

    } catch (error) {
      console.error('Error resetting PIN:', error.response.data);
      showToastMsg('Failed to reset PIN: '); // Show error toast
    }
  };

  // Handle the "Next" button press
  const handleNext = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Invalid Input', 'Please fill in both password fields.');
    } else {
      resetPassword(); // Call the API to reset the password
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#0F0C29', '#16335D', '#1E5E98']} style={styles.gradient}>
        <View style={styles.formContainer}>

          {/* Title and instructions */}
          <Text style={styles.title}>Create New Remote PIN</Text>
          <Text style={styles.subtitle}>
            Please enter a new pin for your account. Make sure the two new Pins match.
          </Text>

          {/* New Password Input */}
          <TextInput
            label="Enter New Remote PIN"
            value={newPassword}
            onChangeText={handleNewPasswordChange}
            style={styles.input}
            keyboardType="numeric"
            maxLength={5} 
            secureTextEntry
            mode="outlined"
          />

          {/* Confirm Password Input */}
          <TextInput
            label="Confirm Your New Remote PIN"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            style={styles.input}
            keyboardType="numeric"
            maxLength={5} 
            secureTextEntry
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

export default NewPassword;
