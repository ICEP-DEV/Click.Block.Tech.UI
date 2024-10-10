import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';

// Import images
const userIcon = require('../registrationAssets/user.png');
const idIcon = require('../registrationAssets/id.png');
const padlockIcon = require('../registrationAssets/padlock.png');
const phoneIcon = require('../registrationAssets/email.png'); // Add phone icon if available

const API_URL = 'http://http://192.168.56.1:5000/api/customers';

const Registration = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // New phone number state
  const [errors, setErrors] = useState({});

  const handleFirstNameChange = (text) => setFirstName(text.replace(/[^a-zA-Z\s]/g, ''));
  const handleLastNameChange = (text) => setLastName(text.replace(/[^a-zA-Z\s]/g, ''));
  const handleIdChange = (text) => setIdNumber(text.replace(/[^0-9]/g, '').slice(0, 13));
  const handlePinChange = (text) => setPin(text.replace(/[^0-9]/g, '').slice(0, 5));
  const handleConfirmPinChange = (text) => setConfirmPin(text.replace(/[^0-9]/g, '').slice(0, 5));
  const handlePhoneChange = (text) => setPhoneNumber(text.replace(/[^0-9]/g, '').slice(0, 10)); // Phone number max 10 digits

  const validatePins = () => {
    let pinErrors = {};
    if (pin.length !== 5) pinErrors.pin = 'You must enter exactly five digits for the PIN.';
    if (pin !== confirmPin) pinErrors.confirmPin = 'PINs do not match.';
    return pinErrors;
  };

  const validateIdNumber = () => {
    if (idNumber.length !== 13) return 'ID number must be exactly 13 digits.';
    return '';
  };

  const validatePhoneNumber = () => {
    if (phoneNumber.length !== 10) return 'Phone number must be exactly 10 digits.';
    return '';
  };

  const isFormValid = () => {
    return (
      checked &&
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      idNumber.trim() !== '' &&
      pin.trim() !== '' &&
      confirmPin.trim() !== '' &&
      phoneNumber.trim() !== '' // Check if phone number is entered
    );
  };

  const handleSubmit = async () => {
    const pinErrors = validatePins();
    const idError = validateIdNumber();
    const phoneError = validatePhoneNumber();

    if (!isFormValid()) {
      setErrors({ form: 'Please fill out all fields correctly.' });
      Alert.alert('Error', 'Please fill out all fields correctly.');
    } else if (idError) {
      Alert.alert('Error', idError);
    } else if (phoneError) {
      Alert.alert('Error', phoneError);
    } else if (Object.keys(pinErrors).length > 0) {
      Alert.alert('Error', pinErrors.pin || pinErrors.confirmPin);
    } else {
      try {
        const customerData = {
          CustID_Nr: idNumber,
          firstName,
          lastName,
          loginPin: pin,
          phoneNumber, // Include phone number in the customer data
        };

        const response = await axios.post(API_URL, customerData);
        Alert.alert(
          'Success',
          'Registration completed successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('PersonalInfo', { CustID_Nr: idNumber }),
            },
          ]
        );
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'There was an issue with the registration.';
        Alert.alert('Error', errorMessage);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>CREATE YOUR ACCOUNT</Text>
        <Image source={userIcon} style={styles.userIcon} />
        <Text style={styles.subHeaderText}>It will only take you a few minutes!</Text>

        {/* First Name Input */}
        <View style={styles.inputWrapper}>
          <Image source={userIcon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your first name(s)"
            value={firstName}
            onChangeText={handleFirstNameChange}
            placeholderTextColor="#02457A"
            autoCapitalize="words"
          />
        </View>
        {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

        {/* Last Name Input */}
        <View style={styles.inputWrapper}>
          <Image source={userIcon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={handleLastNameChange}
            placeholderTextColor="#02457A"
            autoCapitalize="words"
          />
        </View>
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

        {/* ID Input */}
        <View style={styles.inputWrapper}>
          <Image source={idIcon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your 13-digit ID"
            value={idNumber}
            onChangeText={handleIdChange}
            keyboardType="numeric"
            maxLength={13}
            placeholderTextColor="#02457A"
          />
        </View>
        {errors.id && <Text style={styles.errorText}>{errors.id}</Text>}

        {/* Phone Number Input */}
        <View style={styles.inputWrapper}>
          <Image source={phoneIcon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            keyboardType="numeric"
            maxLength={10}
            placeholderTextColor="#02457A"
          />
        </View>
        {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

        {/* PIN Input */}
        <View style={styles.inputWrapper}>
          <Image source={padlockIcon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Please create your remote PIN"
            value={pin}
            onChangeText={handlePinChange}
            secureTextEntry
            maxLength={5}
            keyboardType="numeric"
            placeholderTextColor="#02457A"
          />
        </View>
        {errors.pin && <Text style={styles.errorText}>{errors.pin}</Text>}

        {/* Confirm PIN Input */}
        <View style={styles.inputWrapper}>
          <Image source={padlockIcon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm your remote PIN"
            value={confirmPin}
            onChangeText={handleConfirmPinChange}
            secureTextEntry
            maxLength={5}
            keyboardType="numeric"
            placeholderTextColor="#02457A"
          />
        </View>
        {errors.confirmPin && <Text style={styles.errorText}>{errors.confirmPin}</Text>}

        {/* Terms & Conditions */}
        <View style={styles.checkboxContainer}>
          <CheckBox checked={checked} onPress={() => setChecked(!checked)} containerStyle={styles.checkbox} />
          <Text style={styles.checkboxText}>I have read and agree to the</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
            <Text style={styles.linkText}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
        {errors.form && <Text style={styles.errorText}>{errors.form}</Text>}

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, !isFormValid() && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#02457A',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#02457A',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 14,
    color: '#02457A',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#02457A',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
    userIcon: {
    width: 50, // Change as needed
    height: 50, // Change as needed
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#02457A',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkbox: {
    margin: 0,
    padding: 0,
  },
  checkboxText: {
    color: '#02457A',
  },
  linkText: {
    color: '#02457A',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#02457A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#7f9ba9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    color: '#02457A',
  },
  loginLink: {
    color: '#02457A',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});


export default Registration;
