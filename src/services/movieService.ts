// src/services/movieService.ts
import axios from "axios";

const API_KEY = "8b496706b8901d1260b07a80852b20c3";
const BASE_URL = "https://api.themoviedb.org/3";
export const getMovies = async (page: number, query: string = "") => {
  const response = await axios.get(
    `${BASE_URL}${query ? "/search/movie" : "/movie/popular"}`,
    {
      params: {
        api_key: API_KEY,
        query: query ? query : undefined,
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
