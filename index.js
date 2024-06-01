let apiKey = "59afe71f4443b259e3e92418258f8e9f";

let inputData = document.querySelector("form");
let city = document.getElementById("cityName");
let currentlocation = document.querySelector("button");

inputData.addEventListener("submit", (event) => {
  event.preventDefault();
  let cityName = city.value; 
  weatherData(cityName, apiKey);
});

function gotLocation(position) {
  console.log(position);
};

function failed() {
  console.log("Please allow to access your location");
}

currentlocation.addEventListener("click", async () => {
  let userLocation = navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude.toFixed(4);
    const lon = position.coords.longitude.toFixed(4);
    geoWeatherData(lat, lon, apiKey);
  }, () => {
    alert("Please allow you Location");
  });
});

async function geoWeatherData(lat, lon, apiKey) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    document.querySelector(".todayTemp").innerHTML = `${data["name"]} ( ${Math.round(data["main"]["temp"])} °C )`;

    let description = data.weather[0].description;
    let res = description.split(" ");
    description ="";
    for (var i = 0; i < res.length; i++) {
      res[i] = res[i].substring(0,1).toUpperCase()+res[i].substring(1,res[i].length);
      description += res[i]+" "
    }

    let todayDescription = document.querySelector(".todayDescription").innerHTML;
    document.querySelector(".todayDescription").innerHTML = `${todayDescription.substring(0,13)} ${description}`;

    let todayWind = document.querySelector(".todayWind").innerHTML;
    document.querySelector(".todayWind").innerHTML = `${todayWind.substring(0,5)} ${Math.round(data["wind"]["speed"])} M/S`;

    let todayWindDegree = document.querySelector(".todayWindDegree").innerHTML;
    document.querySelector(".todayWindDegree").innerHTML = `Wind Degree: ${data["wind"]["deg"]}°`;

    let todayHumidity = document.querySelector(".todayHumidity").innerHTML;
    document.querySelector(".todayHumidity").innerHTML = `${todayHumidity.substring(0,9)} ${data["main"]["humidity"]} %`;

    let todayIcon = document.getElementsByClassName(".todayIcon").innerHTML;
    let icon = data.weather[0].icon;
    document.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">`;

  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function weatherData(cityName, apiKey) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      const data = await response.json();
      document.querySelector(".todayTemp").innerHTML = `${cityName} ( ${Math.round(data["main"]["temp"])} °C )`;

      let description = data.weather[0].description;
      let res = description.split(" ");
      description ="";
      for (var i = 0; i < res.length; i++) {
        res[i] = res[i].substring(0,1).toUpperCase()+res[i].substring(1,res[i].length);
        description += res[i]+" "
      }

      let todayDescription = document.querySelector(".todayDescription").innerHTML;
      document.querySelector(".todayDescription").innerHTML = `${todayDescription.substring(0,13)} ${description}`;

      let todayWind = document.querySelector(".todayWind").innerHTML;
      document.querySelector(".todayWind").innerHTML = `${todayWind.substring(0,5)} ${Math.round(data["wind"]["speed"])} M/S`;

      let todayWindDegree = document.querySelector(".todayWindDegree").innerHTML;
      document.querySelector(".todayWindDegree").innerHTML = `Wind Degree: ${data["wind"]["deg"]}°`;

      let todayHumidity = document.querySelector(".todayHumidity").innerHTML;
      document.querySelector(".todayHumidity").innerHTML = `${todayHumidity.substring(0,9)} ${data["main"]["humidity"]} %`;

      let todayIcon = document.getElementsByClassName(".todayIcon").innerHTML;
      let icon = data.weather[0].icon;
      document.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">`;

    } catch (error) {
      console.error('Error:', error.message);
    }
}

