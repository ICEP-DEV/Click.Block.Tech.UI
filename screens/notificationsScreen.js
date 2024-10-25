import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Icon component

const notifications = [
  {
    id: '1',
    message: 'Withdrawal of -R500 from SAVINGS ACCOUNT, Soshanguve Crossing Mall',
    time: 'Now',
  },
  {
    id: '2',
    message: 'Purchase -R1200 from SAVINGS ACCOUNT: Ref Game stores ZA, Soshanguve',
    time: '07:00',
  },
];

const NotificationsScreen = ({ navigation }) => {
  const renderNotification = ({ item }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Notifications Header */}
      <View style={styles.header}>
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        {/* Notifications Text */}
        <Text style={styles.headerText}>NOTIFICATIONS</Text>
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',  // Arrange arrow and text in a row
    backgroundColor: '#1F3A93',
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',  // Align vertically center
  },
  backButton: {
    paddingRight: 15,  // Space between the arrow and text
  },
  headerText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    flex: 1,  // Make text occupy the remaining space
    textAlign: 'center',  // Center the text
  },
  notificationContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 5,
  },
});

export default NotificationsScreen;


