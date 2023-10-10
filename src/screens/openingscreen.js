import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OpeningScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Set a timer to navigate to HomeScreen after 6 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000 );

    return () => {
      clearTimeout(timer); 
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/zaplogo.png')} style={styles.logo} />
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
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  credits: {
    bottom: 0,
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 8,
    fontStyle:'italic',
  }
});

export default OpeningScreen;
