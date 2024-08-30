import { useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/AxiosInstance';

const TopNav = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [search, Setsearch] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const searchResults = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${searchTerm}`);
      Setsearch(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      searchResults();
    } else {
      Setsearch([]);
    }
  }, [searchTerm]);

  console.log(search);

  return (
    <>
      {/* Search Bar  */}
      <div className="relative">
        <div className="flex items-center w-[40vw] p-2 m-4 mx-auto text-white bg-gray-700 rounded-md">
          <FaSearch className="ml-2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search..."
            className="w-full px-2 text-white bg-transparent border-none outline-none"
          />
          {searchTerm && (
            <FaTimes className="mr-2 text-gray-400 cursor-pointer" onClick={handleClear} />
          )}
        </div>

        {/* Search Results */}
        {searchTerm && search.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white w-full max-h-[50vh] mx-auto flex flex-col items-center max-w-lg overflow-auto rounded-lg shadow-lg z-50 mt-2">
            {search.map((result, index) => (
              <Link
                key={index}
                to={`/${result.media_type}/details/${result.id}`}
                className="hover:bg-gray-100 flex items-center w-full p-4 mb-2 transition duration-300 ease-in-out rounded-lg"
              >
                <img
                  src={
                    result.poster_path || result.backdrop_path || result.profile_path
                      ? `https://image.tmdb.org/t/p/w200${result.poster_path || result.backdrop_path || result.profile_path}`
                      : './no-image.svg'
                  }
                  alt={result.title || result.name}
                  className="object-cover w-16 h-16 mr-4 rounded-md"
                />
                <span className="font-semibold text-gray-900">
                  {result.title || result.name || result.original_name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TopNav;
