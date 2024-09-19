import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';

const PersonalInfoForm = ({ navigation }) => {
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Australia', value: 'au' },
    { label: 'India', value: 'in' },
    { label: 'South Africa', value: 'za' },
  ]);

  const handleNext = () => {
    const dateFormatRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!dob || !country || !addressLine1 || !city || !zipCode) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    if (!dateFormatRegex.test(dob) || !moment(dob, 'DD/MM/YYYY', true).isValid()) {
      Alert.alert('Invalid Date', 'Please enter a valid date in DD/MM/YYYY format.');
      return;
    }

    Alert.alert('Info', 'Personal information saved!', [
      { text: 'OK', onPress: () => navigation.navigate('ContactDetails') }
    ]);
  };

  const formatDOB = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    let formattedText = '';
    if (numericText.length > 0) {
      formattedText += numericText.slice(0, 2); // Day
    }
    if (numericText.length >= 3) {
      formattedText += '/' + numericText.slice(2, 4); // Month
    }
    if (numericText.length >= 5) {
      formattedText += '/' + numericText.slice(4, 8); // Year
    }
    setDob(formattedText);
  };

  const formatZipCode = (text) => {
    // Allow only numeric input
    const numericText = text.replace(/[^0-9]/g, '');
    setZipCode(numericText);
  };

  return (
    <LinearGradient colors={['#001F54', '#FFFFFF']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.formContainer}>
          <View style={styles.stepContainer}>
            <View style={[styles.stepSquare, styles.activeStep]}>
              <Text style={styles.stepText}>1</Text>
            </View>
            <View style={styles.stepSquare}>
              <Text style={styles.stepText}>2</Text>
            </View>
            <View style={styles.stepSquare}>
              <Text style={styles.stepText}>3</Text>
            </View>
            <View style={styles.stepSquare}>
              <Text style={styles.stepText}>4</Text>
            </View>
          </View>

          <Text style={styles.headerText}>PERSONAL INFORMATION</Text>

          <TextInput
            style={styles.input}
            placeholder="Date of Birth (DD/MM/YYYY)"
            value={dob}
            onChangeText={formatDOB}
            placeholderTextColor="#ccc"
            keyboardType="numeric"
          />

          <DropDownPicker
            open={open}
            value={country}
            items={items}
            setOpen={setOpen}
            setValue={setCountry}
            setItems={setItems}
            placeholder="Select your country"
            style={styles.dropdown}
            placeholderStyle={{ color: '#ccc' }}
            containerStyle={{ marginBottom: 15 }}
          />

          <TextInput
            style={styles.input}
            placeholder="Address Line 1"
            value={addressLine1}
            onChangeText={setAddressLine1}
            placeholderTextColor="#ccc"
          />

          <TextInput
            style={styles.input}
            placeholder="Address Line 2 (Optional)"
            value={addressLine2}
            onChangeText={setAddressLine2}
            placeholderTextColor="#ccc"
          />

          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
            placeholderTextColor="#ccc"
          />

          <TextInput
            style={styles.input}
            placeholder="Zip Code"
            value={zipCode}
            onChangeText={formatZipCode}
            placeholderTextColor="#ccc"
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  stepSquare: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  activeStep: {
    backgroundColor: '#001F54',
  },
  stepText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001F54',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 45,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#F8F8F8',
    fontSize: 14,
  },
  dropdown: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#02457A',
    borderRadius: 8,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PersonalInfoForm;
