import React from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';

const DownloadStatement = ({ route }) => {
  const { account, year, statements } = route.params;

  const handleDownload = async (item) => {
    try {
      const fileName = item.title + '.pdf';
      const downloadPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

      const downloadOptions = {
        fromUrl: item.url,
        toFile: downloadPath,
      };

      const result = await RNFS.downloadFile(downloadOptions).promise;

      if (result.statusCode === 200) {
        Alert.alert('Download Complete', `File downloaded to: ${downloadPath}`);
      } else {
        Alert.alert('Download Failed', 'Failed to download the file.');
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'An error occurred while downloading the file.');
    }
  };

  const renderStatement = ({ item }) => (
    <View style={styles.statementItem}>
      <Text style={styles.statementTitle}>{item.title}</Text>
      <Button title="Download" onPress={() => handleDownload(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Statements for {account} in {year}
      </Text>
      <FlatList
        data={statements}
        renderItem={renderStatement}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
  },
  statementItem: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statementTitle: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
});

export default DownloadStatement;  // Updated export
