import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; // Use navigation and route hooks
import BottomNavigation from './BottomNavigation'; // Import BottomNavigation

export default function PinEntry() {
  const navigation = useNavigation();
  const route = useRoute();
  const { pinType } = route.params || { pinType: 'panic' }; // Default to panic if pinType is not provided

  const handleBackPress = () => {
    navigation.goBack(); // Allow navigation back to the previous screen
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Ensure StatusBar is configured like in CardSettings */}
      <StatusBar backgroundColor="#02457A" barStyle="light-content" />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{`CREATE PANIC PIN`}</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Scrollable Card Content */}
        <ScrollView contentContainerStyle={styles.cardContainer}>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              placeholder={`Enter your new 5-digit panic PIN`}
              secureTextEntry
              keyboardType="numeric"
              maxLength={5}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm new Panic PIN"
              secureTextEntry
              keyboardType="numeric"
              maxLength={5}
            />

            {/* Tips Section */}
            <View style={styles.tipsBox}>
              <Text style={styles.tipsText}>Tips for creating a secure Panic PIN:</Text>
              <Text style={styles.tip}>• Use a complex PIN</Text>
              <Text style={styles.tip}>• Avoid sequential numbers (e.g., 12345)</Text>
              <Text style={styles.tip}>• Avoid easily guessable numbers (e.g., birthdates)</Text>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>{`Create Panic PIN`}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
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
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
