import axios from '../../utils/AxiosInstance';
import { loadMovie, setError, removeMovie } from '../reducers/MovieSlice';

export const fetchMovie = (id) => async (dispatch) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const credits = await axios.get(`/movie/${id}/credits`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchprovider = await axios.get(`/movie/${id}/watch/providers`);

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

    dispatch(loadMovie(response.data));
  } catch (error) {
    console.error(error);
    dispatch(setError(error.message));
  }
};

export { removeMovie };