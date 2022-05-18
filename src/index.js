//

function showWeather(response) {
  console.log(response.data);
  celsiusTemp = response.data.main.temp;
  document.querySelector("#headline").innerHTML = response.data.name;
  document.querySelector("#mainTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h3").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

//
function browseCity(city) {
  let apiKey = "282a65d87fe4f125dd5236607b9c31e9";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function handleCitySearch(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let city = `${input.value}`;
  browseCity(city);
}

let search = document.querySelector("#search-bar");
search.addEventListener("submit", handleCitySearch);

//

function handlePosition(position) {
  let apiKey = "282a65d87fe4f125dd5236607b9c31e9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let geoLocation = document.querySelector("#current-city");
geoLocation.addEventListener("click", currentLocation);

//

let now = new Date();

let displayTime = document.querySelector("p");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

displayTime.innerHTML = `${day} ${hours}:${minutes}, ${month} ${date},  ${year}`;

//

let celsiusTemp = null;

//

function showFahrenheitTemp(event) {
  event.preventDefault();
  document.querySelector("#mainTemp").innerHTML = Math.round(
    celsiusTemp * 1.8 + 32
  );

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-unit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

//

function showCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector("#mainTemp").innerHTML = Math.round(celsiusTemp);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusLink = document.querySelector("#celsius-unit");
celsiusLink.addEventListener("click", showCelsiusTemp);

//
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecastDays = ["Mon", "Tues", "Wed", "Thurs", "Fri"];
  forecastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
       <div class="col">
              <strong id="forecast-day"> ${day} </strong>
               <div id="forecast-temp"> 26° C </div>
              <img
                src="http://openweathermap.org/img/wn/04d@2x.png"
                class="weather-forecast-emoji" id="forecast-icon"
              />
            </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//

browseCity("Dhaka");
displayForecast();
