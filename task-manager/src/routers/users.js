const express = require('express')
const router = new express.Router()

const User = require('../models/user')


router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()        
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch(e) {
        res.status(500).send(e.message)
    }
})

router.get('/users/:id', async (req, res) => {
    try{
        const _id = req.params.id 
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch(e) {
        res.status(500).send(e.message)
    }
})

router.patch('/users/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((elementToValidate) => allowedUpdates.includes(elementToValidate) )

    if (! isValidOperation) {
        res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).send()
        }
        
        updates.forEach( (updateField) => user[updateField] = req.body[updateField] )

        await user.save()

        res.status(200).send(user)
    } catch(e) {
        res.status(200).send(e.message)
    }
})

router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            res.status(404).send()
        }

        res.status(200).send(user)

    } catch(e) {
        res.status(500).send(e.message)
    }
})


module.exports = router