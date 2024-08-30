import axios from '../../utils/AxiosInstance';
import { loadTVShows, setError, removeTVShows } from '../reducers/TVShowsSlice';

export const fetchTVShow = (id) => async (dispatch) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const credits = await axios.get(`/tv/${id}/credits`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchprovider = await axios.get(`/tv/${id}/watch/providers`);

    const response = {
      data: {
        detail: detail.data,
        credits: credits.data,
        videos: videos.data.results.find(m => m.type === 'Trailer'),
        externalid: externalid.data,
        recommendations: recommendations.data.results,
        similar: similar.data.results,
        watchprovider: watchprovider.data.results.IN,
      }
    };

    dispatch(loadTVShows(response.data));
  } catch (error) {
    console.error(error);
    dispatch(setError(error.message));
  }
};

export { removeTVShows };
