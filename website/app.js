// Global Variable

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Personal API Key for OpenWeatherMap API
const weatherServerURL = 'https://api.openweathermap.org/data/2.5/weather/?zip=';
const apiKey = '&appID=76aa91139c7537d1992cc3e86268bd28';
const localhostServerURL = 'http://localhost:5000';

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener('click', taskToPerform);

/* Function called by event listener */
function taskToPerform(){
  const location =  document.getElementById('zip').value;
  const country =  document.getElementById('country').value;
  const userResponse =  document.getElementById('feelings').value;

  getData(weatherServerURL,location,country,apiKey)
  .then((data) =>{
    console.log("The data is:", data);
    console.log("The temperature is:", data.main.temp)
    console.log("The feelings are:", userResponse)
    console.log("The date is:", newDate)
  
    prepareData(data, userResponse)
    .then((projectData)=>{
      console.log('Data prepared to be sent to server:', projectData)
      postData(localhostServerURL + '/sendData', projectData)
      .then((responseData)=>{
        console.log('Retreived response data is:', responseData)
        obtainData('http://localhost:5000/retreiveData')
        .then((data)=>{
          // console.log('UI data is:', data)
          updateUI(data);
        })
      })
    })
  });
};

// Function to GET Web API Data (Get Route II)
const getData = async (baseURL,location,country,apiKey)=>{

  const url = weatherServerURL + location + "," + country + apiKey;
  console.log("Calling weather server api with url:", url);

  const res = await fetch(url)
  console.log("Fetch call completed")
    try {
  
      const data = await res.json();
      console.log("Received data from weatherserver", data);
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

// Function to prepare project data that need to be sent to server
const prepareData = async (data, userResponse) =>{
  try{
    if(data.message){
      // Error case
      console.log('Error response:', data)
      const projectData = data.message;
      console.log('Error case project data:', projectData) 
      return projectData;    
    } else {
      // success case
      console.log('Successful response:', data)
      const projectData = {
        temp: data.main.temp,
        userResponse: userResponse,
        date: newDate
      };
      console.log('Successful case project data:', projectData)
      return projectData;
    }
  }catch(error){
    console.error(error);
  }
}

/* Function to POST data */
const postData = async (url = '', projectData = {}) =>{
  console.log("postData called with url:", url)
  console.log('postData called with projectData:', projectData)
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    console.log('postData completed with response:', response.status)
    return response;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

/* Function to GET Project Data */
const obtainData = async(url) =>{
  console.log("getting data from local server:",fetch)
  const data = await fetch(url)
  console.log("Fetch call completed")
    try {
      const result = await data.json();
      console.log(result);
      return result;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}

const updateUI = async (data) =>{
  const request = await fetch('http://localhost:5000/retreiveData');
  try {
  // Transform into JSON
    const allData = await request.json()
    console.log(allData)
  // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.feelings;
    document.getElementById('date').innerHTML =allData.date;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}