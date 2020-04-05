import { createSlice, createSelector } from '@reduxjs/toolkit';
import { normalizeTransactions } from '../utils/transactionUtil';

const initialState = {
  loading: 'idle',
  // errors = null
  items: {},
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    getTransactions: state => {
      state.loading = 'fetching';
    },

    getTransactionsSuccess: (state, action) => {
      state.loading = 'idle+success',
      state.items = normalizeTransactions(action.payload, state.items);
    },

    //failure => state.loading = 'failure'
  }
});


export const { getTransactions, getTransactionsSuccess } = transactionsSlice.actions;

// add sorting (date, category, amount (? dollar calculated)) + asc/desc
export const selectTransactionsByDate = createSelector(
  state => state.transactions,
  (_, year, __) => year,
  (_, __, month) => month,
  (transactions, year, month) => {
    return transactions.items[year] && Object.values(transactions.items[year][month]).sort((t1, t2) => t2.id - t1.id);
    //return transactions.items[year] && transactions.items[year][month]
  }
);

/* --> THIS ONE WORKS

export const selectTransactionsByDate = createSelector(
  [ state => state.transactions, (_, year, __) => year, (_, __, month) => month, ],
  (state, year, month) => {
    console.log('transactions, year, month:', state.transactions, year, month);
    return state.transactions[year] && state.transactions[year][month]
  }
);
*/

export default transactionsSlice.reducer;

export function fetchTransactions() {
  return async dispatch => {
    dispatch(getTransactions());

    try {
      const response = await fetch('https://dev.lunchmoney.app/v1/transactions', {
        method: 'GET',
        headers: {
          Accept         : 'application/json',
          'Content-Type' : 'application/json',
          Authorization  : 'Bearer b8a0da897c53ddbda9995ba833fa8b7fc1cb9c4be67d0b82d7',
        }
      });

      const data = await response.json();
      console.log('data:', data);
      dispatch(getTransactionsSuccess(data.transactions));
    } catch (error) {
      console.log('error:', error);
      // dispatch failure
    }
  }
}
