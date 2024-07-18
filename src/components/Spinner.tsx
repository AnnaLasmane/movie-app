import React from "react";
import "../styles/_spinner.scss";

const Spinner: React.FC = () => {
  return (
    <div className="spinner" data-testid="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
};

export default Spinner;
