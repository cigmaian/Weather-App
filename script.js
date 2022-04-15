
const form = document.querySelector("[data-form]");
const submitBtn = document.querySelector("[data-btn]");
const error = document.querySelector("[data-err]");
form.addEventListener('submit', handleSubmit);
submitBtn.addEventListener('click', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  fetchWeather();
} 

async function getWeatherData(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=afe58550b3cc0da34d73667516df652e&units=metric`,
    {
      mode: 'cors',
    }
  );
  if (response.status === 400) {
    throwErrorMsg();
  } else {
    error.style.display = 'none';
    const weatherData = await response.json();
    const newData = processData(weatherData);
    displayData(newData);
    reset();
  }
}

async function onLoadData(loc){
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Cluj-Napoca&appid=afe58550b3cc0da34d73667516df652e&units=metric`, 
    {mode: "cors"}
  );
  if(res.status == 400){
    throwErrorMsg()
  }else{
    error.style.display = "none";
    let weatherData = await res.json();
    let newData = processData(weatherData);
    displayData(newData);
  }
}

window.onload = onLoadData;

function throwErrorMsg() {
  error.style.display = 'block';
  if (error.classList.contains('fade-in')) {
    error.style.display = 'none';
    error.classList.remove('fade-in2');
    error.offsetWidth;
    error.classList.add('fade-in');
    error.style.display = 'block';
  } else {
    error.classList.add('fade-in');
  }
}

function processData(weatherData) {
  // grab all the data i want to display on the page
  const myData = {
    condition: weatherData.weather.map(el => el.description.toUpperCase()),
    feelsLike: Math.round(weatherData.main.feels_like),
    currentTemp: Math.round(weatherData.main.temp),    
    wind: Math.round(weatherData.wind.speed),
    humidity: weatherData.main.humidity,
    location: weatherData.name.toUpperCase(),
    country: weatherData.sys.country.toUpperCase(), 
  };

  return myData;
}

function displayData(newData) {
  const weatherInfo = document.getElementsByClassName('info');
  Array.from(weatherInfo).forEach((div) => {
    if (div.classList.contains('fade-in2')) {
      div.classList.remove('fade-in2');
      div.offsetWidth;
      div.classList.add('fade-in2');
    } else {
      div.classList.add('fade-in2');
    }
  });
  document.querySelector("[data-condition]").textContent = newData.condition;
  document.querySelector(
    "[data-location]"
  ).textContent = `${newData.location} /  ${newData.country}`;
  document.querySelector("[data-degrees]").textContent = newData.currentTemp;
  document.querySelector(
    "[data-feel]"
  ).textContent = `FEELS LIKE: ${newData.feelsLike}`;
  document.querySelector("[data-wind]").textContent = `WIND: ${newData.wind} KM/H`;
  document.querySelector(
    "[data-humidity]"
  ).textContent = `HUMIDITY: ${newData.humidity}`;
}

function reset() {
  form.reset();
}

// get location from user
function fetchWeather() {
  const input = document.querySelector('input[type="text"]');
  const userLocation = input.value;
  getWeatherData(userLocation);
}






let url = "https://api.openweathermap.org/data/2.5/weather?q=Bucharest&appid=afe58550b3cc0da34d73667516df652e&units=metric ";

fetch(url).then(res => res.json()).then(data => console.log(data));


