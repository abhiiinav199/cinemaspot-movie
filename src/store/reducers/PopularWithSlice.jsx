import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
  error: null,
};

export const PopularWithSlice = createSlice({
  name: 'popularWith',
  initialState,
  reducers: {
    loadPopularWith: (state, action) => {
      state.info = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    removePopularWith: (state) => {
      state.info = null;
      state.error = null;
    },
  },
})

export const { loadPopularWith, removePopularWith, setError } = PopularWithSlice.actions;

export default PopularWithSlice.reducer;

