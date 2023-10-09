// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
// Starting server and listening for incoming requests
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// POST route to add data to projectData 
app.post('/addData', function (req, res) {
    const newEntry = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    };

    projectData[0] = newEntry;
    console.log(projectData);
});

// GET route to send projectData to client
app.get('/all', function (req, res) {
    res.send(projectData);
});