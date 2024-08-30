import { configureStore } from '@reduxjs/toolkit'
import popularWithReducer from './reducers/PopularWithSlice'
import tvShowsReducer from './reducers/TVShowsSlice'
import movieReducer from './reducers/MovieSlice'


export const store = configureStore({
  reducer: {
    popularWith: popularWithReducer,
    tvShows: tvShowsReducer,
    movie: movieReducer,
  },
})