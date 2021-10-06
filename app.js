const timeEl = document.getElementById('time');
const datEl = document.getElementById('date');
const currentWeatherItemEl = document.getElementById('current-weather-items');
const timeZoneEl = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('currrent-temp');

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
    const minute = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = hoursIn12HrFormat + ':' + minute + ' ' + `<span id="am-pm">${ampm}</span>`
}, 1000);