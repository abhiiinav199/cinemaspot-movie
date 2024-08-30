import axios from '../../utils/AxiosInstance';
import { loadPopularWith, removePopularWith, setError } from '../reducers/PopularWithSlice';

export const fetchPopularWith = (id) => async (dispatch) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const popular = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);


    const response = {
      data: {
        detail: detail.data,
        externalid: externalid.data,
        popular: popular.data,
        tvCredits: tvCredits.data,
        movieCredits: movieCredits.data,
      }
    };

    dispatch(loadPopularWith(response.data));
  } catch (error) {
    console.error(error);
    dispatch(setError(error.message));
  }
};

export { removePopularWith };
