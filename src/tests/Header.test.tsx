import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/Header";

describe("Header Component", () => {
  it("renders the Header component", () => {
    render(<Header />);
    expect(
      screen.getByRole("heading", { name: /movie app/i })
    ).toBeInTheDocument();
  });
});
