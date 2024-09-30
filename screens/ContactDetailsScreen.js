import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ContactDetailsScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  // Handle the "Next" button press
  const handleNext = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
    } else {
      Alert.alert('Success', 'Email is valid', [
        { text: 'OK', onPress: () => navigation.navigate('VerifyPhoneNumber') },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <LinearGradient colors={['#003366', '#003366', '#ffffff']} style={styles.gradient}>
        <View style={styles.formContainer}>
          <View style={styles.progressContainer}>
            {/* Step 1 - Inactive */}
            <View style={styles.progressSquare}>
              <Text style={styles.inactiveText}>1</Text>
            </View>
            {/* Step 2 - Active */}
            <View style={[styles.progressSquare, styles.activeSquare]}>
              <Text style={styles.activeText}>2</Text>
            </View>
            {/* Step 3 - Inactive */}
            <View style={styles.progressSquare}>
              <Text style={styles.inactiveText}>3</Text>
            </View>
            {/* Step 4 - Inactive */}
            <View style={styles.progressSquare}>
              <Text style={styles.inactiveText}>4</Text>
            </View>
          </View>

          <Text style={styles.title}>EMAIL ACCOUNT</Text>
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
          <Button mode="contained" onPress={handleNext} style={styles.button}>
            Next
          </Button>
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
    borderRadius: 5,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
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
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#003366',
    marginTop: 10,
  },
});

export default ContactDetailsScreen;
