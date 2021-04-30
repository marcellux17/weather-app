const request = require('postman-request');

const forecast = (apiURL, apiid, lat, lon, callback) => {
    const url = `${apiURL}appid=${apiid}&units=metric&lat=${lat}&lon=${lon}`
    request({ url, json: true }, (error, response) => {
        if (error) {
            console.log('couldnt connect to server...');
        } else if (response.body.message) {
            console.log(response.body.message);
        } else {
            callback(response.body.main)
        }
    });
}

module.exports = forecast;