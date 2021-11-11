let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

function formatDate() {
  let formatDate = day + " " + hour + ":" + minute;
  return formatDate;
}
let date = document.querySelector("#time");
date.innerHTML = formatDate(now);

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = `${temp}°F`;

  let weatherDesc = response.data.weather[0].description;
  let weatherDescElement = document.querySelector("#weather-description");
  weatherDescElement.innerHTML = `${weatherDesc}`;

  let locationName = response.data.name;
  let locationNameElement = document.querySelector("#city");
  locationNameElement.innerHTML = `${locationName}`;
}

function search(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-text-input");
  let newCity = document.querySelector("#city");
  console.log(inputCity.value);
  if (inputCity.value) {
    newCity.innerHTML = `${inputCity.value}`;
  } else {
    newCity.innerHTML = null;
    alert("Please type a city");
  }
  getAxios(inputCity.value);
}

function getAxios(city) {
  let apiKey = "593614a5b248941937e4876f3e192174";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showPosition(position) {
  let currentLocation = document.querySelector("#search-text-input");
  let currentCityDisplay = document.querySelector("#city");
  currentCityDisplay.innerHTML = `${position.coords.latitude} 
    and ${position.coords.longitude}`;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);
