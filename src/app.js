/**
 * Author: Somtochukwu Ezerioha
 */
const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Defining paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setting up handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setting up static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        icon: ' <link rel="icon" href="./img/weather.png" type="image/x-icon">',
        title: 'Weather',
        name: "Somto Ezerioha @ 2019"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        icon: ' <link rel="icon" href="./img/weather.png" type="image/x-icon">',
        title: 'About me',
        name: 'Somto Ezerioha @ 2019',
        description: "Hi, I'm Somtochukwu Ezerioha. A full stack-developer with 2 years of experience."
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        icon: ' <link rel="icon" href="./img/weather.png" type="image/x-icon">',
        title: 'Help',
        name: 'Somto Ezerioha @ 2019',
        description: "Oops! this page is still under construction. Check back later."
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You have to provide an address"
        })
    }
    geocode(req.query.address, (error, {
        latitude,
        longitude,
        Location: location
    } = {}) => {

        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData,

            });

        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        icon: ' <link rel="icon" href="./img/weather.png" type="image/x-icon">',
        title: '404',
        text: "Help article not found",
        name: 'Somto Ezerioha @ 2019'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        icon: ' <link rel="icon" href="./img/weather.png" type="image/x-icon">',
        title: '404',
        text: "Page not found",
        name: 'Somto Ezerioha @ 2019'
    });
});

app.listen(3000, () => {
    console.log('Server is listening at localhost:3000');
})