import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export function TransactionRow({ transaction }) {
  
  const { amount, date, payee, currency } = transaction;

  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{ date }</Text>
      <TextInput style={styles.cell} value={payee} />
      <TextInput style={[ styles.cell, styles.amount, amount < 0 && styles.income ]} value={displayNumber(-amount, currency)} />
    </View>
  );
}

const displayNumber = (number, currency) => {
  return `${currencies[currency] || currency} ${parseFloat(number).toFixed(2)}`;
}

const currencies = {
  usd: '$',
  twd: 'NT',
}

const styles = StyleSheet.create({
  
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },

  cell: {
    flex: 1,
  },

  income: {
    color: '#21ba45'
  },

  amount: {
    textAlign: 'end',
    fontFamily: 'space-mono',
  },

});
