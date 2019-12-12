console.log('Client side JavaScript!');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const locationElement = document.querySelector('#location');
const forecastElement = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchLocation = searchElement.value; 

    const url = `http://localhost:3000/weather?address=${searchLocation}`;

    locationElement.textContent = 'Loading...'
    forecastElement.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationElement.textContent = data.error;
            } else {
                locationElement.textContent = data.location;
                forecastElement.textContent = data.forecast;
            }
        });

    });

})