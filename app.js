// Create a new date instance dynamically with JS
let today = new Date();
let newDate =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

const weatherServerURL = "https://api.openweathermap.org/data/2.5/weather/";
const apiKey = "76aa91139c7537d1992cc3e86268bd28"; // Personal API Key for OpenWeatherMap API
const localhostServerURL = "http://localhost:8888";
const postMethodName = "/sendData";
const getMethodName = "/retreiveData";

document.addEventListener("DOMContentLoaded", () => {
  // Event listener to add function to existing HTML DOM element
  document
    .getElementById("generate")
    .addEventListener("click", fetchWeatherDataAndDisplay);
});

/* Function called by event listener */
function fetchWeatherDataAndDisplay() {
  // Capture current date at the time of function call
  let today = new Date();
  let newDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const zipcode = document.getElementById("zip").value;
  const countryCode = document.getElementById("countryCode").value;
  const userResponse = document.getElementById("feelings").value;

  getWeatherDataByZipcode(weatherServerURL, zipcode, countryCode, apiKey)
    .then((weatherData) => {
      return prepareData(weatherData, userResponse);
    })
    .then((projectData) => {
      return postData(localhostServerURL + postMethodName, projectData);
    })
    .then((responseData) => {
      if (responseData.status === 200) {
        return retrieveData(localhostServerURL + getMethodName);
      } else {
        console.log("Error sending data to local server.");
      }
    })
    .then((uiData) => {
      updateUI(uiData);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

/**
 * Function to GET Web API Data (Get Route II)
 */
const getWeatherDataByZipcode = async (
  weatherServerURL,
  zipcode,
  countryCode,
  apiKey
) => {
  const url =
    weatherServerURL +
    "?zip=" +
    encodeURIComponent(zipcode) +
    "," +
    encodeURIComponent(countryCode) +
    "&appid=" +
    apiKey;
  try {
    const response = await fetch(url);
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error("error", error);
  }
};

/**
 * Function to prepare project data that need to be sent to local server
 */
const prepareData = async (weatherData, userResponse) => {
  try {
    if (weatherData.message) {
      // Error case
      const projectData = weatherData.message;
      return projectData;
    } else {
      // Success case, create projectData
      const projectData = {
        temp: weatherData.main.temp,
        userResponse: userResponse,
        date: newDate,
      };
      return projectData;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Function to POST projectData
 */
const postData = async (url = "", projectData = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });
    return response;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

/**
 * Function to GET Project Data
 */
const retrieveData = async (url) => {
  const data = await fetch(url);
  try {
    const result = await data.json();
    return result;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

/**
 * Function to update UI with output of API calls
 */
const updateUI = async (uiData) => {
  const request = await fetch("http://localhost:8888/retreiveData");
  try {
    const uiData = await request.json();
    // Write updated data to DOM elements
    document.getElementById("date").innerHTML = uiData.date;
    document.getElementById("temperature").innerHTML = uiData.temp - 273.15 + " " + "C"; //C is for denoting temperature in Celcius
    document.getElementById("userResponse").innerHTML = uiData.userResponse;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

