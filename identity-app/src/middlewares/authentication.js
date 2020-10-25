const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const authToken = req.header('authorization').replace('Bearer ', '')

        const decoded = jwt.verify(authToken, 'this_is_my_shared_secret_across_apps')
        
        const user = {
            firstName: 'Fernando',
            lastName: 'Serrano',
        }

        req.user = user
        req.token = authToken
        next()
    } catch (e) {
        res.status(401).send({error: 'Please authenticate first'})
    }
}

module.exports = auth