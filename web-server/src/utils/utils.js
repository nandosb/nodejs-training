const path = require('path')
const fs = require('fs')

const getWeatherStackToken = () => {
    let weatherStack_token = undefined

    if (process.env.weatherstack_token) {
        weatherStack_token = process.env.weatherstack_token
    } else {
        config = _loadConfig()
        weatherStack_token = config.weatherstack_token.trim()
    }

    return weatherStack_token
}

const getMaboxToken = () => {
    mapbox_token = undefined

    if (process.env.mapbox_token) {
        mapbox_token = process.env.mapbox_token
    } else {
        config = _loadConfig()
        mapbox_token = config.mapbox_token.trim()
    }

    return mapbox_token
}

const _loadConfig = () => {
    buffer = fs.readFileSync(path.join(__dirname, 'config.json'))
    return JSON.parse(buffer.toString())
}

module.exports = {
    getWeatherStackToken: getWeatherStackToken,
    getMaboxToken: getMaboxToken,
}