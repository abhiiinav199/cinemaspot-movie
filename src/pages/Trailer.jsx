import React from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes('movie') ? 'movie' : 'tvShows';
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,.9)] z-[100]'>
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 right-10 text-red-500 text-2xl focus:outline-none hover:text-red-700 transition duration-300 z-[200]">
        <FaTimes />
      </button>
      <div className="relative w-[90vw] h-[80vh] max-w-screen-lg">
        <div className="aspect-w-16 aspect-h-9">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
            width='100%'
            height='100%'
            controls
            className="absolute top-0 left-0"
          />
        </div>
      </div>
    </div>
  );
}

export default Trailer;
