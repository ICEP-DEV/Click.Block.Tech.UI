import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import axios from 'axios'; 

const PersonalInfoForm = ({ route, navigation }) => {
  const { CustID_Nr } = route.params; 
  

  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');
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
    { label: 'South Africa', value: 'za' },
  ]);

  const handleNext = async () => {
    // Check for empty fields
    if (!dobDay || !dobMonth || !dobYear || !country || !addressLine1 || !city || !zipCode) {
        Alert.alert('Error', 'Please fill out all fields.');
        return;
    }

    // Validate the date
    const dateStr = `${dobDay}/${dobMonth}/${dobYear}`;
    if (!moment(dateStr, 'DD/MM/YYYY', true).isValid()) {
        Alert.alert('Invalid Date', 'Please enter a valid date.');
        return;
    }

    // Validate zip code
    if (!/^\d{4}$/.test(zipCode)) {
        Alert.alert('Invalid Zip Code', 'Please enter a valid 4-digit Zip Code.');
        return;
    }

    // Create a single address string
    const addressString = `${addressLine1}, ${city}, ${country}, ${zipCode}`;

    // Prepare the data to send to the API
    const personalInfo = {
        CustID_Nr, // Include the CustID_Nr
        dateOfBirth: `${dobYear}-${dobMonth}-${dobDay}`, // Format date to YYYY-MM-DD
        address: addressString, // Use the concatenated address string
    };


    try {
        // PATCH request to update personal information
        const response = await axios.patch(`http://10.2.47.159:5000/api/customers/${CustID_Nr}`, personalInfo);
        console.log(response);
        if (response.status === 200) {
            Alert.alert('Success', 'Personal information updated!', [
                { text: 'OK', onPress: () => navigation.navigate('ContactDetails', { CustID: CustID_Nr}) }
            ]);
        }
    } catch (error) {
        Alert.alert('Error', 'Failed to update personal information. Please try again later.');
        console.error('Error updating customer:', error);
    }
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

          <View style={styles.dateContainer}>
            <TextInput
              style={styles.dateInput}
              placeholder="DD"
              value={dobDay}
              onChangeText={text => setDobDay(text.replace(/[^0-9]/g, ''))}
              maxLength={2}
              keyboardType="numeric"
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={styles.dateInput}
              placeholder="MM"
              value={dobMonth}
              onChangeText={text => setDobMonth(text.replace(/[^0-9]/g, ''))}
              maxLength={2}
              keyboardType="numeric"
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={styles.dateInput}
              placeholder="YYYY"
              value={dobYear}
              onChangeText={text => setDobYear(text.replace(/[^0-9]/g, ''))}
              maxLength={4}
              keyboardType="numeric"
              placeholderTextColor="#ccc"
            />
          </View>

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
            textStyle={{ color: '#02457A' }}  // Dropdown text color updated here
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

          <View style={styles.rowContainer}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="City"
              value={city}
              onChangeText={setCity}
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Zip Code"
              value={zipCode}
              onChangeText={text => {
                if (/^\d{0,4}$/.test(text)) {
                  setZipCode(text);
                }
              }}
              placeholderTextColor="#ccc"
              keyboardType="numeric"
            />
          </View>

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
    alignItems: 'center',
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
    width: '90%',
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
    color: '#02457A',
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
    color: '#02457A',
  },
  dropdown: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#02457A',
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
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  dateInput: {
    height: 45,
    width: '30%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F8F8F8',
    fontSize: 14,
    color: '#02457A',  // Updated date input text color
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfInput: {
    width: '48%',
  },
});

export default PersonalInfoForm;
