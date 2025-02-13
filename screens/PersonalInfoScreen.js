import React, { useState, useEffect } from 'react'; 
import {View, Text, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
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
        <Text style={styles.headline}>Personal Information : </Text>
         
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Full name(s):</Text>
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
          <Text style={styles.label}>Identity Number:</Text>
          <TextInput
            style={styles.input}
            value={customerData.CustID_Nr || ''}
            editable={false}
          />
        </View>

        <Text style={styles.resheadline}>Residential Address:</Text>

        <View style={styles.resContainer}>

           {/* OPM - Country */}
           <TextInput
            style={styles.resinput}
            value={customerData.Address.split(', ')[2]} 
            editable={false}
          />

          {/* OPM - Address line 1 */}
          <TextInput
            style={styles.resinput}
            value={customerData.Address.split(', ')[0]} 
            editable={false}
          />

          {/* OPM - City*/}
          <TextInput
            style={styles.resinput}
            value={customerData.Address.split(', ')[1]}
            editable={false}
          />

          {/* OPM - ZipCode*/}
          <TextInput
            style={styles.resinput}
            value={customerData.Address.split(', ')[3]}
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
    height: '7.4%', //OPM - Adjust height as needed (30% of screen height)
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Sticks the header at the top
    top: 25,
    left: 0,
    right: 0,
    zIndex: 1, // Ensures header stays on top
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'BebasNeue_400Regular', // OPM - Apply the font
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  contentContainer: {
    marginTop: '25%',  // Adds space to avoid overlapping with the header
    paddingHorizontal: 20,
  },
  subHeader: {
    fontSize: 14, 
    color: '#02457A', //OPM - Changed the text color to match the prototype
    fontWeight: 'Regular',
    marginBottom: 15,
    textAlign: 'left',
    //OPM - Adding shadow to the sub-heading
    textShadowColor: 'rgba(0, 0, 0, 0.4)', 
    textShadowOffset: { width: 0, height: 0.1 }, 
    textShadowRadius: 1.5, 
  },
  headline:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#02457A',
    marginBottom: 10,
     //OPM - Adding shadow to the sub-heading
     textShadowColor: 'rgba(0, 0, 0, 0.4)', 
     textShadowOffset: { width: 0.8, height: 0.5 }, 
     textShadowRadius: 1.5, 
  },

  //OPM - Adding the residential style for residence category
  resheadline:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#02457A',
    margin: 0,
    marginTop:10,
    marginBottom: 15,
     //OPM - Adding shadow to the sub-heading
     textShadowColor: 'rgba(0, 0, 0, 0.4)', 
     textShadowOffset: { width: 0.8, height: 0.5 }, 
     textShadowRadius: 1.5, 
  },
  fieldContainer: {
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  //OPM - Adding the residential style for residence category
  resContainer:{
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#02457A',
    marginBottom: 10,
    marginLeft: 10,
    //OPM - Adding shadow to the sub-heading
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0.2, height: 0.2 },
    textShadowRadius: 1.5, // Blur: 4
  },
  input: {
    fontSize: 15,
    fontWeight: 'regular',
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    borderColor: '#02457A',
    borderWidth: 2.5,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    color: '#02457A',
  },
  resinput: {
    fontSize: 15,
    fontWeight: 'regular',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 18,
    padding: 5,
    borderColor: '#02457A',
    borderWidth: 2.5,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    color: '#02457A',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PersonalInfoScreen;
 
