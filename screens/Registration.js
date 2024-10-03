import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';

const API_URL = 'http://10.2.32.151:5000/api/customers';

const Registration = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [idNumber, setIdNumber] = useState('');  // State for ID number
  const [phoneNumber, setPhoneNumber] = useState(''); // Add state for phone number
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

  const handleIdNumberChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setIdNumber(numericText.slice(0, 13));
  };

  const handlePhoneNumberChange = (text) => { // Handle phone number input
    const numericText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(numericText.slice(0, 10)); // Limit to 10 digits
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

  const validateIdNumber = () => {
    if (idNumber.length !== 13) {
      return 'ID number must be exactly 13 digits.';
    }
    return '';
  };

  const isFormValid = () => {
    return (
      checked &&
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      idNumber.trim() !== '' &&
      phoneNumber.trim() !== '' &&  // Validate phone number
      pin.trim() !== '' &&
      confirmPin.trim() !== ''
    );
  };

  const handleSubmit = async () => {
    const pinError = validatePins();
    const idError = validateIdNumber();

    if (!isFormValid()) {
      Alert.alert('Error', 'Please fill out all fields correctly.');
    } else if (idError) {
      Alert.alert('Error', idError);
    } else if (pinError) {
      Alert.alert('Error', pinError);
    } else {
      try {
        const customerData = {
          CustID_Nr: idNumber,
          firstName,
          lastName,
          phoneNumber,  // Include phone number
          loginPin: pin,
        };

        console.log('Customer data being submitted:', customerData);

        // API call to create a customer
        const response = await axios.post(API_URL, customerData);
        
        console.log('API response:', response.data);

       
          Alert.alert('Success', 'Registration completed successfully!', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('PersonalInfo', { CustID_Nr: idNumber }), // Navigate to PersonalInfo
            },
          ]);
          

      } catch (error) {
        // Improved error handling
        console.error('Error creating customer:', error); 
        const errorMessage = error.response?.data?.message || error.message || 'There was an issue with the registration.';
        Alert.alert('Error', errorMessage);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>CREATE YOUR ACCOUNT</Text>
        <Image source={require('../assets/user.png')} style={styles.userIcon} />
        <Text style={styles.subHeaderText}>It will only take you a few minutes!</Text>

        {/* Form Fields */}
        <View style={styles.inputWrapper}>
          <Image source={require('../assets/avatar.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your first name(s)"
            value={firstName}
            onChangeText={handleFirstNameChange}
            placeholderTextColor="#02457A"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../assets/avatar.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={handleLastNameChange}
            placeholderTextColor="#02457A"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../assets/email.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your ID number"
            value={idNumber}
            onChangeText={handleIdNumberChange}
            keyboardType="numeric"
            maxLength={13}  // Limit input to 13 digits
            placeholderTextColor="#02457A"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../assets/email.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="numeric"
            maxLength={10}  // Limit input to 10 digits
            placeholderTextColor="#02457A"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Image source={require('../assets/padlock.png')} style={styles.icon} />
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
          <Image source={require('../assets/padlock.png')} style={styles.icon} />
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

        {/* Checkbox and Submit Button */}
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
    width: '100%',
    marginBottom: 15,
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  input: {
    borderWidth: 1,
    borderColor: '#02457A',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 40,
    fontSize: 16,
    color: '#02457A',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginRight: 5,
  },
  checkboxText: {
    fontSize: 14,
    color: '#02457A',
  },
  linkText: {
    fontSize: 14,
    color: '#02457A',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#02457A',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: '#02457A',
  },
  loginLink: {
    fontSize: 14,
    color: '#02457A',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Registration;
