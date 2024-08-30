import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
  error: null,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    loadMovie: (state, action) => {
      state.info = action.payload;
      state.error = null;
    },
    removeMovie: (state) => {
      state.info = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { loadMovie, removeMovie, setError } = movieSlice.actions;

export default movieSlice.reducer;
