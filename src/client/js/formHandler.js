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
