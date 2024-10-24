import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../API/API';
import storage from '../async_storage';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons for back arrow

const PersonalInfoScreen = ({ navigation }) => {
  const [customerData, setCustomerData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const custID_Nr = await storage.getItem('CustID_Nr');
        if (!custID_Nr) {
          throw new Error('Customer ID not found. Please log in again.');
        }

        const response = await axios.get(`${BASE_URL}get_customer/${custID_Nr}`);
        setCustomerData(response.data); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setError('Failed to load customer details. Please try again.');
        setLoading(false);
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
      {/* Full-height header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>MY DETAILS</Text>
      </View>

      <View style={styles.contentContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  // Full vertical header style
  header: {
    backgroundColor: '#002f66',
    width: '100%', // Full width
    height: '15%', // Adjust height as needed (30% of screen height)
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Sticks the header at the top
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Ensures header stays on top
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,  // Adjust top to ensure it's not too close to the top edge
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  contentContainer: {
    marginTop: '40%',  // Adds space to avoid overlapping with the header
    paddingHorizontal: 20,
  },
  subHeader: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    color: '#333333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PersonalInfoScreen;





 
