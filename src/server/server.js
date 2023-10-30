// TODO: set up all apis that will be used and CLEAN UP CODE   

// Pixabay API Key
const picsApiKey = '39780494-3f7dac4e6c4c70f23aa160a44';
// example url https://pixabay.com/api/?key=39780494-3f7dac4e6c4c70f23aa160a44&q=yellow+flowers&image_type=photo
const picsApiBase = 'https://pixabay.com/api/?key=' + picsApiKey;
// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes

// const dotenv = require('dotenv'); THIS CODE IS TO HIDE API KEY

// Start up an instance of app
const express = require('express');
const app = express();

// Dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
// Resolve the path to your 'dist' directory
const distPath = path.resolve(__dirname, '../../dist');

// Serve static files from the 'dist' directory
app.use(express.static(distPath));

app.get('/', function (req, res) {
    // Use path.join() to create an absolute path to 'index.html'
    res.sendFile(path.join(distPath, 'index.html'));
});


// Setup Server
const port = 8000;
// Starting server and listening for incoming requests
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

