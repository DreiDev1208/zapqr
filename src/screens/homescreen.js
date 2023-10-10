import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const navigateToQRScanner = () => {
    navigation.navigate('QRCodeScanner'); // Navigate to the QRCodeScanner screen
  };

  const navigateToCustomerLogs = () => {
    navigation.navigate('CustomerLogs'); // Navigate to the CustomerLogs screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/zaplogo.png')} style={styles.logo} />
      </View>
      <View style={styles.buttonColumn}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={navigateToQRScanner}
        >
          <Text style={styles.buttonText}>SCAN QR CODE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={navigateToCustomerLogs}
        >
          <Text style={styles.buttonText}>CUSTOMER LOGS</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.credits}>© 2023 ZAP LAUNDRY ANDREI MAR DAVA</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F4EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: 200,
    height: 60,
    marginBottom: 60,
    backgroundColor: '#4682A9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  credits: {
    bottom: 20,
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 8,
    fontStyle:'italic',
  }
});

export default HomeScreen;
