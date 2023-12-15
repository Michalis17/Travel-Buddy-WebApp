import { jsPDF } from "jspdf";
import { countdown } from "./countdown";
export function userInputToServer(inputObject) {
  // add code to display loader 
  document.getElementById("loader").style.display = "block";
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8000/tripInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputObject),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response from the server
      })
      .then((data) => {
        // code to remove loader
        document.getElementById("loader").style.display = "none";
        resolve(data); // Resolve the Promise with the received data
      })
      .catch((error) => {
        reject(error); // Reject the Promise with the encountered error
      });
  });
}

export function saveTripObj(tripObj, arrayTrips) {
  arrayTrips.push(tripObj);
  localStorage.setItem("trips", JSON.stringify(arrayTrips));
}

export function removeTrip(tripID, arrayTrips) {
  // removes trip object from array based on the index
  const updatedTripsArray = arrayTrips.filter((trip, index) => index !== tripID);
  localStorage.removeItem("trips");
  localStorage.setItem("trips", JSON.stringify(updatedTripsArray));
}

export const makeTripPDF = (departing, city, country) => {
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


export const displayCountDown = (arrayTrips) => {
  const allCountdownForTrips = document.getElementsByClassName("countdown");
  let i = 0;

  for (const item of allCountdownForTrips) {
    const countdownResults = countdown(arrayTrips[i].departure);
    item.innerText = `${countdownResults.day} : ${countdownResults.hour} : ${countdownResults.minute} : ${countdownResults.second}`;
    i++;
  }
};
