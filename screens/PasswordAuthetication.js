import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, Dimensions, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function PasswordAuthentication() {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const validateInput = (value) => {
    if (/^\d+$/.test(value) && value.length > 10) {
      return; //OPM - Stop input if it's a phone number exceeding 10 digits
    }
  
    setInputValue(value);
  
    // OPM - Basic email or phone number regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //const phoneRegex = /^\d{10}$/;

    if (!value) {
      setError('Field cannot be empty');
    } else if (!emailRegex.test(value)) {
      setError('Enter a valid email');
    } else {
      setError('');
    }
  };

  const handleSubmit = () => {
    if (!inputValue || error) {
      Alert.alert('Error', 'Please correct the errors before proceeding.');
    } else {
      Alert.alert('Success', 'Verification code sent to your email, Please check your phone.');
      //navigation.navigate('NextScreen'); // OPM - Replace with the desired screen
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#02457A" barStyle="light-content" />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Forgot Password</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.instructions}>
            Enter the email associated with your account.
          </Text>

          {/* Input Field */}
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder="Email Address"
            placeholderTextColor="#888"
            value={inputValue}
            onChangeText={validateInput}
            keyboardType="email-address"
          />

          {/* Error Message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Submit Button */}
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02457A',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#02457A',
    height: 60,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 24,
  },
  mainContent: {
    padding: 16,
    alignItems: 'center',
  },
  instructions: {
    fontSize: 16,
    color: '#02457A',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#02457A',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
