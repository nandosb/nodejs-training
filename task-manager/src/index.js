const express = require('express')
require ('./db/mongoose')

const Task = require('./models/task')
const User = require('./models/user')

const log = console.log

const port = process.env.PORT || 3000
const app = express()
const usersRouter = require('./routers/users')
const tasksRouter = require('./routers/tasks')

app.use(express.json())

app.use(usersRouter)
app.use(tasksRouter)

app.listen(port, () => {
    log('Server is listening on port ' + port)
})