import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Touchable from '../components/layout/Touchable';
import HeaderAction from '../components/layout/HeaderAction';
import { TransactionDetails } from '../components/Transactions/TransactionDetails';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../slices/transactionsSlice';

export function AddTransactionScreen({ navigation }) {
  
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderAction>
          <Text onPress={() => dispatch(addTransaction())}>ADD</Text>
        </HeaderAction>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TransactionDetails />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});
