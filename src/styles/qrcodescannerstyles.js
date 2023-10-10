import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F6F4EB',
    },
    cameraContainer: {
      height: 300,
      width: 300,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
      aspectRatio: 1,
    },
    errorContainer: {
      position: 'absolute',
      top: 40,
      left: 0,
      right: 0,
      alignItems: 'center',
      zIndex: 1,
    },
    errorText: {
      fontSize: 18,
      color: 'white',
      backgroundColor: 'rgba(255, 0, 0, 0.7)',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    refreshButton: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
    },
    refreshButtonText: {
      fontSize: 18,
      color: 'black',
    },
    successMessage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    successText: {
      fontSize: 24,
      color: 'white',
      marginBottom: 20,
    },
    rescanButton: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
    },
    rescanButtonText: {
      fontSize: 18,
      color: 'black',
    },
  });

  export default styles;