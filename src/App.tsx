import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeroContent from "./components/HeroContent";
import Footer from "./components/Footer";
import MovieDetail from "./components/MovieDetail";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HeroContent />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
