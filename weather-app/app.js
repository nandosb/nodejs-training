const yargs = require('yargs')

const myWeather = require('./weather.js')

// Customize yargs version
yargs.version('1.0.0')

// Create add command
yargs.command({
    command: 'getCurrentWeather',
    describe: 'Get current weather for location',
    builder: {
        location: {
            describe: 'Location to check the weather',
            demandOption: true,
            type: 'string',
        },
        unit: {
            describe: 'Unit to show the results. "m" -> metric, "s" -> kelvin, "f" -> fahrenheit',
            demandOption: false,
            choices: ['m', 's', 'f'],
            type: 'string',
        },
    },
    handler: (argv) => {
        unit = 'm' 
        if (argv.unit !== undefined) {
            unit = argv.unit
        }

        myWeather.getCurrentTemperature(argv.location, unit)

        myWeather.getLatLongFromAddress(argv.location)
    }

})

yargs.parse()