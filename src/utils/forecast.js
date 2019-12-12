const request = require('request');

const forecast = (lat, long, callback) => {
    var url = `https://api.darksky.net/forecast/3bdd434415b8c7c870aa139be8feed37/${encodeURIComponent(lat)}, ${encodeURIComponent(long)}?units=si`

    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Can\'t connect to weather services', undefined);
        }else if (body.error){
            callback('Invalid coordinates!', undefined);
        }else{
            const dailyData = body.daily.data[0];
            callback(undefined, ` ${dailyData.summary} It is currently ${body.currently.temperature}°C out here in ${body.timezone} with a high of ${dailyData.temperatureHigh}°C and a low of ${dailyData.temperatureLow}°C.
            There is a ${body.currently.precipProbability}% chance of rain`)
        };
       
    })
}

module.exports = forecast;