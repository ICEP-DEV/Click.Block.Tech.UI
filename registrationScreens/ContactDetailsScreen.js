import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import axios from 'axios'; 
import { BASE_URL } from '../API/API';

const API_URL = `${BASE_URL}/customers`; 

const ContactDetailsScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const route = useRoute();  // Get the route object to access params
  const { CustID } = route.params; // Destructure CustID_Nr from route.params

  // API call to update customer step
  const updateCustomerStep = async (customerData) => {
    try {
      const response = await axios.patch(`${API_URL}/${customerData.CustID_Nr}`, customerData);
      console.log('Update successful:', response.data);
      return response;
    } catch (error) {
      console.error('Error updating customer:', error.response.data);
      throw error.response.data;
    }
  };

  // Handle the "Next" button press
  const handleNext = async () => {
    setIsSendingOtp(true);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      isSendingOtp(false);
      return;
    }

    const customerData = {
      CustID_Nr: CustID,
      Email: email,
    };

    console.log('Customer data being submitted:', customerData);

    try {
      const response = await updateCustomerStep(customerData); // Call the API to update customer
      console.log('API response:', response.stepText);

    
      if (response.status === 200) {
        setIsSendingOtp(false);
          Alert.alert('Success', 'Email sent. Check otp', [
              { text: 'OK', onPress: () => navigation.navigate('VerifyEmail', { Email: email, CustID_Nr: CustID}) }
          ]);
      }
      
     
    } catch (error) {
      alert('Failed to update customer: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#0F0C29', '#16335D',"#1E5E98"]} style={styles.gradient}>
        <View style={styles.formContainer}>
          <View style={styles.progressContainer}>
            {/* Step 1 - Inactive */}
            <View style={[styles.progressSquare, styles.activeSquare]}>
              <Text style={styles.activeText}>1</Text>
            </View>
            {/* Step 2 - Active */}
            <View style={[styles.progressSquare, styles.activeSquare]}>
              <Text style={styles.activeText}>2</Text>
            </View>
            {/* Step 3 - Inactive */}
            <View style={styles.progressSquare}>
              <Text style={styles.activeText}>3</Text>
            </View>
            {/* Step 4 - Inactive */}
            <View style={styles.progressSquare}>
              <Text style={styles.activeText}>4</Text>
            </View>
          </View>

          {/* OPM - Changing the title detail and style */}
          <Text style={styles.title}>CONTACT DETAILS</Text>
          <Text style={styles.subtitle}>Verify your email account</Text>

          <TextInput
            label="Enter your email address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none" // To prevent auto-capitalizing the first letter of email
          />
          {
            isSendingOtp ? (
              <LottieView style={{ width: 100, height: 100,marginLeft: 115, marginBottom: 45 }} source={require('../assets/lottie_animation_icons/loading_anim_icon.json')} autoPlay loop />
            ) : (<Button mode="contained" onPress={handleNext} style={styles.button}>
              Next
            </Button>)
          }
          
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progressSquare: {
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
  activeSquare: {
    backgroundColor: '#003366',
  },
  inactiveText: {
    color: '#003366',
    fontWeight: 'bold',
  },
  activeText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#003366',
    marginBottom: 10,
    textShadowColor: '#888',
    textShadowOffset: { width: 1, height: 0.5 }, //Oamogetswe - Changed the shadow of the name
    textShadowRadius: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#02457A',
    marginBottom: 20,
    textAlign: 'center',
    
  },
  input: {
    marginBottom: 20,
     borderColor: "#02457A",
  },
  button: {
    backgroundColor: '#003366',
    marginTop: 10,
  },
});

export default ContactDetailsScreen;
