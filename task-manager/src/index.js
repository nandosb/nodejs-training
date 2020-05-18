const express = require('express')
require ('./db/mongoose')

const Task = require('./models/task')
const User = require('./models/user')

const log = console.log

const port = process.env.PORT || 3000
const app = express()


app.use(express.json())

app.post('/users', async (req, res) => {
    try {
        log(req.body)
        const user = new User(req.body)
        await user.save()        
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch(e) {
        res.status(500).send(e.message)
    }
})

app.get('/users/:id', async (req, res) => {
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


app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch(e) {
        log(e)
        res.status(500).send(e.message)
    }
})

app.get('/tasks/:id', async (req, res) => {
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


app.post('/tasks', async (req, res) => {

    try {
        log(req.body)
        const task = new Task(req.body)
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e.message)
    }
})

app.listen(port, () => {
    log('Server is listening on port ' + port)
})