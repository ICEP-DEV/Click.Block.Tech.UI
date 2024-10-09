import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Stepper = ({ currentStep }) => {
  const steps = ['1', '2', '3', '4']; // Define steps as needed

  return (
    <View style={styles.stepperContainer}>
      {steps.map((step, index) => (
        <View
          key={index}
          style={[
            styles.step,
            currentStep === index ? styles.activeStep : null,
          ]}
        >
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  step: {
    width: 25, // Square width
    height: 25, // Square height
    borderRadius: 2, // Rounded corners (optional)
    backgroundColor: '#02457A', // Default background color
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5, // Space between squares
  },
  stepText: {
    fontSize: 16,
    color: 'white', // Text color
  },
  activeStep: {
    backgroundColor: '#e0e0e0', // Background color for the active step
    color: '#fff', // Text color for the active step
  },
});

export default Stepper;
