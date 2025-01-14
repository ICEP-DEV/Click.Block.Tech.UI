import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UpdateLimit({ navigation }) {
  const [withdrawalLimit, setWithdrawalLimit] = useState('');
  const [onlinePaymentLimit, setOnlinePaymentLimit] = useState('');
  const [cardMachineLimit, setCardMachineLimit] = useState('');

  const handleUpdateLimits = () => {
    if (!withdrawalLimit || !onlinePaymentLimit || !cardMachineLimit) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    // Perform the update logic here
    Alert.alert('Success', 'Daily limits have been updated.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#02457A" barStyle="light-content" />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Update Daily Limits</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Scrollable Card Content */}
        <ScrollView contentContainerStyle={styles.cardContainer}>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder="Enter Withdrawal Limit"
              keyboardType="numeric"
              value={withdrawalLimit}
              onChangeText={setWithdrawalLimit}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Online Payment Limit"
              keyboardType="numeric"
              value={onlinePaymentLimit}
              onChangeText={setOnlinePaymentLimit}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Card Machine Purchase Limit"
              keyboardType="numeric"
              value={cardMachineLimit}
              onChangeText={setCardMachineLimit}
            />

            {/* Tips Section */}
            <View style={styles.tipsBox}>
              <Text style={styles.tipsText}>Tips for Setting Limits:</Text>
              <Text>Set realistic limits based on your spending habits.</Text>
              <Text>Consider leaving a buffer for unexpected expenses.</Text>
              <Text>Regularly review and adjust your limits as needed.</Text>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleUpdateLimits}>
              <Text style={styles.submitButtonText}>Update Limits</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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
    paddingBottom: 90,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#02457A',
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
    width: 24,
  },
  cardContainer: {
    padding: 30,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  tipsBox: {
    backgroundColor: '#F5F5F5',
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
  submitButton: {
    backgroundColor: '#02457A',
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

