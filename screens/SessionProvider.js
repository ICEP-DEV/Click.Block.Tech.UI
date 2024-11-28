import React, { createContext, useEffect, useRef } from 'react';
import { AppState, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const INACTIVITY_TIMEOUT = 3 * 60 * 1000; // 2 minutes
  const TIMER_INTERVAL = 1000; // 1 second
  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  const appState = useRef(AppState.currentState);
  const navigation = useNavigation();

  let timeLeft = useRef(INACTIVITY_TIMEOUT); // Track remaining time

  const logout = () => {
    console.log('User logged out due to inactivity.');
    clearInterval(countdownRef.current); // Clear countdown interval
    navigation.navigate('Login'); // Redirect to Login
  };

  const resetTimer = () => {
    // Clear any existing timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }

    // Reset time left and set new timers
    timeLeft.current = INACTIVITY_TIMEOUT;

    // Start the timer that logs the user out after inactivity
    timerRef.current = setTimeout(logout, INACTIVITY_TIMEOUT);

    // Start logging countdown every second
    countdownRef.current = setInterval(() => {
      timeLeft.current -= TIMER_INTERVAL;
      console.log(`Time left before logout: ${timeLeft.current / 1000} seconds`);
      if (timeLeft.current <= 0) {
        clearInterval(countdownRef.current);
      }
    }, TIMER_INTERVAL);
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

    // Clean up on unmount
    return () => {
      clearTimeout(timerRef.current);
      clearInterval(countdownRef.current);
      subscription.remove();
    };
  }, []);

  // Reset timer whenever the screen is focused using useIsFocused
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      resetTimer(); // Reset timer whenever the screen is focused
    }
  }, [isFocused]);

  return (
    <SessionContext.Provider value={{ resetTimer }}>
      {/* Wrap the children in TouchableWithoutFeedback to detect touch events */}
      <TouchableWithoutFeedback onPress={resetTimer} onTouchStart={resetTimer}>
        <View style={{ flex: 1 }}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </SessionContext.Provider>
  );
};
