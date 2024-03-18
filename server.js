const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');
const { writeFile } = require('fs');
const { v4: uuidv4 } = require('uuid');
const PORT = 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(uuidv4());

app.post('/api/notes', (req, res) => {
  console.log(uuidv4());
  const note = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text
  };
  notesData.push(note);
  writeFile("./db/db.json", JSON.stringify(notesData), (err) =>
    err
      ? console.error(err)
      : console.log(
        `db update suc`
      ));

  // writeFile("./db/db2.json", "gang gang");
  res.json(`${req} request processed`);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteIndex = notesData.findIndex(x => x.id == req.params.id);
  notesData.splice(noteIndex, 1);
  // notesData.push(req.body);
  writeFile("./db/db.json", JSON.stringify(notesData), (err) =>
    err
      ? console.error(err)
      : console.log(
        `db update suc`
      ));

  // writeFile("./db/db2.json", "gang gang");
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
