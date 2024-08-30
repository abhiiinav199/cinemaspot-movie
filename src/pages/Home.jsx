import SideNav from '../components/navigation/SideNav';
import TopNav from '../components/navigation/TopNav';
import Banner from '../components/partials/Banner';
import { useEffect, useState } from 'react';
import axios from '../utils/AxiosInstance';
import HorizontalCards from '../components/partials/HorizontalCards';
import Dropdown from '../components/navigation/DropDown';
import Loading from '../components/partials/Loading';

const Home = () => {
  document.title = 'CinemaSpot | Home';

  const [wallpapers, setWallpapers] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [options, setOptions] = useState('all');
  const [loading, setLoading] = useState(true);

  // Fetching data for carousel
  const fetchWallpapers = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      setWallpapers(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetching data for trending
  const trending = async () => {
    try {
      const { data } = await axios.get(`/trending/${options}/day`);
      setTrendingData(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  // Use effect to fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchWallpapers();
      await trending();
      setLoading(false);
    };

    fetchData();
  }, [options]);

  const handleDropdownChange = (e) => {
    setOptions(e.target.value);
  };

  // Conditionally render content or loading spinner
  return (
    <div className='bg-gradient-to-b from-gray-900 to-gray-800 flex w-full h-screen'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full md:w-[20%] h-screen">
            <SideNav />
          </div>
          <div className="w-full md:w-[80%] flex flex-col h-full border-l-2 border-zinc-400 overflow-auto overflow-x-hidden">
            <TopNav />
            <div className="flex-1 overflow-y-auto">
              <Banner wallpapers={wallpapers} />
              <div className='place-content-between flex px-4 pt-5'>
                <h2 className="mb-4 text-2xl font-bold text-white">Trending</h2>
                <Dropdown placeholder="Filter" filters={['all', 'movie', 'tv']} func={handleDropdownChange} />
              </div>
              <HorizontalCards trendingData={trendingData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
