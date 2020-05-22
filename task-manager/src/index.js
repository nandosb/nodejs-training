const express = require('express')
require ('./db/mongoose')

const Task = require('./models/task')
const User = require('./models/user')

const usersRouter = require('./routers/users')
const tasksRouter = require('./routers/tasks')
const log = console.log

const port = process.env.PORT || 3000
const app = express()

// app.use((req, res, next) => {
//     res.status(503).send('Site under maintainance. Please try again later.')
// })

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send(401).send('Forbiden')
//     } else {
//         next()
//     }
// })


app.use(express.json())

app.use(usersRouter)
app.use(tasksRouter)

app.listen(port, () => {
    log('Server is listening on port ' + port)
})


// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const secret = 'this_is_my_token_signature'
//     const token = jwt.sign({ _id: 'abc213' }, secret, { expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify(token, secret)
//     console.log(data)
// }

// myFunction()