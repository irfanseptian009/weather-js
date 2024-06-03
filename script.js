const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const sevenDaysCardsDiv = document.querySelector(".sevenDays-cards");
const hourlyCardsDiv = document.querySelector(".hourly-cards");
const pressureCardDiv = document.querySelector(".pressure-card");
const windCardDiv = document.querySelector(".wind-card");

const API_KEY = "ae02e446861bd64c7ae65f0dbaf5f215"; // API key for OpenWeatherMap API

// Get coordinates from API OpenWeatherMap
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

// Get data api from API Open-Meteo
async function getWeatherDetails(cityName, latitude, longitude) {
  const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,weather_code,visibility,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max&timezone=auto`;
  try {
    const response = await fetch(WEATHER_API_URL);
    const data = await response.json();

    const currentWeather = data.current;
    const dailyForecast = data.daily;
    const hourlyForecast = data.hourly;

    console.log(data);

    // process for current weather
    currentWeatherDiv.innerHTML = `
	<div class="current-weather">
      <div class="details">
        <h2>${cityName}</h2>
		<img 
		class="weather-icon" 
		<img src=${wmo[currentWeather.weather_code].day.image} alt="Weather-Icon"/>
        <h4  class="temperature">${currentWeather.apparent_temperature}°C</h4>
        <h5 class="description">${wmo[currentWeather.weather_code].day.description}</h5>
		<div class="current-cards">
		<div class="current-card">
		<i class="bx bx-water"></i>
		<h3> Humidity</h3>
		  <ul>
			<li>
			  <h4>${currentWeather.relative_humidity_2m}%</h4>
			  <h6>the due point is 25°C</h6>
			</li>
		  </ul>
		</div>
		<div class="current-card">
		<i class='bx bx-cloud-drizzle'></i>
		  <h3> precipitation</h3>
		  <ul>
			<li>
			  <h4>${currentWeather.precipitation} mm"</h4>
			  <h6>in last 24h <br>excepted in next 24h</h6>
			</li>
		  </ul>
		</div>
		<div class="current-card">
		<i class='bx bx-timer'></i> 
		  <h3>Interval</h3>
		  <ul>
			<li>
			  <h4>
			  ${currentWeather.interval}s</h4>
			  <h6>an interval scale</h6>
			</li>
		  </ul>
		</div>
		<div class="current-card">
		<i class='bx bx-cloud'></i>
		  <h3> Cloud Cover</h3>
		  <ul>
			<li>
			  <h4>${currentWeather.cloud_cover}%</h4>
			  <h6> fraction of the sky clouds on average</h6>
			</li>
		  </ul>
		</div>
	  </div>
      </div>
    `;

    // process for seven days forecast
    sevenDaysCardsDiv.innerHTML = "";
    for (let i = 0; i < dailyForecast.time.length; i++) {
      sevenDaysCardsDiv.innerHTML += `
	  
    <li class="card">
      <h3>${dailyForecast.time[i]}</h3>
	  <img src=${wmo[dailyForecast.weather_code[i]].day.image} alt="Weather Icon" />
      <h6 style="color: chartreuse; font-size: 20px; ">${
        dailyForecast.temperature_2m_max[i]
      }°C</h6>
	  <h6>UV Index: ${dailyForecast.uv_index_max[i]}</h6>
    </li>`;
    }

    // process for hourly forecast
    hourlyCardsDiv.innerHTML = "";
    for (let i = 0; i < Math.min(24, hourlyForecast.time.length); i++) {
      hourlyCardsDiv.innerHTML += `
    <li class="card">
	<h3>${hourlyForecast.time[i]}</h3>
	<img src=${wmo[hourlyForecast.weather_code[i]].day.image} alt="Weather Icon" />
      <h6>Temp: ${hourlyForecast.temperature_2m[i]}</h6>
      <h6>Humidity: ${hourlyForecast.relative_humidity_2m[i]}</h6>
    </li>`;
    }

    // process for UV index
    pressureCardDiv.innerHTML = `
	<h2><i class="bx bxs-thermometer"></i>PRESSURE</h2>

	<ul>
	<img
	src="assets/images/pressure-2.png"
	alt="pressure"
	style="height: 120px; width: 180px; opacity:30%;"
  />
		<li>
		<h3>${currentWeather.pressure_msl} hPa</h3>
		<h3>${currentWeather.surface_pressure} hPa</h3>
		</li>
	</ul>
		
	`;
    //  process for wind directions
    windCardDiv.innerHTML = `
	<h2><i class='bx bx-wind' ></i>WIND</h2>
	<img
	src="assets/images/compass-3.png"
	alt="compass"
	style="height: 120px; width: 120px"
  	/>
		<li>
		<h3>${currentWeather.wind_direction_10m}°</h3>
		<h3>${currentWeather.wind_gusts_10m}km/h</h3>
		<h3>${currentWeather.wind_speed_10m}km/h</h3>
		</li>
	</ul>
	`;
  } catch (error) {
    alert("An error occurred while fetching the weather details!");
  }
}

searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", (e) => e.key === "Enter" && getCityCoordinates());
