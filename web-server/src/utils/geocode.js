const request = require('postman-request')

const utils = require('./utils.js')

const geocode = (address, callback) => {
    token = utils.getMaboxToken()
    baseUrl = 'https://api.mapbox.com'

    url = baseUrl + '/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=' + token

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode