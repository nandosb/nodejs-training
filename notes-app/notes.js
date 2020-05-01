const fs = require('fs')
const chalk = require('chalk')

const FILENAME = 'data.json'

const log = console.log

const getNote = (title) => {
    notes = loadNotes()
    note = notes.find((note) => note.title === title)
    log(note)
}

const addNote = (title, body) => {
    notes = loadNotes()

    const duplicatesNote = notes.find((note) => note.title === title)

    if( ! duplicatesNote ) {
        notes.push({
            title: title,
            body: body,
        })    
        saveNotes(notes)
        log(chalk.green("New note added"))
    } else {
        log(chalk.red.inverse("Note " + title + " already exist"))
    }
}

const removeNote = (title) => {
    notes = loadNotes()

    const remainingNotes = notes.filter((note) => note.title !== title)

    if (remainingNotes.length !== notes.length) {
        saveNotes(remainingNotes)
        log(chalk.green("Note deleted: " + title))
    }
}

const listNotes = () => {
    log(chalk.yellow('Listing all your notes:'))
    notes = loadNotes()
    notes.forEach( (note) => {
        log(chalk.inverse("Title: " + note.title))
        log("Body: " + note.body)
    });
}


const loadNotes = () => {
    response = null

    try {
        dataBuffer = fs.readFileSync(FILENAME)
        response = JSON.parse(dataBuffer.toString())
    } catch (error) {
        response = []
    }

    return response
}

const saveNotes = (notes) => {
    try {
        fs.writeFileSync(FILENAME, JSON.stringify(notes))
    } catch (error) {
        log('Error: Unable to save notes')
    }
}

module.exports = {
    getNote: getNote,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
}