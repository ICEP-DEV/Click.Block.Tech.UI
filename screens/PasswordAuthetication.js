import React, { useState } from 'react';
import { 
  View, Text, Button, TextInput, Alert, TouchableOpacity, 
  PermissionsAndroid, Platform 
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const storage = require('../async_storage');
import { BASE_URL } from '../API/API';

const StatementMenu = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('1 Month');
  const [email, setEmail] = useState('');
  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const [viewStatement, setViewStatement] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [accountName, setAccountName] = useState('');

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
      const accName = await storage.getItem('accountName'); 
      setAccountName(accName || 'N/A');

      const startDate = calculateStartDate(range).toISOString().split('T')[0];
      const endDate = new Date().toISOString().split('T')[0];
      const response = await axios.get(`${BASE_URL}/generate-statement?accountId=${accID}&startDate=${startDate}&endDate=${endDate}`);
      
      setTransactions(response.data);
      console.log('Fetched transactions:', response.data);
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
    if (!(await requestStoragePermission())) {
      Alert.alert('Permission Denied', 'Storage permission is required to download the PDF.');
      return;
    }

    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Bank Statement</h1>
          <p><strong>Account Name:</strong> ${accountName}</p>
          <p><strong>Date Range:</strong> Last ${selectedDateRange}</p>
          <table>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
            ${transactions.map(txn => `
              <tr>
                <td>${txn.date || 'N/A'}</td>
                <td>${txn.details || 'No details'}</td>
                <td>${txn.amount || 'N/A'}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;

    try {
      const options = {
        html: htmlContent,
        fileName: `Statement_${selectedDateRange.replace(" ", "_")}`,
        directory: 'Download',
      };

      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('Download Complete', `PDF saved to ${file.filePath}`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF.');
    }
  };

  const downloadAndOpenPDF = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + "statement.pdf";

      // Generate PDF content
      const htmlContent = `
        Account Name: ${accountName}\n
        Date Range: Last ${selectedDateRange}\n
        Transactions:\n
        ${transactions.map(txn => `${txn.date || 'N/A'} - ${txn.details || 'No details'} - ${txn.amount || 'N/A'}`).join('\n')}
      `;

      await FileSystem.writeAsStringAsync(fileUri, htmlContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      console.log("File saved to:", fileUri);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Sharing not available", "PDF saved at: " + fileUri);
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

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

      <TouchableOpacity onPress={generatePDF}>
        <Button title="Generate PDF" />
      </TouchableOpacity>

      <TouchableOpacity onPress={downloadAndOpenPDF} style={{ marginTop: 10 }}>
        <Button title="Download & Open PDF" />
      </TouchableOpacity>

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
