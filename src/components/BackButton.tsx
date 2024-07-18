import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/_backButton.scss";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <button className="back-button" onClick={handleBackClick}>
      &larr; Back
    </button>
  );
};

export default BackButton;
