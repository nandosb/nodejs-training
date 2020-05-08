const request = require('postman-request')

const utils = require('./utils.js')

const forecast = (latitude, longitude, callback) => {
    weatherstackApiKey = utils.getWeatherStackToken()
    baseUrl = 'http://api.weatherstack.com'

    url = baseUrl + '/current?access_key=' + weatherstackApiKey + '&query=' + latitude + ',' + longitude +'&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {

            currentTemperature = body.current.temperature
            feelsLikeTemperature = body.current.feelslike
            weatherDescription = body.current.weather_descriptions[0]
            windDirection = body.current.wind_dir
            windSpeed = body.current.wind_speed

            callback(undefined, weatherDescription + ' It is currently ' + currentTemperature + ' degress out. It feels like ' + feelsLikeTemperature + ' degrees.')
        }
    })
}

module.exports = forecast