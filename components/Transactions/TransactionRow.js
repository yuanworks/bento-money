import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export function TransactionRow({ transaction, even }) {
  
  const { amount, date, payee, currency } = transaction;

  return (
    <View style={[ styles.row, even && styles.evenRow ]}>
      <Text style={styles.cell}>{ date }</Text>
      <TextInput style={styles.cell} value={payee} />
      <View style={styles.amountContainer}>
        <Text style={[ styles.currency, amount < 0 && styles.income ]}>{ currencies[currency] || currency }</Text>
        <TextInput style={[ styles.amount, amount < 0 && styles.income ]} value={displayNumber(-amount)} />
      </View>
    </View>
  );
}

const displayNumber = (number) => {
  return parseFloat(number).toFixed(2);
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
    padding: 4,
  },

  evenRow: {
    backgroundColor: '#fcfcfc',
  },

  cell: {
    flex: 1,
  },

  income: {
    color: '#21ba45'
  },

  amountContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'space-mono',
  },

  currency: {
    width: 50,
    fontFamily: 'space-mono',
  },

  amount: {
    textAlign: 'right',
    width: 100,
    fontFamily: 'space-mono',
  },

});
