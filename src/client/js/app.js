import { placePicker } from "./placePicker";
import { setDateLimit } from "./dateLimit";
import {
  userInputToServer,
  saveTripObj,
  makeTripPDF,
  removeTrip,
  displayCountDown,
} from "./formHandler";

export const runApp = () => {
  // Important variables
  const currentTime = new Date();
  const form = document.getElementById("myForm");
  const tripsSecion = document.getElementById("trips");
  let tripsArray = JSON.parse(localStorage.getItem("trips")) || [];
  // Creating the core function
  function displayTrips(array) {
    if (!Array.isArray(array)) {
      throw new Error("Invalid input. 'array' parameter must be an array.");
    }

    if (array.length === 0) {
      tripsSecion.insertAdjacentHTML(
        "beforeend",
        `<p class='banner'>No trips to show yet. Add your next trip! </p>`
      );
    } else {
      array.forEach((item, index) => {
        const sunSetTime = new Date(item.weather[5]);
        const sunRiseTime = new Date(item.weather[6]);

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
        for (let i = 0; i < item.weather.length; i++) {
          if (i >= 5) break;
          const dayDiv = document.createElement("div");
          const dayLabel = document.createElement("p");
          dayLabel.textContent = days[i];
          const weatherInfo = document.createElement("p");
          weatherInfo.textContent = item.weather[i];
          dayDiv.appendChild(dayLabel);
          dayDiv.appendChild(weatherInfo);
          weatherForecast.appendChild(dayDiv);
        }

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
          const confirmUser = confirm(
            "Are you sure you want to delete this trip?"
          );
          if (confirmUser === true) {
            removeTrip(index, tripsArray);
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
  // event listiner to handel form inputs
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userInput = {
      location: document.getElementById("searchInput").value,
      date: document.getElementById("input-date").value,
    };
    try {
      const tripObject = await userInputToServer(userInput);
      saveTripObj(tripObject, tripsArray);
      location.reload();
    } catch (error) {
      console.error("Error while sending data to the server:", error);
      // Handle errors here
      alert(
        "Failled to retrive trip information from server try again in 5 min"
      );
    }
  });
  // Functions to be called
  setDateLimit(currentTime);
  displayTrips(tripsArray);
  placePicker();
  // Function i am most proud to call
  setInterval(() => {
    displayCountDown(tripsArray);
  }, 1000);
};
