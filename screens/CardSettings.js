import React, { useState } from 'react';
import { View, Text, Image, Switch, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function CardSettings({ navigation }) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#02457A" barStyle="light-content" />
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>CARD SETTINGS</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image
            source={require('../assets/card_settings/card_p.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardType}>Debit Card</Text>

          {/* Card Options */}
          <View style={styles.option}>
            <Text style={styles.optionText}>View Balance</Text>
            <Switch
              value={isBalanceVisible}
              onValueChange={toggleBalanceVisibility}
              thumbColor={isBalanceVisible ? 'white' : '#02457A'}
              trackColor={{ false: '#ccc', true: '#02457A' }}
              style={styles.switch}
            />
          </View>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('CratePanicPin')}>
            <Text style={styles.optionText}>Create Alert PIN</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('UpdatePin')}>
            <Text style={styles.optionText}>Update PIN</Text>
          </TouchableOpacity>

          {/* Updated Message Settings Button */}
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('contactUs')}>
            <Text style={styles.optionText}>Message Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Privacy Settings</Text>
          </TouchableOpacity>
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
});

