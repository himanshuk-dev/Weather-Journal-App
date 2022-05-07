const projectData = {
  temp: "",
  userResponse:"",
  date:""
};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require("body-parser");
/*Middleware*/ 

// Here we are configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup the server
const port = 5000;
const server = app.listen(port, listening);

function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

// Capture weather data (Get Route I)
app.get('/retreiveData',retreiveData);

function retreiveData(req,res) {
  console.log('Data being sent:', projectData)
  res.send(projectData);

}

// Post weather data
app.post('/sendData', sendData)
async function sendData(req,res){
  console.log('Received data from client, data:', req.body);
  projectData.temp = req.body.temp;
  projectData.userResponse = req.body.userResponse;
  projectData.date = req.body.date;
  console.log('data assigned at post route:', projectData)
  const data = await req.body;
  console.log('Sending response status code to client');
  res.status(200).send();
}