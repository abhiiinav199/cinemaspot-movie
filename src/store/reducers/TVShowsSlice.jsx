import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: null,
  error: null,
};

const tvShowsSlice = createSlice({
  name: 'tvShows',
  initialState,
  reducers: {
    loadTVShows: (state, action) => {
      state.info = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    removeTVShows: (state) => {
      state.info = null;
      state.error = null;
    },
  },
});

export const { loadTVShows, setError, removeTVShows } = tvShowsSlice.actions;
export default tvShowsSlice.reducer;
