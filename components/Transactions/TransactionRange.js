import React from 'react';
import { StyleSheet, View, Text, Button } from "react-native";
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import { previousMonth, nextMonth } from '../../utils/transactionUtil';
import { useDispatch, useSelector } from 'react-redux';
import { setRange, transactionYearSelector, transactionMonthSelector } from '../../slices/transactionsSlice';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export default function TransactionRange() {
  
  const dispatch = useDispatch();
  
  const year = useSelector(transactionYearSelector);
  const month = useSelector(transactionMonthSelector);
  const monthFixed = month > 9 ? month : '0' + month;
  const momentDate = year && month ? moment(`${year}-${monthFixed}-01`) : null;
  const dateRange = (momentDate || moment()).format('MMMM YYYY');

  const onPressPreviousMonth = () => dispatch(setRange(previousMonth(momentDate && momentDate.format('YYYY-MM-DD'))));
  const onPressNextMonth = () => dispatch(setRange(nextMonth(momentDate && momentDate.format('YYYY-MM-DD'))));

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('lightgray', true)}>
        <Feather name='chevron-left' color='#767676' size={24} onTouchEnd={onPressPreviousMonth} />
      </TouchableNativeFeedback>

      <Text style={styles.range}>
        {`${dateRange}'s Transactions`}
      </Text>

      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('lightgray', true)}>
        <Feather name='chevron-right' color='#767676' size={24} onTouchEnd={onPressNextMonth} />
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    marginBottom: 20,
    alignSelf: 'center',
  },

  range: {
    fontFamily: 'avenir',
    fontSize: 22,
    color: '#4f4f4f',
    marginTop: 4,
  },

})