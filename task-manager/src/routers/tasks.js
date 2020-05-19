const express = require('express')
const router = express.Router()

const Task = require('../models/task')

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch(e) {
        log(e)
        res.status(500).send(e.message)
    }
})

router.get('/tasks/:id', async (req, res) => {
    try {
        const _id = req.params.id 
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
        
    } catch(e) {
        res.status(500).send(e.message)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = updates.every((elementToValidate) => allowedUpdates.includes(elementToValidate))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        if (!task) {
            return res.status(404).send()
        }

        res.status(200).send(task)
    } catch(e) {
        res.status(500).send(e.message)
    }
})


router.post('/tasks', async (req, res) => {

    try {
        log(req.body)
        const task = new Task(req.body)
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e.message)
    }
})

router.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            res.status(404).send()
        }

        res.status(200).send(task)

    } catch(e) {
        res.status(500).send(e.message)
    }
})

module.exports = router