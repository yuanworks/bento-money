import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import moment from 'moment';

export function TransactionRow({ transaction, even }) {
  
  const { amount, date, payee, currency } = transaction;

  const momentDate = moment(date);
  const formattedDate = momentDate.isValid() && momentDate.format('MM/DD');

  // negative amounts are income:
  const incomeStyle = amount < 0 ? styles.income : null;

  return (
    <View style={[ styles.row, even && styles.evenRow ]}>
      <Text style={[ styles.date, incomeStyle ]}>{ formattedDate || date }</Text>
      <Text style={[styles.payee, incomeStyle ]}>{payee}</Text>
      <View style={styles.amountContainer}>
        <Text style={[ styles.currency, incomeStyle ]}>{ currencies[currency] || currency }</Text>
        <Text style={[ styles.amount, incomeStyle ]}>{displayNumber(-amount)}</Text>
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
    fontFamily: 'space-mono',
    fontSize: 12,
    marginRight: 4,
  },

  payee: {
    flex: 4,
    fontSize: 12,
    lineHeight: 17,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    padding: 12,
    backgroundColor: 'white',
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
    display: 'flex',
    flexDirection: 'row',
  },

  currency: {
    width: 20,
    fontFamily: 'space-mono',
    fontSize: 12,
    textAlign: "center",
  },

  amount: {
    textAlign: 'right',
    width: 90,
    fontFamily: 'space-mono',
    fontSize: 12,
  },

});
