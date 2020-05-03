const request = require('postman-request')

const utils = require('./utils.js')

const log = console.log

const getCurrentTemperature = (location, unit) => {
    getLatLongFromAddress(location, (error, data) => {
        if (error) {
            log("Error: " + error)
        } else {
            log('Checking weather for: ' + data.location)
            _getWeatherForLocation(data.latitude, data.longitude, unit)
        }
    })
}

const getLatLongFromAddress = (address, callback) => {
    token = utils.getMaboxToken()
    baseUrl = 'https://api.mapbox.com'

    url = baseUrl + '/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=' + token

    request({
        url: url,
        json: true,
        },
        (error, response) => {
            if (error) {
                callback('Unable to connect to geolocalization service', undefined)
            } else if (response.body.features === undefined || response.body.features.length === 0) {
                callback('Error with input parameters. Unable to find location, try another search', undefined)
            }
            else {
                data = {
                    location: response.body.features[0].place_name,
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                }
                callback(undefined, data)
            }
        }
    )
}

const _getWeatherForLocation = (latitude, longitude, unit) => {
    weatherstackApiKey = utils.getWeatherStackToken()
    baseUrl = 'http://api.weatherstack.com'

    url = baseUrl + '/current?access_key=' + weatherstackApiKey + '&query=' + latitude + ',' + longitude +'&units='+unit

    request({
        url: url,
        json: true,
        },
        (error, response) => {
            if (error) {
                log('Unable to connect to weather service')
            } else if (response.body.error){
                log(response.body.error.type)
                log(response.body.error.info)
            } else {
                currentTemperature = response.body.current.temperature
                feelsLikeTemperature = response.body.current.feelslike
                weatherDescription = response.body.current.weather_descriptions[0]
                windDirection = response.body.current.wind_dir
                windSpeed = response.body.current.wind_speed
        
                log(weatherDescription + ". It's currently " + currentTemperature + " degrees out.")
                log("It feels like " + feelsLikeTemperature + " degrees. Wind from '" + windDirection + "'@" + windSpeed + " speed" )
            }
        }
    )
}

module.exports = {
    getCurrentTemperature: getCurrentTemperature,
    getLatLongFromAddress: getLatLongFromAddress,
}