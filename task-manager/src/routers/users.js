const express = require('express')
const authentication = require('../middlewares/authentication')
const User = require('../models/user')
const router = new express.Router()



router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()        
        const token = await user.generateAuthToken()
        
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        
        let token = req.token

        if (!req.token) {
            token = await user.generateAuthToken()
        }

        res.status(200).send({ user, token })
    } catch(e) {
        res.status(400).send(e.message)
    }
})

router.post('/users/logout', authentication, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokenObject) => {
            return tokenObject.token !== req.token
        })

        await req.user.save()

        res.send()

    } catch(e) {
        res.status(500).send(e.message)
    }
})

router.post('/users/logoutAll', authentication, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.status(200).send()
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/users/me', authentication ,async (req, res) => {
    res.send(req.user) 
})

router.patch('/users/me', authentication, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((elementToValidate) => allowedUpdates.includes(elementToValidate) )

    if (! isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach( (updateField) => req.user[updateField] = req.body[updateField] )

        await req.user.save()

        res.status(200).send(req.user)
    } catch(e) {
        res.status(200).send(e.message)
    }
})

router.delete('/users/:id', authentication, async(req, res) => {
    try {
        await req.user.remove()

        res.status(200).send(req.user)

    } catch(e) {
        res.status(500).send(e.message)
    }
})


module.exports = router