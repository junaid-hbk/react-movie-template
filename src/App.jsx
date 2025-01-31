import React, { useState, useEffect } from 'react';
import Moviecard from './Moviecard.jsx';
import './App.css';

const Api_url = 'https://www.omdbapi.com?apikey=929189c0';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (searchTerm !== "") {
      searchMovie(searchTerm);
    } else {
      setMovies([]); // Clear movies when search term is empty
    }
  }, [searchTerm]);

  const searchMovie = async (title) => {
    try {
      const response = await fetch(`${Api_url}&s=${title}`);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className='app'>
      <h1>HBK MovieLand</h1>
      <div className='search'>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search for the movies'
        />
        <img
          src="https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg"
          alt="search"
          onClick={() => searchMovie(searchTerm)} // Fixed function name here
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <Moviecard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
