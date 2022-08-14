// Display current date and Time (Feature 1)
let now = new Date();
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
currentDayAndTime.innerHTML = `${weekday} ${time}`;

// Display city name after search
function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let newCityName = document.querySelector("#city-name");
  newCityName.innerHTML = `${city.value}`;
  console.log(citySearch);
}

let citySearch = document.querySelector("#city-search-form");
citySearch.addEventListener("submit", updateCity);

// Convert C to F
function convertToF(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");
  temperature.innerHTML = 73;
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
  let temperature = document.querySelector("#temperature");
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");
  temperature.innerHTML = 23;
  celsius.classList.remove("text-black-50");
  celsius.classList.add("pe-none");
  fahrenheit.classList.add("text-black-50");
  fahrenheit.classList.remove("pe-none");
}

let convertToCelsius = document.querySelector("#celsius");
convertToCelsius.addEventListener("click", convertToC);
