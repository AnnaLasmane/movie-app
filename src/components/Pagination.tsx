import React from "react";
import ReactPaginate from "react-paginate";
import "../styles/_pagination.scss";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  currentPage,
}) => {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={(selectedItem) => onPageChange(selectedItem)}
      containerClassName={"pagination"}
      activeClassName={"active"}
      forcePage={currentPage}
      previousClassName={currentPage === 0 ? "hidden" : ""}
    />
  );
};

export default Pagination;
