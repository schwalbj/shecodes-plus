// Display current date and Time
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = weekdays[now.getUTCDay()];
  let hours = String(now.getUTCHours()).padStart(2, "0");
  let minutes = String(now.getUTCMinutes()).padStart(2, "0");
  let time = `${hours}:${minutes}`;

  let currentDayAndTime = document.querySelector("#weekday-and-time");
  currentDayAndTime.innerHTML = `${weekday} ${time}`;
}

// Display Weekdays for the Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

// Switch for animated Icons (Current Weather)
function displayCurrentIcon(icon) {
  let body = document.querySelector("body");
  let currentWeatherIcon = document.getElementById("current-weather-icon");
  switch (icon) {
    case "01d":
      currentWeatherIcon.src = "images/01da.gif";
      currentWeatherIcon.classList.remove("icons-icy");
      currentWeatherIcon.classList.add("icons-pink");
      body.classList.add("background-sunny");
      break;
    case "01n":
      currentWeatherIcon.src = "images/01na.gif";
      currentWeatherIcon.classList.remove("icons-pink", "icons-icy");
      body.removeAttribute("class");
      body.classList.add("background-dark");
      break;
    case "02d":
      currentWeatherIcon.src = "images/02da.gif";
      currentWeatherIcon.classList.add("icons-pink");
      body.removeAttribute("class");
      body.classList.add("background-sunny");
      break;
    case "02n":
      currentWeatherIcon.src = "images/02na.gif";
      currentWeatherIcon.classList.remove("icons-pink", "icons-icy");
      body.removeAttribute("class");
      body.classList.add("background-dark");
      break;
    case "03d":
    case "03n":
      currentWeatherIcon.src = "images/03da_04da.gif";
      currentWeatherIcon.classList.remove("icons-pink", "icons-icy");
      body.removeAttribute("class");
      body.classList.add("background-dark");
      break;
    case "04d":
    case "04n":
      currentWeatherIcon.src = "images/03da_04da.gif";
      currentWeatherIcon.classList.remove("icons-pink", "icons-icy");
      body.removeAttribute("class");
      body.classList.add("background-dark");
      break;
    case "09d":
    case "09n":
      currentWeatherIcon.src = "images/09da.gif";
      currentWeatherIcon.classList.remove("icons-pink", "icons-icy");
      body.removeAttribute("class");
      body.classList.add("background-dark");
      break;
    case "10d":
      currentWeatherIcon.src = "images/10da.gif";
      currentWeatherIcon.classList.add("icons-pink");
      body.removeAttribute("class");
      body.classList.add("background-pink");
      break;
    case "10n":
      currentWeatherIcon.src = "images/10na.gif";
      currentWeatherIcon.classList.remove("icons-pink", "icons-icy");
      body.removeAttribute("class");
      body.classList.add("background-dark");
      break;
    case "11d":
    case "11n":
      currentWeatherIcon.src = "images/11da.gif";
      currentWeatherIcon.classList.remove("icons-pink", "icons-icy");
      body.removeAttribute("class");
      body.classList.add("background-dark");
      break;
    case "13d":
    case "13n":
      currentWeatherIcon.src = "images/13da.gif";
      currentWeatherIcon.classList.remove("icons-pink");
      currentWeatherIcon.classList.add("icons-icy");
      body.removeAttribute("class");
      body.classList.add("background-icy");
      break;
    case "50d":
    case "50n":
      currentWeatherIcon.src = "images/50da.gif";
      currentWeatherIcon.classList.remove("icons-pink", "icons-icy");
      body.removeAttribute("class");
      body.classList.add("background-dark");
      break;
    default:
      currentWeatherIcon.src = "images/03da_04da.gif";
      body.classList.add("background-pink");
  }
}

// Switch for forecast icons (not animated)
function displayForecastIcon(icon) {
  switch (icon) {
    case "01d":
      return "images/01d.png";
      break;
    case "01n":
      return "images/01d.png";
      break;
    case "02d":
      return "images/02d.png";
      break;
    case "02n":
      return "images/01d.png";
      break;
    case "03d":
    case "03n":
      return "images/03d_04d.png";
      break;
    case "04d":
    case "04n":
      return "images/03d_04d.png";
      break;
    case "09d":
    case "09n":
      return "images/09d.png";
      break;
    case "10d":
      return "images/10d.png";
      break;
    case "10n":
      return "images/01d.png";
      break;
    case "11d":
    case "11n":
      return "images/11d.png";
      break;
    case "13d":
    case "13n":
      return "images/13d.png";
      break;
    case "50d":
    case "50n":
      return "images/50d.png";
      break;
    default:
      return "images/03d_04d.png";
  }
}

// Display Weather Forecast + Current Local Time
function displayForecast(response) {
  let apiPrecipitation = response.data.daily[0].pop;
  let precipitationElement = document.querySelector("#precipitation");
  precipitationElement.innerHTML = Math.round(apiPrecipitation * 100);

  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-4 col-md-2 pt-3">
                <h4>${formatDay(forecastDay.dt)}</h4>
                <img
                  class="forecast-icons img-fluid"
                  src=${displayForecastIcon(forecastDay.weather[0].icon)}
                  alt="${forecastDay.weather[0].description}"
                />
                <p class="mt-2 max-items">
                  <span class="max-temp">↑${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="min-temp text-black-50">↓${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </p>
              </div>
              `;
    }
  });
  forecastElement.innerHTML = forecastHTML;
  formatDate((response.data.current.dt + response.data.timezone_offset) * 1000);
}

// API Key + Display Weather Info

let apiKey = "814decb5bc7db2bf90165d67925d435d";

function provideWeather(response) {
  let searchedCity = response.data.name;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = searchedCity;

  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temperature;

  celsiusTemperature = response.data.main.temp;

  let apiWeatherDescription = response.data.weather[0].description;
  let currentWeatherDescription = document.querySelector(
    "#current-weather-description"
  );
  currentWeatherDescription.innerHTML = apiWeatherDescription;

  let apiHumidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = apiHumidity;

  let apiWind = Math.round(response.data.wind.speed * 3.6);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = apiWind;

  let apiCurrentWeatherIcon = response.data.weather[0].icon;
  displayCurrentIcon(apiCurrentWeatherIcon);
  document.getElementById("current-weather-icon").alt = apiWeatherDescription;

  getForecast(response.data.coord);
}

// Current Weather in Frankfurt (Default)

function displayFrankfurtWeather() {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Frankfurt&units=metric&appid=${apiKey}`;
  console.log(apiURL);
  axios.get(apiURL).then(provideWeather);
}

displayFrankfurtWeather();

// Get Forecast Data

function getForecast(coordinates) {
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

// Current Weather after search

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;

  axios.get(apiURL).then(provideWeather);
}

let showSearchedWeather = document.querySelector("#city-search-form");
showSearchedWeather.addEventListener("submit", searchCity);

// Current Weather by Geolocation

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiURL).then(provideWeather);
}

function showLocalWeather() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let geoButton = document.querySelector("#geo-button");
geoButton.addEventListener("click", showLocalWeather);

// Convert C to F

function convertToF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsius.classList.add("text-black-50");
  celsius.classList.remove("pe-none");
  fahrenheit.classList.remove("text-black-50");
  fahrenheit.classList.add("pe-none");
}

let celsiusTemperature = null;
let convertToFahrenheit = document.querySelector("#fahrenheit");
convertToFahrenheit.addEventListener("click", convertToF);

// Convert back from F to C
function convertToC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsius.classList.remove("text-black-50");
  celsius.classList.add("pe-none");
  fahrenheit.classList.add("text-black-50");
  fahrenheit.classList.remove("pe-none");
}

let convertToCelsius = document.querySelector("#celsius");
convertToCelsius.addEventListener("click", convertToC);
