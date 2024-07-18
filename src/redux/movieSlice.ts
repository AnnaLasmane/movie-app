import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovies } from "../services/movieService";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieState {
  movies: Movie[];
  totalResults: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: MovieState = {
  movies: [],
  totalResults: 0,
  loading: false,
  error: null,
  currentPage: 0,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (page: number) => {
    const response = await getMovies(page);
    return response;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.results;
        state.totalResults = action.payload.total_results;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
      });
  },
});

export const { setCurrentPage } = movieSlice.actions;

export default movieSlice.reducer;
