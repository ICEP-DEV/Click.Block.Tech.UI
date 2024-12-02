import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';

// Import screens and stacks
import HomeScreen from './homeScreen';
import ManageStack from './ManageStack';
import NotificationsScreen from './notificationsScreen';
import TransactScreen from './transactScreen';
import ManageCard from './ManageCard';
import ManageScreen from './manageScreen';
import PersonalInfoScreen from './PersonalInfoScreen';
import ContactUs from './contactUs';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        let iconName;
        if (route.name === 'Dashboard') iconName = 'home-outline';
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

const NavigationBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Dashboard" component={HomeScreen} />
      <Tab.Screen name="Manage" component={ManageScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Transact" component={TransactScreen} />
    </Tab.Navigator>
  );
};

export default NavigationBar;
