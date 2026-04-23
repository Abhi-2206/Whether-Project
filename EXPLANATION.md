# SkyCast Code Explanation

This document provides a line-by-line explanation of the SkyCast Weather App codebase to help you understand how everything fits together.

---

## 1. `src/api.js` (The Logic Layer)
This file handles all communication with the outside world (the Open-Meteo API).

- **`GEO_URL` & `WEATHER_URL`**: These are the "addresses" for the two services we use—one to find city coordinates and one to get the actual weather.
- **`getWeatherInfo(code)`**: 
    - Open-Meteo gives us numbers (like `0` or `95`) for weather conditions.
    - This function uses a "map" (an object) to turn those numbers into friendly text like "Clear sky" or "Thunderstorm" and matching icons.
- **`getWeatherData(city)`**: This is an `async` function, meaning it waits for data to arrive without freezing the app.
    - **`fetch(GEO_URL...)`**: We first ask for the latitude and longitude of the city name.
    - **`if (!geoResponse.ok)`**: We check if the internet request worked.
    - **`if (!geoData.results)`**: We check if the city actually exists.
    - **`fetch(WEATHER_URL...)`**: We use the discovered coordinates to ask for the current temperature and the 7-day forecast.
    - **`.map(...)`**: We loop through the forecast list and format each day into a clean object that our components can easily read.

---

## 2. `src/components/SearchBar.jsx` (The Input)
This component captures what the user types.

- **`SearchBar({ city, setCity, onSearch })`**: It receives three "props" (data/functions) from the parent.
- **`handleSubmit`**: 
    - **`event.preventDefault()`**: Prevents the browser from refreshing the page when you click the button.
    - **`onSearch()`**: Tells the parent component (`App.jsx`) to start fetching data.
- **`<input>`**:
    - **`value={city}`**: Connects the input box to our React state.
    - **`onChange`**: Every time you type a letter, it updates the state so React knows what you've typed.

---

## 3. `src/components/WeatherCard.jsx` (Current Weather Display)
This shows the "Right Now" weather.

- **`const { current, name, country } = data`**: We use "destructuring" to pull out only the pieces of data we need from the big object.
- **`Math.round(current.temp)`**: We round the temperature to the nearest whole number (e.g., 22.4 becomes 22).
- **`<img src={...}>`**: We use a dynamic URL to fetch the weather icon from OpenWeatherMap's icon library based on the code we mapped earlier.

---

## 4. `src/components/ForecastCard.jsx` (7-Day Forecast)
This handles the list of upcoming days.

- **`forecastList.map((day, index) => ...)`**: This is the heart of the component. It takes the array of 7 days and "maps" each one into a visual HTML block.
- **`new Date(day.date).toLocaleDateString(...)`**: This converts a plain date string (like "2026-04-09") into something readable like "Thu, Apr 9".
- **`key={index}`**: React needs a unique "key" for each item in a list to keep track of them efficiently.

---

## 5. `src/App.jsx` (The Brain)
This is the master component that holds all current information (state).

- **`useState`**: We use this to remember the city name, the weather results, whether we are currently loading, and if there are any errors.
- **`handleSearch`**: 
    - It sets `loading` to `true` (so the spinner shows).
    - It calls `getWeatherData` from our logic file.
    - It saves the results into `weatherResults`.
    - **`finally { setLoading(false) }`**: This ensures the spinner stops whether the search worked or failed.
- **Conditional Rendering**:
    - **`{loading && ...}`**: Only shows the spinner if `loading` is true.
    - **`{error && ...}`**: Only shows the error message if an error exists.
    - **`{!loading && weatherResults && ...}`**: Only shows the weather cards if we are NOT loading and we actually have data.

---

## 6. `src/App.css` (The Look)
- **`backdrop-filter: blur(10px)`**: Creates that premium "frosted glass" effect.
- **`linear-gradient`**: Gives the background and buttons those deep, vibrant colors.
- **`@keyframes`**: Defines the smooth entry animations (Fade In, Slide Up, Shake) that make the app feel alive.
