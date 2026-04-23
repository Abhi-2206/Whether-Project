import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import { getWeatherData } from "./api";
import "./App.css";

/**
 * Main App component
 * Manages the state and coordinates data fetching
 */
function App() {
  const [city, setCity] = useState("");
  const [weatherResults, setWeatherResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Main function to handle weather search using Open-Meteo
   */
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setWeatherResults(null);

    try {
      // getWeatherData now returns both current and forecast in one clean object
      const results = await getWeatherData(city);
      setWeatherResults(results);
    } catch (err) {
      setError(err.message || "Failed to find city. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="logo-text">SkyCast</h1>
        <p className="subtitle">Modern Weather Insights</p>
      </header>

      <main className="content">
        <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Gathering atmospheric data...</p>
          </div>
        )}

        {error && (
          <div className="error-message animate-shake">
            <p>Oops! {error}</p>
          </div>
        )}

        {/* Display results only if data is loaded and no error */}
        {!loading && !error && weatherResults && (
          <div className="results-wrapper">
            <WeatherCard data={weatherResults} />
            <ForecastCard forecastList={weatherResults.forecast} />
          </div>
        )}

        {!loading && !error && !weatherResults && (
          <div className="empty-state">
            <p>Search for a city (e.g., Paris, Tokyo) to get started.</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Built with Open-Meteo & SkyCast Logic</p>
      </footer>
    </div>
  );
}

export default App;
