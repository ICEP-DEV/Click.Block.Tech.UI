import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Checkbox } from 'react-native-paper'; // Import from react-native-paper

const InputWithIcon = ({ icon, placeholder, value, onChangeText, secureTextEntry, error }) => (
  <View style={styles.inputWrapper}>
  <View style={styles.inputContainer}>
    <Image source={icon} style={styles.icon} />
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#666"
    />
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

export default function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let newErrors = {};

    // Validate First Name
    if (!/^[a-zA-Z\s]{1,50}$/.test(firstName)) {
      newErrors.firstName = 'First name must contain only letters and spaces,up to 50 characters long.';
      valid = false;
    }

    // Validate Last Name
    if (!/^[a-zA-Z\s]{1,50}$/.test(lastName)) {
      newErrors.lastName = 'Last name must contain only letters and spaces,up to 50 characters long.';
      valid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email address.';
      valid = false;
    }

    // Validate PIN
    if (!/^\d{6}$/.test(pin)) {
      newErrors.pin = 'PIN must be exactly 6 digits.';
      valid = false;
    }

    // Validate Confirm PIN
    if (pin !== confirmPin) {
      newErrors.confirmPin = 'PINs do not match.';
      valid = false;
    }

    // Validate Checkbox
    if (!isChecked) {
      newErrors.checkbox = 'You must agree to the Terms & Conditions.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Proceed with form submission
      console.log('Form is valid. Proceeding with submission...');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.background} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.header}>CREATE YOUR ACCOUNT</Text>
          <Image source={require('../assets/user.png')} style={styles.iconTop} />
          <Text style={styles.subHeader}>It will only take you a few minutes!</Text>

          <InputWithIcon
            icon={require('../assets/Account.png')}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            error={errors.firstName}
          />
          <InputWithIcon
            icon={require('../assets/Account.png')}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            error={errors.lastName}
          />
          <InputWithIcon
            icon={require('../assets/mail.png')}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={errors.email}
          />
          <InputWithIcon
            icon={require('../assets/padlock.png')}
            placeholder="Create your PIN"
            value={pin}
            onChangeText={setPin}
            secureTextEntry
            maxLength={6}
            error={errors.pin}
          />
          <InputWithIcon
            icon={require('../assets/padlock.png')}
            placeholder="Confirm your PIN"
            value={confirmPin}
            onChangeText={setConfirmPin}
            secureTextEntry
            maxLength={6}
            error={errors.confirmPin}
          />

          <View style={styles.checkboxContainer}>
            <Checkbox
              status={isChecked ? 'checked' : 'unchecked'}
              onPress={() => setIsChecked(!isChecked)}
              color='#02457A'
            />
            <Text style={styles.checkboxLabel}>
              I have read and agree to the <Text style={styles.link}>Terms & Conditions</Text>.
            </Text>
          </View>
          {errors.checkbox && <Text style={styles.errorText}>{errors.checkbox}</Text>}

          <TouchableOpacity
            style={[styles.submitButton, !isChecked && styles.disabledButton]}
            disabled={!isChecked}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>
            You already have an account? <Text style={styles.link}>Login here.</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Center content vertically if needed
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20, // Adjust margin to create space for footer
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '120%',
    height: '40%',
    backgroundColor: '#02457A',
    zIndex: -1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#02457A',
    marginBottom: 10,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  iconTop: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    marginBottom: 10, // Adjust spacing as needed
  },
  subHeader: {
    fontSize: 14,
    color: '#02457A',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputWrapper: {
    width: 300,
    marginBottom: 20,
  },
  inputContainer: {
    position: 'relative',
    width: 300,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#163460',
    borderRadius: 5,
    paddingHorizontal: 40, // Add extra padding to accommodate the icon
    marginVertical: 8,
    fontSize: 16,
    color: '#02457A',
  },
  inputError: {
    borderColor: 'red',
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -12 }], // Center the icon vertically
    width: 24, // Adjust size as needed
    height: 24, // Adjust size as needed
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    marginLeft: 8,
  },
  link: {
    color: '#02457A',
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#02457A',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    alignSelf: 'center',
    width: '100%',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10, // Ensure space between the button and footer
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'left',
    width: '100%',
  },
});
