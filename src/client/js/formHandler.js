// TODO: clean up and split up code 
// Setting calander input to accept future dates only
const currentTime = new Date();
const departingInput = document.getElementById("input-date");
const locationInput = document.getElementById("location");
const form = document.getElementById('myForm');

const setDateLimit = (timeLimit) => {
  let nowMinute = timeLimit.getMinutes();
  let nowHour = timeLimit.getHours();
  if (nowHour < 10) {
    nowHour = "0" + nowHour;
  }

  let nowDate = timeLimit.getDate();
  if (nowDate < 10) {
    nowDate = "0" + nowDate;
  }
 
  let nowMonth = timeLimit.getMonth() + 1;
  if (nowMonth < 10) {
    nowMonth = "0" + nowMonth;
  }
  const nowYear = timeLimit.getFullYear();

  departingInput.setAttribute(
    "min",
    `${nowYear}-${nowMonth}-${nowDate} ${nowHour}:${nowMinute}`
  );
};
setDateLimit(currentTime);

class Trip {
  constructor(location, departure) {
    this.location = location;
    this.departure = departure;
  }
}

let allTrips = JSON.parse(localStorage.getItem("trips")) || [];
// console.log(allTrips);
// Check if trips were retrieved
if (allTrips.length === 0) {
  console.log("There are no trips stored in local storage!");
}




form.addEventListener("submit", (e) => {
  e.preventDefault();
  saveTrip(new Trip(locationInput.value, departingInput.value));
  location.reload();
});
//
function saveTrip(tripObject) {
  // Push the new trip object into the array
  allTrips.push(tripObject);
  // Stores the updated trips array in local storage
  localStorage.setItem("trips", JSON.stringify(allTrips));
}

function removeTrip(tripID) {
  // removes trip object from array based on the index
  const updatedTripsArray = allTrips
    .slice(0, tripID)
    .concat(allTrips.slice(tripID + 1));
  localStorage.removeItem("trips");
  localStorage.setItem("trips", JSON.stringify(updatedTripsArray));
}

function displayTrips(tripsArray) {
  tripsArray.forEach((item, index) => {
    // Access item and optionally index
    form.insertAdjacentHTML(
      "afterend",
      `<h1>${index}</h1>
    <p>${item.location}</p>
    <p>${item.departure}</p>
    <button id='${index}' class='delete'>Delete Me</button>`
    );
  });
}

displayTrips(allTrips);
const allDeleteButtons = document.getElementsByClassName("delete");

for (const item of allDeleteButtons) {
  // Access item
  item.addEventListener("click", () => {
    const confirmUser = confirm("Are you sure you want to delete this trip?");
    if (confirmUser === true) {
      removeTrip(item.id);
      location.reload();
    }
  });
}














const countdown = (date) => {
  // time in milliseconds
  const second = 1000;
  const minute = second * 60;
  const hour = minute *60;
  const day = hour * 24;
  // storing the current date and time to countdown from
  const now = currentTime.getTime();
  // storing date and time to countdown to 
  const countDate = new Date(date).getTime();
  // calculalate the difference
  const gap = countDate - now;
 
  // storing results in object
  const countdownResults = {
      day: Math.floor(gap / day),
      hour: Math.floor((gap % day)/hour),
      minute: Math.floor((gap % hour)/minute),
      second: Math.floor((gap % minute)/second)
  };
  return countdownResults;
}



const isValidDateTime = (dateTimeString) => {
    // The regular expression for date and time in "YYYY-MM-DD HH:mm" format
    const regEx = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    return regEx.test(dateTimeString);
  } 
//! the function above returns true or false therefor if false date time format is wrong
