import React, { createContext, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const INACTIVITY_TIMEOUT = 2 * 60 * 1000; //OPM - Setting inactivity timer to 2 minutes
  const timerRef = useRef(null);
  const appState = useRef(AppState.currentState);
  const navigation = useNavigation();

  const logout = () => {
    console.log('User logged out due to inactivity over the past 2 minutes.');
    navigation.navigate('Login'); //OPM - Redirect to Login after 2 minutes of inactivity
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(logout, INACTIVITY_TIMEOUT);
  };

  const handleAppStateChange = (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      resetTimer();
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    resetTimer(); // Initialize the timer
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Clean up
    return () => {
      clearTimeout(timerRef.current);
      subscription.remove();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ resetTimer }}>
      {children}
    </SessionContext.Provider>
  );
};
