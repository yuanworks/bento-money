import React, { useLayoutEffect, useEffect } from 'react';
import { View, Text, StyleSheet, ToastAndroid, Platform, Alert } from 'react-native';
import HeaderAction from '../components/layout/HeaderAction';
import { TransactionDetails } from '../components/Transactions/TransactionDetails';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../slices/transactionsSlice';

export function AddTransactionScreen({ navigation }) {
  
  const dispatch = useDispatch();

  const onPressAdd = () => {
    dispatch(addTransaction()).then(response => {
      if (response?.payload?.ids) {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Transaction added succesfully!', ToastAndroid.SHORT);
        }
        else {
          Alert.alert(
            "Bento Money",
            "Transaction added succesfully!",
            [
              { text: "OK" }
            ],
          );
        }

        navigation.goBack();
      }
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderAction>
          <Text onPress={onPressAdd}>ADD</Text>
        </HeaderAction>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TransactionDetails newTransaction />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});
