import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../services/movieService";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import "../styles/_heroContent.scss";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const ITEMS_PER_PAGE = 10;

const HeroContent: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchMovies = async (page: number) => {
      setLoading(true);
      try {
        const data = await getMovies(page + 1);
        setMovies(data.results);
        setTotalResults(data.total_results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies(currentPage); // Fetch movies for the current page
  }, [currentPage]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
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
