import React from "react";

/**
 * ForecastCard component
 * @param {Array} forecastList - Array of forecast objects from api.js
 */
function ForecastCard({ forecastList }) {
  if (!forecastList) return null;

  return (
    <div className="forecast-container animate-slide-up">
      <h3 className="forecast-title">7-Day Forecast</h3>
      <div className="forecast-grid">
        {forecastList.map((day, index) => {
          // Format the date string (YYYY-MM-DD) into a nice label
          const dateLabel = new Date(day.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });

          return (
            <div key={index} className="forecast-item">
              <span className="forecast-date">{dateLabel}</span>
              <img 
                src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
                alt={day.condition} 
              />
              <span className="forecast-temp">{Math.round(day.maxTemp)}°C</span>
              <span className="forecast-condition">{day.condition}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastCard;
