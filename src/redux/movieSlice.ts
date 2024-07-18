import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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
  currentPage: number;
}

const initialState: MovieState = {
  movies: [],
  totalResults: 0,
  loading: false,
  currentPage: 0,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ page, query }: { page: number; query: string }) => {
    const response = await getMovies(page, query);
    return response;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.results;
        state.totalResults = action.payload.total_results;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCurrentPage } = movieSlice.actions;
export default movieSlice.reducer;
