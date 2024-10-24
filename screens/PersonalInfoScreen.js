import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../API/API'; // Make sure the base URL is correctly defined
import storage from '../async_storage'; // Import AsyncStorage functions for retrieving custID_Nr

const PersonalInfoScreen = () => {
  const [customerData, setCustomerData] = useState(null); // State to hold customer data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Fetch customer details when the component mounts
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const custID_Nr = await storage.getItem('CustID_Nr'); // Retrieve customer ID from AsyncStorage
        if (!custID_Nr) {
          throw new Error('Customer ID not found. Please log in again.');
        }

        const response = await axios.get(`${BASE_URL}get_customer/${custID_Nr}`); // Fetch customer details from backend
        setCustomerData(response.data); // Store fetched data in state
        setLoading(false); // Stop loading spinner
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setError('Failed to load customer details. Please try again.');
        setLoading(false); // Stop loading spinner in case of error
      }
    };

    fetchCustomerData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MY DETAILS</Text>
      <Text style={styles.subHeader}>Contact our support centre to update the details below.</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Fullname:</Text>
        <TextInput 
          style={styles.input} 
          value={`${customerData.FirstName} ${customerData.LastName}`} 
          editable={false} 
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput 
          style={styles.input} 
          value={customerData.Email || ''} 
          editable={false} 
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Contact Details:</Text>
        <TextInput 
          style={styles.input} 
          value={customerData.PhoneNumber || ''} 
          editable={false} 
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Date of Birth:</Text>
        <TextInput 
          style={styles.input} 
          value={customerData.DateOfBirth || ''} 
          editable={false} 
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Residential Address:</Text>
        <TextInput 
          style={styles.input} 
          value={customerData.Address || ''} 
          editable={false} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PersonalInfoScreen;
