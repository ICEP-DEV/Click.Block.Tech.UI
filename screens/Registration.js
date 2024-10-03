import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';

// Import images
const userIcon = require('../assets/user.png');
const idIcon = require('../assets/id.png'); // Ensure you have an ID icon in your assets
const padlockIcon = require('../assets/padlock.png');
const avatarIcon = require('../assets/avatar.png'); // Although imported, it's not used in this version

const Registration = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  // State for error messages
  const [errors, setErrors] = useState({});

  const handleFirstNameChange = (text) => {
    const alphabeticText = text.replace(/[^a-zA-Z\s]/g, '');
    setFirstName(alphabeticText);
  };

  const handleLastNameChange = (text) => {
    const alphabeticText = text.replace(/[^a-zA-Z\s]/g, '');
    setLastName(alphabeticText);
  };

  const handleIdChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setId(numericText.slice(0, 13));
  };

  const handlePinChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setPin(numericText.slice(0, 5));
  };

  const handleConfirmPinChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setConfirmPin(numericText.slice(0, 5));
  };

  const validatePins = () => {
    let pinErrors = {};
    if (pin.length !== 5) {
      pinErrors.pin = 'You must enter exactly five digits for the PIN.';
    }
    if (pin !== confirmPin) {
      pinErrors.confirmPin = 'PINs do not match.';
    }
    return pinErrors;
  };

  const validateId = () => {
    let idErrors = {};

    // Check if ID is exactly 13 digits
    if (id.length !== 13) {
      idErrors.id = 'ID must be exactly 13 digits.';
      return idErrors;
    }

    // Check if all characters are digits
    if (!/^\d{13}$/.test(id)) {
      idErrors.id = 'ID must contain only digits.';
      return idErrors;
    }

    // Validate the date portion (first 6 digits: YYMMDD)
    const year = parseInt(id.substring(0, 2), 10);
    const month = parseInt(id.substring(2, 4), 10);
    const day = parseInt(id.substring(4, 6), 10);

    // Assuming IDs are for people born between 1900 and 1999
    // Adjust the century as needed
    const fullYear = year >= 0 && year <= new Date().getFullYear() % 100
      ? 2000 + year
      : 1900 + year;

    const dateOfBirth = new Date(fullYear, month - 1, day);

    // Check if the date is valid
    if (
      dateOfBirth.getFullYear() !== fullYear ||
      dateOfBirth.getMonth() + 1 !== month ||
      dateOfBirth.getDate() !== day
    ) {
      idErrors.id = 'ID contains an invalid date of birth.';
      return idErrors;
    }

    // Optional: Implement checksum validation if applicable
    
    const digits = id.split('').map(Number);
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      let digit = digits[i];
      if ((i + 1) % 2 === 0) { // Even positions
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    if (sum % 10 !== 0) {
      idErrors.id = 'ID checksum is invalid.';
      return idErrors;
    }
    
    return idErrors;
  };

  const isFormValid = () => {
    return (
      checked &&
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      id.trim() !== '' &&
      pin.trim() !== '' &&
      confirmPin.trim() !== ''
    );
  };

  const handleSubmit = () => {
    const pinErrors = validatePins();
    const idErrors = validateId();
    const allErrors = { ...pinErrors, ...idErrors };

    if (!isFormValid()) {
      setErrors({ form: 'Please fill out all fields correctly.' });
      Alert.alert('Error', 'Please fill out all fields correctly.');
    } else if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      const errorMessages = Object.values(allErrors).join('\n');
      Alert.alert('Error', errorMessages);
    } else {
      setErrors({});
      Alert.alert('Success', 'Registration completed successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('PersonalInfo') }
      ]);
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
          <Image source={avatarIcon} style={styles.icon} />
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
          <Image source={avatarIcon} style={styles.icon} />
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
            value={id}
            onChangeText={handleIdChange}
            keyboardType="numeric"
            maxLength={13}
            placeholderTextColor="#02457A"
          />
        </View>
        {errors.id && <Text style={styles.errorText}>{errors.id}</Text>}

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

        {/* Terms & Conditions Checkbox */}
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={checked}
            onPress={() => setChecked(!checked)}
            containerStyle={styles.checkbox}
          />
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
            <Text style={styles.loginLink}>Login here</Text>
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
    textAlign: 'center',
    marginBottom: 20,
  },
  userIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    width: '100%',
    backgroundColor: '#F8F8F8',
  },
  icon: {
      position: 'absolute',
      right: 180,
      width: 200,
      height: 200,
      resizeMode: 'contain',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#02457A',
    paddingLeft: 0, 
    left:10,       // Removed extra padding as marginRight on icon handles spacing
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    // flexWrap: 'wrap',    // Removed to prevent wrapping
  },
  checkbox: {
    marginRight: 5,
    padding: 0,
  },
  checkboxText: {
    fontSize: 12,
    color: '#555',
  },
  linkText: {
    fontSize: 12,
    color: '#02457A',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#02457A',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
    width: '100%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  loginText: {
    fontSize: 12,
    color: '#555',
  },
  loginLink: {
    fontSize: 12,
    color: '#02457A',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default Registration;
