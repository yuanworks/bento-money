import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import moment from 'moment';

export function TransactionRow({ transaction, even }) {
  
  const { amount, date, payee, currency } = transaction;

  const momentDate = moment(date);
  const formattedDate = momentDate.isValid() && momentDate.format('MM/DD');

  return (
    <View style={[ styles.row, even && styles.evenRow ]}>
      <Text style={styles.date}>{ formattedDate || date }</Text>
      <TextInput style={styles.payee} value={payee} />
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
  
  date: {
    flex: 1,
  },

  payee: {
    flex: 3,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    padding: 8,
  },

  evenRow: {
    backgroundColor: '#fcfcfc',
  },

  /*
  cell: {
    flex: 1,
  },
  */

  income: {
    color: '#21ba45'
  },

  amountContainer: {
    flex: 2,
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
