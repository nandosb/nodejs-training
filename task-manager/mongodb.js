
const {MongoClient, ObjectID} = require('mongodb')

const user = 'root'
const password = 'example'
const connectionUrl = 'mongodb://' + user + ':' + password + '@mongo:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, { 
    useNewUrlParser: true,
}, (error, client) => {
    if (error){ 
        console.log("Error connecting to the database")
        return console.log(error)
    }

    console.log('Connected correctly')

    const db = client.db(databaseName)

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Re-schedule meeting with my team',
    //         completed: true,
    //     }, {
    //         description: 'Prepare topics for James',
    //         completed: false,
    //     }, {
    //         description: 'Schedule a time to code with Walter',
    //         completed: false,
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to save tasks')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').findOne({name: 'Fernando'}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }   
    
    //     console.log(user)
    // })

    // // find() retutns a cursor, not an array of results
    // db.collection('users').find({age: 35}).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').find({age: 35}).count((error, count) => {
    //     console.log(count)
    // })

    // db.collection('tasks').findOne({_id: new ObjectID('5eb88406b6135a008a965807')}, (error, task) => {
    //     console.log('Latest ID')
    //     console.log(task)
    // })

    // db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
    //     console.log('Not completed tasks')
    //     console.log(tasks)
    // })

    // // Update a document
    // db.collection('users').updateOne({
    //     _id: new ObjectID('5eb8879899dca600b6ad52fb')
    // }, {
    //     // $set: {
    //     //     name: 'Mariano'
    //     // }
    //     $inc: { age: 1 }
    // }).then((result)=> {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // // Update several documentes at the same time
    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('users').deleteMany({
        age: {$gt: 20}, //$gt => greater than
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})