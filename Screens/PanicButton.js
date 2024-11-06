import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PanicButton({ navigation }) {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleSubmit = () => {
    if (pin === confirmPin && pin.length === 5) {
      Alert.alert(
        "Success",
        "Panic PIN set successfully",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("SecurityFeatures"),
          }
        ]
      );
    } else {
      Alert.alert("Error", "PINs do not match or are not 5 digits");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#002F66', '#02457A']} style={styles.headerContainer}>
        <Text style={styles.header}>SECURITY FEATURE</Text>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.subHeader}>PANIC BUTTON FEATURE</Text>
        <Image source={require('../assets/card.png')} style={styles.image} />

        <Text style={styles.label}>Create your 5 digits panic PIN</Text>
        <TextInput
          style={styles.input}
          placeholder="00000"
          keyboardType="numeric"
          maxLength={5}
          value={pin}
          onChangeText={setPin}
        />

        <Text style={styles.label}>Confirm your PIN</Text>
        <TextInput
          style={styles.input}
          placeholder="00000"
          keyboardType="numeric"
          maxLength={5}
          value={confirmPin}
          onChangeText={setConfirmPin}
        />

        <TouchableOpacity onPress={() => navigation.navigate('HowItWorks')}>
          <Text style={styles.linkText}>How does it work?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon}><Text style={styles.footerText}>Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}><Text style={styles.footerText}>Manage</Text></TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}><Text style={styles.footerText}>Notifications</Text></TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}><Text style={styles.footerText}>Transact</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#02457A',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 100,
    marginBottom: 100,
  },
  label: {
    alignSelf: 'flex-start',
    color: '#02457A',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#02457A',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#02457A',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 30,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  linkText: {
    color: '#02457A',
    marginTop: 10,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#02457A',
    padding: 10,
  },
  footerIcon: {
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
  },
});
