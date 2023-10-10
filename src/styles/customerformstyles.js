import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      top: 20,
      padding: 16,
      backgroundColor: '#F6F4EB',
    },
    label: {
      fontSize: 18,
      marginBottom: 8,
      color: 'black',
      fontWeight: 'bold',
    },
    input: {
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 8,
      marginBottom: 16,
    },
    errorText: {
      color: 'red',
      marginBottom: 8,
    },
    heading: {
        fontSize :30 ,
        textAlign: "center",
        marginTop: 10,
        paddingBottom: 40,
        fontWeight: '500',
        color: 'black',
    }
  });

export default styles;