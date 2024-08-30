import { Link } from 'react-router-dom';
import { FaFire, FaStar, FaFilm, FaTv, FaHeart, FaInfoCircle, FaEnvelope } from 'react-icons/fa';

const SideNav = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col w-full h-screen text-white shadow-lg">
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center h-20 shadow-md">
        <img src="./vite.svg" alt="Logo" className="w-12 h-12 rounded-full" />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h1 className="mb-6 text-3xl font-extrabold tracking-wide">NewsFeed</h1>
        <nav className="flex flex-col mb-6 space-y-4">
          <Link to="/trending" className="hover:bg-gray-700 hover:scale-105 flex items-center p-3 transition duration-300 ease-in-out transform rounded-lg">
            <FaFire className="mr-3 text-yellow-500" />
            <span className="font-semibold">Trending</span>
          </Link>
          <Link to="/popular" className="hover:bg-gray-700 hover:scale-105 flex items-center p-3 transition duration-300 ease-in-out transform rounded-lg">
            <FaStar className="mr-3 text-blue-500" />
            <span className="font-semibold">Popular</span>
          </Link>
          <Link to="/movies" className="hover:bg-gray-700 hover:scale-105 flex items-center p-3 transition duration-300 ease-in-out transform rounded-lg">
            <FaFilm className="mr-3 text-red-500" />
            <span className="font-semibold">Movies</span>
          </Link>
          <Link to="/tv-shows" className="hover:bg-gray-700 hover:scale-105 flex items-center p-3 transition duration-300 ease-in-out transform rounded-lg">
            <FaTv className="mr-3 text-green-500" />
            <span className="font-semibold">TV Shows</span>
          </Link>
          <Link to="/popular-with" className="hover:bg-gray-700 hover:scale-105 flex items-center p-3 transition duration-300 ease-in-out transform rounded-lg">
            <FaHeart className="mr-3 text-pink-500" />
            <span className="font-semibold">Popular with</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SideNav;
