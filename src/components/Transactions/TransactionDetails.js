import React, { useEffect } from 'react';
import { View, StyleSheet, Picker, Platform } from 'react-native';
import BentoInput from '../layout/BentoInput';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategories } from '../../slices/categoriesSlices';
import { updateTransaction, selectTransactionDraft } from '../../slices/transactionsSlice';
import AmountInput from '../layout/AmountInput';
import moment from 'moment';

export function TransactionDetails() {

  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const draft = useSelector(selectTransactionDraft);

  useEffect(() => {
    !categories && dispatch(fetchCategories());
    if (!draft.date) {
      dispatch(updateTransaction({ date: moment().format('YYYY-MM-DD') }));
    }
  }, []);

  const update = data => dispatch(updateTransaction(data));
  const updateCategory = value => update({ category_id: value === 'uncategorized' ? undefined : parseInt(value, 10) });

  const payee = draft.payee || '';

  return (
    <View style={styles.container}>
      <BentoInput placeholder="Payee" value={payee} onChangeText={text => update({ payee: text })} />
      <BentoInput placeholder="Date" value={draft.date} onChangeText={text => update({ date: text })} />
      <Picker style={styles.categoryPicker} onValueChange={updateCategory} value={payee.category_id || 'uncategorized'}>
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

  categoryPicker: {
    borderColor: Platform.OS === 'web' && 'transparent',
    borderRadius: Platform.OS === 'web' && 0,
    backgroundColor: Platform.OS === 'web' && 'transparent',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 12,
  }
})