import React, { useState, useEffect } from 'react';
import { View, Text,Button, TextInput, TouchableOpacity,ToastAndroid, SafeAreaView, StyleSheet, StatusBar, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import { BASE_URL } from '../API/API';
import useLocation from '../hooks/useLocation';
import useLocationStore from '../stores/location_store';

export default function CreatePanicPin({navigation}) {
    const {latitude, longitude, errMsg} = useLocation();
    const [confirmedPIN, setConfirmedPIN] = useState('');
    const [newPIN, setNewPin] = useState('');
    const [accNumber, setAccountNumber] = useState('');
    const [custID_Nr, setCustID_Nr] = useState('');
    const storage = require('../async_storage');
    const isPermissionGranted = useLocationStore((state) => state.isPermissionGranted);
    const showToastMsg= (msg) => {
        ToastAndroid.showWithGravity(
          msg,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );}
       
        useEffect(() => {
          const fetchCustID = async () => {
              try {
                const storedAccNumber = await storage.getItem('accountNumber')
                const storedCustID = await storage.getItem('CustID_Nr'); // Get the custID_Nr from storage
                if(isPermissionGranted){
                  console.log(isPermissionGranted);
                  if (storedCustID) {
                    setAccountNumber(storedAccNumber);
                    setCustID_Nr(storedCustID); // Set customer ID in state
                  } else {
                    Alert.alert('Error', 'Customer ID not found. Please log in again.');
                  }
                }else{
                  console.log(isPermissionGranted);
                    showToastMsg('You need to grant us permission to use your location before creating an Alert PIN');
                 }
                  
               
              } catch (error) {
                console.error('Failed to fetch CustID_Nr from storage:', error);
                Alert.alert('Error', 'Unable to retrieve customer ID.');
              }
            
          };
      
          fetchCustID();
        }, []);
      
        // Handle create Alert pin
        const handleSubmit = async () => {
         
            if (!custID_Nr) {
              showToastMsg('Unable to create Alert PIN, Please check your network');
              console.log('Customer ID is required.')
              return;
            }
          
            if (!newPIN || !confirmedPIN) {
              showToastMsg('Please enter your Alert Pin and confirm!');
              return;
            }
          
            if (confirmedPIN !== newPIN) {
              showToastMsg('Your new Pin do not match!');
              return;
            }
          
            if (confirmedPIN.length !== 5 || newPIN.length !== 5) {
              showToastMsg('Your PIN must be 5 digits');
              return;
            }
          else{
                //comparing the new PIN with the customer existing Login PIN
              try{
                const response = await axios.get(`${BASE_URL}compare_PIN/${accNumber}/${newPIN}`,);
                const userData = response.data;
                //check if the user data is not null
                if (userData) {
                  console.log('inside');
                  showToastMsg('Your Alert PIN must not be the same as your Remote PIN.');
                } else {
                  handlCreatePIN();
                }
              }catch(err){
                console.error('Error fetching data:', err.response.data);
                Alert.alert('Error', 'An error occurred while comparing PINs. Please try again.');
              }
          }
         
        };
      const handlCreatePIN = async ()=>{
        try {
          // Prepare data to send to the backend
          const updateData = {
            "alertPin": `${newPIN}`
          }
    
          // Send PUT request to the backend
          const response = await axios.put(`${BASE_URL}create_AlertPIN/${custID_Nr}`, updateData);
    
          if (response.status === 200) {
            Alert.alert('Success', 'Alert PIN created successfully');

            navigation.goBack(); // Go back to the previous screen
          } else {
            Alert.alert('Error', 'Failed to update PIN.');
          }
        } catch (error) {
          console.error('Error updating PIN:', error);
          Alert.alert('Error', 'An error occurred while updating the PIN.');
        }
      }
  
   
  return (
    <SafeAreaView style={styles.container}>
      {/* Ensure StatusBar is configured like in CardSettings */}
      <StatusBar backgroundColor="#02457A" barStyle="light-content" />
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Create Alert PIN</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Scrollable Card Content */}
        <ScrollView contentContainerStyle={styles.cardContainer}>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder={'Enter your new 5-digit Alert PIN'}
              secureTextEntry
              keyboardType="numeric"
              maxLength={5}
              onChangeText={setNewPin}
              
              
            />
            <TextInput
              style={styles.input}
              placeholder={'Confirm your new 5-digit Alert PIN'}
              secureTextEntry
              keyboardType="numeric"
              maxLength={5}
              onChangeText={setConfirmedPIN}

            />

            {/* Tips Section */}
            <View style={styles.tipsBox}>
              <Text style={styles.tipsText}>Tips for a secure PIN:</Text>
              <Text>Use a complex PIN,
                    Avoid sequential numbers (e.g., 12345),
                    Use a unique PIN for each account,</Text>
            </View>

            {/* Submit Button */}
            {
              isPermissionGranted ? (<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Create Alert PIN</Text>
              </TouchableOpacity>) :(<TouchableOpacity style={styles.disabledSubmitButton} onPress={null}>
                <Text style={styles.submitButtonText}>Create Alert PIN</Text>
              </TouchableOpacity>)
            }
          </View>
        </ScrollView>
      </View>
      
      {/* Bottom Navigation */}
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02457A', // Blue background for status bar and header
  },
  content: {
    flex: 1,
    backgroundColor: 'white', // White background for the body content
    paddingBottom: 90, // To account for BottomNavigation height
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjust to space-between
    padding: 16,
    backgroundColor: '#02457A', // Blue background for the header
    height: 60,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 24, // Placeholder for aligning the title in the center
  },
  cardContainer: {
    padding: 30,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white', // Card's background
    borderRadius: 16, // Rounded corners
    padding: 30,
    shadowColor: '#000', // Shadow properties
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4, // Android shadow
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fafafa', // Soft background for input fields
  },
  tipsBox: {
    backgroundColor: '#F5F5F5', // Light grey background for the tips box
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  tipsText: {
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  tip: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  submitButton: {
    backgroundColor: '#02457A',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledSubmitButton: {
    backgroundColor: '#808080',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
