import { combineReducers } from "@reduxjs/toolkit";
import counter from './counter';
import transactions from './transactions';

const rootReducer = combineReducers({
  counter,
  transactions,
});

export default rootReducer;