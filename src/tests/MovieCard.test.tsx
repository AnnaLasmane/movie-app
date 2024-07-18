import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import MovieCard from "../components/MovieCard";

describe("MovieCard Component", () => {
  const mockProps = {
    id: 1,
    title: "Test Movie",
    posterPath: "/test-poster.jpg",
  };

  test("renders MovieCard component with title and image", () => {
    render(
      <Router>
        <MovieCard {...mockProps} />
      </Router>
    );

    const linkElement = screen.getByRole("link", { name: /test movie/i });
    expect(linkElement).toBeInTheDocument();

    const imageElement = screen.getByAltText(/test movie/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w200/test-poster.jpg"
    );

    const titleElement = screen.getByText(/test movie/i);
    expect(titleElement).toBeInTheDocument();
  });
});
