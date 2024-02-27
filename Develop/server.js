const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');
const { writeFile } = require('fs');
const PORT = 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/notes', (req, res) => {
  notesData.push(req.body);
  writeFile("./db/db.json", JSON.stringify(notesData));
  res.json(`${req} request processed`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(notesData)
});



app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
