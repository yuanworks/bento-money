import { combineReducers } from "@reduxjs/toolkit";
import transactions from './transactionsSlice';

const rootReducer = combineReducers({
  transactions,
});

export default rootReducer;