import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import MovieDetail from "../components/MovieDetail";
import { getMovieDetails } from "../services/movieService";

jest.mock("../services/movieService", () => ({
  getMovieDetails: jest.fn(),
}));

const mockMovie = {
  title: "Test Movie",
  overview: "This is a test movie",
  poster_path: "/test-poster.jpg",
  release_date: "2024-01-01",
  runtime: 120,
};

describe("MovieDetail Component", () => {
  beforeEach(() => {
    (getMovieDetails as jest.Mock).mockResolvedValue(mockMovie);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders MovieDetail component with movie data", async () => {
    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /test movie/i })
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/this is a test movie/i)).toBeInTheDocument();
    expect(screen.getByText(/2024-01-01/i)).toBeInTheDocument();
    expect(screen.getByText(/120 minutes/i)).toBeInTheDocument();
    expect(screen.getByAltText(/test movie/i)).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/test-poster.jpg"
    );
  });

  test("displays 'No movie found' when no movie data is returned", async () => {
    (getMovieDetails as jest.Mock).mockResolvedValue(null);

    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/no movie found/i)).toBeInTheDocument();
    });
  });
});
