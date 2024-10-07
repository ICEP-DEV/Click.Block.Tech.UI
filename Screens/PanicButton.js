
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function PanicButton() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleSubmit = () => {
    if (pin === confirmPin && pin.length === 5) {
      alert('Panic PIN set successfully');
    } else {
      alert('PINs do not match or are not 5 digits');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SECURITY FEATURE</Text>
      <Text style={styles.subHeader}>PANIC BUTTON FEATURE</Text>

      {/* Image */}
      <Image source={require('./assets/credit_card.png')} style={styles.image} />

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Create your 5 digits panic PIN"
        keyboardType="numeric"
        maxLength={5}
        value={pin}
        onChangeText={setPin}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm your PIN"
        keyboardType="numeric"
        maxLength={5}
        value={confirmPin}
        onChangeText={setConfirmPin}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      {/* How does it work? Link */}
      <Text style={styles.linkText}>How does it work?</Text>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon}><Text>Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}><Text>Manage</Text></TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}><Text>Notifications</Text></TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon}><Text>Transact</Text></TouchableOpacity>
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
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#002F66',
      marginBottom: 20,
    },
    subHeader: {
      fontSize: 18,
      fontWeight: '600',
      color: '#002F66',
      marginBottom: 20,
    },
    image: {
      width: 150,
      height: 100,
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: '#002F66',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 10,
      marginBottom: 20,
      backgroundColor: '#fff',
      fontSize: 16,
    },
    submitButton: {
      backgroundColor: '#888',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 8,
      marginTop: 10,
    },
    submitText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
    linkText: {
      color: '#0066CC',
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
      backgroundColor: '#002F66',
      padding: 10,
    },
    footerIcon: {
      alignItems: 'center',
    },
  });
  