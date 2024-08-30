import React, { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import TopNav from "../components/navigation/TopNav";
import Dropdown from "../components/navigation/DropDown";
import Loading from "../components/partials/Loading";
import Cards from "../components/partials/Cards";
import ScrollToTopButton from "../components/partials/ScrollToTopButton";
import InfiniteScroll from "react-infinite-scroll-component";

const Movies = () => {
  const [category, setCategory] = useState("upcoming");
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const fetchMovieData = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?language=en-US&page=${page}`);
      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        setMovieData((prevData) => [...prevData, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setMovieData([]);
      setPage(1);
      setHasMore(true);
      await fetchMovieData();
      setLoading(false);
    };

    fetchData();
  }, [category]);

  console.log(movieData);

  return loading ? (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center min-h-screen">
      <Loading />
    </div>
  ) : (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col w-full min-h-screen px-4">
      <div className="flex items-center py-4">
        <div className="flex items-center gap-4">
          <FaArrowLeftLong
            onClick={() => navigate(-1)}
            className="hover:text-purple-500 text-4xl text-white transition duration-300 cursor-pointer"
          />
          <h1 className="text-3xl font-bold text-white">Movies</h1>
        </div>
      </div>
      <div className="md:flex-row flex flex-col items-center justify-between mt-4">
        <div className="flex justify-center flex-grow">
          <TopNav />
        </div>
        <div className="md:mt-0 flex items-center mt-4 space-x-4">
          <Dropdown
            placeholder="Category"
            filters={['now_playing', 'popular', 'top_rated', 'upcoming']}
            value={category}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        className="sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 grid grid-cols-1 gap-6 mt-6"
        dataLength={movieData.length}
        next={fetchMovieData}
        hasMore={hasMore}
        loader={<h1 className="text-center text-white">Loading...</h1>}
      >
        {movieData.map((media, index) => (
          <Cards mediaType='movie' key={index} data={media} />
        ))}
      </InfiniteScroll>
      <ScrollToTopButton />
    </div>
  );

}

export default Movies