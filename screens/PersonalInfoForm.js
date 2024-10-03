import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';

const PersonalInfoForm = ({ navigation }) => {
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

  const handleNext = () => {
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

    Alert.alert('Info', 'Personal information saved!', [
      { text: 'OK', onPress: () => navigation.navigate('ContactDetails') }
    ]);
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
            textStyle={{ color: '#02457A' }}
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
    width: '100%',
    alignItems: 'center',
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
    borderRadius: 5,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeStep: {
    backgroundColor: '#001F54',
  },
  stepText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#02457A',
    marginBottom: 20,
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
    padding :20,
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
    color: '#02457A',
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
