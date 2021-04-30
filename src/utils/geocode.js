const request = require('postman-request');
const geoCode = (geoURL, address, apiid, callback) => {
    const url = `${geoURL}${address}.json/?limit=1&access_token=${apiid}`;
    request({url, json: true}, (error, response) => {
        if(error){
            console.log('could not connect to server...')
        }else if(response.body.message){
            console.log(response.body.message)
        }else{
            const data = response.body;
            callback(data.features[0].center[0], data.features[0].center[1]);
        }
    })
}

module.exports = geoCode;