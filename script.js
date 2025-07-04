const apiKey = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key

const body = document.getElementById("body");
const toggle = document.getElementById("darkModeToggle");
const animationDiv = document.getElementById("weather-animation");

toggle.addEventListener("change", () => {
  body.classList.toggle("dark");
});

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherDiv = document.getElementById("weatherInfo");

  if (!city) {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const { name } = data;
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { description, icon, main } = data.weather[0];

    weatherDiv.innerHTML = `
      <h2>${name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
      <p><strong>${description.toUpperCase()}</strong></p>
      <p>🌡 Temperature: ${temp} °C</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>🌬 Wind: ${speed} m/s</p>
    `;

    updateBackground(main);
  } catch (error) {
    weatherDiv.innerHTML = `<p>${error.message}</p>`;
  }
}

function updateBackground(condition) {
  animationDiv.innerHTML = ""; // Clear previous

  let bgGradient = "linear-gradient(to right, #00c6ff, #0072ff)";

  switch (condition) {
    case "Clear":
      bgGradient = "linear-gradient(to right, #56ccf2, #2f80ed)";
      const sun = document.createElement("div");
      sun.className = "sun-rays";
      animationDiv.appendChild(sun);
      break;

    case "Clouds":
      bgGradient = "linear-gradient(to right, #bdc3c7, #2c3e50)";
      for (let i = 0; i < 5; i++) {
        const cloud = document.createElement("div");
        cloud.className = "cloud";
        cloud.style.width = `${100 + i * 20}px`;
        cloud.style.height = `${60 + i * 15}px`;
        cloud.style.top = `${10 + i * 10}%`;
        cloud.style.left = `${-200 + i * 100}px`;
        animationDiv.appendChild(cloud);
      }
      break;

    case "Rain":
      bgGradient = "linear-gradient(to right, #2c3e50, #4ca1af)";
      for (let i = 0; i < 80; i++) {
        const drop = document.createElement("div");
        drop.className = "rain-drop";
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDelay = `${Math.random()}s`;
        animationDiv.appendChild(drop);
      }
      break;

    case "Snow":
      bgGradient = "linear-gradient(to right, #83a4d4, #b6fbff)";
      for (let i = 0; i < 40; i++) {
        const snow = document.createElement("div");
        snow.className = "snowflake";
        snow.textContent = "❄";
        snow.style.left = `${Math.random() * 100}vw`;
        snow.style.fontSize = `${Math.random() * 20 + 10}px`;
        snow.style.animationDelay = `${Math.random() * 5}s`;
        animationDiv.appendChild(snow);
      }
      break;

    case "Thunderstorm":
      bgGradient = "linear-gradient(to right, #141e30, #243b55)";
      break;

    default:
      bgGradient = "linear-gradient(to right, #00c6ff, #0072ff)";
  }

  document.body.style.background = bgGradient;
}
