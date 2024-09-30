// PersonalInfoScreen.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const PersonalInfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>MY DETAILS</Text>
      <Text style={styles.subHeader}>Contact our support centre to update the details below.</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Fullname:</Text>
        <TextInput style={styles.input} value="Keamogetswe Jonathan Moatshe" editable={false} />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value="kjmoatshe@gmail.com" editable={false} />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Contact Details:</Text>
        <TextInput style={styles.input} value="0812345678" editable={false} />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Identity Number:</Text>
        <TextInput style={styles.input} value="9801123456083" editable={false} />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Country of Birth:</Text>
        <TextInput style={styles.input} value="South Africa" editable={false} />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Residential Address:</Text>
        <TextInput style={styles.input} value="Stand No 11155, Ga-Motla" editable={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
  },
});

export default PersonalInfoScreen;
