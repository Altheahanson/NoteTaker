const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require("fs");
const uuid = require('./helpers/uuid');
// const {
//     readFromFile,
//     readAndAppend,
//     writeToFile,
//   } = require('../helpers/fsUtils');


const app = express();

const PORT = process.env.port || 3001;

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

app.use(express.static(path.join(__dirname, 'public'))
); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get('/api/notes', (req, res) => res.json(db));

// app.get('api/notes/:id', (req, res) => {
//     res.json(db.filter(db => db.id === parseInt(req.params.id)));
//   })

// // DELETE Route for a specific tip
// db.delete('api/notes/:id', (req, res) => {
//     const noteId = req.params.id;
//     readFromFile('./db/db.json')
//       .then((data) => JSON.parse(data))
//       .then((json) => {
//         // Make a new array of all tips except the one with the ID provided in the URL
//         const result = json.filter((text) => text.id !== noteId);
  
//         // Save that array to the filesystem
//         writeToFile('./db/db.json', result);
  
//         // Respond to the DELETE request
//         res.json(`Item ${noteId} has been deleted 🗑️`);
//       });
//   });


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

// POST request to add a review
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text ) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        //username,
        id: uuid(),
      };


// Obtain existing reviews
fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parsedNotes = JSON.parse(data);
  
      // Add a new review
      parsedNotes.push(newNote);
  
      // Write updated reviews back to the file
      fs.writeFile(
        './db/db.json',
        JSON.stringify(parsedNotes, null, 4),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully updated notes!')
      );
    }
  })
}
});
