import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HorizontalCards = ({ trendingData }) => {
  const containerRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <button
          onClick={scrollLeft}
          className="hover:bg-gray-700 absolute left-0 z-10 p-2 text-white bg-gray-800 rounded-full shadow-lg"
        >
          <FaChevronLeft />
        </button>
        <div
          ref={containerRef}
          className="horizontal-scroll flex space-x-4 overflow-hidden overflow-x-auto"
        >
          {trendingData.map((item) => (
            <Link
              key={item.id}
              to={`/${item.media_type}/details/${item.id}`}
              className="hover:scale-105 flex-shrink-0 w-48 overflow-hidden transition duration-300 transform bg-gray-800 rounded-lg shadow-lg"
            >
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                    : './no-image.jpg'
                }
                alt={item.title || item.name}
                className="h-72 object-cover w-full"
              />
              <div className="p-2">
                <h3 className="text-lg font-semibold text-white">
                  {item.title || item.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {item.release_date || item.first_air_date}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="hover:bg-gray-700 absolute right-0 z-10 p-2 text-white bg-gray-800 rounded-full shadow-lg"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default HorizontalCards;
