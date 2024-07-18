import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../components/Pagination";

describe("Pagination Component", () => {
  const mockOnPageChange = jest.fn();

  const renderComponent = (currentPage = 0) => {
    return render(
      <Pagination
        pageCount={10}
        onPageChange={mockOnPageChange}
        currentPage={currentPage}
      />
    );
  };

  test("renders Pagination component with correct number of pages", () => {
    renderComponent();

    expect(screen.getByRole("navigation")).toBeInTheDocument();

    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons.length).toBeGreaterThanOrEqual(3);
  });

  test("calls onPageChange with the correct page number when a page is clicked", async () => {
    renderComponent();

    const pageButton = screen.getByText("2");
    fireEvent.click(pageButton);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockOnPageChange).toHaveBeenCalledWith({ selected: 1 });
  });

  test("disables the Previous button on the first page", () => {
    renderComponent();

    const previousButton = screen.getByText("Previous").closest("li");
    expect(previousButton).toHaveClass("hidden");
  });

  test("does not disable the Previous button on any other page", () => {
    renderComponent(1);

    const previousButton = screen.getByText("Previous").closest("li");
    expect(previousButton).not.toHaveClass("hidden");
  });

  test("displays the correct active page", () => {
    renderComponent(2);

    const activePageButton = screen.getByText("3").closest("li");
    expect(activePageButton).toHaveClass("active");
  });
});
