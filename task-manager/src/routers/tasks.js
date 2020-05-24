const express = require('express')
const router = express.Router()

const Task = require('../models/task')
const authentication = require('../middlewares/authentication')

router.get('/tasks', authentication, async (req, res) => {
    const match = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    const sort = {}

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // Get all tasks from the user.
        // await req.user.populate('tasks').execPopulate()
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort,
            }
        }).execPopulate()

        res.status(200).send(req.user.tasks)
    } catch(e) {
        res.status(500).send(e.message)
    }
})

router.get('/tasks/:id', authentication, async (req, res) => {
    const _id = req.params.id 

    try {
        const task = await Task.findOne({_id , owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        await task.populate('User').execPopulate()
        res.status(200).send(task)
        
    } catch(e) {
        res.status(500).send(e.message)
    }
})

router.patch('/tasks/:id', authentication, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = updates.every((elementToValidate) => allowedUpdates.includes(elementToValidate))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const task = await Task.findOne({_id : req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((fieldToUpdate) => task[fieldToUpdate] = req.body[fieldToUpdate])

        await task.save()

        res.status(200).send(task)
    } catch(e) {
        res.status(500).send(e.message)
    }
})


router.post('/tasks', authentication, async (req, res) => {

    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id,
        })
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e.message)
    }
})

router.delete('/tasks/:id', authentication, async(req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user.id})

        if (!task) {
            return res.status(404).send()
        }

        res.status(200).send(task)

    } catch(e) {
        res.status(500).send(e.message)
    }
})

module.exports = router