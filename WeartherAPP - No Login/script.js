const apiKey = "6e58518b4db1fa527cf9895ad991e18e";
const colomboLatitude = 6.9271;
const colombolongitude = 79.8612;

//
let latitude = (document.getElementById("latitude").value = colomboLatitude);
let longitude = (document.getElementById("longitude").value = colombolongitude);
//weather API Calling
function getLiveWeather() {
  let latitude = document.getElementById("latitude").value;
  let longitude = document.getElementById("longitude").value;
  document.getElementById("forcast").style.display = "block";
  document.getElementById("daily-forecast").style.display = "none";

  const liveWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  fetch(liveWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching live weather data:", error);
      alert("Error fetching live weather data. try again !!.");
    });
}

function displayWeather(data) {
  const mainDivInfo = document.getElementById("main-div");
  const liveWeatherInfoDiv = document.getElementById("liveWeather-info");
  const weatherIcon = document.getElementById("weather-icon");

  // Clearing previous content
  liveWeatherInfoDiv.innerHTML = "";
  mainDivInfo.innerHTML = "";

  const cityName = data.name;
  const temperature = Math.round(data.main.temp - 273.15);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

  const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

  mainDivInfo.innerHTML = temperatureHTML;
  liveWeatherInfoDiv.innerHTML = weatherHtml;
  weatherIcon.src = iconUrl;
  weatherIcon.alt = description;

  showImage();
}

//Weather Forcasting Function
async function showForecast() {
  let latitude = document.getElementById("latitude").value;
  let longitude = document.getElementById("longitude").value;
  document.getElementById("forcast").style.display = "none";
  document.getElementById("daily-forecast").style.display = "flex";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    );
    const data = await response.json();

    // Display forecast
    const forecastData = data.list.filter((entry) =>
      entry.dt_txt.includes("12:00:00")
    );
    console.log(forecastData);
    document.getElementById("daily-forecast").innerHTML = `
            ${forecastData
              .map((data) => {
                // Get day of the week from dt_txt
                const date = new Date(data.dt_txt);
                const dayOfWeek = date.toLocaleDateString("en-US", {
                  weekday: "long",
                });
                const weatherIconCode = data.weather[0].icon;
                const temperature = Math.round(data.main.temp - 273.15);
                const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
                return `
                <div class="daily-item">
                        <span>${dayOfWeek}</span>
                        <span>${temperature} °C</span>
                        <img src="${weatherIconUrl}" alt="Hourly Weather Icon">
                </div>
            `;
              })
              .join("")}
        `;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
  showImage();
}

//Weather ICON Funtion
function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}
