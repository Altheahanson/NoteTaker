const express = require('express');
const path = require('path');
const db = require('./db/db.json');


const app = express();

const PORT = process.env.port || 3001;

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

app.use(express.static(path.join(__dirname, 'public'))
); //<---- May need to check this

// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get('/api', (req, res) => res.json(db));



// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// GET Route for notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// GET Route for wildcard page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/404.html'))
); 


