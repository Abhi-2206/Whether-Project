import React from "react";

/**
 * WeatherCard component
 * @param {Object} data - The custom-formatted data object from api.js
 */
function WeatherCard({ data }) {
  if (!data) return null;

  // With Open-Meteo, we structured the data in api.js to be easy to read here
  const { current, name, country } = data;

  return (
    <div className="weather-card animate-fade-in">
      <div className="card-header">
        <h2>{name}, {country}</h2>
        <div className="weather-status">
          <img 
            src={`https://openweathermap.org/img/wn/${current.icon}@4x.png`} 
            alt={current.condition} 
            className="weather-icon"
          />
          <span className="condition-text">{current.condition}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="temp-display">
          <span className="temp-value">{Math.round(current.temp)}</span>
          <span className="temp-unit">°C</span>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Humidity</span>
            <span className="stat-value">{current.humidity}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Wind Speed</span>
            <span className="stat-value">{current.wind} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
