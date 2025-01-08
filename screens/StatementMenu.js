import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const StatementMenu = ({ route }) => {
  
  const [selectedDateRange, setSelectedDateRange] = useState('1 Month'); // Default selected range
  const [email, setEmail] = useState('');
  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const [viewStatement, setViewStatement] = useState(false);
  const navigation = useNavigation();

  // Function to validate email
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // Function to handle sending the email
  const handleSendEmail = () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid email address');
      return;
    }
    // Logic for sending the email with the statement
    Alert.alert('Statement sent to email');
  };

  // Function to handle viewing the statement
  const handleViewStatement = () => {
    Alert.alert(`Viewing statement for Savings account, Date range: ${selectedDateRange}`);
    // Logic for viewing the statement
  };

  // Function to handle PDF statement download
  const handleGetPDFStatement = () => {
    Alert.alert(`Downloading PDF statement for Savings account, Date range: ${selectedDateRange}`);
    // Logic for downloading PDF
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Statement for Savings Account</Text>

      {/* Date Range Selection */}
      <Text style={{ marginBottom: 10 }}>Select Date Range:</Text>
      <RadioButton.Group
        onValueChange={value => setSelectedDateRange(value)}
        value={selectedDateRange}
      >
        <View style={{ flexDirection: 'row' }}>
          <RadioButton value="1 Month" />
          <Text>Last 1 Month</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <RadioButton value="3 Months" />
          <Text>Last 3 Months</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <RadioButton value="6 Months" />
          <Text>Last 6 Months</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <RadioButton value="12 Months" />
          <Text>Last 12 Months</Text>
        </View>
      </RadioButton.Group>

      {/* Options to choose between View Statement or Send via Email */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Options:</Text>
        
        {/* View Statement Button */}
        <TouchableOpacity
          onPress={() => {
            setViewStatement(true);
            setIsEmailSelected(false); // Disable email option when viewing statement
            handleViewStatement();
          }}
        >
          <Button title="View Statement" />
        </TouchableOpacity>

        {/* Get PDF Statement Button */}
        <TouchableOpacity
          onPress={() => {
            setViewStatement(true);
            setIsEmailSelected(false); // Disable email option when downloading PDF
            handleGetPDFStatement();
          }}
        >
          <Button title="Get PDF Statement" />
        </TouchableOpacity>

        {/* Send via Email Button */}
        <TouchableOpacity
          onPress={() => {
            setIsEmailSelected(true); // Enable email input
            setViewStatement(false); // Disable statement viewing when sending via email
          }}
          style={{ marginTop: 10 }}
        >
          <Button title="Send via Email" />
        </TouchableOpacity>
      </View>

      {/* If Send via Email is selected, show email input field */}
      {isEmailSelected && (
        <View style={{ marginTop: 20 }}>
          <TextInput
            style={{ borderBottomWidth: 1, marginBottom: 20 }}
            placeholder="Enter email address"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Button title="Send Statement" onPress={handleSendEmail} />
        </View>
      )}
    </View>
  );
};

export default StatementMenu;