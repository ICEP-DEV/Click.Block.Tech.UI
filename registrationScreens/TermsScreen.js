import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

const TermsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Terms & Conditions:</Text>

        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.sectionText}>
          These Terms & Conditions govern the use of services provided by Nexis bank. By opening an account
          or using any of our services, you agree to these terms. Please read them carefully.
        </Text>

        {/* The rest of the terms here... */}

        <Text style={styles.sectionTitle}>14. Liability</Text>
        <Text style={styles.sectionText}>
          14.1 **Bank Liability**: The Bank is not liable for any indirect, incidental, or consequential damages arising from the
          use of banking services, except as required by law. {"\n"}
          14.2 **Account Holder Responsibility**: The Account Holder agrees to use the Bank’s services responsibly and to monitor
          their accounts regularly for unauthorized transactions.
        </Text>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02457a', // Background similar to the screenshot
    justifyContent: 'space-between',
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
  sectionText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TermsScreen;
