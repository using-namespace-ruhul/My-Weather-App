const timeEl = document.getElementById('time');
const datEl = document.getElementById('date');
const currentWeatherItemEl = document.getElementById('current-weather-items');
const timeZoneEl = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const API_KEY = '27dd49803b2f53dd344c78f5ec69fdfb';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
    const minute = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minute < 10 ? '0' + minute : minute) + ' ' + `<span id="am-pm">${ampm}</span>`
}, 1000);

getWeatherData()

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

            console.log(data)
            showWeatherData(data);
        })
    })
}

function showWeatherData(data) {
    let { humidity, pressure, sunrise, sunset, windSpeed } = data.current;

    timeZoneEl.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon + 'E '

    currentWeatherItemEl.innerHTML =
        `<div class="weather-items">
                <div>Humidity</div>
                <div>${humidity}</div>
         </div>
         <div class="weather-items">
             <div>Pressure</div>
             <div>${pressure}</div>
         </div>
         <div class="weather-items">
             <div>Windspeed</div>
             <div>${windSpeed}</div>
         </div>
         <div class="weather-items">
             <div>Sunrise</div>
             <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
         </div>
         <div class="weather-items">
             <div>Sunset</div>
             <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
         </div>`

    let otherDayForecast = ''
    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentTempEl.innerHTML = `
                  <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
                  <div class="other">
                      <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                      <div class="temp">Night - ${day.temp.night}&#176;C</div>
                      <div class="temp">Day - ${day.temp.day}&#176;C</div>
                  </div>

                  `
        } else {
            otherDayForecast +=
                ` <div class="weather-forecast-item">
                   <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                   <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
                   <div class="temp">Night - ${day.temp.night}&#176; C</div>
                   <div class="temp">Day - ${day.temp.day}&#176; C</div>
              </div>`
        }
    })

    weatherForecastEl.innerHTML = otherDayForecast;
}