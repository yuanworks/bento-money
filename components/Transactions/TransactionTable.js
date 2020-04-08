import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { TransactionRow } from './TransactionRow';

export default function TransactionTable({ transactions }) {

  if (!transactions) {
    return (
      <View style={styles.noTransactions}>
        <Text>You have no transactions for this month.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.th}>Date</Text>
        <Text style={styles.th}>Payee</Text>
        <Text style={styles.th}>Amount</Text>
      </View>
      <View>
        { transactions.map((transaction, i) => <TransactionRow transaction={transaction} even={i % 2} key={transaction.id} />)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    width: '94%',
    borderWidth: 1,
    borderColor: 'lightgray',
    marginHorizontal: 'auto',

    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 40,
  },

  noTransactions: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 20,
  },

  header: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },

  th: {
    flex: 1,
    color: '#aeaeae',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    padding: 8,
  },
});
