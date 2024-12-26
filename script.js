const searchButton = document.querySelector("#searchbutton");
const weatherIcon = document.querySelector(".weather-icon");
searchButton.addEventListener("click", () => {
  const city = document.querySelector("#inputFeild").value;
  if (city) {
    getWeatherUpDate(city);
  } else {
    alert("Please enter a city name");
  }
});

async function getWeatherUpDate(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=62484ac03a17d99cc642efca07d61b74&units=metric`
    );
    if (!response.ok) {
      alert(`Enter Valid City Name status: ${response.status}`);
      return;
    }
    const data = await response.json();

    console.log(data);
    displayWeather(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
function displayWeather(data) {
  document.querySelector(
    ".city"
  ).innerHTML = `${data.name}, ${data.sys.country}`;
  document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
  // document.querySelector('.sunrise').innerHTML=`${Math.round(data.main.feels_like)}°C`;
  document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
  document.querySelector(".wind").innerHTML = `${data.wind.speed}km/h`;
  document.querySelector(
    ".description"
  ).innerHTML = `${data.weather[0].description}`;
  if (data.weather[0].main === "Clouds") {
    weatherIcon.src = "clouds.png";
  } else if (data.weather[0].main === "Clear") {
    weatherIcon.src = "clear.png";
  } else if (data.weather[0].main === "Rain") {
    weatherIcon.src = "rain.png";
  } else if (data.weather[0].main === "Snow") {
    weatherIcon.src = "snow.png";
  } else if (data.weather[0].main === "Drizzle") {
    weatherIcon.src = "drizzle.png";
  } else if (data.weather[0].main === "Mist") {
    weatherIcon.src = "mist.png";
  }
  document.querySelector(".weather").style.display = "block";

  // Clear the input field after displaying weather data
  document.querySelector("#inputFeild").value = "";
}
