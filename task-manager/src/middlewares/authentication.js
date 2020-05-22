const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const authToken = req.header('authorization').replace('Bearer ', '')

        const decoded = jwt.verify(authToken, 'this_is_my_secret')
        
        const user = await User.findOne({ _id: decoded._id , 'tokens.token': authToken})

        if (!user) {
            throw new Error()
        }

        req.user = user
        req.token = authToken
        next()
    } catch (e) {
        res.status(401).send({error: 'Please authenticate first'})
    }
}

module.exports = auth