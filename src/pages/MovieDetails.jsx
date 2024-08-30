import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovie, removeMovie } from '../store/actions/MovieActions';
import { useParams, useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import Loading from '../components/partials/Loading';
import { FaStar, FaCalendarAlt, FaClock, FaPlayCircle, FaArrowLeft, FaDollarSign } from 'react-icons/fa';
import { MdLocalMovies } from 'react-icons/md';
import HorizontalCards from '../components/partials/HorizontalCards';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  const movie = useSelector((state) => state.movie.info);
  const error = useSelector((state) => state.movie.error);

  useEffect(() => {
    dispatch(fetchMovie(id));

    return () => {
      dispatch(removeMovie());
    };
  }, [dispatch, id]);

  const loadingState = () => {
    return !movie && !error;
  };

  if (loadingState()) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center min-h-screen">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold">Error</h1>
          <p className="mt-4">{error}</p>
        </div>
      </div>
    );
  }

  const {
    detail,
    credits,
    videos,
    recommendations,
    similar,
    watchprovider,
  } = movie;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      <div className="container p-6 mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="hover:text-purple-500 text-4xl text-white transition duration-300 cursor-pointer"
          />
          <h1 className="text-3xl font-bold text-white">{detail.title}</h1>
        </div>
        <div className="md:flex-row md:items-start md:space-x-6 flex flex-col items-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
            alt={detail.title}
            className="md:w-1/3 hover:scale-105 w-full transition duration-500 transform rounded-lg shadow-lg"
          />
          <div className="md:mt-0 md:flex-1 mt-6 space-y-4">
            <p className="my-4 text-lg">{detail.overview}</p>
            {videos && (
              <div className="p-6">
                <Link to={`${pathname}/trailer`} className="hover:bg-purple-800 px-4 py-2 mt-4 font-semibold text-white transition-colors duration-300 bg-purple-700 rounded-md">
                  Watch Trailer
                </Link>
              </div>
            )}
            <div className="mt-4 space-y-2">
              <h2 className="flex items-center gap-2 text-2xl font-semibold"><MdLocalMovies className="text-yellow-500" /> Details</h2>
              <p className="flex items-center gap-2"><FaCalendarAlt /> Release Date: {detail.release_date}</p>
              <p className="flex items-center gap-2"><FaStar className="text-yellow-600" /> Rating: {detail.vote_average}</p>
              <p className="flex items-center gap-2"><FaClock /> Runtime: {detail.runtime} minutes</p>
              <p className="flex items-center gap-2"><FaDollarSign /> Budget: ${detail.budget.toLocaleString()}</p>
              <p className="flex items-center gap-2"><FaDollarSign /> Revenue: ${detail.revenue.toLocaleString()}</p>
              <p className="flex items-center gap-2"><MdLocalMovies /> Genres: {detail.genres.map(genre => genre.name).join(', ')}</p>
            </div>
            <div className="mt-4 space-y-2">
              <h2 className="flex items-center gap-2 text-2xl font-semibold"><MdLocalMovies className="text-yellow-500" /> Cast</h2>
              <ul className="list-disc list-inside">
                {credits.cast.slice(0, 5).map((cast) => (
                  <li key={cast.id}>{cast.name} as {cast.character}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h2 className="flex items-center gap-2 text-2xl font-semibold"><MdLocalMovies className="text-yellow-500" /> Watch Providers</h2>
              {watchprovider ? (
                <div className="flex flex-wrap gap-4">
                  {watchprovider.flatrate.map((provider) => (
                    <div key={provider.provider_id} className="flex flex-col items-center mt-2">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="w-16 h-16 mb-2 rounded"
                      />
                      <p className="text-sm text-center">{provider.provider_name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No watch providers available</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="mb-3 text-3xl font-bold">Recommendations: </h2>
          <HorizontalCards trendingData={recommendations || similar} mediaType="movie" />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetail;
