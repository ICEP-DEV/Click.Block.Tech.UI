import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';

// Import images
const userIcon = require('../assets/user.png');
const avatarIcon = require('../assets/avatar.png');
const emailIcon = require('../assets/email.png');
const padlockIcon = require('../assets/padlock.png');

const Registration = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleFirstNameChange = (text) => {
    const alphabeticText = text.replace(/[^a-zA-Z\s]/g, '');
    setFirstName(alphabeticText);
  };

  const handleLastNameChange = (text) => {
    const alphabeticText = text.replace(/[^a-zA-Z\s]/g, '');
    setLastName(alphabeticText);
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
    if (pin.length < 5) {
      return 'You must enter exactly five digits for the PIN.';
    }
    if (pin !== confirmPin) {
      return 'PINs do not match.';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const isFormValid = () => {
    return (
      checked &&
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      email.trim() !== '' &&
      pin.trim() !== '' &&
      confirmPin.trim() !== ''
    );
  };

  const handleSubmit = () => {
    const pinError = validatePins();
    if (!isFormValid()) {
      Alert.alert('Error', 'Please fill out all fields correctly.');
    } else if (!validateEmail(email)) {
      Alert.alert('Error', 'Invalid email format.');
    } else if (pinError) {
      Alert.alert('Error', pinError);
    } else {
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

        <View style={styles.inputWrapper}>
          <Image source={avatarIcon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your first name(s)"
            value={firstName}
            onChangeText={handleFirstNameChange}
            placeholderTextColor="#02457A"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={avatarIcon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={handleLastNameChange}
            placeholderTextColor="#02457A"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={emailIcon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#02457A"
          />
        </View>

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

        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={checked}
            onPress={() => setChecked(!checked)}
            containerStyle={styles.checkbox}
          />
          <Text style={styles.checkboxText}>I have read and agree to the</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, !isFormValid() && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

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
    backgroundColor: '#02457a',
    paddingVertical: 50,
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 45,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#02457A',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 14,
    color: '#02457A',
    textAlign: 'center',
    marginBottom: 30,
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
    paddingHorizontal: 25,
    height: 40,
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: 150,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#02457A',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
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
});

export default Registration;
