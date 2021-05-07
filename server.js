const fs = require('fs');
const path = require('path');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

const notes = require('./db/db');

function createNewNotes (body, notesArray) {
  const note = body;
  notesArray.push(note)
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  // return finished code to post route for response
  return note;
}

app.get('/api/notes', (req,res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  req.body.id = uuidv4();
  const note = createNewNotes(req.body, notes)
  res.json(note);
});


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

