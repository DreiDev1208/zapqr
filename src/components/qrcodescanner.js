import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { supabase } from '../services/supabaseConfig';
import styles from '../styles/qrcodescannerstyles';

const QRCodeScanner = ({ navigation }) => {
  const [scanned, setScanned] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [scanCount, setScanCount] = useState(0);
  const cameraRef = useRef(null);

  const onBarCodeRead = useCallback(
    async (event) => {
      if (!scanned) {
        setScanned(true);

        try {
          const { data, error } = await supabase
            .from('customers')
            .select('customer_id, transactions, qr_code')
            .eq('qr_code', event.data);

          if (error) {
            throw new Error('Error fetching customer data');
          }

          if (data.length === 0) {
            const newTransactionTime = 1;
            const { data: insertData, error: insertError } = await supabase
              .from('customers')
              .insert([
                {
                  qr_code: event.data,
                  transactions: newTransactionTime,
                },
              ]);

            if (insertError) {
              throw new Error('Error inserting new data');
            }

            navigation.navigate('CustomerForm', { qrCodeValue: event.data });
          } else if (data.length === 1) {
            const existingRecord = data[0];
            const updatedTransactionTime = existingRecord.transactions + 1;

            if (updatedTransactionTime <= 10) {
              const { error: updateError } = await supabase
                .from('customers')
                .update({ transactions: updatedTransactionTime })
                .eq('qr_code', event.data);

              if (updateError) {
                throw new Error('Error updating transactions');
              }

              setScanCount(updatedTransactionTime);
              setShowSuccessMessage(true);

              if (updatedTransactionTime === 10) {
                Alert.alert('Coupon Completed Free Laundry Next Load');
              }
            } else {
              throw new Error('You have already scanned the QR code 10 times.');
            }
          } else {
            throw new Error('Multiple rows with the same QR code exist.');
          }
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
    },
    [scanned, navigation]
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setScanned(false);
      setShowSuccessMessage(false);
      setErrorMessage(null);
    });

    return unsubscribe;
  }, [navigation]);

  const handleRescan = () => {
    setScanned(false);
    setShowSuccessMessage(false);
    setErrorMessage(null);
  };

  const handleRefresh = () => {
    setScanned(false);
    setShowSuccessMessage(false);
    setErrorMessage(null);
    setScanCount(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.errorContainer}>
        {errorMessage && (
          <>
            <Text style={styles.errorText}>{errorMessage}</Text>
            {scanCount >= 10 && (
              <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
                <Text style={styles.refreshButtonText}>Refresh</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      <View style={styles.cameraContainer}>
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          onBarCodeRead={onBarCodeRead}
          captureAudio={false}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          barCodeReadInterval={10000}
        />
        {showSuccessMessage && (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>QR Code scanned successfully!</Text>
            <TouchableOpacity onPress={handleRescan} style={styles.rescanButton}>
              <Text style={styles.rescanButtonText}>Rescan</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default QRCodeScanner;
