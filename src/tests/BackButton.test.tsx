import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import BackButton from "../components/BackButton";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

test("renders BackButton and navigates back on click", () => {
  render(
    <MemoryRouter>
      <BackButton />
    </MemoryRouter>
  );

  const backButton = screen.getByRole("button", { name: /back/i });
  expect(backButton).toBeInTheDocument();

  fireEvent.click(backButton);
  expect(mockNavigate).toHaveBeenCalledWith(-1);
});
