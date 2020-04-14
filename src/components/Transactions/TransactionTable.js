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
    <View style={styles.table}>
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

  table: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '94%',

    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  noTransactions: {
    alignSelf: 'center',
    marginVertical: 20,
  },

  header: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
  },

  th: {
    flex: 1,
    color: '#aeaeae',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    padding: 8,
  },

  thLeftAligned: {

  },
});
