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
      previousLabel={"previous"}
      nextLabel={"next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      activeClassName={"active"}
      forcePage={currentPage}
      previousClassName={currentPage === 0 ? "hidden" : ""}
    />
  );
};

export default Pagination;
