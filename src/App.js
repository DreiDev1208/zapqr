import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OpeningScreen from './screens/openingscreen';
import HomeScreen from './screens/homescreen';
import QRCodeScanner from './components/qrcodescanner';
import CustomerForm from './components/customerform';
import CustomerLogs from './components/customerlog'; 

const Stack = createStackNavigator();

const App = () => {
  const [showOpeningScreen, setShowOpeningScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOpeningScreen(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={showOpeningScreen ? 'Opening' : 'Home'}>
        {showOpeningScreen ? (
          <Stack.Screen
            name="Opening"
            component={OpeningScreen}
            options={{ headerShown: false }}
          />
        ) : null}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QRCodeScanner"
          component={QRCodeScanner}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomerForm"
          component={CustomerForm}
          options={{ headerShown: false }}
        />
        {/* Add a new screen for CustomerLogs */}
        <Stack.Screen
          name="CustomerLogs"
          component={CustomerLogs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
