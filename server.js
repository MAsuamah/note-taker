const express = require('express');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

const notes = require('./db/db');

app.get('/api/notes', (req,res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  req.body.id = uuidv4();
  res.json(req.body);
});



app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

