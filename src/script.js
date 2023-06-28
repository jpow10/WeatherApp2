function updateDateTime() {
  const now = new Date();

  const currentDateTime = now.toLocaleString();

  document.querySelector("#datetime").textContent = currentDateTime;
}

setInterval(updateDateTime, 1000);

//

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src="${forecastDay.condition.icon_url}"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temperature.maximum
          )}°</span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temperature.minimum
          )}°</span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b0aa3bbe4a50o046t63f82874a31fac6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=b0aa3bbe4a50o046t63f82874a31fac6&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  celciusTemperature = response.data.temperature.current;
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML =
    Math.round(celciusTemperature);

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "b0aa3bbe4a50o046t63f82874a31fac6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=b0aa3bbe4a50o046t63f82874a31fac6&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  console.log(apiUrl);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let weathersearchform = document.querySelector("#search-form");
weathersearchform.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displaycelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displaycelciusTemperature);

let celciusTemperature = null;

searchCity("Exeter");
