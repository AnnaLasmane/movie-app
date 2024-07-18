import React, { useState } from "react";
import "../styles/_header.scss";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="header" role="banner">
      <h1>Movie App</h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default Header;
