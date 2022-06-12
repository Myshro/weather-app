
let link = 'https://api.openweathermap.org/data/2.5/weather?q=London&APPID=3202286a5cb08832074c3f8e19e4f848&units=imperial';
const form = document.querySelector('#search');
const button = document.querySelector('#submit');
const celsiusFahr = document.querySelector('.toggle');

const cityText = document.querySelector('.city');
const latText = document.querySelector('.lat');
const lonText = document.querySelector('.lon');
const tempText = document.querySelector('.temp');
const humidityText = document.querySelector('.humidity');
const weatherText = document.querySelector('.weather');

let celsius;
let fahrenheit;
let tempSign = 'F';

async function fetchWeather() {
    try {
        if (form.value === '') {
            const errorMsg = document.querySelector('.error')
            errorMsg.style.display = "block"
        } else {
            const errorMsg = document.querySelector('.error')
            errorMsg.style.display = "none"
        }
        let location = form.value;
        location = location.charAt(0).toUpperCase() + location.slice(1)
        form.value = '';
        link = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=3202286a5cb08832074c3f8e19e4f848&units=imperial`;

        const response = await fetch(link, {mode: 'cors'});
        const data = await response.json();
        console.log(data);
        //Object destructuring is so useful :)
        let { temp, humidity } = data.main;
        let { lat, lon } = data.coord;
        let { country } = data.sys
        let weather = data.weather[0].main
        fahrenheit = temp;
        celsius = (temp - 32) * 5/9;

        cityText.textContent = `Location: ${location}, ${country}`;
        latText.textContent = `Latitude: ${lat}`;
        lonText.textContent = `Longitude: ${lon}`;
        tempText.textContent = `Temperature: ${temp}°F`;
        humidityText.textContent = `Humidity: ${humidity}%`; 
        weatherText.textContent = `Weather: ${weather}`;
        
    } catch (error) {
        alert('Could not find a city :(')
        cityText.textContent = 'Location: ';
        latText.textContent = 'Latitude:';
        lonText.textContent = 'Longitude: ';
        tempText.textContent = 'Temperature: ';
        humidityText.textContent = 'Humidity: ';
        weatherText.textContent = 'Weather: ';
    };  
};



button.addEventListener('click', fetchWeather);
form.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});

celsiusFahr.addEventListener('click', () => {
    if (tempText.textContent === 'Temperature: ') {
        return
    }
    if(tempSign === 'F') {
        tempSign = 'C';
        tempText.textContent = `Temperature: ${parseFloat(celsius).toFixed(2)}°${tempSign}`; 
    } else if (tempSign === 'C') {
        tempSign = 'F';
        tempText.textContent = `Temperature: ${fahrenheit}°${tempSign}`;
        
    }
});