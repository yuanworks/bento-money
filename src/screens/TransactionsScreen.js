import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TransactionTable from '../components/Transactions/TransactionTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, selectTransactionsByDate, transactionIsLoadingSelector, transactionYearSelector, transactionMonthSelector } from '../slices/transactionsSlice';
import TransactionRange from '../components/Transactions/TransactionRange';
import moment from 'moment';
import NewTransactionButton from '../components/Transactions/NewTransactionButton';

export default function TransactionsScreen({ navigation }) {

  const dispatch = useDispatch();

  const year = useSelector(transactionYearSelector) || moment().year();
  const month = useSelector(transactionMonthSelector) || moment().month() + 1;

  const transactions = useSelector(state => selectTransactionsByDate(state, year, month));
  const transactionsLoading = useSelector(transactionIsLoadingSelector);

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [ year, month, dispatch ]);

  // only for mobile
  // SecureStore.getItemAsync('lunch_money_access_token').then(response => console.log('response:', response));
  
  // SecureStore.setItemAsync('lunch_money_access_token', 'hiho').then(response =>
  //   console.log('response:', response)
  // );
  
  // SecureStore.getItemAsync('lunch_money_access_token').then(response => console.log('response:', response));
  
  return (
    <View style={styles.container}>      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <TransactionRange />
        { transactionsLoading === 'pending' && !transactions
        ? <ActivityIndicator size="large" color='lightgray' />
        : <TransactionTable transactions={transactions} />
        }
      </ScrollView>
      <NewTransactionButton navigation={navigation} />
    </View>
  );
}

TransactionsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
    paddingBottom: 50,
  },
});
