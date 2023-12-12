export function placePicker() {
  // Make a GET request to your server
  fetch("http://localhost:8000/searchCities") // Replace with your server URL
    .then((response) => {
      // Check if the response is okay
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Parse the JSON response
      return response.json();
    })
    .then((data) => {
      // Handle the received data
      console.log("World Cities received from Serevr");

      let options = [];
      for (let i = 1; i < data.length; i++) {
        const fullLocation = `${data[i].name}, ${data[i].subcountry}, ${data[i].country}, ${data[i].geonameid}`; 
        options.push(fullLocation);
      }

      const searchInput = document.getElementById("searchInput");
      const optionsList = document.getElementById("optionsList");

      function filterOptions() {
        const inputValue = searchInput.value.toLowerCase();
        optionsList.innerHTML = "";

        const filteredOptions = options.filter((option) =>
          option.toLowerCase().includes(inputValue)
        );
        filteredOptions.forEach((option) => {
          const optionElement = document.createElement("div");
          optionElement.classList.add("option-item");
          optionElement.textContent = option;
          optionElement.addEventListener("click", () => {
            searchInput.value = option;
            optionsList.style.display = "none";
          });
          optionsList.appendChild(optionElement);
        });

        if (inputValue.length > 0 && filteredOptions.length > 0) {
          optionsList.style.display = "block";
        } else {
          optionsList.style.display = "none";
        }
      }

      searchInput.addEventListener("input", filterOptions);

      document.addEventListener("click", function (event) {
        if (
          !optionsList.contains(event.target) &&
          event.target !== searchInput
        ) {
          optionsList.style.display = "none";
        }
      });

      // return data;
      // You can perform operations with the received data here
    })
    .catch((error) => {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
    });
}
