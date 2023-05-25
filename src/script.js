function updateDateTime() {
  const now = new Date();

  const currentDateTime = now.toLocaleString();

  document.querySelector("#datetime").textContent = currentDateTime;
}

setInterval(updateDateTime, 1000);

//

function displayWeatherCondition(response) {
  console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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

searchCity("Exeter");
