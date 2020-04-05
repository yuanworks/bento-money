import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { normalizeTransactions } from '../utils/transactionUtil';
import * as transactionsAPI from '../apis/transactionsAPI';

const initialState = {
  loading : 'idle',
  error   : null,
  
  items   : {},
  sortBy  : 'id',
  sortDir : 'desc',
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetch',
  async (arg, thunkAPI) => transactionsAPI.fetchAll(),
)

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,

  extraReducers: {

    [fetchTransactions.pending]: state => {
      state.loading = 'pending';
    },

    [fetchTransactions.fulfilled]: (state, action) => {
      state.loading = 'idle';
      state.items = normalizeTransactions(action.payload.transactions, state.items);
    },

    [fetchTransactions.rejected]: (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    }
  }
});

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

export default transactionsSlice.reducer;
