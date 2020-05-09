const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express configs
const publicAppDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// app.set sets express settings in the form of key-value pairs
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicAppDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Fernando Serrano',
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather app - about',
        body: 'Some dinamic content',
        name: 'Fernando Serrano',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather app - help',
        body: 'Some mode dinamic content',
        name: 'Fernando Serrano',
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Weather app - help',
        body: 'Help article not found',
        name: 'Fernando Serrano',
    })
})

app.get('/weather', (req, res) => {
    if(! req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error, 
            })
        } else {
            forecast(latitude, longitude, (error, data) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: data,
                    location,
                    address: req.query.address, 
                })
            })
        }

    })
})

app.get('/products', (req, res) => {
    console.log(req.query)

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    res.send({
        products: []
    })
    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        body: 'Page not found',
        name: 'Fernando Serrano',
    })
})

app.listen(port = 80, () => {
    console.log('Server is up on port ' + port)
})