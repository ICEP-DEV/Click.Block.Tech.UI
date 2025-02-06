import React, { useState } from 'react';
import { 
  View, Text, Button, TextInput, Alert, TouchableOpacity, 
  ScrollView, PermissionsAndroid, Platform 
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { Modal } from 'react-native';

import { BASE_URL } from '../API/API';
const storage = require('../async_storage');

const StatementMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);  // Move this inside the component
  const [selectedDateRange, setSelectedDateRange] = useState('1 Month');
  const [email, setEmail] = useState('');
  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const [viewStatement, setViewStatement] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [accountName, setAccountName] = useState('');
  const [accountID, setAccountID] = useState('');

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const calculateStartDate = (range) => {
    const today = new Date();
    switch (range) {
      case '1 Month': return new Date(today.setMonth(today.getMonth() - 1));
      case '3 Months': return new Date(today.setMonth(today.getMonth() - 3));
      case '6 Months': return new Date(today.setMonth(today.getMonth() - 6));
      case '12 Months': return new Date(today.setMonth(today.getMonth() - 12));
      default: return today;
    }
  };

  const fetchTransactions = async (range) => {
    try {
      const accID = await storage.getItem('accountID');
      const firstName = await storage.getItem('userName');
      const lastName =  await storage.getItem('userSurname');
      const accName = firstName + ' ' + lastName;

      setAccountID(accID || 'N/A');
      setAccountName(accName || 'N/A');
  
      const startDate = calculateStartDate(range).toISOString().split('T')[0];
      const endDate = new Date().toISOString().split('T')[0];
      const response = await axios.get(`${BASE_URL}/generate-statement?accountId=${accID}&startDate=${startDate}&endDate=${endDate}`);
      
      // Ensure correct field mapping
      const formattedTransactions = response.data.map(txn => ({
        date: txn.TransactionDate,
        type: txn.TransactionType,
        amount: txn.TransactionAmount,
        status: txn.Status,
      }));
  
      setTransactions(formattedTransactions);
      console.log('Fetched transactions:', formattedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      Alert.alert('Error', 'Failed to fetch transactions.');
    }
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to download PDF',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const generatePDF = async () => {
    const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; }
          table {width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 0px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Bank Statement</h1>
        <p><strong>Account Holder:</strong> ${accountName}</p>
        <p><strong>Account Number:</strong> ${accountID}</p>
        <p><strong>Date Range:</strong> Last ${selectedDateRange}</p>
        <table>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
          ${transactions.map(txn => `
            <tr>
              <td>${txn.date || 'N/A'}</td>
              <td>${txn.type || 'N/A'}</td>
              <td>${txn.amount || 'N/A'}</td>
              <td>${txn.status || 'N/A'}</td>
            </tr>
          `).join('')}
        </table>
      </body>
    </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      Alert.alert('PDF Generated', `PDF saved to ${uri}`);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF.');
    }
  };

  const renderStatement = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}>
        <View style={{
          width: '90%', backgroundColor: 'white', padding: 20,
          borderRadius: 10, elevation: 5
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Account Holder: {accountName}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Account Number: {accountID}</Text>
          <Text style={{ fontSize: 16, marginVertical: 10 }}>Date Range: Last {selectedDateRange}</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Transactions:</Text>

          <ScrollView style={{ maxHeight: 300 }}>
            {transactions.length > 0 ? transactions.map((txn, index) => (
              <View key={index} style={{ marginVertical: 10 }}>
                <Text>Date: {txn.date || 'N/A'}</Text>
                <Text>Type: {txn.type || 'N/A'}</Text>
                <Text>Amount: {txn.amount || 'N/A'}</Text>
                <Text>Status: {txn.status || 'N/A'}</Text>
              </View>
            )) : (
              <Text>No transactions available for this period.</Text>
            )}
          </ScrollView>

          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Statement for Savings Account</Text>

      <Text style={{ marginBottom: 10 }}>Select Date Range:</Text>
      <RadioButton.Group 
        onValueChange={(value) => {
          setSelectedDateRange(value);
          fetchTransactions(value);
        }} 
        value={selectedDateRange}
      >
        {['1 Month', '3 Months', '6 Months', '12 Months'].map((range) => (
          <View key={range} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton value={range} />
            <Text>{`Last ${range}`}</Text>
          </View>
        ))}
      </RadioButton.Group>

      <Button title="Download PDF" onPress={generatePDF} />
      <Button title="View Statement" onPress={() => setModalVisible(true)} />

      {renderStatement()}

      <TouchableOpacity onPress={() => { setIsEmailSelected(true); setViewStatement(false); }} style={{ marginTop: 10 }}>
        <Button title="Send via Email" />
      </TouchableOpacity>

      {isEmailSelected && (
        <View style={{ marginTop: 20 }}>
          <TextInput
            style={{ borderBottomWidth: 1, marginBottom: 20 }}
            placeholder="Enter email address"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Button title="Send Statement" onPress={() => Alert.alert('Feature not implemented yet')} />
        </View>
      )}
    </View>
  );
};

export default StatementMenu;
