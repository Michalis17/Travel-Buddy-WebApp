// TODO test trip class make separate module for use and unit testing 
// TODO clean up comments 
 var Trip = require("./tripClass");
 const worldCities = require('../server/citiesData.json');
// Start up an instance of app
const express = require("express");
const app = express();

// Dependencies
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const axios = require("axios");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
// Resolve the path to your 'dist' directory
const distPath = path.resolve(__dirname, "../../dist");

// Serve static files from the 'dist' directory
app.use(express.static(distPath));

// Setup Server
const port = 8000;
// Starting server and listening for incoming requests
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const dotenv = require("dotenv");
dotenv.config();

// used to convert xml to json for geonames API
const convert = require("xml-js");

const { Dataset } = require("data.js");

const url = "https://datahub.io/core/world-cities/datapackage.json";

// const worldCitiesDataSet = async () => {
//   try {
//     const dataset = worldCities;
//     const dataObjects = [];

//     // Check and process resources if they are in JSON format
//     for (const id in dataset.resources) {
//       const resource = dataset.resources[id];

//       if (resource._descriptor.format === "json") {
//         const file = resource; // Get the resource
//         const stream = await file.stream(); // Get stream data
//         const buffer = await file.buffer; // Get buffer data

//         // Assuming data is an array of objects in JSON format
//         const data = JSON.parse(buffer.toString()); // Convert buffer to JSON
//         dataObjects.push(...data); // Push the data objects into the array
//       }
//     }

//     // Now dataObjects contains an array of objects extracted from the JSON resources
//     return dataObjects; // Return the array of objects for further processing
//   } catch (error) {
//     console.error("Error:", error);
//     return []; // Return an empty array in case of an error
//   }
// };

// TODO refactor this code a bit

app.get("/searchCities", async (req, res) => {
  try {
    // Fetch the world cities data
    // const worldCities = await worldCitiesDataSet();
    // Send the data as JSON to the client
    console.log(worldCities);
    res.json(worldCities);
    console.log("SUCCESS: World Cities Array was sent to client");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



const geonamesApiKey = process.env.GEONAMES_API;
const openWeatherApiKey = process.env.OPENWEATHER_API;
const pixabayApiKey = process.env.PIXABAY_API;

function geonamesAPI(id, apiKey) {
  return axios
    .get(`https://secure.geonames.org/get?geonameId=${id}&username=${apiKey}`)
    .then((res) => {
      const xml = res.data;
      const results = convert.xml2js(xml, { compact: true });
      return results; // Return the results from the API call
    })
    .catch((error) => {
      console.log("Geonames API call failed:", error);
      throw error; // Re-throw the error to be handled elsewhere if needed
    });
}

function pixabayAPI(country, apiKey) {
  return axios
    .get(
      `https://pixabay.com/api/?key=${apiKey}&q=${country}+flag&orientation=horizontal&per_page=3&image_type=photo`
    )
    .then((res) => {
      const pixabayFlags = res.data.hits;
      let countryFalgs_URL = [];
      for (let flag of pixabayFlags) {
        countryFalgs_URL.push(flag.webformatURL);
      }
      const url = countryFalgs_URL[Math.floor(Math.random() * 3)];
      return url;
    })
    .catch((error) => {
      console.log("Pixabay API call failed:", error);
      throw error; // Re-throw the error to be handled elsewhere if needed
    });
}

function findAverage(arr) {
  // Check if the array is empty to avoid division by zero
  if (arr.length === 0) {
    return 0; // Return 0 for an empty array
  }

  // Calculate the sum of all numbers in the array
  const sum = arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  // Calculate the average
  const average = sum / arr.length;

  return average;
}

// this function returns an object of the weather data given the coordinates
function openWeatherAPI(lat, lon, apiKey) {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    )
    .then((res) => {
      const apiArray = res.data.list; // array of weather data every 8 array items its one day
      const sunRiseTime = res.data.city.sunrise;
      const sunSetTime = res.data.city.sunset;

      // extracting each day into its own array from the fiveDayForecast

      const chunkSize = 8;

      const fiveDayForecast = [];
      for (let i = 0; i < apiArray.length; i += chunkSize) {
        const chunk = apiArray.slice(i, i + chunkSize);
        fiveDayForecast.push(chunk);
      }

      let day1temp = [];
      fiveDayForecast[0].forEach((stamp) => {
        day1temp.push(stamp.main.temp);
      });

      let day2temp = [];
      fiveDayForecast[1].forEach((stamp) => {
        day2temp.push(stamp.main.temp);
      });

      let day3temp = [];
      fiveDayForecast[2].forEach((stamp) => {
        day3temp.push(stamp.main.temp);
      });

      let day4temp = [];
      fiveDayForecast[3].forEach((stamp) => {
        day4temp.push(stamp.main.temp);
      });

      let day5temp = [];
      fiveDayForecast[4].forEach((stamp) => {
        day5temp.push(stamp.main.temp);
      });

      day1temp = Math.round(findAverage(day1temp));
      day2temp = Math.round(findAverage(day2temp));
      day3temp = Math.round(findAverage(day3temp));
      day4temp = Math.round(findAverage(day4temp));
      day5temp = Math.round(findAverage(day5temp));

      const weatherData = [ day1temp, day2temp, day3temp, day4temp, day5temp, sunRiseTime, sunSetTime,
      ];
      return weatherData;
      // use this to get the sunrise and sunset time
      // return results; // Return the results from the API call
    })
    .catch((error) => {
      console.log("OpenWeather API call failed:", error);
      throw error; // Re-throw the error to be handled elsewhere if needed
    });
}

app.post("/tripInfo", async (req, res) => {
  try {
    const userInput = req.body; // Access user input from the request body
    console.log("Received user data:", userInput);
    const locationArray = userInput.location.split(",");

    const geonameId = locationArray[3]; // to be add in Trip object
    const countryName = locationArray[2]; // to be add in Trip object
    const cityName = locationArray[0]; // to be add in Trip object
    const tripDate = userInput.date;
    // Make the Geonames API call for coordinates
    const coord = await geonamesAPI(geonameId, geonamesApiKey);
    // Access values from the coord js object
    const lat = coord.geoname.lat._text;
    const lng = coord.geoname.lng._text;
    // make Openweather API call using coord
    const weatherObject = await openWeatherAPI(lat, lng, openWeatherApiKey); // to be add in Trip object

    const picture = await pixabayAPI(countryName, pixabayApiKey); // to be add in Trip object

    const tripInfo = new Trip(cityName, countryName, geonameId, weatherObject, picture, tripDate);
    // Respond with the obtained data
    res.json(tripInfo);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error occurred");
  }
});
