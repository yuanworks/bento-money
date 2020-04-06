import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { normalizeTransactions, sortTransactions } from '../utils/transactionUtil';
import * as transactionsAPI from '../apis/transactionsAPI';

// INITIAL STATE
// -------------
const initialState = {
  loading  : 'idle',
  error    : null,
  entities : {},
  sortBy   : 'id',
  sortDir  : 'desc',
};

// THUNKS
// ------
export const fetchTransactions = createAsyncThunk(
  'transactions/fetch',
  async (arg, thunkAPI) => transactionsAPI.fetchAll(),
)

// SLICE
// -----
const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,

  extraReducers: {

    [fetchTransactions.pending]: state => {
      state.loading = 'pending';
    },

    [fetchTransactions.fulfilled]: (state, action) => {
      state.loading = 'idle';
      state.entities = normalizeTransactions(action.payload.transactions, state.entities);
    },

    [fetchTransactions.rejected]: (state, action) => {
      state.loading = 'idle';
      state.error = action.error;
    }
  }
});

// SELECTORS
// ---------
export const selectTransactionsByDate = createSelector(
  state => state.transactions,
  (_, year, __) => year,
  (_, __, month) => month,

  (transactions, year, month) => {
    return transactions.entities[year] && sortTransactions(transactions.entities[year][month], transactions.sortBy, transactions.sortDir)
  }
);

export default transactionsSlice.reducer;
