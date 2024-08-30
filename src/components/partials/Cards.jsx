import React from 'react';
import { Link } from 'react-router-dom';
import { BsFilm, BsTv } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';

const Card = ({ data, mediaType }) => {
  const { id, media_type, poster_path, title, name, release_date, first_air_date, overview, vote_average, profile_path, popularity } = data;
  const mediaTitle = title || name;
  const releaseDate = release_date || first_air_date;
  const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}` : './no-image.svg';

  let mediaIcon;
  let Typeofmedia = mediaType || media_type;

  if (Typeofmedia === 'movie') {
    mediaIcon = <BsFilm className="mr-1 text-yellow-500" />;
  } else if (Typeofmedia === 'tv') {
    mediaIcon = <BsTv className="mr-1 text-red-500" />;
  } else {
    mediaIcon = null;
  }

  const popular = popularity.toFixed(1);

  console.log(data);

  return (
    <Link to={`/${Typeofmedia}/details/${id}`} className="md:w-60 hover:scale-105 flex-shrink-0 w-full m-4 transition-transform duration-500 transform">
      <div className="hover:shadow-2xl bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden rounded-lg shadow-lg">
        <div className="h-80 relative w-full overflow-hidden">
          <img src={imageUrl} alt={mediaTitle} className="hover:scale-105 object-cover w-full h-full transition-transform duration-300 transform" />
        </div>
        <div className="p-4 bg-black bg-opacity-50">
          <h3 className="text-lg font-semibold text-white truncate">{mediaTitle}</h3>
          <div className="flex gap-2 mt-2">
            <p className="text-sm text-gray-300">
              {mediaIcon}
            </p>
            <p className="text-sm text-gray-300">{releaseDate}</p>
          </div>
          <p className="flex items-center mt-2 text-sm text-yellow-400">
            <FaStar className="mr-1" /> {popular || vote_average}
          </p>
          <p className="line-clamp-3 mt-2 text-sm text-gray-300">{overview}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
