import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Spinner from "../components/Spinner";

describe("Spinner Component", () => {
  test("renders the Spinner component", () => {
    render(<Spinner />);

    const spinnerElement = screen.getByTestId("spinner");
    expect(spinnerElement).toBeInTheDocument();

    expect(spinnerElement).toHaveClass("spinner");

    const doubleBounce1 = spinnerElement.querySelector(".double-bounce1");
    const doubleBounce2 = spinnerElement.querySelector(".double-bounce2");
    expect(doubleBounce1).toBeInTheDocument();
    expect(doubleBounce2).toBeInTheDocument();
  });
});
