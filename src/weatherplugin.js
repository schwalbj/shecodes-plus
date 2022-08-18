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
  let weekday = weekdays[now.getDay()];
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let time = `${hours}:${minutes}`;

  let currentDayAndTime = document.querySelector("#weekday-and-time");
  currentDayAndTime.innerHTML = `Last Updated ${weekday} ${time}`;
}

// Icons Switch
function displayCurrentIcon(icon) {
  switch (icon) {
    case "01d":
      document.getElementById("current-weather-icon").src = "images/01da.gif";
      break;
    case "01d":
      document.getElementById("current-weather-icon").src = "images/01da.gif";
      break;
    case "02d":
      document.getElementById("current-weather-icon").src = "images/02da.gif";
      break;
    case "03d":
      document.getElementById("current-weather-icon").src =
        "images/03da_04da.gif";
      break;
    case "04d":
      document.getElementById("current-weather-icon").src =
        "images/03da_04da.gif";
      break;
    case "09d":
      document.getElementById("current-weather-icon").src = "images/09da.gif";
      break;
    case "10d":
      document.getElementById("current-weather-icon").src = "images/10da.gif";
      break;
    case "11d":
      document.getElementById("current-weather-icon").src = "images/11da.gif";
      break;
    case "13d":
      document.getElementById("current-weather-icon").src = "images/13da.gif";
      break;
    case "50d":
      document.getElementById("current-weather-icon").src = "images/50da.gif";
      break;
    default:
      document.getElementById("current-weather-icon").src =
        "images/03da_04da.gif";
  }
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

  let apiWeatherIcon = response.data.weather[0].icon;
  displayCurrentIcon(apiWeatherIcon);
  document.getElementById("current-weather-icon").alt = apiWeatherDescription;

  formatDate(response.data.dt * 1000);
}

// Current Weather in Frankfurt (Default)

function displayFrankfurtWeather() {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Frankfurt&units=metric&appid=${apiKey}`;
  console.log(apiURL);
  axios.get(apiURL).then(provideWeather);
}

displayFrankfurtWeather();

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
  // let temperature = document.querySelector("#temperature");
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");
  // temperature.innerHTML = 73;
  celsius.classList.add("text-black-50");
  celsius.classList.remove("pe-none");
  fahrenheit.classList.remove("text-black-50");
  fahrenheit.classList.add("pe-none");
}

let convertToFahrenheit = document.querySelector("#fahrenheit");
convertToFahrenheit.addEventListener("click", convertToF);

// Convert back from F to C
function convertToC(event) {
  event.preventDefault();
  // let temperature = document.querySelector("#temperature");
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");
  // temperature.innerHTML = 23;
  celsius.classList.remove("text-black-50");
  celsius.classList.add("pe-none");
  fahrenheit.classList.add("text-black-50");
  fahrenheit.classList.remove("pe-none");
}

let convertToCelsius = document.querySelector("#celsius");
convertToCelsius.addEventListener("click", convertToC);
