import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Popular from './pages/Popular';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import TVShows from './pages/TVShows';
import TVShowDetails from './pages/TVShowDetails';
import PopularWith from './pages/PopularWith';
import PopularWithDetails from './pages/PopularWithDetails';
import Trailer from './pages/Trailer';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv-shows" element={<TVShows />} />
      <Route path="/popular-with" element={<PopularWith />} />
      <Route path="/movie/details/:id" element={<MovieDetails />}>
        <Route path="trailer" element={<Trailer />} />
      </Route>
      <Route path="/tv/details/:id" element={<TVShowDetails />} >
        <Route path="trailer" element={<Trailer />} />
      </Route>
      <Route path="/person/details/:id" element={<PopularWithDetails />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
