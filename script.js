const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");
const API_KEY = "ae02e446861bd64c7ae65f0dbaf5f215"; // API key for OpenWeatherMap API

// get coordinate from open weather api

async function getCityCoordinates() {
  const cityName = cityInput.value.trim();
  if (cityName === "") return;
  const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!data.length) return alert(`No coordinates found for ${cityName}`);
    const { lat, lon, name } = data[0];
    getWeatherDetails(name, lat, lon);
  } catch (error) {
    alert("An error occurred while fetching the coordinates!");
  }
}

// get weather details from open-meteor

async function getWeatherDetails(cityName, latitude, longitude) {
  const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min`;
  try {
    const response = await fetch(WEATHER_API_URL);
    const data = await response.json();

    // Process the weather
    const currentWeather = data.current; // Access current weather data
    const dailyForecast = data.daily; // Access daily forecast data

    currentWeatherDiv.innerHTML = `
	<div class="details">
	<h2>${cityName}</h2>
	<h6>Wind Speed: ${currentWeather.wind_speed_10m} m/s</h6>
	<h6> ${currentWeather.wind_speed_10m} m/s</h6>
	<h6>${currentWeather.wind_direction_10m}°</h6>
  </div>
    `;

    // Update weather cards for the next seven days
  } catch (error) {
    alert("An error occurred while fetching the weather details!");
  }
}

searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", (e) => e.key === "Enter" && getCityCoordinates());
