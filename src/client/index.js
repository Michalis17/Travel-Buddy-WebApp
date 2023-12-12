// css 
import "../client/styles/style.scss";
// Custome JS modules
import { placePicker } from "./js/placePicker";
import { setDateLimit } from "./js/dateLimit";
import { jsPDF } from "jspdf";
import { userInputToServer } from "./js/formHandler";
import {countdown } from "./js/countdown";

placePicker();
// The code below sets the current date as the date limit
const currentTime = new Date();
setDateLimit(currentTime);

// handeling the form input fields to save trips and info from my server

// ! GLOBAL VARIABLES
const form = document.getElementById("myForm");
const tripsSecion = document.getElementById("trips");

// event listiner for form
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInput = {
    location: document.getElementById("searchInput").value,
    date: document.getElementById("input-date").value,
  };

  try {
    const tripObject = await userInputToServer(userInput);
    saveTripObj(tripObject);
    location.reload();
  } catch (error) {
    console.error("Error while sending data to the server:", error);
    // Handle errors here
    alert("Failled to retrive trip information from server try again in 5 min");
  }
});

let tripsArray = JSON.parse(localStorage.getItem("trips")) || [];
function saveTripObj(tripObj) {
  tripsArray.push(tripObj);
  localStorage.setItem("trips", JSON.stringify(tripsArray));
}




export function displayTrips(array) {
  if (!Array.isArray(array)) {
    throw new Error("Invalid input. 'array' parameter must be an array.");
  }
  
  if (array.length === 0) {
    tripsSecion.insertAdjacentHTML(
      "beforeend",
      `<h3>No trips to show yet. Add your next trip! </h3>`
    );
  } else {
    array.forEach((item, index) => {
      
      const sunSetTime = new Date(item.weather[5])
      const sunRiseTime = new Date(item.weather[6])
      // cosnole.log(sunRiseTime);
      // Access item and optionally index
      const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("img");
    image.src = item.picture;
    image.classList.add("card-img-top");
    image.alt = `Image of ${item.country}`;
    card.appendChild(image);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title1 = document.createElement("h5");
    title1.classList.add("card-title");
    title1.textContent = item.city;
    cardBody.appendChild(title1);

    const title2 = document.createElement("h6");
    title2.classList.add("card-title");
    title2.textContent = item.country;
    cardBody.appendChild(title2);

    const weatherForecast = document.createElement("div");
    weatherForecast.classList.add("weather-box");

    const days = ["DAY 1", "DAY 2", "DAY 3", "DAY 4", "DAY 5"];
    item.weather.forEach((weather, i) => {
      const dayDiv = document.createElement("div");
      const dayLabel = document.createElement("p");
      dayLabel.textContent = days[i];
      const weatherInfo = document.createElement("p");
      weatherInfo.textContent = weather;
      dayDiv.appendChild(dayLabel);
      dayDiv.appendChild(weatherInfo);
      weatherForecast.appendChild(dayDiv);
    });

    cardBody.appendChild(weatherForecast);

    const sunrise = document.createElement("p");
    sunrise.classList.add("card-text");
    sunrise.textContent = `Sunrise: ${sunRiseTime.getHours()}:${sunRiseTime.getMinutes()}, Sunset: ${sunSetTime.getHours()}:${sunSetTime.getMinutes()}`;
    cardBody.appendChild(sunrise);

    const countdown = document.createElement("div");
    countdown.classList.add("countdown");
    countdown.textContent = "00 : 00 : 00 : 00";
    cardBody.appendChild(countdown);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete", "btn", "btn-danger");
    deleteButton.id = index;
    deleteButton.type = "button";
    deleteButton.textContent = "Delete trip";
    deleteButton.addEventListener("click", () => {
      const confirmUser = confirm("Are you sure you want to delete this trip?");
      if (confirmUser === true) {
        removeTrip(index);
        location.reload();
      }
    });
    cardBody.appendChild(deleteButton);

    const downloadButton = document.createElement("button");
    downloadButton.classList.add("download", "btn", "btn-secondary");
    downloadButton.id = index;
    downloadButton.type = "button";
    downloadButton.textContent = "Download PDF";
    downloadButton.addEventListener("click", () => {
      const departingDate = item.departure;
      const city = item.city;
      const country = item.country;
      makeTripPDF(departingDate, city, country);
    });
    cardBody.appendChild(downloadButton);

    card.appendChild(cardBody);
    tripsSecion.appendChild(card);

    });
  }
}
displayTrips(tripsArray);
// ! change the way the DOM is updated but it works now
const displayCountDown = () => {
  const allCountdownForTrips =  document.getElementsByClassName("countdown");
  let i = 0;
  
for (const item of allCountdownForTrips) {
    const countdownResults = countdown(tripsArray[i].departure);
    item.innerText = `${countdownResults.day} : ${countdownResults.hour} : ${countdownResults.minute} : ${countdownResults.second}`;
    i++;
} 
}

// displayCountDown();
setInterval(() => {displayCountDown();}, 1000);
// console.log(tripsArray[0].departure)

function removeTrip(tripID) {
  // removes trip object from array based on the index
  const updatedTripsArray = tripsArray.filter((trip, index) => index !== tripID);
  localStorage.removeItem("trips");
  localStorage.setItem("trips", JSON.stringify(updatedTripsArray));
}






const makeTripPDF = (departing, city, country) => {
  // Create a new jsPDF instance
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'px',
    format: 'a4'
   });

  // Add content to the PDF
  doc.text(`Trip Details
  Dear Sexy Human,
  
  We are delighted to provide you with the essential details 
  of your upcoming trip to ${country} - ${city}.

  Trip Information:
  // Destination: ${country} - ${city} 
  // Date of Departure: ${departing}
  
  Safe travels!
  
  Warm regards,
  
  Your Travel Buddy`, 5, 15, {align: 'left', renderingMode: "fill"});

  // Save the PDF
  doc.save("sample.pdf");
}