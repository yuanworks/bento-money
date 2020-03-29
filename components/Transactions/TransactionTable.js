import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { TransactionRow } from './TransactionRow';

export default function TransactionTable({ transactions }) {

  return (
  <View>
    <View style={styles.header}>
      <Text style={styles.th}>Date</Text>
      <Text style={styles.th}>Payee</Text>
      <Text style={styles.th}>Amount</Text>
    </View>
    <View>
      { transactions && transactions.map(transaction => <TransactionRow transaction={transaction} />)}
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '100%',
    display: 'flex',
    color: '#f03',
    flexDirection: 'row',
  },

  th: {
    flex: 1,
    color: '#aeaeae',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    padding: 4,
  },
});
