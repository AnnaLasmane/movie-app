import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/Header";

describe("Header Component", () => {
  test("renders header with search input and button", () => {
    const handleSearch = jest.fn();

    render(<Header onSearch={handleSearch} />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /movie app/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search movies...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("calls onSearch with the input value when the form is submitted", () => {
    const handleSearch = jest.fn();

    render(<Header onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText("Search movies...");
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "Inception" } });
    fireEvent.click(button);

    expect(handleSearch).toHaveBeenCalledWith("Inception");
  });
});
