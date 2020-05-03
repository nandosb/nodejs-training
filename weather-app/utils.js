const fs = require('fs')

const getWeatherStackToken = () => {
    config = _loadConfig()
    return config.mapbox_token.trim()
}

const getMaboxToken = () => {
    config = _loadConfig()
    return config.weatherstack_token.trim()
}

const _loadConfig = () => {
    buffer = fs.readFileSync('config.json')
    return JSON.parse(buffer.toString())
}

module.exports = {
    getWeatherStackToken: getWeatherStackToken,
    getMaboxToken: getMaboxToken,
}