import React, { useState } from 'react';
import { CURRENCIES, MAIN_CURRENCY, parseAmount } from '../../utils/currencyUtil';
import { Picker, View, TextInput, StyleSheet } from 'react-native';

export default function AmountInput({ currency, initialAmount, update }) {

  const [ amount, setAmount ] = useState(initialAmount || '');

  const updateCurrency = currency => update({ currency });
  
  const updateAmount = value => {
    setAmount(value);
    const { amount: parsedAmount, currency: parsedCurrency } = parseAmount(value);
    !isNaN(parsedAmount) && update({ amount: parsedAmount });
    parsedCurrency && update({ currency: parsedCurrency });
  };

  return (
    <View style={styles.container}>
      <Picker style={styles.currencyPicker} value={currency || MAIN_CURRENCY } onValueChange={updateCurrency}>
        { Object.entries(CURRENCIES).map(([value, alias]) => <Picker.Item style={styles.currencyItem} key={value} value={value} label={alias} /> )}
      </Picker>
      <TextInput style={styles.amountInput} placeholder='Amount' value={amount} onChangeText={updateAmount}  />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },

  currencyPicker: {
  },

  currencyItem: {
    fontSize: 16,
  },

  amountInput: {
    flexGrow: 1,
    fontSize: 16,
  },
});
