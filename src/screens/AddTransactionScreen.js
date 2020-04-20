import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Touchable from '../components/layout/Touchable';
import HeaderAction from '../components/layout/HeaderAction';
import { TransactionDetails } from '../components/Transactions/TransactionDetails';

export function AddTransactionScreen({ navigation }) {
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderAction>
          <Text>ADD</Text>
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
