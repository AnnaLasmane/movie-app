import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import App from "./App";

test("renders header, hero content and footer", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /movie app/i })
  ).toBeInTheDocument();

  expect(screen.getByRole("contentinfo")).toBeInTheDocument();

  expect(screen.getByText(/© 2024 movie app/i)).toBeInTheDocument();
});
