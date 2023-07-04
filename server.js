const projectData = {
  temp: "",
  userResponse: "",
  date: "",
};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require("body-parser");

// Here we are configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.get("/", function (req, res) {
  res.sendFile(__dirname + "index.html");
});

// Setup the server
const port = 8888;
const server = app.listen(port, listening);

function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

/**
 * Post route to store data coming from the client
 */
app.post("/sendData", storeData);

/**
 * Get route to send data back to the client (Get Route I)
 */
app.get("/retreiveData", retreiveData);

/**
 * Function to store data coming from the client and responding with statusCode
 */
async function storeData(req, res) {
  projectData.temp = req.body.temp;
  projectData.userResponse = req.body.userResponse;
  projectData.date = req.body.date;
  res.status(200).send();
}

/**
 * Function to send data back to the client
 */
function retreiveData(req, res) {
  res.send(projectData);
}
