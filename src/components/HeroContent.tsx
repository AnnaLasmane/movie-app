import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/Store";
import { fetchMovies, setCurrentPage } from "../redux/movieSlice";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
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
          <li className="movie-item" key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </Link>
          </li>
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
