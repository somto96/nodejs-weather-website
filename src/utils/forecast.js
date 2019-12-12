const request = require('request');

const forecast = (lat, long, callback) => {
    var url = `https://api.darksky.net/forecast/3bdd434415b8c7c870aa139be8feed37/${encodeURIComponent(lat)}, ${encodeURIComponent(long)}?units=si`

    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Can\'t connect to weather services', undefined);
        }else if (body.error){
            callback('Invalid coordinates!', undefined);
        }else{
            callback(undefined, ` ${body.currently.summary}. It is currently ${body.currently.temperature} degrees celsius out here in ${body.timezone}.
            There is a ${body.currently.precipProbability}% chance of rain`)
        };
       
    })
}

module.exports = forecast;