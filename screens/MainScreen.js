import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Statements"
        onPress={() => navigation.navigate('Statements')}
      />
      <Button
        title="Documents"
        onPress={() => alert('Navigate to Documents (Future Feature)')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;
