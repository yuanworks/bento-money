import React, { useEffect } from 'react';
import { TextInput, View, StyleSheet, Picker } from 'react-native';
import BentoInput from '../layout/BentoInput';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../../slices/categoriesSlices';

export function TransactionDetails() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
  }, []);
  
  return (
    <View style={styles.container}>
      <BentoInput placeholder="Payee" />
      <BentoInput placeholder="Date" />
      <Picker>
        <Picker.Item label="Groceries" />
        <Picker.Item label="Withdraw" />
      </Picker>
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