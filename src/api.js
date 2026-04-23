const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

const WMO_MAP = {
  0: ["Clear sky", "01d"], 1: ["Mainly clear", "02d"], 2: ["Partly cloudy", "03d"], 3: ["Overcast", "04d"],
  45: ["Fog", "50d"], 48: ["Fog", "50d"], 51: ["Drizzle", "09d"], 53: ["Drizzle", "09d"], 55: ["Drizzle", "09d"],
  61: ["Rain", "10d"], 63: ["Rain", "10d"], 65: ["Rain", "10d"], 71: ["Snow", "13d"], 73: ["Snow", "13d"],
  75: ["Snow", "13d"], 95: ["Thunderstorm", "11d"]
};

const getInfo = (code) => {
  const [text, icon] = WMO_MAP[code] || ["Cloudy", "03d"];
  return { text, icon };
};

export async function getWeatherData(city) {
  const geo = await fetch(`${GEO_URL}?name=${city}&count=1&format=json`).then(r => r.json());
  if (!geo.results?.[0]) throw new Error("City not found");
  
  const { latitude: lat, longitude: lon, name, country } = geo.results[0];
  const url = `${WEATHER_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
  const weather = await fetch(url).then(r => r.json());

  return {
    name, country,
    current: {
      temp: weather.current.temperature_2m,
      humidity: weather.current.relative_humidity_2m,
      wind: weather.current.wind_speed_10m,
      ...getInfo(weather.current.weather_code)
    },
    forecast: weather.daily.time.map((date, i) => ({
      date,
      maxTemp: weather.daily.temperature_2m_max[i],
      minTemp: weather.daily.temperature_2m_min[i],
      ...getInfo(weather.daily.weather_code[i])
    }))
  };
}

