import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, BackHandler, Vibration, Alert } from 'react-native';
import { supabase } from '../services/supabaseConfig';
import styles from '../styles/customerformstyles';

const CustomerForm = ({ route, navigation }) => {
  const { qrCodeValue } = route.params;

  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [canNavigateBack, setCanNavigateBack] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!canNavigateBack) {
        Vibration.vibrate(200); // Vibrate for 200 milliseconds
        Alert.alert('First name and last name are required!');
        return true; // Prevent going back
      }
    });

    return () => {
      backHandler.remove();
    };
  }, [canNavigateBack]);

  useEffect(() => {
    async function fetchCustomerData() {
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('first_name, last_name, contact_number')
          .eq('qr_code', qrCodeValue)
          .single();

        if (error) {
          console.error('Error fetching customer data:', error.message);
        } else {
          setCustomerFirstName(data.first_name);
          setCustomerLastName(data.last_name);
          setContactNumber(data.contact_number);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    fetchCustomerData();
  }, [qrCodeValue]);

  useEffect(() => {
    // Check if both first name and last name are filled
    if (customerFirstName.trim() && customerLastName.trim()) {
      setCanNavigateBack(true);
    } else {
      setCanNavigateBack(false);
    }
  }, [customerFirstName, customerLastName]);

  const handleSubmit = async () => {
    let hasErrors = false;

    if (!customerFirstName.trim()) {
      setFirstNameError('First name is required');
      hasErrors = true;
    } else {
      setFirstNameError('');
    }

    if (!customerLastName.trim()) {
      setLastNameError('Last name is required');
      hasErrors = true;
    } else {
      setLastNameError('');
    }

    if (hasErrors) {
      Vibration.vibrate(200); // Vibrate for 200 milliseconds
      Alert.alert('First name and last name are required!');
      return;
    }

    try {
      const { error } = await supabase
        .from('customers')
        .update([
          {
            first_name: customerFirstName,
            last_name: customerLastName,
            contact_number: contactNumber,
          },
        ])
        .eq('qr_code', qrCodeValue);

      if (error) {
        console.error('Error updating customer data:', error.message);
      } else {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        placeholder='eg. John'
        style={styles.input}
        value={customerFirstName}
        onChangeText={(text) => {
          setCustomerFirstName(text);
          setFirstNameError('');
        }}
      />
      <Text style={styles.errorText}>{firstNameError}</Text>

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        placeholder='eg. Doe'
        style={styles.input}
        value={customerLastName}
        onChangeText={(text) => {
          setCustomerLastName(text);
          setLastNameError('');
        }}
      />
      <Text style={styles.errorText}>{lastNameError}</Text>

      <Text style={styles.label}>Contact Number:</Text>
      <TextInput
        placeholder='eg. 09123456789'
        style={styles.input}
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default CustomerForm;
