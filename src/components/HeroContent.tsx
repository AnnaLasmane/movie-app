import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/Store";
import { fetchMovies, setCurrentPage } from "../redux/movieSlice";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import MovieCard from "./MovieCard";
import Header from "./Header";
import "../styles/_heroContent.scss";

const ITEMS_PER_PAGE = 10;

const HeroContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, totalResults, loading, currentPage } = useSelector(
    (state: RootState) => state.movies
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchMovies({ page: currentPage + 1, query: searchQuery }));
  }, [dispatch, currentPage, searchQuery]);

  const handlePageClick = (data: { selected: number }) => {
    dispatch(setCurrentPage(data.selected));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    dispatch(setCurrentPage(0));
  };

  if (loading) {
    return <Spinner />;
  }

  const pageCount = Math.ceil(totalResults / ITEMS_PER_PAGE);

  return (
    <div className="hero-content">
      <Header onSearch={handleSearch} />
      <ul className="movie-list">
        {movies.slice(0, ITEMS_PER_PAGE).map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
          />
        ))}
      </ul>
      <Pagination
        pageCount={pageCount}
        onPageChange={handlePageClick}
        currentPage={currentPage}
      />
    </div>
  );
};

export default HeroContent;
