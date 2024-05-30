const countryInput = document.querySelector(".country-input");
const searchButton = document.querySelector(".bx-search");

const API_KEY = "ae02e446861bd64c7ae65f0dbaf5f215";

// get coordinate using openweather api
const getCountryCoordinates = async () => {
  const countryName = countryInput.value.trim();
  if (!countryName) return;
  const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${countryName}&limit=1&appid=${API_KEY}`;

  try {
    const response = await fetch(GEOCODING_API_URL);
    const data = await response.json();

    if (!data.length) return alert(`No coordinates found for ${countryName}`);
    const { name, lat, lon } = data[0];
    getWeatherDetails(name, lat, lon);
  } catch (error) {
    alert("An error occurred fetching country coordinates");
  }
};

// get weatherDetail for open-meteor api
const getWeatherDetails = async (countryName, lat, lon) => {
  const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min`;

  try {
    const response = await fetch(WEATHER_API_URL);
    const data = await response.json();
    console.log(data); // Process or display the weather data here
  } catch (error) {
    alert("An error occurred fetching weather data forecast");
  }
};

searchButton.addEventListener("click", getCountryCoordinates);
countryInput.addEventListener("keyup", (e) => e.key === "Enter" && getCityCoordinates());
