import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/Store";
import { fetchMovies, setCurrentPage } from "../redux/movieSlice";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import MovieCard from "./MovieCard";
import "../styles/_heroContent.scss";

const ITEMS_PER_PAGE = 10;

const HeroContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, totalResults, loading, currentPage } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies(currentPage + 1));
  }, [dispatch, currentPage]);

  const handlePageClick = (data: { selected: number }) => {
    dispatch(setCurrentPage(data.selected));
  };

  if (loading) {
    return <Spinner />;
  }

  const pageCount = Math.ceil(totalResults / ITEMS_PER_PAGE);

  return (
    <div className="hero-content">
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
