import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Modal,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width } = Dimensions.get('window');
const api = 'http://192.168.0.27:5000/api/';



export default function ManageCard() {
  const [isCardDeactivated, setIsCardDeactivated] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  const toggleCardDeactivation = () => {
    setIsCardDeactivated((prev) => !prev);
  };

  const cardID = 2;

  useEffect(() => {
    const fetchCardAndCustomerData = async () => {
      try {
        const response = await axios.get(`${api}bankcards/${cardID}/customer`);
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
  }, [cardID]);

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#02457A" barStyle="light-content" />
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>MANAGE CARD</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image
            source={require('../assets/ManageCard/card_p.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardType}>Debit Card</Text>

          {/* Card Options */}
          <TouchableOpacity style={styles.option} onPress={toggleModal}>
            <Text style={styles.optionText}>View card details</Text>
          </TouchableOpacity>

          <View style={styles.option}>
            <Text style={styles.optionText}>Deactivate your card</Text>
            <Switch
              value={isCardDeactivated}
              onValueChange={toggleCardDeactivation}
              thumbColor={isCardDeactivated ? 'white' : '#02457A'}
              trackColor={{ false: '#ccc', true: '#02457A' }}
              style={styles.switch}
            />
          </View>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Card Settings</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Card Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.updatedModalContent}>
            <Text style={styles.modalTitle}>CARD DETAILS</Text>
            <Image
              source={require('../assets/ManageCard/card_p.png')}
              style={styles.updatedModalCardImage}
            />
            <Text style={styles.modalCardType}>Debit Card</Text>

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

            <TouchableOpacity
              style={styles.updatedBackButton}
              onPress={toggleModal}
            >
              <Text style={styles.updatedBackButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02457A',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 90, // Add padding to account for BottomNavigation height
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjust to space-between
    padding: 16,
    backgroundColor: '#02457A',
    height: 60,
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    alignItems: 'center',
  },
  cardImage: {
    width: width - 32,
    height: (width - 32) * 0.63,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  cardType: {
    fontSize: 18,
    marginBottom: 24,
    color: '#02457A',
    fontWeight: 'bold',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    color: '#02457A',
    fontSize: 16,
    fontWeight: '600',
  },
  switch: {
    transform: [{ scale: 0.8 }],
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  updatedModalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    width: '100%',
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
    color: '#666',
    marginBottom: 5,
  },
});

