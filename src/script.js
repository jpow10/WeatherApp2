function updateDateTime() {
  const now = new Date();

  const currentDateTime = now.toLocaleString();

  document.querySelector("#datetime").textContent = currentDateTime;
}

setInterval(updateDateTime, 1000);

//

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `
    <div class="row">
  <div class="col-2">
  <div class="weather-forecast-date>Mon</div>
  <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="42"/>
  <div class="weather-forecast-temperatures">
  <span class="weather-forecast-temperature-max">28°</span>
  <span class="weather-forecast-temperature-min>24°</span>
  </div>
  </div>
  </div>
`;
  forecastElement.innerHTML = forecastHTML;
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
displayForecast();
