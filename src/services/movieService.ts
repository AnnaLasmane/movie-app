import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getMovies = async (page: number, query: string = "") => {
  const response = await axios.get(
    `${BASE_URL}${query ? "/search/movie" : "/movie/popular"}`,
    {
      params: {
        api_key: API_KEY,
        query: query || undefined,
        page,
      },
    }
  );
  return response.data;
};

export const getMovieDetails = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
};
