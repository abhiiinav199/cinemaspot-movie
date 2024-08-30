import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularWith, removePopularWith } from '../store/actions/PopularWithActions';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../components/partials/Loading';
import { FaArrowLeft, FaTwitter, FaFacebook, FaInstagram, FaImdb } from 'react-icons/fa';
import { MdMovie, MdTv } from 'react-icons/md';
import HorizontalCards from '../components/partials/HorizontalCards';

const PopularWithDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const person = useSelector((state) => state.popularWith.info);
  const error = useSelector((state) => state.popularWith.error);

  useEffect(() => {
    dispatch(fetchPopularWith(id));

    return () => {
      dispatch(removePopularWith());
    };
  }, [dispatch, id]);

  const loadingState = () => {
    return !person && !error;
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
    externalid,
    popular,
    tvCredits,
    movieCredits,
  } = person;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white">
      <div className="container p-6 mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="hover:text-purple-500 text-4xl text-white transition duration-300 cursor-pointer"
          />
          <h1 className="text-3xl font-bold text-white">{detail.name}</h1>
        </div>

        <div className="flex gap-6">
          <div className="w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${detail.profile_path}`}
              alt={detail.name}
              className="hover:scale-105 w-full transition duration-500 transform rounded-lg shadow-lg"
            />
            <div className="mt-6 space-y-4">
              <h2 className="text-2xl font-semibold">Personal Details</h2>
              <p>Birthday: {detail.birthday}</p>
              <p>Place of Birth: {detail.place_of_birth}</p>
              {detail.deathday && <p>Deathday: {detail.deathday}</p>}
              <p>Known For: {detail.known_for_department}</p>
              <p>Popularity: {detail.popularity}</p>
              <div className="flex items-center gap-4 mt-4">
                {externalid.twitter_id && (
                  <a href={`https://twitter.com/${externalid.twitter_id}`} target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="hover:text-blue-400 text-3xl text-blue-300 transition duration-300" />
                  </a>
                )}
                {externalid.facebook_id && (
                  <a href={`https://facebook.com/${externalid.facebook_id}`} target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="hover:text-blue-700 text-3xl text-blue-600 transition duration-300" />
                  </a>
                )}
                {externalid.instagram_id && (
                  <a href={`https://instagram.com/${externalid.instagram_id}`} target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="hover:text-pink-600 text-3xl text-pink-500 transition duration-300" />
                  </a>
                )}
                {externalid.imdb_id && (
                  <a href={`https://www.imdb.com/name/${externalid.imdb_id}`} target="_blank" rel="noopener noreferrer">
                    <FaImdb className="hover:text-yellow-600 text-3xl text-yellow-500 transition duration-300" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="md:w-2/3 md:mt-0 md:ml-6 w-full mt-8">
            <h2 className="text-2xl font-semibold">Biography</h2>
            <p className="mt-4 text-lg leading-relaxed">{detail.biography}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Credits</h2>
          <div className="md:flex md:gap-6 mt-4">
            <div className="md:w-1/2">
              <h3 className="flex items-center gap-2 text-xl font-semibold">
                <MdMovie className="text-red-500" /> Movies
              </h3>
              <ul className="mt-2 space-y-2 list-disc list-inside">
                {movieCredits.cast.slice(0, 5).map((credit) => (
                  <li key={credit.id}>
                    <span className="font-semibold">{credit.title}</span> as <span className="italic">{credit.character}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 md:mt-0 mt-4">
              <h3 className="flex items-center gap-2 text-xl font-semibold">
                <MdTv className="text-blue-500" /> TV Shows
              </h3>
              <ul className="mt-2 space-y-2 list-disc list-inside">
                {tvCredits.cast.slice(0, 5).map((credit) => (
                  <li key={credit.id}>
                    <span className="font-semibold">{credit.name}</span> as <span className="italic">{credit.character}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-3xl font-bold">Popular Works</h2>
          <HorizontalCards trendingData={popular.cast} mediaType="movie" />
        </div>
      </div>
    </div>
  );
};

export default PopularWithDetails;
