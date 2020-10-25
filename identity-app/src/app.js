const path = require('path')

const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const cookie = require('cookie');

const authMiddleware = require('./middlewares/authentication')

const authRouter = require('./routers/authentication')
// const usersRouter = require('./routers/users')

const app = express()

// Define paths for Express configs
const publicAppDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
// const partialsPath = path.join(__dirname, '../templates/partials')

const appInit = (app, port = 80) => {
    // for parsing application/json
    app.use(bodyParser.json()); 
    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true })); 
    
    // app.set sets express settings in the form of key-value pairs
    app.set('view engine', 'hbs')
    app.set('views', viewsPath)
    // hbs.registerPartials(partialsPath)
    
    // Setup static directory to serve
    app.use(express.static(publicAppDirectoryPath))

    // app.use(authMiddleware)

    app.use(authRouter)

    app.get('/myprofile',(req, res) => {

        let cookies = ''

        if (req.headers) {
            cookies = cookie.parse(req.headers.cookie || ''); 
        }
        console.log(cookies)

        if (!cookies || !cookies.token) {
            return res.status(401).send('UNAUTHORIZED')
        }
        res.status(200).send('my profile - ' + cookies.token)
        
    })
    
    app.get('*', (req, res) => {
        res.render('404', {
            title: 'Page not found',
            body: 'Page not found',
            name: 'Fernando Serrano',
        })
    })
    
    
    app.listen(port, () => {
        console.log('Server is up on port ' + port)
    })
}

let port = process.env.PORT || 80
if (process.argv[2]) {
    port = process.argv[2]
}

appInit(app, port)

