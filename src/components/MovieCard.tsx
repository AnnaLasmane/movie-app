import React from "react";
import { Link } from "react-router-dom";
import "../styles/_movieCard.scss";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterPath }) => {
  return (
    <li className="movie-item">
      <Link to={`/movie/${id}`}>
        <img src={`https://image.tmdb.org/t/p/w200${posterPath}`} alt={title} />
        <p>{title}</p>
      </Link>
    </li>
  );
};

export default MovieCard;
