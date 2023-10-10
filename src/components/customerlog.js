import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { supabase } from '../services/supabaseConfig';
import moment from 'moment-timezone';

const CustomerLogs = () => {
  const [customerLogsData, setCustomerLogsData] = useState([]);

  useEffect(() => {
    async function fetchCustomerLogs() {
      try {
        const { data, error } = await supabase
          .from('customers') 
          .select('customer_number_of_day, first_name, last_name, transactions, created_at, transaction_date')
          .order('customer_number_of_day', { ascending: true });
        
        if (error) {
          console.error(error);
          return;
        }

        // Format "created_at" values as ISO datetime strings
        const formattedData = data.map(item => ({
          ...item,
          created_at: moment().tz('Asia/Manila').format('YYYY-MM-DDTHH:mm:ssZ'),
          transaction_date: moment().format('YYYY-MM-DDTHH:mm:ssZ')
        }));

        setCustomerLogsData(formattedData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCustomerLogs();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Logs</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>No.</Text>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Stamp</Text>
        <Text style={styles.headerCell}>Time</Text>
        <Text style={styles.headerCell}>Date</Text>
      </View>
      <FlatList
        data={customerLogsData}
        keyExtractor={(item) => item.customer_number_of_day.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.customer_number_of_day}</Text>
            <Text style={styles.tableCell}>{item.first_name} {item.last_name}</Text>
            <Text style={styles.tableCell}>{item.transactions}</Text>
            <Text style={styles.tableCell}>
              {moment(item.created_at).tz('Asia/Manila').format('hh:mm A')}
            </Text>
            <Text style={styles.tableCell}>
              {moment(item.transaction_date).format('MM/DD/YY')}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F4EB',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#4682A9',
    padding: 10,
    borderRadius: 5,
  },
  headerCell: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  tableRow: {
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
  },
  tableCell: {
    color: 'black',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '500',
  },
});

export default CustomerLogs;
