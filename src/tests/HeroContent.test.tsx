import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../redux/Store";
import HeroContent from "../components/HeroContent";

jest.mock("../services/movieService", () => ({
  getMovies: jest.fn(() =>
    Promise.resolve({
      results: [
        { id: 1, title: "Movie 1", poster_path: "/movie1.jpg" },
        { id: 2, title: "Movie 2", poster_path: "/movie2.jpg" },
      ],
      total_results: 2,
    })
  ),
}));

test("renders HeroContent component with movies", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <HeroContent />
      </MemoryRouter>
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText(/movie 1/i)).toBeInTheDocument();
    expect(screen.getByText(/movie 2/i)).toBeInTheDocument();
  });
});
