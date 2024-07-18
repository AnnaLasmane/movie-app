import axios from "axios";

const API_KEY = "8b496706b8901d1260b07a80852b20c3";
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovies = async (page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        page: page,
        language: "en-US",
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (movieId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
