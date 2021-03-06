import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { normalizeTransactions, sortTransactions } from '../utils/transactionUtil';
import * as transactionsAPI from '../apis/transactionsAPI';
import moment from 'moment';

// INITIAL STATE
// -------------
const initialState = {
  loading  : 'idle',
  error    : null,
  entities : {},
  year     : null,     // defaults to current year
  month    : null,     // defaults to current month
  sortBy   : 'date',
  sortDir  : 'desc',
  draft    : {},
};

// THUNKS
// ------
export const fetchTransactions = createAsyncThunk(
  'transactions/fetch',
  async (_, { getState }) => {
    const { year, month } = getState().transactions;
    if (!year || !month) {
      return transactionsAPI.fetchAll();
    }
    else {
      const momentDate = moment().year(year).month(month - 1);
      const start_date = momentDate.startOf('month').format('YYYY-MM-DD');
      const end_date = momentDate.endOf('month').format('YYYY-MM-DD');

      return transactionsAPI.fetchAll({ start_date, end_date });
    }
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (_, { getState }) => {
    const { draft } = getState().transactions;

    return transactionsAPI.insertTransaction({ transactions: [ draft ] }); //draft);
  }
);

// SLICE
// -----
const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,

  reducers: {
    setRange: (state, action) => {
      if (action.payload) {
        state.year = action.payload.year;
        state.month = action.payload.month;
      }
    },

    updateTransaction: (state, action) => {
      state.draft = {...state.draft, ...action.payload }
    },

    clearTransactionDraft: state => {
      state.draft = {};
    },
  },

  extraReducers: {

    // fetch
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
    },

    // add
    [addTransaction.fulfilled] : (state, action) => {
      const { ids } = action.payload;

      if (ids && ids.length > 0) {
        const newTransaction = [{ ...state.draft, id: ids[0] }];
        state.entities = normalizeTransactions(newTransaction, state.entities);
      }

      state.draft = {};
    }
  }
});

// EXPORTS
// -------

// Async Thunks -->
export const selectTransactionsByDate = createSelector(
  state => state.transactions,
  (_, year, __) => year,
  (_, __, month) => month,

  (transactions, year, month) => {
    return transactions.entities[year] && transactions.entities[year][month] && sortTransactions(transactions.entities[year][month], transactions.sortBy, transactions.sortDir)
  }
);

// Actions -->
export const { setRange, updateTransaction, clearTransactionDraft } = transactionsSlice.actions;

// Selectors -->
export const transactionIsLoadingSelector = state => state.transactions.loading;
export const transactionYearSelector = state => state.transactions.year;
export const transactionMonthSelector = state => state.transactions.month;
export const selectTransactionDraft = state => state.transactions.draft;


export default transactionsSlice.reducer;
