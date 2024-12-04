import React, { useState } from 'react';
import { View, Text, Picker, Button, StyleSheet } from 'react-native';

const StatementsScreen = ({ navigation }) => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const accounts = ['Savings', 'Checking', 'Business'];
  const years = ['2022', '2023', '2024'];

  const handleFilter = () => {
    if (!selectedAccount || !selectedYear) {
      alert('Please select an account and a year.');
      return;
    }

    // Replace with API data if available
    const filteredStatements = [
      { id: 1, title: 'Statement Jan 2023', url: 'https://example.com/jan2023.pdf' },
      { id: 2, title: 'Statement Feb 2023', url: 'https://example.com/feb2023.pdf' },
    ];

    navigation.navigate('DownloadStatement', {
      account: selectedAccount,
      year: selectedYear,
      statements: filteredStatements,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Account:</Text>
      <Picker
        selectedValue={selectedAccount}
        onValueChange={(itemValue) => setSelectedAccount(itemValue)}
      >
        <Picker.Item label="Select Account" value="" />
        {accounts.map((account, index) => (
          <Picker.Item label={account} value={account} key={index} />
        ))}
      </Picker>

      <Text style={styles.label}>Select Year:</Text>
      <Picker
        selectedValue={selectedYear}
        onValueChange={(itemValue) => setSelectedYear(itemValue)}
      >
        <Picker.Item label="Select Year" value="" />
        {years.map((year, index) => (
          <Picker.Item label={year} value={year} key={index} />
        ))}
      </Picker>

      <Button title="Filter Statements" onPress={handleFilter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
  },
});

export default StatementsScreen;
