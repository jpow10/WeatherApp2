function updateDateTime() {
  const now = new Date();

  const currentDateTime = now.toLocaleString();

  document.querySelector("#datetime").textContent = currentDateTime;
}

setInterval(updateDateTime, 1000);

//

function displayWeatherCondition(response) {
  console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    data.temperature.current
  );


  document.querySelector("#humidity").innerHTML = data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

console.log(response.data.condition.description);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

function searchCity(city) {
  let apiKey = "b0aa3bbe4a50o046t63f82874a31fac6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Exeter&key=b0aa3bbe4a50o046t63f82874a31fac6&units=metric;
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
