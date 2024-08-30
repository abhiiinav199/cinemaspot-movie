import React, { useEffect, useState } from 'react';
import { BsFilm, BsTv } from 'react-icons/bs';
import { RiCalendar2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Banner = ({ wallpapers }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % wallpapers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [wallpapers]);

  if (wallpapers.length === 0) return null;

  const currentImage = wallpapers[currentImageIndex].backdrop_path;
  const currentTitle = wallpapers[currentImageIndex].title || wallpapers[currentImageIndex].name;
  const releaseDate = wallpapers[currentImageIndex].release_date;
  const mediaType = wallpapers[currentImageIndex].media_type;
  const currentOverview = wallpapers[currentImageIndex].overview;
  const id = wallpapers[currentImageIndex].id;

  const formatReleaseDate = (date) => {
    return date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Release Date Not Announced';
  };

  const limitWords = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  const MediaIcon = () => {
    if (mediaType === 'movie') {
      return <BsFilm className="md:text-4xl inline-block mr-2 text-3xl text-yellow-500" />;
    } else if (mediaType === 'tv') {
      return <BsTv className="md:text-4xl inline-block mr-2 text-3xl text-red-500" />;
    } else {
      return null;
    }
  };

  return (
    <div className="lg:h-96 h-80 relative w-full overflow-hidden shadow-lg">
      {currentImage && (
        <img
          src={`https://image.tmdb.org/t/p/original${currentImage}`}
          alt="Backdrop"
          className="object-fit w-full h-full transition-transform duration-1000 ease-in-out transform scale-105"
          key={currentImageIndex}
        />
      )}
      <div className="bg-gradient-to-t from-black to-transparent opacity-80 absolute inset-0"></div>
      <div className="bottom-12 left-4 absolute z-10 text-white">
        <div className="flex items-center mb-2">
          <MediaIcon />
          <h1 className="md:text-4xl drop-shadow-lg text-2xl font-bold">{currentTitle}</h1>
        </div>
        <p className="md:text-base flex items-center mb-1 text-sm"><RiCalendar2Line className="mr-1 text-gray-400" /> {formatReleaseDate(releaseDate)}</p>
        <p className="md:text-base text-sm text-gray-300">{limitWords(currentOverview, 20)}</p>
        {currentOverview.split(' ').length > 20 && (
          <p className="mt-2 text-sm">
            <Link to={`/${mediaType}/details/${id}`} className="hover:underline text-blue-500">Read more...</Link>
          </p>
        )}
        <Link to={`/${mediaType}/details/${id}/trailer`}>
          <button className="hover:bg-purple-800 px-4 py-2 mt-4 font-semibold text-white transition-colors duration-300 bg-purple-700 rounded-md">
            Watch Trailer
          </button>
        </Link>

      </div>
    </div>
  );
};

export default Banner;
