const express = require('express');
const hbs = require('hbs');
const path = require('path');

const geocode = require('./utils/geocode');
const forecast = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs')

//setting basic urls and keys
const keyWeather = "3e42ebab480c1c88415377e3558787a0";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?"
const keyGeo = "pk.eyJ1IjoibWFyY2VsbHV4MzE0IiwiYSI6ImNrbzA2ZzZxeTBjcWEydm1mN256dmNiYW0ifQ.S3QvLCmzYX_obLaZ1T4E2Q"
const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/`

//paths
const viewsPath = path.join(__dirname, '../templates/views');
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'marcellux'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "about page",
        name: "marcellux"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "help page",
        name: "marcellux"
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.adress){
        return res.send({
            error: 'you must provide an adress'
        })
    }
    geocode(geocodeURL, req.query.adress, keyGeo, (longitude, latitude) => {
       forecast(baseURL, keyWeather, latitude, longitude, (data) => {
            res.send({
                weather: data
            })
       });
    });
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'marcellux',
        msg: 'help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        msg: 'route not found',
        name: 'marcellux'
    })
})


app.listen(port, () => {
    console.log('server is up on port:', port)
})
