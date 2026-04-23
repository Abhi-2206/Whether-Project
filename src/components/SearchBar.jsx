import React from "react";

/**
 * SearchBar component for entering city names
 * @param {Object} props - city (current state), setCity (state setter), onSearch (submit handler)
 */
function SearchBar({ city, setCity, onSearch }) {
  // Handle the form submission
  const handleSubmit = (event) => {
    // Prevent the page from reloading
    event.preventDefault();
    // Only search if city name is not empty
    if (city.trim()) {
      onSearch();
    }
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name (e.g., London, Tokyo)..."
        value={city}
        // Update the city state as user types
        onChange={(e) => setCity(e.target.value)}
        className="search-input"
        required
      />
      <button type="submit" className="search-button">
        Find Weather
      </button>
    </form>
  );
}

export default SearchBar;
