import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TransactionTable from '../components/Transactions/TransactionTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, selectTransactionsByDate, transactionIsLoadingSelector, transactionYearSelector, transactionMonthSelector } from '../slices/transactionsSlice';
import TransactionRange from '../components/Transactions/TransactionRange';
import moment from 'moment';

export default function HomeScreen({ navigation }) {

  const dispatch = useDispatch();

  const year = useSelector(transactionYearSelector) || moment().year();
  const month = useSelector(transactionMonthSelector) || moment().month() + 1;

  const transactions = useSelector(state => selectTransactionsByDate(state, year, month));
  const transactionsLoading = useSelector(transactionIsLoadingSelector);

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [ year, month, dispatch ]);

  return (
    <View style={styles.container}>

      <Button title="hodor" onPress={() => navigation.navigate('EditTransaction')} />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <TransactionRange />
        { transactionsLoading === 'pending' && !transactions
        ? <ActivityIndicator size="large" color='lightgray' />
        : <TransactionTable transactions={transactions} />
        }
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },
});
