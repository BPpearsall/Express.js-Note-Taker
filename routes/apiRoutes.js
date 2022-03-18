const router = require('express').Router();
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile} = require('../helpers/fsUtils')


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

router.delete("/notes/:id", function(req, res) {
    readFromFile('./db/db.json').then((data) =>{
        var list = JSON.parse(data);
        var newArray = []
        for (i=0; i<list.length; i++){
            if ( req.params.id !== list[i].id ){
                newArray.push(list[i])
            }
        };
        writeToFile('./db/db.json', newArray);
        res.json({message: 'Successfully Added'})
    })
   });

// delete /api/notes/:id
module.exports = router