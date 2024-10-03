import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';

// Import screens
import HomeScreen from './homeScreen'; // Previously MainScreen
import ManageScreen from './manageScreen';
import NotificationsScreen from './notificationsScreen';
import TransactScreen from './transactScreen';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        let iconName;
        if (route.name === 'Home') iconName = 'home-outline';
        if (route.name === 'Manage') iconName = 'settings-outline';
        if (route.name === 'Notifications') iconName = 'notifications-outline';
        if (route.name === 'Transact') iconName = 'swap-horizontal-outline';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.navItem}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? '#4169E1' : 'lightgray'}
            />
            <Text
              style={[
                styles.label,
                { color: isFocused ? '#4169E1' : 'lightgray' },
              ]}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Centered QR Code Button */}
      <TouchableOpacity style={styles.qrContainer}>
        <View style={styles.qrCircle}>
          <Ionicons name="qr-code-outline" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const NavigationBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />} // Ensure this is passed in the right place
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Manage" component={ManageScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Transact" component={TransactScreen} />
    </Tab.Navigator>
  );
};

export default NavigationBar;







