const request = require('request');

const geocode = (address, callback) => {
    var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic29tdG85NiIsImEiOiJjazJrOHdvOWIxMDRsM2pvMDhpdGcxMG14In0.L0lWaue08HMjJbSJZUZA5Q&limit=1`
    request({
        url,
        json: true
    }, (error, {body}) => {

        // Error handling for irregular network connection i.e poor internet connection
        if (error) {
            callback('Unable to connect to location services', undefined);
        
        // Error handling for invalid addresses or location
        } else if (body.features.length === 0) {
            callback('Invalid search term. Please use another search term', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                Location: body.features[0].place_name
            });
        }

    })
}

module.exports = geocode;