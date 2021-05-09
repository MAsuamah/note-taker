//===============================================
//Requirements
const fs = require('fs');
const path = require('path');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const notes = require('./db/db');

//================================================
//Express setup
const PORT = process.env.PORT || 3001;
const app = express();

//=================================================
//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//=======================================================
//Push newly created notes into array and write to db.json
function createNewNotes (body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
  return note;
}

//==========================================================
//Routes serving API endpoints (POST,GET,DELETE)
app.get('/api/notes', (req,res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  req.body.id = uuidv4();
  const note = createNewNotes(req.body, notes)
  res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  notes.splice(notes.findIndex( note => note.id === id), 1)
  fs.writeFileSync(
    path.join( __dirname, './db/db.json' ),
    JSON.stringify(notes, null, 1 )
  );
  res.json(notes)
});

//===========================================================
//Routes serving HTML pages 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//===========================================================
//PORT listener for server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

