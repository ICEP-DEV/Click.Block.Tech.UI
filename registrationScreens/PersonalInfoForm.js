import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker'; 
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import axios from 'axios';
import { BASE_URL } from '../API/API';

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

  const [showPicker, setShowPicker] = useState(false);
  const [dob, setDob] = useState(new Date());

  // Extract DOB from ID
  useEffect(() => {
    if (CustID_Nr && CustID_Nr.length >= 6) {
      const year = CustID_Nr.substring(0, 2);
      const month = CustID_Nr.substring(2, 4);
      const day = CustID_Nr.substring(4, 6);

      // Assuming IDs are post-2000. Adjust logic if IDs before 2000 need to be considered.
      const fullYear = parseInt(year) > 22 ? `19${year}` : `20${year}`;

      setDobYear(fullYear);
      setDobMonth(month);
      setDobDay(day);

      // Set the date for the DateTimePicker
      setDob(new Date(`${fullYear}-${month}-${day}`));
    }
  }, [CustID_Nr]);

  const handleNext = async () => {
    if (!dobDay || !dobMonth || !dobYear || !country || !addressLine1 || !city || !zipCode) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const dateStr = `${dobDay}/${dobMonth}/${dobYear}`;
    if (!moment(dateStr, 'DD/MM/YYYY', true).isValid()) {
      Alert.alert('Invalid Date', 'Please enter a valid date.');
      return;
    }

    if (!/^\d{4}$/.test(zipCode)) {
      Alert.alert('Invalid Zip Code', 'Please enter a valid 4-digit Zip Code.');
      return;
    }

    const addressString = `${addressLine1}, ${city}, ${country}, ${zipCode}`;

    const personalInfo = {
      CustID_Nr,
      dateOfBirth: `${dobYear}-${dobMonth}-${dobDay}`,
      address: addressString,
    };

    try {
      const response = await axios.patch(`${BASE_URL}/customers/${CustID_Nr}`, personalInfo);
      if (response.status === 200) {
        Alert.alert('Success', 'Personal information updated!', [
          { text: 'OK', onPress: () => navigation.navigate('ContactDetails', { CustID: CustID_Nr }) },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update personal information. Please try again later.');
    }
  };

  return (
    <LinearGradient colors={['#0F0C29', '#16335D','#1E5E98']} style={styles.background}>
      
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
              onChangeText={text => setDobDay(text.replace(/[^0-9]/g, '').padStart(2, '0'))}
              maxLength={2}
              keyboardType="numeric"
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={styles.dateInput}
              placeholder="MM"
              value={dobMonth}
              onChangeText={text => setDobMonth(text.replace(/[^0-9]/g, '').padStart(2, '0'))}
              maxLength={2}
              keyboardType="numeric"
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={styles.dateInput}
              placeholder="YYYY"
              value={dobYear}
              onChangeText={text => setDobYear(text.replace(/[^0-9]/g, '').padStart(4, '0'))}
              maxLength={4}
              keyboardType="numeric"
              placeholderTextColor="#ccc"
            />
          </View>

          {showPicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || dob;
                setDob(currentDate);
                setShowPicker(false);
              }}
            />
          )}

          <DropDownPicker
            open={open}
            value={country}
            items={items}
            setOpen={setOpen}
            setValue={setCountry}
            setItems={setItems}
            placeholder="Select your country"
            style={styles.dropdown}
            placeholderStyle={{ color: '#02457A' }}
            textStyle={{ color: '#02457A' }}
            containerStyle={{ marginBottom: 15 }}
          />

          <TextInput
            style={styles.input}
            placeholder="Address Line 1"
            value={addressLine1}
            onChangeText={setAddressLine1}
            placeholderTextColor="#02457A"
          />

          <TextInput
            style={styles.input}
            placeholder="Address Line 2 (Optional)"
            value={addressLine2}
            onChangeText={setAddressLine2}
            placeholderTextColor="#02457A"
          />

          <View style={styles.rowContainer}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="City"
              value={city}
              onChangeText={setCity}
              placeholderTextColor="#02457A"
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
              placeholderTextColor="#02457A"
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
   
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#02457A',
    zIndex: -1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginTop: 150,
    margin: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  stepSquare: {
    width: 30,
    height: 30,
    backgroundColor: '#80A2BC',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  activeStep: {
    backgroundColor: '#02457A',
  },
  stepText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 18,
    color: '#02457A',
    fontWeight: 'bold',
    marginBottom: 20,
    //Oamogetswe - Changed the shadow of the Subtitle
    fontSize: 18,
    color: '#02457A',
    fontWeight: 'bold',
    marginBottom: 20,
    textShadowColor: '#888',
    textShadowOffset: { width: 1, height: 0.5 }, 
    textShadowRadius: 1, 
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F8F8F8',
    fontSize: 14,
    marginBottom: 15,
    color: '#02457A',
    borderWidth: 2,
    borderColor: "#02457A",
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#02457A",
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateInput: {
    height: 45,
    width: '20%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F8F8F8',
    fontSize: 14,
    textAlign: 'center',
    color: '#02457A',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfInput: {
    width: '48%',
  },
  button: {
    backgroundColor: '#02457A',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 60,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PersonalInfoForm;
