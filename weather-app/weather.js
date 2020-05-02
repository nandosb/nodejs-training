const fs = require('fs')
const request = require('postman-request')

const log = console.log

const getCurrentTemperature = (location, unit) => {
    weatherstackApiKey = _getWeatherStackToken()
    baseUrl = 'http://api.weatherstack.com'

    url = baseUrl + '/current?access_key=' + weatherstackApiKey + '&query=' + encodeURI(location) +'&units='+unit

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
                log("Checking the weather:")
                currentTemperature = response.body.current.temperature
                feelsLikeTemperature = response.body.current.feelslike
                weatherDescription = response.body.current.weather_descriptions[0]
        
                log(weatherDescription + ". It's currently " + currentTemperature + " degrees out. It feels like " + feelsLikeTemperature + " degrees")
            }
        }
    )
}

const getLatLongFromAddress = (address) => {
    token = _getMaboxToken()
    baseUrl = 'https://api.mapbox.com'

    url = baseUrl + '/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?limit=1&access_token=' + token

    request({
        url: url,
        json: true,
        },
        (error, response) => {
            if (error) {
                log('Unable to connect to geolocalization service')
            } else if (response.body.features === undefined || response.body.features.length === 0) {
                log('Error with input parameters. Unable to find location, try another search')
            }
            else {
                log("Seeking location - " + address + ":")
                log(response.body.features[0].place_name)
                log("Coordinates: " + response.body.features[0].center)
            }
        }
    )
}

const _getWeatherStackToken = () => {
    config = _loadConfig()
    return config.mapbox_token.trim()
}

const _getMaboxToken = () => {
    config = _loadConfig()
    return config.weatherstack_token.trim()
}

const _loadConfig = () => {
    buffer = fs.readFileSync('config.json')
    return JSON.parse(buffer.toString())
}

module.exports = {
    getCurrentTemperature: getCurrentTemperature,
    getLatLongFromAddress: getLatLongFromAddress,
}