import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as categoriesAPI from '../apis/categoriesAPI';

const initialState = {
  entities: null,
  loading: 'idle',
};

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async () => {
    return categoriesAPI.fetchAll();
  }
);

// SLICE
// -----
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,

  extraReducers: {
    
    [fetchCategories.fulfilled]: (state, action) => {
      state.loading = 'idle';
      state.entities = action.payload.categories?.reduce((acc, item) => { acc[item.id] = item; return acc; }, {});
    }
  }
});

export const selectCategories = state => state.categories.entities;

export default categoriesSlice.reducer;
