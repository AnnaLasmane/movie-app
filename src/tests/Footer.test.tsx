import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../components/Footer";

test("renders Footer with correct text", () => {
  render(<Footer />);

  const footerText = screen.getByText(/© 2024 Movie App/i);
  expect(footerText).toBeInTheDocument();
});
