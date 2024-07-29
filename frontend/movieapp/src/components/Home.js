import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <div className="welcome-section">
        <h1>Welcome to MovieApp</h1>
        <p>Your go-to place for booking movie tickets.</p>
        <a href="/movies" className="explore-button">Explore Movies</a>
      </div>
    </div>
  );
}

export default Home;
