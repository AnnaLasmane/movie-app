import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieService";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import "../styles/_movieDetail.scss";

interface Movie {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(Number(id));
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!movie) {
    return <div>No movie found</div>;
  }

  return (
    <div className="movie-detail">
      <div className="movie-detail-header">
        <BackButton />
        <h1>{movie.title}</h1>
      </div>
      <div className="movie-detail-content">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-detail-text">
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
