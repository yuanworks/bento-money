import { createSlice } from '@reduxjs/toolkit';
import { normalizeTransactions } from '../utils/transactionUtil';

const initialState = {
  loading: 'idle',
  // errors = null
  transactions: {},
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
      state.transactions = normalizeTransactions(action.payload, state.transactions);
    },

    //failure => state.loading = 'failure'
  }
});


export const { getTransactions, getTransactionsSuccess } = transactionsSlice.actions;
export const transactionsSelector = state => state.transactions;

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
