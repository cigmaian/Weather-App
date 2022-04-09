
const form = document.querySelector('form');
const submitBtn = document.querySelector('.submit-btn');
const error = document.querySelector('.error-msg');
form.addEventListener('submit', handleSubmit);
submitBtn.addEventListener('click', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  fetchWeather();
}

async function getWeatherData(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${location}`,
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
    condition: weatherData.current.condition.text,
    feelsLike: {
      f: Math.round(weatherData.current.feelslike_f),
      c: Math.round(weatherData.current.feelslike_c),
    },
    currentTemp: {
      f: Math.round(weatherData.current.temp_f),
      c: Math.round(weatherData.current.temp_c),
    },
    wind: Math.round(weatherData.current.wind_mph),
    humidity: weatherData.current.humidity,
    location: weatherData.location.name.toUpperCase(),
  };

  // if in the US, add state
  // if not, add country
  if (weatherData.location.country === 'United States of America') {
    myData['region'] = weatherData.location.region.toUpperCase();
  } else {
    myData['region'] = weatherData.location.country.toUpperCase();
  }

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
  document.querySelector('.condition').textContent = newData.condition;
  document.querySelector(
    '.location'
  ).textContent = `${newData.location}, ${newData.region}`;
  document.querySelector('.degrees').textContent = newData.currentTemp.f;
  document.querySelector(
    '.feels-like'
  ).textContent = `FEELS LIKE: ${newData.feelsLike.f}`;
  document.querySelector('.wind-mph').textContent = `WIND: ${newData.wind} MPH`;
  document.querySelector(
    '.humidity'
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


/*


///
let da = [];

const loadJson = async(url) => {
    
        let response = await fetch(url);
        let res = await response.json();
        let data = await res => {
            da = data.map(d => {
                const card = document.createElement("div");
                const header = document.createElement("div");
                const body = document.createElement("div");
                header.textContent = response.name;
                body.textContent = response.weather.description;
                document.body.append(card);
                card.append(header);
                card.append(body);
                
            })
        })

        console.log(res);
}




let citySelector = async() => {
    let text;
    while(true){
        let name = prompt("Enter city name", "Sebes");
        try{
            text = await loadJson(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=afe58550b3cc0da34d73667516df652e`);  
            break;
        }catch(err){
            console.log(err);
        }
    }
    alert(`City entered: ${text}`);
    
}

citySelector();

let getData = async() => {

}

*/


/*

////

const form = document.querySelector('form');
const submitBtn = document.querySelector("[data-btn]");
const error = document.querySelector("[data-err]")

form.addEventListener('submit', handleSubmit);
submitBtn.addEventListener("click", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  fetchWeather()
}

function fetchWeather(){
  let input = document.querySelector("[data-input]");
  let userWeather = input.value; 
  getWeatherData(userWeather);
}

function reset(){
  form.reset();
}

async function getWeatherData(location){
  let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q={location}&appid=afe58550b3cc0da34d73667516df652e`, 
  {mode: "cors"});
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

function processData(weatherData){
  const myData = {
    condition: weatherData.weather.description,
    feelsLike: {
      f: Math.round(weatherData.main.feels_like)
    },
    currentTemp: {
      f: Math.round(weatherData.main.temp)
    },
    wind: Math.round(weatherData.wind.speed),
    humidity: weatherData.main.humidity,
    location: weatherData.name.toUpperCase(),
  }
  return { myData }
}

function displayData(newData){
  const weatherInfo = document.getElementsByClassName("info");
  Array.from(weatherInfo).forEach((div) => {
    if(div.classList.contains("fade-in2")){
      div.classList.remove("fade-in2");
      div.offsetWidth;
      div.classList.add("fade-in2");
    }else{
      div.classList.add("fade-in2");
    }
  });

  document.querySelector(".condition").textContent = newData.condition;
  document.querySelector(".location").textContent = newData.location;
  document.querySelector(".degrees").textContent = newData.degrees;
  document.querySelector(".feels-like").textContent = newData.feels-like;
  document.querySelector(".wind-mph").textContent = newData.wind-mph;
  document.querySelector(".humidity").textContent = newData.humidity;
}


let url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=afe58550b3cc0da34d73667516df652e";

fetch(url).then(res => res.json()).then(data => console.log(data));


function dobble(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(x * 3), 10)
    })
}

const addAsync = async(x) => {
    const a = await dobble(10);
    const b = await dobble(20);
    return x + a + b;
}

addAsync(2).then(sum => console.log(sum));

let ul = "http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=$London"


fetch(ul).then(res => res.json()).then(data => console.log(data));


///


/*

function processData(weatherData){
  const myData = {
    name: location,
    main: { temp: degrees, humidity: humidity, feels_like: feelslike},
    wind: { speed: windmph },
    weather: { description: condition}
  }
  return { condition, location, degrees, feelslike, windmph, humidity }
}


*/