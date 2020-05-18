const mongoose = require('mongoose')

const user = 'root'
const password = 'example'
const databaseName = 'task-manager-api'
const connectionUrl = 'mongodb://' + user + ':' + password +'@mongo:27017'


mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: databaseName,
}).then((result)=>{
    console.log('DB connected successfuly')
}).catch((error) => {
    console.log(error)
})