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

const Trending = () => {
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [loading, setLoading] = useState(true);
  const [trendingData, setTrendingData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const fetchTrendingData = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        setTrendingData((prevData) => [...prevData, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTrendingData([]);
      setPage(1);
      setHasMore(true);
      await fetchTrendingData();
      setLoading(false);
    };

    fetchData();
  }, [category, duration]);

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
          <h1 className="text-3xl font-bold text-white">Trending</h1>
        </div>
      </div>
      <div className="md:flex-row flex flex-col items-center justify-between mt-4">
        <div className="flex justify-center flex-grow">
          <TopNav />
        </div>
        <div className="md:mt-0 flex items-center mt-4 space-x-4">
          <Dropdown
            placeholder="Category"
            filters={['all', 'movie', 'tv']}
            value={category}
            func={(e) => setCategory(e.target.value)}
          />
          <Dropdown
            placeholder="Duration"
            filters={['day', 'week']}
            value={duration}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        className="sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 grid grid-cols-1 gap-6 mt-6"
        dataLength={trendingData.length}
        next={fetchTrendingData}
        hasMore={hasMore}
        loader={<h1 className="text-center text-white">Loading...</h1>}
      >
        {trendingData.map((media, index) => (
          <Cards key={index} data={media} />
        ))}
      </InfiniteScroll>
      <ScrollToTopButton />
    </div>
  );
};

export default Trending;
