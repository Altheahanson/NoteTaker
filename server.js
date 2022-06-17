// REQUIREMENTS
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const app = express();

// PORT NUMBER
const PORT = process.env.PORT || 3001;




// MIDDLEWARE

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));
//URL ROUTING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// ROUTES
// TO INDEX
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
// TO NOTES
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);
// TO WILDCARD - ERROR HANDLER
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/404.html'))
);

// SHOW LISTENING PORT ON SERVER CONSOLE
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));