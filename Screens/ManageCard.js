import React, { useState } from 'react';
import { View, Text, Image, Switch, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, ScrollView, Modal, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from './BottomNavigation';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const { width } = Dimensions.get('window');

export default function ManageCard() {
  const [isCardDeactivated, setIsCardDeactivated] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation(); // Access the navigation prop

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  const toggleCardDeactivation = () => {
    setIsCardDeactivated(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#02457A" barStyle="light-content" />
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back pressed')}>
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
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>CARD DETAILS</Text>
            <Image
              source={require('../assets/ManageCard/card_p.png')}
              style={styles.modalCardImage}
            />
            <Text style={styles.modalCardType}>Debit Card</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Account Holder</Text>
              <View style={styles.detailValueContainer}>
                <Text style={styles.detailValue}>Mr Jonathan Moatshe</Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Card Number</Text>
              <View style={styles.detailValueContainer}>
                <Text style={styles.detailValue}>1234 5678 9101 8765</Text>
              </View>
            </View>
            
            <View style={styles.detailRowHalf}>
              <View style={styles.halfWidth}>
                <Text style={styles.detailLabel}>CVV</Text>
                <View style={styles.detailValueContainer}>
                  <Text style={styles.detailValue}>123</Text>
                </View>
              </View>
              <View style={styles.halfWidth}>
                <Text style={styles.detailLabel}>Expiry Date</Text>
                <View style={styles.detailValueContainer}>
                  <Text style={styles.detailValue}>10/28</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.backButton} onPress={toggleModal}>
              <Text style={styles.backButtonText}>Back</Text>
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
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#02457A',
    marginBottom: 20,
  },
  modalCardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  modalCardType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#02457A',
    marginBottom: 20,
  },
  detailRow: {
    width: '100%',
    marginBottom: 15,
  },
  detailRowHalf: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  detailValueContainer: {
    borderWidth: 1,
    borderColor: '#02457A',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  detailValue: {
    fontSize: 16,
    color: '#02457A',
    fontWeight: '600',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
