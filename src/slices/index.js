import { combineReducers } from "@reduxjs/toolkit";
import transactions from './transactionsSlice';
import categories from './categoriesSlices';

const rootReducer = combineReducers({
  transactions,
  categories,
});

export default rootReducer;