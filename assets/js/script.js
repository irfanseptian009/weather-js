const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");

search.addEventListener("click", () => {
  const APIKey = "ae02e446861bd64c7ae65f0dbaf5f215";
  const city = document.querySelector(".search-box input").value;
  if (city == "") return;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .decription");
      const humidity = document.querySelector(".weather-details .humidity span");
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "/assets/images/clear.png";
          break;
        case "Clouds":
          image.src = "/assets/images/cloud.png";
          break;
        case "Mist":
          image.src = "/assets/images/mist.png";
          break;
        case "Haze":
          image.src = "/assets/images/haze.png";
          break;
        case "Rain":
          image.src = "/assets/images/rain.png";
          break;
        case "Snow":
          image.src = "/assets/images/snow.png";
          break;

        default:
          image.src = "/assets/images/clear.png";
          break;
      }

      temperature.innerHTML = `${parseInt(json.main.temp)} <span></span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
    });
});
