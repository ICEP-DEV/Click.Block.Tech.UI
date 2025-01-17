import React, { useState } from 'react';
import { View, Text, Alert, TextInput, StyleSheet } from 'react-native';
import { RadioButton, Button } from 'react-native-paper'; 
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const StatementMenu = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('1 Month');
  const [email, setEmail] = useState('');
  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const navigation = useNavigation();

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleSendEmail = () => {
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    Alert.alert('Success', `Statement sent to ${email}`);
  };

  const handleViewStatement = () => {
    Alert.alert('View Statement', `Viewing statement for ${selectedDateRange}`);
  };

  const handleGetPDFStatement = () => {
    Alert.alert('Download PDF', `Downloading PDF statement for ${selectedDateRange}`);
  };

  return (
    <LinearGradient
      colors={['#0F0C29', '#16335D', '#1E5E98']}
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Statement for Savings Account</Text>

        {/* Date Range Selection */}
        <Text style={styles.subheading}>Select Date Range:</Text>
        <RadioButton.Group
          onValueChange={(value) => setSelectedDateRange(value)}
          value={selectedDateRange}
        >
          {['1 Month', '3 Months', '6 Months', '12 Months'].map((range) => (
            <View key={range} style={styles.radioButtonContainer}>
              <RadioButton value={range} />
              <Text>{`Last ${range}`}</Text>
            </View>
          ))}
        </RadioButton.Group>

        {/* Options */}
        <View style={styles.options}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleViewStatement}
          >
            View Statement
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleGetPDFStatement}
          >
            Get PDF Statement
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => setIsEmailSelected(true)}
          >
            Send via Email
          </Button>
        </View>

        {/* Email Input */}
        {isEmailSelected && (
          <View style={styles.emailContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Button mode="contained" style={styles.button} onPress={handleSendEmail}>
              Send Statement
            </Button>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    padding: 20,
    flex: 1,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    color: '#fff',
  },
  subheading: {
    marginBottom: 10,
    color: '#fff',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  options: {
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
  },
  emailContainer: {
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
});

export default StatementMenu;
