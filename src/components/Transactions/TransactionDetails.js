import React, { useEffect } from 'react';
import { View, StyleSheet, Picker } from 'react-native';
import BentoInput from '../layout/BentoInput';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategories } from '../../slices/categoriesSlices';
import { updateTransaction, selectTransactionDraft } from '../../slices/transactionsSlice';
import AmountInput from '../layout/AmountInput';

export function TransactionDetails() {

  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const draft = useSelector(selectTransactionDraft);

  useEffect(() => {
    !categories && dispatch(fetchCategories())
  }, []);

  const update = data => dispatch(updateTransaction(data));

  const payee = draft.payee || '';

  return (
    <View style={styles.container}>
      <BentoInput placeholder="Payee" value={payee} onChangeText={text => update({ payee: text })} />
      <BentoInput placeholder="Date" />
      <Picker>
        <Picker.Item key='uncategorized' value='' label='Uncategorized' />
        { categories && Object.values(categories).map(category => (
          <Picker.Item key={category.id} value={category.id} label={category.name} />
        ))}
      </Picker>
      <AmountInput update={update} currency={draft.currency} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: '#fff',
  },
})