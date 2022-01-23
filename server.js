const express = require('express');

const PORT = process.env.port || 3001;
const path = require('path');
const fs = require('fs');
const data = require('./db/db');



const app = express();

//parse incoming string of array data
app.use(express.urlencoded({ extended: true }))
//parse incoming json
app.use(express.json())
//middleware for serving static files
app.use(express.static('public'))


//route to start website with the html.index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

//route to open notes 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})


//get and post routes to the notes
app.get('/api/notes', (req, res) => {
    res.json(data)
})
//post route
app.post('/api/notes', (req, res) => {

    let jsonFilePath = path.join(__dirname, "/db/db.json");
    let newNote = req.body;

    //setting id to 0 so our first save note id will start with 1 
    //can be use any number to start id
    let highestId = 0;
    for (let i = 0; i < data.length; i++) {
        let individualNote = data[i];

        if (individualNote.id > highestId) {
            highestId = individualNote.id;
        }
    }

    newNote.id = highestId + 1;
    data.push(newNote)
//function to write the note which is writin and checkin if we have err or not
    function createNote() {
        fs.writeFile(jsonFilePath, JSON.stringify(data), (err) => err ? console.log(err) : console.log("Your note is saved!"))
    }
    res.json(createNote)
})
//delete route
app.delete('/api/notes/:id', (req, res) => {

    let jsonFilePath = path.join(__dirname, '/db/db.json')
    //with loop we are finding note by 
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == req.params.id) {
            //splice the note out of the array
            data.splice(i, 1);
            break;
        }
    }
    //write back the array without spliced note
    fs.writeFileSync(jsonFilePath, JSON.stringify(data), (err) => err ? console.log(err) : console.log('Your note is deleted!'))

    res.json(data)
});


//exporting the website to local por 3001 on our chrome
app.listen(PORT, () => {
    console.log(`API servervnow on port ${PORT}`);
});