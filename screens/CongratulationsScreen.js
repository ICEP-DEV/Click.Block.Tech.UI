import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { TextInput, Button } from 'react-native-paper';
import { BASE_URL } from '../API/API';

export default function CongratulationsScreen() {
  const navigation = useNavigation();
  const [customerDetails, setCustomerDetails] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const storage = require('../async_storage');
  const handleSubmit = () => {
    navigation.navigate('Home'); // Navigate to LoginOrSubmit screen
  };

  useEffect(() => {
    
    const fetchCardAndCustomerData = async () => {
      const accountID = await storage.getItem('accountID');
    
      try {
       
        const response = await axios.get(`${BASE_URL}/bankcards/${accountID}/customer`);
        const data = response.data;

        setCustomerDetails({
          firstName: data.FirstName,
          lastName: data.LastName,
        });

        setCardDetails({
          cardNumber: data.CardNumber,
          cvv: data.CVV,
          expirationDate: data.ExpirationDate,
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching card or customer data:', error);
        setLoading(false);
      }
    };

    fetchCardAndCustomerData();
  }, []);

  // Format the expiration date
  const formatExpirationDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    return `${month}/${year}`;
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  const handleNext = () => {
    navigation.navigate('Home');
  }
  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.card}>
      <Text style={styles.greeting1}>CONGRATULATIONS!</Text>
      <Text style={styles.modalTitle}>On receiving your first bank card! we are thrilled to welcome you to Nexis Bank and are excited to support 
        you on your financial journey.</Text>
            <Image
              source={require('../assets/ManageCard/card_p.png')}
              style={styles.updatedModalCardImage}
            />
            <Text style={styles.detailLabel}>Debit Card</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Account Holder</Text>
              <View style={styles.updatedDetailValueContainer}>
                <Text style={styles.updatedDetailValue}>
                  {customerDetails
                    ? `${customerDetails.firstName} ${customerDetails.lastName}`
                    : 'Loading...'}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Card Number</Text>
              <View style={styles.updatedDetailValueContainer}>
                <Text style={styles.updatedDetailValue}>
                  {cardDetails ? cardDetails.cardNumber : 'Loading...'}
                </Text>
              </View>
            </View>

            <View style={styles.detailRowHalf}>
              <View style={styles.halfWidth}>
                <Text style={styles.detailLabel}>CVV</Text>
                <View style={styles.updatedDetailValueContainer}>
                  <Text style={styles.updatedDetailValue}>
                    {cardDetails ? cardDetails.cvv : 'Loading...'}
                  </Text>
                </View>
              </View>
              <View style={styles.halfWidth}>
                <Text style={styles.detailLabel}>Expiry Date</Text>
                <View style={styles.updatedDetailValueContainer}>
                  <Text style={styles.updatedDetailValue}>
                    {cardDetails
                      ? formatExpirationDate(cardDetails.expirationDate)
                      : 'Loading...'}
                  </Text>
                  </View>
                  </View>
                  </View>
                  <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.loginButtonText}>Continue</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2E5B9A',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
  },
  modalTitle:{
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#02457A',
    textShadowColor: '#888',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    padding: 60,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    maxHeight: 700
  },
  checkIcon: {
    width: 60,  // Adjust the width as needed
    height: 60, // Adjust the height as needed
    marginBottom: 20, // Space between icon and text
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: '#02457A', // Optional: Adjust the text color for better contrast
  },
  background: {
    position: 'absolute',
    top: 0,
    // right:0,
    left:0,
    bottom: 0,
    width: '120%',
    height: '40%',
    backgroundColor: '#002f66', // This can be changed to an image if needed
    zIndex: -1, // Ensure it is behind other elements
  },
  submitButton: {
    backgroundColor: '#02457A',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    alignSelf: 'center', // This will center the button horizontally
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  updatedModalCardImage: {
    width: '80%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  updatedDetailValueContainer: {
    borderWidth: 1,
    borderColor: '#02457A',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F5F5F5',
    width: '100%',
    marginBottom: 10,
  },
  updatedDetailValue: {
    fontSize: 16,
    color: '#02457A',
  },
  updatedBackButton: {
    backgroundColor: '#02457A',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  updatedBackButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailRow: {
    width: '100%',
    marginBottom: 15,
  },
  detailRowHalf: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfWidth: {
    width: '48%',
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 5,
     color: '#02457A',
    textShadowColor: '#888'
  },
  greeting1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#02457A',
    textShadowColor: '#888',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
});
