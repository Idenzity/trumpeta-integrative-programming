async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("result");

  if (city === "") {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
    );

    const geoData = await geoResponse.json();

    if (!geoData.results) {
      resultDiv.innerHTML = "City not found.";
      return;
    }

    const latitude = geoData.results[0].latitude;
    const longitude = geoData.results[0].longitude;
    const cityName = geoData.results[0].name;
    const country = geoData.results[0].country;

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
    );

    const weatherData = await weatherResponse.json();
    const weather = weatherData.current_weather;

    const currentWeatherData = {
      city: cityName,
      country: country,
      temperature: weather.temperature,
      windspeed: weather.windspeed,
      weathercode: weather.weathercode,
    };

    resultDiv.innerHTML = `
      <h2>${cityName}, ${country}</h2>
      <p>Temperature: ${weather.temperature} °C</p>
      <p>Wind Speed: ${weather.windspeed} km/h</p>
      <p>Weather Code: ${weather.weathercode}</p>
      <button onclick='saveWeather(${JSON.stringify(currentWeatherData)})'>Save</button>
    `;
  } catch (error) {
    resultDiv.innerHTML = "Failed to retrieve weather data.";
    console.error(error);
  }
}

function saveWeather(data) {
  let saved = localStorage.getItem("weatherData");

  saved = saved ? JSON.parse(saved) : [];

  const exists = saved.some((item) => item.city === data.city);

  if (exists) {
    alert("Already saved!");
    return;
  }

  saved.push(data);

  localStorage.setItem("weatherData", JSON.stringify(saved));

  alert("Saved successfully!");
}
