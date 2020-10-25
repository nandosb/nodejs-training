const express = require('express')
const cookie = require('cookie');

const router = new express.Router()

router.get('/login', (req, res) => {
    // Parse the cookies on the request
    var cookies = cookie.parse(req.headers.cookie || '');
    
    // Get the visitor name set in the cookie
    var username = cookies.token;

    res.render('index', {
        title: 'Identity App',
        username,
    })
})

router.post('/login', (req, res) => {
    console.log(req.body)

    token = req.body.username

    res.render('loggingin', {
        title: 'Logging in',
        token,
    })
})

router.get('/crosslogin', (req, res) => {

    console.log("referer: " + req.headers.referer + " host: " + req.headers.host)

    setTimeout(() => {
        
        res.setHeader('Access-Control-Allow-Origin', 'http://identity.myevents.com, http://identity.myevents.com:3000')

        res.setHeader('Set-Cookie', cookie.serialize('token', String(req.query.token), {
            httpOnly: true, //not accesible via Javascript on the client side
            sameSite: 'lax', //cookie will be sent to requests coming from different subdomains
        }));

        res.status(200).send(req.query.token)

    }, 3000);

})

module.exports = router