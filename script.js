const apiKey = "0da98f8a41e6607520108d22f44ab7b6";

const body = document.getElementById("body");
const toggle = document.getElementById("darkModeToggle");

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
  switch (condition) {
    case "Clear":
      body.style.background = "linear-gradient(to right, #56ccf2, #2f80ed)";
      break;
    case "Clouds":
      body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
      break;
    case "Rain":
      body.style.background = "linear-gradient(to right, #2c3e50, #4ca1af)";
      break;
    case "Snow":
      body.style.background = "linear-gradient(to right, #83a4d4, #b6fbff)";
      break;
    case "Thunderstorm":
      body.style.background = "linear-gradient(to right, #141e30, #243b55)";
      break;
    default:
      body.style.background = "linear-gradient(to right, #00c6ff, #0072ff)";
  }
}
