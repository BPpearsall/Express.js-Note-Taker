const router = require('express').Router();
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');


router.get('/notes',  (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data))
    });  
})

router.post('/notes', (req, res) => {
    console.log(req.body)
    const { title, text } = req.body
    const note = {
        title,
        text,
        id: uuidv4(),
    }

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        const notes = JSON.parse(data);
        notes.push(note)
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            err ? console.error(err) : console.info(`\nData written to './db/db.json'`)
            res.json(notes)
        })
    });
})

router.delete('notes/:id', (req, res) => {
    const { id } = req.params;
    const deleted = notes.find(note => note.id == id)
    if (deleted) {
        notes = notes
    } else {
        res.status(404).json({ message: "Note does not exist"})
    }
})

// delete /api/notes/:id
module.exports = router